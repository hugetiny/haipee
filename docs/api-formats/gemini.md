# Google Gemini API 格式调研

## 基本信息

| 字段 | 值 |
|------|-----|
| **Provider ID** | `gemini` |
| **Provider 名称** | Google AI (Gemini) |
| **官网** | https://ai.google.dev |
| **API 文档** | https://ai.google.dev/api |
| **注册地址** | https://aistudio.google.com/app/apikey |
| **调研日期** | 2026-03-13 |
| **文档版本** | v1.0 |

## 支持的格式类型

```toml
formats = ["gemini", "openai"]
```

Google Gemini 支持：
1. **原生 Gemini API** - Google 自研格式
2. **OpenAI 兼容模式** - 通过 Gemini API 的 OpenAI 兼容端点

## 模型级别的格式支持

| 模型 ID | 模型名称 | 支持的格式 | 默认格式 | 备注 |
|---------|----------|-----------|----------|------|
| gemini-2.0-flash | Gemini 2.0 Flash | `["gemini", "openai"]` | `gemini` | 最新快速模型 |
| gemini-1.5-flash | Gemini 1.5 Flash | `["gemini", "openai"]` | `gemini` | 快速轻量模型 |
| gemini-1.5-pro | Gemini 1.5 Pro | `["gemini", "openai"]` | `gemini` | 高性能模型 |
| gemini-1.0-pro | Gemini 1.0 Pro | `["gemini", "openai"]` | `gemini` | 基础模型 |

## 详细格式说明

### 1. Gemini 原生格式

**端点：**
```
POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
```

**认证（Query Param）：**
```
?key={GOOGLE_API_KEY}
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
    "maxOutputTokens": 1000,
    "topP": 0.95,
    "topK": 40
  },
  "systemInstruction": {
    "parts": [{"text": "You are a helpful AI assistant."}]
  }
}
```

**响应体示例：**
```json
{
  "candidates": [{
    "content": {
      "role": "model",
      "parts": [{"text": "Hello! How can I help you today?"}]
    },
    "finishReason": "STOP",
    "safetyRatings": [...]
  }],
  "usageMetadata": {
    "promptTokenCount": 10,
    "candidatesTokenCount": 20,
    "totalTokenCount": 30
  }
}
```

**与 OpenAI 格式的关键差异：**

| 差异点 | OpenAI | Gemini 原生 |
|--------|--------|-------------|
| **端点** | `/v1/chat/completions` | `/v1beta/models/{model}:generateContent` |
| **认证** | Header `Authorization` | Query param `?key=` |
| **消息字段** | `messages` | `contents` |
| **内容字段** | `content` (string) | `parts` (array of objects) |
| **角色** | `system`, `user`, `assistant` | `user`, `model` |
| **系统提示** | `messages[0].role="system"` | `systemInstruction.parts` |
| **配置** | `temperature`, `max_tokens` 等顶层 | `generationConfig` 对象内 |
| **响应内容** | `choices[0].message.content` | `candidates[0].content.parts[0].text` |

### 2. OpenAI 兼容格式

**端点：**
```
POST https://generativelanguage.googleapis.com/v1beta/openai/chat/completions
```

**认证：**
```
Authorization: Bearer {GOOGLE_API_KEY}
```

**说明：**
- Gemini 提供 OpenAI 兼容端点
- 请求/响应格式与 OpenAI 完全一致
- 方便迁移现有 OpenAI 代码

## 特殊功能支持

| 功能 | 支持情况 | 说明 |
|------|----------|------|
| 流式响应 | ✅ | `generateContent` 支持 stream |
| 函数调用 | ✅ | `tools` + `functionDeclarations` |
| 多模态 | ✅ | 原生支持图片、视频、音频 |
| 系统提示 | ✅ | `systemInstruction` 字段 |
| JSON 模式 | ✅ | `responseMimeType: "application/json"` |
| 安全过滤 | ✅ | 内置安全评级 (safetyRatings) |
| 上下文缓存 | ✅ | 缓存大上下文降低成本 |

## 认证方式

### 方式 1: API Key (Query Param) - 原生格式
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}
```

### 方式 2: Bearer Token (Header) - OpenAI 兼容
```
Authorization: Bearer {API_KEY}
```

## 限流与配额

| 等级 | RPM | TPM | RPD |
|------|-----|-----|-----|
| Free | 15 | 1M | 1,500 |
| Pay-as-you-go | 360-2,000 | 4M-10M | 30,000-1,000,000 |

## SDK 与工具

| 语言 | SDK 地址 |
|------|----------|
| Python | `pip install google-generativeai` |
| Node.js | `npm install @google/generative-ai` |
| REST | 直接调用 API |

## 参考资料

- [Gemini API 文档](https://ai.google.dev/api)
- [OpenAI 兼容指南](https://ai.google.dev/gemini-api/docs/openai)
- [模型列表](https://ai.google.dev/gemini-api/docs/models)

## 更新记录

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-03-13 | 1.0 | 初始调研完成 |
