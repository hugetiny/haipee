# Cloudflare Workers AI API 格式调研

## 基本信息

| 字段 | 值 |
|------|-----|
| **Provider ID** | `cloudflare` |
| **Provider 名称** | Cloudflare Workers AI |
| **官网** | https://workers.ai |
| **API 文档** | https://developers.cloudflare.com/workers-ai/models/ |
| **注册地址** | https://dash.cloudflare.com |
| **调研日期** | 2026-03-13 |
| **文档版本** | v1.0 |

## 支持的格式类型

```toml
formats = ["openai"]
```

Cloudflare Workers AI 通过 `ai.run()` 提供 OpenAI 兼容的 REST API。

## 模型级别的格式支持

| 模型 ID | 模型名称 | 支持的格式 | 默认格式 | 备注 |
|---------|----------|-----------|----------|------|
| @cf/meta/llama-3.1-8b-instruct | Llama 3.1 8B | `["openai"]` | `openai` | Meta Llama |
| @cf/meta/llama-3.3-70b-instruct | Llama 3.3 70B | `["openai"]` | `openai` | Meta Llama |
| @cf/mistral/mistral-7b-instruct-v0.2 | Mistral 7B | `["openai"]` | `openai` | Mistral |
| @cf/google/gemma-2b-it | Gemma 2B | `["openai"]` | `openai` | Google Gemma |

## 详细格式说明

### 1. OpenAI 兼容格式

**端点：**
```
POST https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions
```
或
```
POST https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/meta/llama-3.1-8b-instruct
```

**认证：**
```
Authorization: Bearer {CLOUDFLARE_API_TOKEN}
```

**请求体示例：**
```json
{
  "model": "@cf/meta/llama-3.1-8b-instruct",
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
  "id": "xxx",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "@cf/meta/llama-3.1-8b-instruct",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Hello! How can I help you today?"
    },
    "finish_reason": "stop"
  }]
}
```

**与标准 OpenAI 的差异：**
- 需要 `account_id` 在 URL 中
- 模型名使用 Cloudflare 格式如 `@cf/meta/llama-3.1-8b-instruct`
- 响应中可能不包含 `usage` 字段

### 2. 原生 Workers AI 格式

**端点（简化版）：**
```
POST https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/{model_name}
```

**请求体示例：**
```json
{
  "prompt": "What is the capital of France?",
  "temperature": 0.7,
  "max_tokens": 100
}
```

**注意：** 这是 legacy 格式，新代码推荐使用 OpenAI 兼容格式。

## 特殊功能支持

| 功能 | 支持情况 | 说明 |
|------|----------|------|
| 流式响应 | ✅ | 支持 SSE |
| 函数调用 | ❌ | 暂不支持 |
| 多模态 | ✅ | 部分模型支持 |
| 系统提示 | ✅ | 支持 system role |
| AI Gateway | ✅ | 与网关集成 |
| Vectorize | ✅ | 与向量数据库集成 |

## 认证方式

```
Authorization: Bearer {CLOUDFLARE_API_TOKEN}
```

或 Workers 环境中：
```javascript
const response = await env.AI.run(model, input);
```

## 限流与配额

| 等级 | 免费额度 | 付费 |
|------|----------|------|
| 免费 | 每天 10,000 tokens | - |
| 付费 | 无限制 | $0.10-$0.50/百万 tokens |

## SDK 与工具

| 平台 | 方法 |
|------|------|
| Workers | `env.AI.run()` 原生绑定 |
| REST | HTTP API |
| Python | 使用 OpenAI SDK 修改 base_url |

## 参考资料

- [Workers AI 文档](https://developers.cloudflare.com/workers-ai/)
- [模型列表](https://developers.cloudflare.com/workers-ai/models/)

## 更新记录

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-03-13 | 1.0 | 初始调研完成 |
