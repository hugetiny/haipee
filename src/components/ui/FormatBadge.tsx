/**
 * FormatBadge Component
 * 显示模型支持的 API 格式
 *
 * 核心特性：
 * 1. 显示格式数组中的所有格式
 * 2. 高亮显示默认格式
 * 3. 提示模型级别的格式差异
 */

import React from 'react';
import type { ApiFormat, ModelDefinition, ProviderDefinition } from '../../types/provider';
import { getEffectiveFormats } from '../../types/provider';

interface FormatBadgeProps {
  /** 格式 ID */
  format: ApiFormat;

  /** 是否为默认格式 */
  isDefault?: boolean;

  /** 点击回调 */
  onClick?: (format: ApiFormat) => void;

  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 单个格式徽章
 */
export const FormatBadge: React.FC<FormatBadgeProps> = ({
  format,
  isDefault = false,
  onClick,
  size = 'md',
}) => {
  // 格式显示名称
  const formatLabels: Record<ApiFormat, string> = {
    'openai': 'OpenAI',
    'anthropic': 'Claude',
    'gemini': 'Gemini',
    'azure': 'Azure',
    'aliyun': '阿里云',
    'baidu': '百度',
    'bytedance': '字节',
    'opencode-zen': 'Zen',
    'custom': 'Custom',
  };

  // 格式颜色
  const formatColors: Record<ApiFormat, { bg: string; text: string; border: string }> = {
    'openai': { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' },
    'anthropic': { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
    'gemini': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
    'azure': { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300' },
    'aliyun': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
    'baidu': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
    'bytedance': { bg: 'bg-cyan-100', text: 'text-cyan-800', border: 'border-cyan-300' },
    'opencode-zen': { bg: 'bg-violet-100', text: 'text-violet-800', border: 'border-violet-300' },
    'custom': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
  };

  const colors = formatColors[format];
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full font-medium
        border transition-colors cursor-default
        ${colors.bg} ${colors.text} ${colors.border}
        ${sizeClasses[size]}
        ${isDefault ? 'ring-2 ring-offset-1 ring-offset-white' : ''}
        ${onClick ? 'cursor-pointer hover:opacity-80' : ''}
      `}
      onClick={() => onClick?.(format)}
      title={isDefault ? `${formatLabels[format]} (默认)` : formatLabels[format]}
    >
      {formatLabels[format]}
      {isDefault && (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </span>
  );
};

interface FormatBadgeGroupProps {
  /** Provider 定义 */
  provider: ProviderDefinition;

  /** 模型定义（可选，用于显示模型特定的格式） */
  model?: ModelDefinition;

  /** 当前选中的格式（用于高亮显示） */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedFormat?: ApiFormat;

  /** 格式选择回调 */
  onSelect?: (format: ApiFormat) => void;

  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';

  /** 是否显示差异提示 */
  showDifferenceWarning?: boolean;
}

/**
 * 格式徽章组
 * 显示 Provider/Model 支持的所有格式
 */
export const FormatBadgeGroup: React.FC<FormatBadgeGroupProps> = ({
  provider,
  model,
  // selectedFormat is kept in type but not used - can be used for highlighting in future
  selectedFormat: _selectedFormat,
  onSelect,
  size = 'md',
  showDifferenceWarning = true,
}) => {
  const formats = getEffectiveFormats(model || provider.models[0], provider);
  const defaultFormat = model?.default_format || provider.default_format;

  // 检查是否有模型级别的格式差异
  const hasDifference = model && showDifferenceWarning &&
    JSON.stringify(formats.sort()) !== JSON.stringify(provider.formats.sort());

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {formats.map((format) => (
          <FormatBadge
            key={format}
            format={format}
            isDefault={format === defaultFormat}
            size={size}
            onClick={onSelect ? () => onSelect(format) : undefined}
          />
        ))}
      </div>

      {hasDifference && (
        <div className="flex items-center gap-1.5 text-xs text-amber-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>
            该模型支持的格式与 Provider 不同
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * 格式选择下拉框
 */
export const FormatSelector: React.FC<FormatBadgeGroupProps> = ({
  provider,
  model,
  selectedFormat,
  onSelect,
}) => {
  const formats = getEffectiveFormats(model || provider.models[0], provider);
  const defaultFormat = model?.default_format || provider.default_format;

  const formatLabels: Record<ApiFormat, string> = {
    'openai': 'OpenAI API',
    'anthropic': 'Anthropic Messages API',
    'gemini': 'Google Gemini API',
    'azure': 'Azure OpenAI',
    'aliyun': '阿里云灵积',
    'baidu': '百度文心',
    'bytedance': '字节豆包',
    'opencode-zen': 'OpenCode Zen (优化)',
    'custom': '自定义',
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        API 格式
      </label>
      <select
        value={selectedFormat || defaultFormat}
        onChange={(e) => onSelect?.(e.target.value as ApiFormat)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      >
        {formats.map((format) => (
          <option key={format} value={format}>
            {formatLabels[format]}
            {format === defaultFormat ? ' (默认)' : ''}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-500">
        该 {model ? '模型' : 'Provider'} 支持 {formats.length} 种 API 格式
      </p>
    </div>
  );
};

export default FormatBadgeGroup;
