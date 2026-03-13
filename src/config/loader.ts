/**
 * Provider Configuration Loader
 * 加载和解析 provider.toml 配置文件
 *
 * 关键特性：
 * 1. 支持新的数组格式配置
 * 2. 向后兼容旧版单字符串格式
 * 3. 自动将字符串格式转换为数组
 * 4. 验证配置完整性
 *
 * @module config/loader
 * @version 1.0.0
 * @since 2026-03-13
 */

import type {
  ApiFormat,
  FormatDefinition,
  LoadedConfig,
  ModelDefinition,
  ProviderCapabilities,
  ProviderDefinition,
  LegacyProviderDefinition,
  StructureType,
} from '../types/provider';

import {
  ALL_API_FORMATS,
  getEffectiveFormats,
} from '../types/provider';

// ============================================
// TOML 解析（纯 JS 实现，无外部依赖）
// ============================================

/**
 * 简化的 TOML 解析器
 * 支持本项目用到的 TOML 子集
 */
function parseToml(toml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = toml.split('\n');

  let currentSection: string | null = null;
  let inArrayTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 跳过空行和注释
    if (!line || line.startsWith('#')) continue;

    // 数组表 [[section]]
    if (line.startsWith('[[') && line.endsWith(']]')) {
      const sectionName = line.slice(2, -2).trim();
      currentSection = sectionName;
      inArrayTable = true;

      // 创建数组
      const parts = sectionName.split('.');
      let target: Record<string, unknown> = result;

      for (let j = 0; j < parts.length - 1; j++) {
        const part = parts[j];
        if (!target[part]) {
          target[part] = {};
        }
        target = target[part] as Record<string, unknown>;
      }

      const lastPart = parts[parts.length - 1];
      if (!target[lastPart]) {
        target[lastPart] = [];
      }

      // 添加新元素到数组
      (target[lastPart] as unknown[]).push({});
      continue;
    }

    // 标准表 [section]
    if (line.startsWith('[') && line.endsWith(']')) {
      const sectionName = line.slice(1, -1).trim();
      currentSection = sectionName;
      inArrayTable = false;

      // 创建嵌套对象
      const parts = sectionName.split('.');
      let target: Record<string, unknown> = result;

      for (const part of parts) {
        if (!target[part]) {
          target[part] = {};
        }
        target = target[part] as Record<string, unknown>;
      }
      continue;
    }

    // 键值对
    const equalIndex = line.indexOf('=');
    if (equalIndex > 0) {
      const key = line.slice(0, equalIndex).trim();
      let value = line.slice(equalIndex + 1).trim();

      // 解析值
      const parsedValue = parseTomlValue(value);

      // 设置值
      if (inArrayTable && currentSection) {
        // 获取当前数组的最后一个元素
        const parts = currentSection.split('.');
        let target: Record<string, unknown> = result;

        for (let j = 0; j < parts.length - 1; j++) {
          target = target[parts[j]] as Record<string, unknown>;
        }

        const arr = target[parts[parts.length - 1]] as unknown[];
        const currentObj = arr[arr.length - 1] as Record<string, unknown>;
        currentObj[key] = parsedValue;
      } else if (currentSection) {
        // 标准表的键值
        const parts = currentSection.split('.');
        let target: Record<string, unknown> = result;

        for (const part of parts) {
          target = target[part] as Record<string, unknown>;
        }

        target[key] = parsedValue;
      } else {
        // 顶层键值
        result[key] = parsedValue;
      }
    }
  }

  return result;
}

/**
 * 解析 TOML 值
 */
function parseTomlValue(value: string): unknown {
  value = value.trim();

  // 字符串
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n');
  }

  // 原始字符串
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1);
  }

  // 数组
  if (value.startsWith('[') && value.endsWith(']')) {
    const content = value.slice(1, -1);
    if (!content.trim()) return [];

    const items: unknown[] = [];
    let current = '';
    let inString = false;
    let stringChar = '';

    for (const char of content) {
      if (!inString && (char === '"' || char === "'")) {
        inString = true;
        stringChar = char;
        current += char;
      } else if (inString && char === stringChar) {
        inString = false;
        current += char;
      } else if (!inString && char === ',') {
        if (current.trim()) {
          items.push(parseTomlValue(current.trim()));
        }
        current = '';
      } else {
        current += char;
      }
    }

    if (current.trim()) {
      items.push(parseTomlValue(current.trim()));
    }

    return items;
  }

  // 布尔值
  if (value === 'true') return true;
  if (value === 'false') return false;

  // 数字
  if (/^-?\d+$/.test(value)) return parseInt(value, 10);
  if (/^-?\d+\.\d+$/.test(value)) return parseFloat(value);

  // 日期时间（简化处理，返回字符串）
  return value;
}

// ============================================
// 配置验证
// ============================================

/**
 * 验证格式字符串
 */
function validateFormat(format: string): format is ApiFormat {
  return ALL_API_FORMATS.includes(format as ApiFormat);
}

/**
 * 规范化格式字段
 * 将字符串或字符串数组转换为 ApiFormat[]
 * 用于向后兼容
 */
function normalizeFormats(formats: unknown): ApiFormat[] {
  // 已经是数组
  if (Array.isArray(formats)) {
    return formats.filter((f): f is ApiFormat =>
      typeof f === 'string' && validateFormat(f)
    );
  }

  // 单个字符串（旧格式）
  if (typeof formats === 'string') {
    if (validateFormat(formats)) {
      return [formats];
    }
  }

  // 默认回退
  return ['openai'];
}

/**
 * 验证 Model 配置
 */
function validateModel(model: unknown): model is ModelDefinition {
  if (!model || typeof model !== 'object') return false;

  const m = model as Record<string, unknown>;

  // 必需字段
  if (!m.id || typeof m.id !== 'string') return false;
  if (!m.name || typeof m.name !== 'string') return false;

  // formats 可以是数组或 undefined（继承 Provider）
  if (m.formats !== undefined) {
    const formats = normalizeFormats(m.formats);
    if (formats.length === 0) return false;
  }

  return true;
}

// ============================================
// 配置加载
// ============================================

/**
 * 从 TOML 字符串加载配置
 */
export function loadConfigFromToml(tomlContent: string): LoadedConfig {
  const parsed = parseToml(tomlContent);
  const providers: Record<string, ProviderDefinition> = {};
  const formats: Record<string, FormatDefinition> = {};
  const models: Record<string, ModelDefinition> = {};
  const provider_models: Record<string, string[]> = {};

  // 处理 Provider 配置
  const providersData = parsed.providers as Record<string, unknown> | undefined;

  if (providersData) {
    for (const [key, value] of Object.entries(providersData)) {
      if (!value || typeof value !== 'object') continue;

      const p = value as Record<string, unknown>;

      // 规范化 formats（向后兼容）
      const formats = normalizeFormats(p.formats);
      const defaultFormat = p.default_format as ApiFormat || formats[0];

      // 处理模型
      const modelList: ModelDefinition[] = [];
      const modelIds: string[] = [];

      if (Array.isArray(p.models)) {
        for (const m of p.models) {
          if (!validateModel(m)) continue;

          // 规范化模型的 formats
          const modelFormats = m.formats ? normalizeFormats(m.formats) : formats;
          const modelDefaultFormat = m.default_format || modelFormats[0] || defaultFormat;

          const modelDef: ModelDefinition = {
            id: m.id,
            name: m.name,
            description: (m.description as string) || '',
            formats: modelFormats,
            default_format: modelDefaultFormat as ApiFormat,
            supports_streaming: (m.supports_streaming as boolean) ?? true,
            supports_function_calling: (m.supports_function_calling as boolean) ?? false,
            supports_multimodal: (m.supports_multimodal as boolean) ?? false,
            supports_system_prompt: (m.supports_system_prompt as boolean) ?? true,
            context_window: (m.context_window as number) || 4096,
            max_output_tokens: (m.max_output_tokens as number) || 4096,
            config: (m.config as Record<string, unknown>) || undefined,
          };

          modelList.push(modelDef);

          // 全局模型索引（唯一 ID = provider:model）
          const globalModelId = `${key}:${m.id}`;
          models[globalModelId] = modelDef;
          modelIds.push(globalModelId);
        }
      }

      const providerDef: ProviderDefinition = {
        id: key,
        name: (p.name as string) || key,
        description: (p.description as string) || '',
        base_url: (p.base_url as string) || '',
        docs_url: (p.docs_url as string) || '',
        formats,
        default_format: defaultFormat as ApiFormat,
        models: modelList,
        config: (p.config as Record<string, unknown>) || undefined,
      };

      providers[key] = providerDef;
      provider_models[key] = modelIds;
    }
  }

  // 处理 Format 配置
  const formatsData = parsed.formats as Record<string, unknown> | undefined;

  if (formatsData) {
    for (const [key, value] of Object.entries(formatsData)) {
      if (!value || typeof value !== 'object') continue;

      const f = value as Record<string, unknown>;

      const formatDef: FormatDefinition = {
        id: key as ApiFormat,
        name: (f.name as string) || key,
        description: (f.description as string) || '',
        endpoint_path: (f.endpoint_path as string) || '/',
        auth_type: (f.auth_type as 'bearer' | 'api_key' | 'query_param' | 'custom') || 'bearer',
        auth_header: (f.auth_header as string) || undefined,
        auth_param: (f.auth_param as string) || undefined,
        request_structure: (f.request_structure as StructureType) || 'custom',
        response_structure: (f.response_structure as StructureType) || 'custom',
        system_prompt_location: (f.system_prompt_location as string) || 'messages[0].role=system',
        features: Array.isArray(f.features) ? f.features as string[] : undefined,
      };

      formats[key] = formatDef;
    }
  }

  return {
    providers,
    formats,
    models,
    provider_models,
  };
}

/**
 * 异步加载配置文件
 */
export async function loadConfig(configPath?: string): Promise<LoadedConfig> {
  // 在浏览器环境中，需要 fetch TOML 文件
  if (typeof window !== 'undefined') {
    const path = configPath || '/src/config/providers.toml';
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to load config from ${path}: ${response.statusText}`);
    }

    const tomlContent = await response.text();
    return loadConfigFromToml(tomlContent);
  }

  // Node.js 环境
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  try {
    // 使用条件类型来避免浏览器环境下的导入检查
    // @ts-expect-error - Node.js only modules, will be caught in browser
    const fsModule = await import('node:fs/promises');
    // @ts-expect-error - Node.js only modules, will be caught in browser
    const pathModule = await import('node:path');

    const fs = fsModule.default || fsModule;
    const path = pathModule.default || pathModule;

    // @ts-expect-error - process is Node.js global
    const resolvedPath = configPath || path.resolve(process.cwd(), 'src/config/providers.toml');
    const tomlContent = await fs.readFile(resolvedPath, 'utf-8');

    return loadConfigFromToml(tomlContent);
  } catch (error) {
    // 如果 Node.js 模块不可用（浏览器环境），抛出更友好的错误
    throw new Error(
      `Failed to load config: ${error instanceof Error ? error.message : String(error)}. ` +
      'In browser environment, please use a direct path to the TOML file.'
    );
  }
}

// ============================================
// 配置工具函数
// ============================================

/**
 * 获取 Provider 的能力矩阵
 */
export function getProviderCapabilities(
  provider: ProviderDefinition
): ProviderCapabilities {
  const allModels = provider.models;

  // 检查是否有模型级别的格式差异
  const providerFormatSet = new Set(provider.formats);
  let hasModelLevelDifferences = false;

  for (const model of allModels) {
    const modelFormats = getEffectiveFormats(model, provider);
    if (modelFormats.length !== providerFormatSet.size ||
        !modelFormats.every(f => providerFormatSet.has(f))) {
      hasModelLevelDifferences = true;
      break;
    }
  }

  // 统计功能支持
  const features = {
    streaming: allModels.some(m => m.supports_streaming),
    function_calling: allModels.some(m => m.supports_function_calling),
    multimodal: allModels.some(m => m.supports_multimodal),
    system_prompt: allModels.some(m => m.supports_system_prompt),
  };

  return {
    provider_id: provider.id,
    format_count: provider.formats.length,
    model_count: allModels.length,
    features,
    multi_format_support: {
      enabled: provider.formats.length > 1,
      formats: provider.formats,
      has_model_level_differences: hasModelLevelDifferences,
    },
  };
}

/**
 * 查找支持特定格式的模型
 */
export function findModelsByFormat(
  config: LoadedConfig,
  format: ApiFormat
): Array<{ provider: ProviderDefinition; model: ModelDefinition }> {
  const results: Array<{ provider: ProviderDefinition; model: ModelDefinition }> = [];

  for (const provider of Object.values(config.providers)) {
    for (const model of provider.models) {
      const effectiveFormats = getEffectiveFormats(model, provider);
      if (effectiveFormats.includes(format)) {
        results.push({ provider, model });
      }
    }
  }

  return results;
}

/**
 * 获取格式选择建议
 */
export function getFormatRecommendations(
  provider: ProviderDefinition,
  model?: ModelDefinition
): Array<{ format: ApiFormat; reason: string }> {
  const formats = model
    ? getEffectiveFormats(model, provider)
    : provider.formats;

  const recommendations: Array<{ format: ApiFormat; reason: string }> = [];

  for (const format of formats) {
    let reason = '';

    switch (format) {
      case 'opencode-zen':
        reason = 'Zen 原生格式，性能最优，支持成本分析和上下文压缩';
        break;
      case 'openai':
        reason = '最通用格式，适合从 OpenAI 迁移或需要广泛兼容性';
        break;
      case 'anthropic':
        reason = '原生 Claude 格式，适合使用 Claude SDK 的场景';
        break;
      case 'gemini':
        reason = '原生多模态支持，适合图像/视频处理场景';
        break;
      case 'azure':
        reason = 'Azure 专用格式，适合企业数据驻留需求';
        break;
      default:
        reason = `${format} 原生格式`;
    }

    recommendations.push({ format, reason });
  }

  return recommendations;
}

// ============================================
// 向后兼容转换
// ============================================

/**
 * 将旧版配置转换为新版
 */
export function migrateLegacyConfig(
  legacy: LegacyProviderDefinition
): ProviderDefinition {
  // 将单格式字符串转换为数组
  const formats = normalizeFormats(legacy.format);
  const defaultFormat = legacy.default_format as ApiFormat || formats[0];

  return {
    id: legacy.id,
    name: legacy.name,
    description: legacy.description,
    base_url: legacy.base_url,
    docs_url: legacy.docs_url,
    formats,
    default_format: defaultFormat as ApiFormat,
    models: legacy.models.map(m => ({
      id: m.id,
      name: m.name,
      description: m.description,
      formats: normalizeFormats(m.format),
      default_format: (m.default_format as ApiFormat) || formats[0],
      supports_streaming: m.supports_streaming,
      supports_function_calling: m.supports_function_calling,
      supports_multimodal: m.supports_multimodal,
      supports_system_prompt: m.supports_system_prompt,
      context_window: m.context_window,
      max_output_tokens: m.max_output_tokens,
    })),
  };
}

// ============================================
// 导出默认配置
// ============================================

/**
 * 默认导出，便于使用
 */
export default {
  load: loadConfig,
  loadFromToml: loadConfigFromToml,
  getCapabilities: getProviderCapabilities,
  findModelsByFormat,
  getFormatRecommendations,
  migrateLegacy: migrateLegacyConfig,
};
