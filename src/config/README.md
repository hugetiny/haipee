# Provider Configuration 模块

> Phase 3 实现文档 - 数据结构调整

## 核心特性

### 1. 数组格式支持

**设计变更：**
- 旧版：`format = "openai"` (字符串)
- 新版：`formats = ["openai", "anthropic", "gemini"]` (数组)

**关键场景：OpenCode Zen 系列**

| 模型 | 支持格式 | 说明 |
|------|----------|------|
| zen-4k | `["openai", "anthropic", "gemini", "opencode-zen"]` | 4种格式全支持 |
| zen-32k | `["openai", "anthropic"]` | 仅支持2种格式 ⚠️ |
| zen-128k | `["openai", "anthropic", "gemini", "opencode-zen"]` | 4种格式全支持 |

### 2. 文件结构

```
src/config/
├── providers.toml    # Provider 配置（11个Provider，30+模型）
├── loader.ts         # TOML 加载器和验证器
├── index.ts          # 模块导出
└── README.md         # 本文档
```

### 3. TOML 配置示例

```toml
[providers.opencode]
id = "opencode"
name = "OpenCode"
formats = ["openai", "anthropic", "gemini", "opencode-zen"]
default_format = "opencode-zen"

  # zen-32k: 仅支持2种格式
  [[providers.opencode.models]]
  id = "zen-32k"
  name = "Zen 32K"
  formats = ["openai", "anthropic"]
  default_format = "openai"

  # zen-4k: 4种格式全支持
  [[providers.opencode.models]]
  id = "zen-4k"
  name = "Zen 4K"
  formats = ["openai", "anthropic", "gemini", "opencode-zen"]
  default_format = "opencode-zen"
```

### 4. 向后兼容

`loader.ts` 自动处理旧版配置：

```typescript
// 旧格式自动转换为数组
"openai" → ["openai"]

// 支持混合使用
formats = ["openai"]        // 新格式
format = "anthropic"        // 旧格式（自动转换）
```

### 5. API 使用

```typescript
import { loadConfig, getFormatRecommendations } from '@/config';

// 加载配置
const config = await loadConfig();

// 获取格式建议
const recommendations = getFormatRecommendations(
  config.providers.opencode,
  config.providers.opencode.models[0]
);
// → [{ format: "openai", reason: "最通用格式..." }, ...]

// 获取有效格式
import { getEffectiveFormats } from '@/types/provider';
const formats = getEffectiveFormats(model, provider);
```

## 类型定义

```typescript
// Provider 级别格式
interface ProviderDefinition {
  formats: ApiFormat[];        // 支持的格式列表
  default_format: ApiFormat;   // 默认格式
}

// Model 级别格式（可覆盖 Provider）
interface ModelDefinition {
  formats?: ApiFormat[];       // 可选，继承 Provider
  default_format?: ApiFormat;  // 可选，继承 Provider
}
```

## 9种 API 格式

| 格式 | 端点 | 认证 |
|------|------|------|
| `openai` | `/v1/chat/completions` | Bearer |
| `anthropic` | `/v1/messages` | x-api-key |
| `gemini` | `/v1beta/models/{model}:generateContent` | Query Param |
| `azure` | `/openai/deployments/{id}/chat/completions` | api-key |
| `aliyun` | `/api/v1/services/aigc/text-generation/generation` | Bearer |
| `baidu` | `/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions` | Bearer |
| `bytedance` | `/api/v3/chat/completions` | Bearer |
| `opencode-zen` | `/v2/zen/generate` | Bearer |
| `custom` | `/` | 自定义 |

## 测试

```bash
# 构建验证
npm run build

# 类型检查
npx tsc --noEmit
```
