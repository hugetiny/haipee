# OpenAI API 格式调研

## 基本信息

| 字段 | 值 |
|------|-----|
| **Provider ID** | `openai` |
| **Provider 名称** | OpenAI |
| **官网** | https://openai.com |
| **API 文档** | https://platform.openai.com/docs/api-reference |
| **注册地址** | https://platform.openai.com |
| **调研日期** | 2026-03-13 |
| **文档版本** | v1.0 |

## 支持的格式类型

```toml
formats = ["openai"]
```

OpenAI 是 OpenAI 格式的定义者和标准实现者，只支持原生 OpenAI 格式。

## 模型级别的格式支持

| 模型 ID | 模型名称 | 支持的格式 | 默认格式 | 备注 |
|---------|----------|-----------|----------|------|
| gpt-4o | GPT-4o | `["openai"]` | `openai` | 旗舰多模态模型 |
| gpt-4o-mini | GPT-4o Mini | `["openai"]` | `openai` | 快速轻量模型 |
| gpt-4-turbo | GPT-4 Turbo | `["openai"]` | `openai` | 高性能模型 |
| gpt-4 | GPT-4 | `["openai"]` | `openai` | 基础 GPT-4 |
| gpt-3.5-turbo | GPT-3.5 Turbo | `["openai"]` | `openai` | 性价比模型 |
| o1 | O1 | `["openai"]` | `openai` | 推理模型 |
| o1-mini | O1 Mini | `["openai"]` | `openai` | 轻量推理模型 |
| o3-mini | O3 Mini | `["openai"]` | `openai` | 最新推理模型 |

## 详细格式说明

### 1. OpenAI 原生格式

**端点：**
```
POST https://api.openai.com/v1/chat/completions
```

**认证：**
```
Authorization: Bearer {OPENAI_API_KEY}
```

**请求体示例：**
```json
{
  "model": "gpt-4o",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ],
  "temperature": 0.7,
  "max_tokens": 1000,
  "top_p": 1.0,
  "frequency_penalty": 0.0,
  "presence_penalty": 0.0,
  "stream": false
}
```

**响应体示例：**
```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "gpt-4o",
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

**这是标准 OpenAI 格式，无需差异说明。**

## 特殊功能支持

| 功能 | 支持情况 | 说明 |
|------|----------|------|
| 流式响应 (Stream) | ✅ | `stream: true`，返回 SSE 格式 |
| 函数调用 (Function Calling) | ✅ | `tools` 参数，支持多函数 |
| 多模态 (Vision) | ✅ | GPT-4o 系列支持图像输入 |
| 系统提示词 (System Prompt) | ✅ | `system` role 支持 |
| JSON 模式 | ✅ | `response_format: { "type": "json_object" }` |
| 种子 (Seed) | ✅ | `seed` 参数用于可复现输出 |

## 认证方式

```
Authorization: Bearer {OPENAI_API_KEY}
```

## 限流与配额

| 模型 | RPM (请求/分钟) | TPM (Token/分钟) |
|------|-----------------|------------------|
| GPT-4o | 500-10,000 | 150K-2M |
| GPT-4o-mini | 500-10,000 | 150K-2M |
| GPT-4 Turbo | 500-10,000 | 150K-2M |
| O1 | 500-10,000 | 150K-2M |

*注：限额根据账户等级和付费 tier 不同而变化*

## SDK 与工具

| 语言 | SDK 地址 |
|------|----------|
| Python | `pip install openai` |
| Node.js | `npm install openai` |
| HTTP | 直接调用 REST API |

## 参考资料

- [OpenAI API 文档](https://platform.openai.com/docs)
- [Chat Completions API](https://platform.openai.com/docs/api-reference/chat)
- [模型列表](https://platform.openai.com/docs/models)

## 更新记录

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-03-13 | 1.0 | 初始调研完成 |
