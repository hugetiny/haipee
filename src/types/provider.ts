/**
 * Provider Configuration Types
 * 定义 AI Provider 和 API 格式的 TypeScript 类型
 *
 * 关键设计：format 字段现在是数组，支持多格式 Provider
 * 例如：formats = ["openai", "anthropic", "gemini", "opencode-zen"]
 *
 * @module types/provider
 * @version 1.0.0
 * @since 2026-03-13
 */

// ============================================
// API 格式类型定义
// ============================================

/**
 * 支持的 API 格式类型
 */
export type ApiFormat =
  | 'openai'
  | 'anthropic'
  | 'gemini'
  | 'azure'
  | 'aliyun'
  | 'baidu'
  | 'bytedance'
  | 'opencode-zen'
  | 'custom';

/**
 * 认证类型
 */
export type AuthType = 'bearer' | 'api_key' | 'query_param' | 'custom';

/**
 * 请求/响应结构类型
 */
export type StructureType =
  | 'openai_chat'
  | 'anthropic_messages'
  | 'gemini_content'
  | 'aliyun_generation'
  | 'baidu_chat'
  | 'zen_input'
  | 'openai_chat_response'
  | 'anthropic_content'
  | 'gemini_candidates'
  | 'aliyun_output'
  | 'baidu_result'
  | 'zen_output'
  | 'custom';

// ============================================
// 格式定义
// ============================================

/**
 * API 格式定义
 * 描述每种格式的端点、认证方式和数据结构
 */
export interface FormatDefinition {
  /** 格式 ID */
  id: ApiFormat;

  /** 显示名称 */
  name: string;

  /** 描述 */
  description: string;

  /** API 端点路径 */
  endpoint_path: string;

  /** 认证类型 */
  auth_type: AuthType;

  /** 认证 Header 名称（当 auth_type 为 bearer/api_key 时） */
  auth_header?: string;

  /** 认证查询参数名（当 auth_type 为 query_param 时） */
  auth_param?: string;

  /** 请求体结构类型 */
  request_structure: StructureType;

  /** 响应体结构类型 */
  response_structure: StructureType;

  /** 系统提示词在请求体中的位置 */
  system_prompt_location: string;

  /** 特殊功能列表 */
  features?: string[];
}

// ============================================
// 模型定义
// ============================================

/**
 * AI 模型定义
 * 包含模型级别的格式支持配置
 */
export interface ModelDefinition {
  /** 模型 ID */
  id: string;

  /** 模型显示名称 */
  name: string;

  /** 模型描述 */
  description: string;

  /**
   * 支持的格式列表
   * 注意：某些模型可能只支持 Provider 格式的子集
   * 例如：zen-32k 仅支持 ["openai", "anthropic"]，
   * 而 zen-4k 和 zen-128k 支持全部 4 种格式
   */
  formats: ApiFormat[];

  /** 默认使用的格式 */
  default_format: ApiFormat;

  /** 是否支持流式响应 */
  supports_streaming: boolean;

  /** 是否支持函数调用 */
  supports_function_calling: boolean;

  /** 是否支持多模态输入 */
  supports_multimodal: boolean;

  /** 是否支持系统提示词 */
  supports_system_prompt: boolean;

  /** 上下文窗口大小（tokens） */
  context_window: number;

  /** 最大输出 tokens */
  max_output_tokens: number;

  /** 自定义配置 */
  config?: Record<string, unknown>;
}

// ============================================
// Provider 定义
// ============================================

/**
 * AI Provider 定义
 */
export interface ProviderDefinition {
  /** Provider ID */
  id: string;

  /** Provider 显示名称 */
  name: string;

  /** Provider 描述 */
  description: string;

  /** 基础 URL */
  base_url: string;

  /** 文档 URL */
  docs_url: string;

  /**
   * Provider 级别支持的格式列表
   * 这是该 Provider 支持的所有格式
   */
  formats: ApiFormat[];

  /** Provider 默认格式 */
  default_format: ApiFormat;

  /** 该 Provider 下的模型列表 */
  models: ModelDefinition[];

  /** Provider 级别的特殊配置 */
  config?: Record<string, unknown>;
}

// ============================================
// 运行时配置类型
// ============================================

/**
 * Provider 运行时配置
 * 用户配置的实际 API 密钥等信息
 */
export interface ProviderRuntimeConfig {
  /** Provider ID */
  provider_id: string;

  /** API 密钥 */
  api_key: string;

  /**
   * 选择的格式
   * 必须在 Provider/Model 支持的 formats 列表中
   */
  selected_format: ApiFormat;

  /** 自定义基础 URL（可选，用于代理或自托管） */
  base_url?: string;

  /** 额外请求头 */
  headers?: Record<string, string>;

  /** 是否启用 */
  enabled: boolean;
}

/**
 * 模型运行时配置
 * 包含 Provider 和 Model 的组合选择
 */
export interface ModelRuntimeConfig {
  /** Provider ID */
  provider_id: string;

  /** 模型 ID */
  model_id: string;

  /**
   * 选择的格式
   * 必须在 Model 支持的 formats 列表中
   */
  selected_format: ApiFormat;

  /** 温度参数 */
  temperature?: number;

  /** 最大 tokens */
  max_tokens?: number;

  /** 是否启用流式 */
  streaming?: boolean;
}

// ============================================
// 配置加载结果
// ============================================

/**
 * 加载的完整配置
 */
export interface LoadedConfig {
  /** 所有 Provider 定义 */
  providers: Record<string, ProviderDefinition>;

  /** 所有格式定义 */
  formats: Record<string, FormatDefinition>;

  /** 所有模型定义（按 ID 索引） */
  models: Record<string, ModelDefinition>;

  /** Provider ID -> 模型 ID 列表 映射 */
  provider_models: Record<string, string[]>;
}

// ============================================
// 工具类型
// ============================================

/**
 * 格式选择建议
 */
export interface FormatRecommendation {
  /** 推荐格式 */
  format: ApiFormat;

  /** 推荐原因 */
  reason: string;

  /** 适用场景 */
  scenarios: string[];
}

/**
 * Provider 能力矩阵
 */
export interface ProviderCapabilities {
  /** Provider ID */
  provider_id: string;

  /** 支持的格式数量 */
  format_count: number;

  /** 支持的模型数量 */
  model_count: number;

  /** 功能支持情况 */
  features: {
    streaming: boolean;
    function_calling: boolean;
    multimodal: boolean;
    system_prompt: boolean;
  };

  /** 多格式支持状态 */
  multi_format_support: {
    /** 是否支持多种格式 */
    enabled: boolean;

    /** 支持的格式列表 */
    formats: ApiFormat[];

    /** 是否有模型级别的格式差异 */
    has_model_level_differences: boolean;
  };
}

// ============================================
// 兼容性类型（向后兼容）
// ============================================

/**
 * 旧版单格式配置（用于向后兼容）
 * @deprecated 使用新数组格式
 */
export type LegacyFormat = ApiFormat;

/**
 * 旧版 Provider 配置（用于迁移）
 * @deprecated 使用新数组格式
 */
export interface LegacyProviderDefinition {
  id: string;
  name: string;
  description: string;
  base_url: string;
  docs_url: string;
  /** 单格式字符串 */
  format: string;
  default_format: string;
  models: Array<{
    id: string;
    name: string;
    description: string;
    /** 单格式字符串 */
    format: string;
    default_format: string;
    supports_streaming: boolean;
    supports_function_calling: boolean;
    supports_multimodal: boolean;
    supports_system_prompt: boolean;
    context_window: number;
    max_output_tokens: number;
  }>;
}

// ============================================
// 常量定义
// ============================================

/**
 * 所有支持的格式列表
 */
export const ALL_API_FORMATS: ApiFormat[] = [
  'openai',
  'anthropic',
  'gemini',
  'azure',
  'aliyun',
  'baidu',
  'bytedance',
  'opencode-zen',
  'custom',
];

/**
 * 格式优先级（用于自动选择）
 */
export const FORMAT_PRIORITY: Record<ApiFormat, number> = {
  'opencode-zen': 1, // 最高优先级（原生优化）
  'openai': 2,       // 第二（最通用）
  'anthropic': 3,
  'gemini': 4,
  'azure': 5,
  'aliyun': 6,
  'baidu': 7,
  'bytedance': 8,
  'custom': 9,
};

/**
 * 获取模型的有效格式列表
 * 如果模型有自己的格式配置，使用模型的；否则继承 Provider 的
 */
export function getEffectiveFormats(
  model: ModelDefinition,
  provider: ProviderDefinition
): ApiFormat[] {
  // 如果模型有明确的格式配置，优先使用
  if (model.formats && model.formats.length > 0) {
    return model.formats;
  }
  // 否则继承 Provider 的格式
  return provider.formats;
}

/**
 * 检查格式是否被支持
 */
export function isFormatSupported(
  format: ApiFormat,
  model: ModelDefinition,
  provider: ProviderDefinition
): boolean {
  const effectiveFormats = getEffectiveFormats(model, provider);
  return effectiveFormats.includes(format);
}

/**
 * 获取默认格式
 */
export function getDefaultFormat(
  model: ModelDefinition,
  provider: ProviderDefinition
): ApiFormat {
  // 如果模型有默认格式配置，优先使用
  if (model.default_format) {
    return model.default_format;
  }
  // 否则使用 Provider 的默认格式
  return provider.default_format;
}
