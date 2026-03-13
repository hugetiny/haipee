# Provider API 格式调研模板

## 基本信息

| 字段 | 值 |
|------|-----|
| **Provider ID** | `provider-id` |
| **Provider 名称** | Provider Name |
| **官网** | https://provider.com |
| **API 文档** | https://docs.provider.com |
| **注册地址** | https://console.provider.com |
| **调研日期** | YYYY-MM-DD |
| **文档版本** | v1.0 |

## 支持的格式类型

```toml
# Provider 默认格式
formats = ["format1", "format2"]
```

## 模型级别的格式支持

| 模型 ID | 模型名称 | 支持的格式 | 默认格式 | 备注 |
|---------|----------|-----------|----------|------|
| model-1 | Model A | `["openai"]` | `openai` | 标准模型 |
| model-2 | Model B | `["openai", "anthropic"]` | `openai` | 多格式支持 |
| model-3 | Model C | `["custom"]` | `custom` | 原生格式 |

## 详细格式说明

### 1. OpenAI 兼容格式

**端点：**
```
POST https://api.provider.com/v1/chat/completions
```

**认证：**
```
Authorization: Bearer {API_KEY}
```

**请求体示例：**
```json
{
  "model": "model-id",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ],
  "temperature": 0.7,
  "max_tokens": 1000,
  "stream": false
}
```

**响应体示例：**
```json
{
  "id": "chatcmpl-xxx",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "model-id",
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
- 差异点 1
- 差异点 2
- `[TODO: 需要验证]`

### 2. Anthropic 兼容格式（如果有）

**端点：**
```
POST https://api.provider.com/v1/messages
```

**关键参数映射：**
| OpenAI 参数 | Anthropic 参数 | 说明 |
|-------------|----------------|------|
| `messages` | `messages` | 相同 |
| `system` | `system` | 相同（独立字段） |
| `max_tokens` | `max_tokens` | 必需 |

**与标准 Anthropic 的差异：**
- 差异点 1
- `[TODO: 需要验证]`

### 3. 原生格式（如果有）

**端点：**
```
POST https://api.provider.com/native/endpoint
```

**请求体示例：**
```json
{
  "custom_param": "value"
}
```

**说明：**
- 原生格式的特殊说明

## 特殊功能支持

| 功能 | 支持情况 | 说明 |
|------|----------|------|
| 流式响应 (Stream) | ✅/❌ | 说明 |
| 函数调用 (Function Calling) | ✅/❌ | 说明 |
| 多模态 (Vision) | ✅/❌ | 说明 |
| 系统提示词 (System Prompt) | ✅/❌ | 说明 |

## 认证方式

### 方式 1: API Key
```
Authorization: Bearer {API_KEY}
```

### 方式 2: 其他方式
```
X-API-Key: {API_KEY}
```

## 限流与配额

| 模型 | RPM (请求/分钟) | TPM (Token/分钟) | 备注 |
|------|-----------------|------------------|------|
| model-1 | 60 | 60,000 | 免费 tier |
| model-2 | 3,500 | 1,000,000 | 付费 tier |

## 错误代码

| 状态码 | 错误码 | 说明 |
|--------|--------|------|
| 400 | `invalid_request_error` | 请求参数错误 |
| 401 | `authentication_error` | 认证失败 |
| 429 | `rate_limit_error` | 限流 |
| 500 | `server_error` | 服务器错误 |

## SDK 与工具

| 语言 | SDK 地址 | 备注 |
|------|----------|------|
| Python | `pip install provider-sdk` | 官方 SDK |
| Node.js | `npm install @provider/sdk` | 官方 SDK |
| HTTP | 直接调用 | REST API |

## 参考资料

- [官方文档](https://docs.provider.com)
- [API 参考](https://docs.provider.com/api-reference)
- [价格页面](https://provider.com/pricing)
- [状态页面](https://status.provider.com)

## 待验证项

- [ ] 实际 API 调用测试
- [ ] 流式响应测试
- [ ] 错误处理验证
- [ ] 模型列表更新

## 更新记录

| 日期 | 版本 | 变更 |
|------|------|------|
| YYYY-MM-DD | 1.0 | 初始调研完成 |
