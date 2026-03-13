# Anthropic API 格式调研

## 基本信息

| 字段 | 值 |
|------|-----|
| **Provider ID** | `anthropic` |
| **Provider 名称** | Anthropic (Claude) |
| **官网** | https://anthropic.com |
| **API 文档** | https://docs.anthropic.com/en/api |
| **注册地址** | https://console.anthropic.com |
| **调研日期** | 2026-03-13 |
| **文档版本** | v1.0 |

## 支持的格式类型

```toml
formats = ["anthropic"]
```

Anthropic 使用自研的 Messages API 格式，与 OpenAI 格式有明显差异。

## 模型级别的格式支持

| 模型 ID | 模型名称 | 支持的格式 | 默认格式 | 备注 |
|---------|----------|-----------|----------|------|
| claude-3-5-sonnet-20241022 | Claude 3.5 Sonnet | `["anthropic"]` | `anthropic` | 最新最强模型 |
| claude-3-5-haiku-20241022 | Claude 3.5 Haiku | `["anthropic"]` | `anthropic` | 快速轻量模型 |
| claude-3-opus-20240229 | Claude 3 Opus | `["anthropic"]` | `anthropic` | 高性能模型 |
| claude-3-sonnet-20240229 | Claude 3 Sonnet | `["anthropic"]` | `anthropic` | 平衡型模型 |
| claude-3-haiku-20240307 | Claude 3 Haiku | `["anthropic"]` | `anthropic` | 低成本模型 |

## 详细格式说明

### 1. Anthropic Messages API 格式

**端点：**
```
POST https://api.anthropic.com/v1/messages
```

**认证：**
```
x-api-key: {ANTHROPIC_API_KEY}
anthropic-version: 2023-06-01
```

**请求体示例：**
```json
{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 1024,
  "messages": [
    {"role": "user", "content": "Hello, Claude!"}
  ],
  "system": "You are a helpful AI assistant."
}
```

**响应体示例：**
```json
{
  "id": "msg_01Xxxxxx",
  "type": "message",
  "role": "assistant",
  "model": "claude-3-5-sonnet-20241022",
  "content": [
    {
      "type": "text",
      "text": "Hello! How can I help you today?"
    }
  ],
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "usage": {
    "input_tokens": 12,
    "output_tokens": 20
  }
}
```

**与 OpenAI 格式的关键差异：**

| 差异点 | OpenAI | Anthropic |
|--------|--------|-----------|
| **端点** | `/v1/chat/completions` | `/v1/messages` |
| **认证头** | `Authorization: Bearer` | `x-api-key` + `anthropic-version` |
| **System Prompt** | `messages` 中 role="system" | 独立 `system` 字段 |
| **必需参数** | `model`, `messages` | `model`, `max_tokens`, `messages` |
| **响应角色** | `choices[0].message.role` | `role` (顶层) |
| **响应内容** | `choices[0].message.content` | `content[0].text` (数组) |
| **Token 计数** | `usage.prompt_tokens/completion_tokens` | `usage.input_tokens/output_tokens` |
| **Stop Reason** | `finish_reason` | `stop_reason` |

### 2. 工具调用 (Tool Use / Function Calling)

Anthropic 支持工具调用，但格式与 OpenAI 略有不同：

**请求：**
```json
{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 1024,
  "messages": [{"role": "user", "content": "What's the weather?"}],
  "tools": [
    {
      "name": "get_weather",
      "description": "Get weather information",
      "input_schema": {
        "type": "object",
        "properties": {
          "location": {"type": "string"}
        }
      }
    }
  ]
}
```

**差异：**
- OpenAI 使用 `parameters`，Anthropic 使用 `input_schema`
- 响应中工具调用结果通过 `tool_result` 类型返回

## 特殊功能支持

| 功能 | 支持情况 | 说明 |
|------|----------|------|
| 流式响应 (Stream) | ✅ | `stream: true`，返回 SSE 格式 |
| 工具调用 (Tool Use) | ✅ | `tools` 参数 |
| 多模态 (Vision) | ✅ | Claude 3 系列支持图像输入 |
| 系统提示词 (System Prompt) | ✅ | 独立 `system` 字段 |
| Computer Use | ✅ | 计算机操作能力 (3.5 Sonnet) |
| Prompt Caching | ✅ | 提示词缓存，减少 Token 消耗 |
| Batch API | ✅ | 批量处理 API |

## 认证方式

```
x-api-key: {ANTHROPIC_API_KEY}
anthropic-version: 2023-06-01
Content-Type: application/json
```

**注意：** Anthropic 要求显式设置 `anthropic-version` header。

## 限流与配额

| 等级 | RPM (请求/分钟) | TPM (Token/分钟) |
|------|-----------------|------------------|
| Free | 5 | 25,000 |
| Build | 50 | 50,000 |
| Scale | 2000 | 200,000 |
| Enterprise | 4000+ | 400,000+ |

## SDK 与工具

| 语言 | SDK 地址 |
|------|----------|
| Python | `pip install anthropic` |
| Node.js/TypeScript | `npm install @anthropic-ai/sdk` |
| HTTP | 直接调用 REST API |

## 参考资料

- [Anthropic API 文档](https://docs.anthropic.com/en/api)
- [Messages API](https://docs.anthropic.com/en/api/messages)
- [模型列表](https://docs.anthropic.com/en/docs/about-claude/models)
- [工具使用指南](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)

## 更新记录

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-03-13 | 1.0 | 初始调研完成 |
