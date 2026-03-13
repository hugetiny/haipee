# 阿里云灵积 (DashScope) API 格式调研

## 基本信息

| 字段 | 值 |
|------|-----|
| **Provider ID** | `aliyun` |
| **Provider 名称** | 阿里云灵积 |
| **官网** | https://dashscope.aliyun.com |
| **API 文档** | https://help.aliyun.com/document_detail/611472.html |
| **注册地址** | https://dashscope.console.aliyun.com |
| **调研日期** | 2026-03-13 |
| **文档版本** | v1.0 |

## 支持的格式类型

```toml
formats = ["aliyun", "openai"]
```

阿里云灵积支持：
1. **原生 DashScope API** - 阿里云自研格式
2. **OpenAI 兼容模式** - 兼容 `/v1/chat/completions`

## 模型级别的格式支持

| 模型 ID | 模型名称 | 支持的格式 | 默认格式 | 备注 |
|---------|----------|-----------|----------|------|
| qwen-max | 通义千问 Max | `["aliyun", "openai"]` | `aliyun` | 最强性能 |
| qwen-plus | 通义千问 Plus | `["aliyun", "openai"]` | `aliyun` | 平衡选择 |
| qwen-turbo | 通义千问 Turbo | `["aliyun", "openai"]` | `aliyun` | 快速经济 |
| qwen-vl-max | 通义千问 VL Max | `["aliyun", "openai"]` | `aliyun` | 多模态 |

## 详细格式说明

### 1. 原生 DashScope API 格式

**端点：**
```
POST https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation
```

**认证：**
```
Authorization: Bearer {ALIYUN_API_KEY}
```

**请求体示例：**
```json
{
  "model": "qwen-max",
  "input": {
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "你好！"}
    ]
  },
  "parameters": {
    "temperature": 0.7,
    "max_tokens": 1000,
    "top_p": 0.95
  }
}
```

**响应体示例：**
```json
{
  "output": {
    "choices": [{
      "message": {
        "role": "assistant",
        "content": "你好！有什么我可以帮您的吗？"
      },
      "finish_reason": "stop"
    }]
  },
  "usage": {
    "input_tokens": 10,
    "output_tokens": 20,
    "total_tokens": 30
  },
  "request_id": "xxx"
}
```

**与 OpenAI 格式的关键差异：**

| 差异点 | OpenAI | DashScope 原生 |
|--------|--------|----------------|
| **端点** | `/v1/chat/completions` | `/api/v1/services/aigc/text-generation/generation` |
| **消息位置** | `messages` (顶层) | `input.messages` |
| **参数位置** | `temperature`, `max_tokens` 等顶层 | `parameters` 对象内 |
| **响应内容** | `choices[0].message.content` | `output.choices[0].message.content` |
| **请求 ID** | `id` | `request_id` |

### 2. OpenAI 兼容格式

**端点：**
```
POST https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions
```

**说明：**
- 完全兼容 OpenAI API 格式
- 请求/响应与 OpenAI 完全一致
- 方便迁移现有 OpenAI 代码

## 特殊功能支持

| 功能 | 支持情况 | 说明 |
|------|----------|------|
| 流式响应 | ✅ | 支持 SSE |
| 函数调用 | ✅ | 支持 tools |
| 多模态 | ✅ | qwen-vl 系列支持 |
| 系统提示 | ✅ | 支持 system role |
| 联网搜索 | ✅ | 支持 search 插件 |
| 文生图 | ✅ | 部分模型支持 |

## 认证方式

```
Authorization: Bearer {ALIYUN_API_KEY}
```

## 限流与配额

| 模型 | RPM | TPM |
|------|-----|-----|
| qwen-max | 60-500 | 100K-1M |
| qwen-plus | 60-500 | 100K-1M |
| qwen-turbo | 500 | 1M |

## SDK 与工具

| 语言 | SDK 地址 |
|------|----------|
| Python | `pip install dashscope` |
| Java | Maven `dashscope` |
| HTTP | 直接调用 REST API |

## 参考资料

- [DashScope 文档](https://help.aliyun.com/document_detail/611472.html)
- [通义千问模型列表](https://help.aliyun.com/document_detail/2722196.html)

## 更新记录

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-03-13 | 1.0 | 初始调研完成 |
