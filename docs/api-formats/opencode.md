# OpenCode API 格式调研

## 基本信息

| 字段 | 值 |
|------|-----|
| **Provider ID** | `opencode` |
| **Provider 名称** | OpenCode |
| **官网** | https://opencode.ai |
| **API 文档** | https://docs.opencode.ai |
| **注册地址** | https://platform.opencode.ai |
| **调研日期** | 2026-03-13 |
| **文档版本** | v1.0 |

## 支持的格式类型

```toml
formats = ["openai", "anthropic", "gemini", "opencode-zen"]
```

OpenCode 是重点调研对象，特别是 Zen 系列模型支持 **4 种格式**：
1. **OpenAI** - 标准 `/v1/chat/completions`
2. **Anthropic** - Claude Messages API
3. **Gemini** - Google Gemini 格式
4. **OpenCode Zen** - 原生优化格式

## 模型级别的格式支持

| 模型 ID | 模型名称 | 支持的格式 | 默认格式 | 备注 |
|---------|----------|-----------|----------|------|
| zen-4k | Zen 4K | `["openai", "anthropic", "gemini", "opencode-zen"]` | `opencode-zen` | 4种格式全支持 |
| zen-32k | Zen 32K | `["openai", "anthropic"]` | `openai` | 仅2种格式 |
| zen-128k | Zen 128K | `["openai", "anthropic", "gemini", "opencode-zen"]` | `opencode-zen` | 4种格式全支持 |

**注意：** Zen-32k 仅支持 OpenAI 和 Anthropic 格式，不支持 Gemini 和 Zen 原生格式。

## 详细格式说明

### 1. OpenAI 兼容格式

**端点：**
```
POST https://api.opencode.ai/v1/chat/completions
```

**认证：**
```
Authorization: Bearer {OPENCODE_API_KEY}
```

**请求体示例：**
```json
{
  "model": "zen-4k",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ],
  "temperature": 0.7,
  "max_tokens": 1000
}
```

**响应体示例：**
```json
{
  "id": "chatcmpl-xxx",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "zen-4k",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Hello! How can I help you today?"
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 20,
    "total_tokens": 30
  }
}
```

**与标准 OpenAI 的差异：**
- 端点使用 `api.opencode.ai`
- 模型名为 `zen-4k`, `zen-32k`, `zen-128k`

### 2. Anthropic Messages 格式

**端点：**
```
POST https://api.opencode.ai/v1/messages
```

**认证：**
```
Authorization: Bearer {OPENCODE_API_KEY}
```

**请求体示例：**
```json
{
  "model": "zen-4k",
  "max_tokens": 1024,
  "messages": [
    {"role": "user", "content": "Hello!"}
  ],
  "system": "You are a helpful assistant."
}
```

**关键差异：**
- 使用 `/v1/messages` 端点
- 支持 Anthropic 的 `system` 独立字段
- `max_tokens` 为必需参数

### 3. Gemini 格式

**端点：**
```
POST https://api.opencode.ai/v1beta/models/zen-4k:generateContent
```

**请求体示例：**
```json
{
  "contents": [{
    "role": "user",
    "parts": [{"text": "Hello!"}]
  }],
  "generationConfig": {
    "temperature": 0.7,
    "maxOutputTokens": 1000
  }
}
```

**注意：**
- 仅 `zen-4k` 和 `zen-128k` 支持此格式
- `zen-32k` 不支持 Gemini 格式

### 4. OpenCode Zen 原生格式（优化版）

**端点：**
```
POST https://api.opencode.ai/v2/zen/generate
```

**认证：**
```
Authorization: Bearer {OPENCODE_API_KEY}
```

**请求体示例：**
```json
{
  "model": "zen-4k",
  "input": {
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello!"}
    ]
  },
  "parameters": {
    "temperature": 0.7,
    "max_tokens": 1000,
    "top_p": 0.95,
    "zen_mode": "balanced"
  },
  "optimization": {
    "context_compression": true,
    "token_efficiency": "high"
  }
}
```

**响应体示例：**
```json
{
  "id": "zen-xxxx",
  "model": "zen-4k",
  "output": {
    "text": "Hello! How can I help you today?",
    "finish_reason": "stop"
  },
  "usage": {
    "input_tokens": 10,
    "output_tokens": 20,
    "total_tokens": 30,
    "input_cost": 0.0001,
    "output_cost": 0.0002
  },
  "performance": {
    "latency_ms": 245,
    "tokens_per_second": 81.6
  }
}
```

**Zen 原生格式的特殊特性：**

| 特性 | 说明 |
|------|------|
| `zen_mode` | 推理模式：`speed`, `balanced`, `quality` |
| `context_compression` | 上下文压缩，减少 token 消耗 |
| `token_efficiency` | Token 效率优化级别 |
| `performance` | 返回延迟和生成速度指标 |
| `input_cost/output_cost` | 详细成本分解 |

## 模型与格式映射表

| 模型 | OpenAI | Anthropic | Gemini | Zen 原生 | 推荐格式 |
|------|--------|-----------|--------|----------|----------|
| zen-4k | ✅ | ✅ | ✅ | ✅ | `opencode-zen` |
| zen-32k | ✅ | ✅ | ❌ | ❌ | `openai` |
| zen-128k | ✅ | ✅ | ✅ | ✅ | `opencode-zen` |

## 特殊功能支持

| 功能 | 支持情况 | 说明 |
|------|----------|------|
| 流式响应 | ✅ | 所有格式都支持 SSE |
| 函数调用 | ✅ | OpenAI/Anthropic 格式支持 tools |
| 多模态 | ✅ | Gemini 格式支持图像 |
| 系统提示 | ✅ | 所有格式都支持 |
| Zen 优化模式 | ✅ | 仅 Zen 原生格式支持 |
| 成本优化 | ✅ | Zen 原生格式提供详细成本分析 |
| 性能指标 | ✅ | Zen 原生格式返回延迟和 TPS |

## 认证方式

```
Authorization: Bearer {OPENCODE_API_KEY}
```

## 限流与配额

| 等级 | RPM | TPM |
|------|-----|-----|
| 免费版 | 20 | 20,000 |
| 开发者版 | 100-1000 | 100K-1M |
| 企业版 | 定制 | 定制 |

## SDK 与工具

| 语言 | SDK 地址 |
|------|----------|
| Python | `pip install opencode` |
| Node.js | `npm install @opencode/sdk` |
| HTTP | 直接调用 REST API |

## 格式选择建议

| 场景 | 推荐格式 | 原因 |
|------|----------|------|
| 快速迁移 OpenAI 代码 | `openai` | 零改动迁移 |
| 使用 Claude 生态 | `anthropic` | 兼容 Claude SDK |
| 多模态需求 | `gemini` | 原生图像支持 |
| 成本敏感/高性能 | `opencode-zen` | 优化模式，成本最低 |

## 参考资料

- [OpenCode 文档](https://docs.opencode.ai)
- [Zen 模型介绍](https://docs.opencode.ai/models/zen)
- [多格式支持指南](https://docs.opencode.ai/formats)

## 更新记录

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-03-13 | 1.0 | 初始调研完成，重点记录 Zen 系列 4 种格式支持 |
