/**
 * Config Module
 * Provider and format configuration exports
 *
 * @module config
 */

// 类型重新导出
export type {
  ApiFormat,
  AuthType,
  StructureType,
  FormatDefinition,
  ModelDefinition,
  ProviderDefinition,
  ProviderRuntimeConfig,
  ModelRuntimeConfig,
  LoadedConfig,
  FormatRecommendation,
  ProviderCapabilities,
} from '../types/provider';

// 常量重新导出
export {
  ALL_API_FORMATS,
  FORMAT_PRIORITY,
  getEffectiveFormats,
  isFormatSupported,
  getDefaultFormat,
} from '../types/provider';

// 配置加载器导出
export {
  loadConfig,
  loadConfigFromToml,
  getProviderCapabilities,
  findModelsByFormat,
  getFormatRecommendations,
  migrateLegacyConfig,
} from './loader';

// 默认导出
export { default } from './loader';
