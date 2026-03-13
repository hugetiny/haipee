# API 格式标准定义

> 本文档定义 Haipee AI 支持的 API 格式类型标准。

## 格式类型枚举

| 格式 ID | 名称 | 描述 | 端点示例 |
|---------|------|------|----------|
| `openai` | OpenAI 标准 | /v1/chat/completions 标准格式 | `POST /v1/chat/completions` |
| `anthropic` | Anthropic Messages | Claude Messages API 格式 | `POST /v1/messages` |
| `gemini` | Google Gemini | Gemini 原生 API 格式 | `POST /v1beta/models/{model}:generateContent` |
| `azure` | Azure OpenAI | Azure OpenAI Service 格式 | `POST /openai/deployments/{deployment}/chat/completions` |
| `aliyun` | 阿里云灵积 | DashScope API 格式 | `POST /api/v1/services/aigc/text-generation/generation` |
| `baidu` | 百度文心 | 千帆/文心 API 格式 | `POST /rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions` |
| `bytedance` | 字节豆包 | 火山引擎 ARK API | `POST /api/v3/chat/completions` |
| `opencode-zen` | OpenCode Zen | OpenCode Zen 系列特有格式 | 多格式支持 |
| `cohere` | Cohere | Cohere Chat API | `POST /v1/chat` |
| `custom` | 厂商专有 | 其他非标准格式 | 各厂商自定义 |

## 格式特征对比

### OpenAI 标准格式 (`openai`)

**请求体结构：**
```json
{
  "model": "gpt-4",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ],
  "temperature": 0.7,
  "max_tokens": 1000,
  "stream": false
}
```

**响应体结构：**
```json
{
  "id": "chatcmpl-xxx",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "gpt-4",
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

**认证方式：**
```
Authorization: Bearer {API_KEY}
```

### Anthropic Messages 格式 (`anthropic`)

**请求体结构：**
```json
{
  "model": "claude-3-sonnet-20240229",
  "max_tokens": 1024,
  "messages": [
    {"role": "user", "content": "Hello, Claude!"}
  ],
  "system": "You are a helpful AI assistant."
}
```

**关键差异：**
- `system` 是独立字段，不在 messages 数组中
- 必须提供 `max_tokens`
- 角色只有 `user` 和 `assistant`

### Gemini 原生格式 (`gemini`)

**请求体结构：**
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

**关键差异：**
- 使用 `contents` 而非 `messages`
- 内容在 `parts` 数组中
- 配置在 `generationConfig` 中

## Provider 格式支持矩阵

| Provider | 支持格式 | 默认格式 | 备注 |
|----------|----------|----------|------|
| OpenAI | `["openai"]` | `openai` | 原生标准 |
| Anthropic | `["anthropic"]` | `anthropic` | 原生标准 |
| Google | `["gemini", "openai"]` | `gemini` | Gemini 提供 OpenAI 兼容层 |
| Azure | `["azure", "openai"]` | `azure` | Azure OpenAI 服务 |
| OpenCode | `["openai", "anthropic", "gemini", "opencode-zen"]` | `openai` | Zen 系列多格式支持 |
| 阿里云 | `["aliyun", "openai"]` | `aliyun` | DashScope 提供兼容层 |
| 百度 | `["baidu", "openai"]` | `baidu` | 千帆提供兼容层 |
| 字节 | `["bytedance", "openai"]` | `bytedance` | ARK 提供兼容层 |

## 更新记录

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-03-13 | 1.0 | 初始版本，定义 10 种格式标准 |
