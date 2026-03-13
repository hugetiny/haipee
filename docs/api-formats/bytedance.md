# 字节跳动火山引擎 (ARK) API 格式调研

## 基本信息

| 字段 | 值 |
|------|-----|
| **Provider ID** | `bytedance` |
| **Provider 名称** | 字节跳动/火山引擎 ARK |
| **官网** | https://www.volcengine.com |
| **API 文档** | https://www.volcengine.com/docs/82379/ |
| **注册地址** | https://console.volcengine.com/ark |
| **调研日期** | 2026-03-13 |
| **文档版本** | v1.0 |

## 支持的格式类型

```toml
formats = ["bytedance", "openai"]
```

字节火山引擎 ARK 主要使用 OpenAI 兼容格式。

## 模型级别的格式支持

| 模型 ID | 模型名称 | 支持的格式 | 默认格式 | 备注 |
|---------|----------|-----------|----------|------|
| doubao-pro-128k | 豆包 Pro | `["openai"]` | `openai` | 专业版 |
| doubao-lite-128k | 豆包 Lite | `["openai"]` | `openai` | 轻量版 |
| deepseek-r1 | DeepSeek R1 | `["openai"]` | `openai` | 推理模型 |
| deepseek-v3 | DeepSeek V3 | `["openai"]` | `openai` | DeepSeek |

## 详细格式说明

### 1. OpenAI 兼容格式

**端点：**
```
POST https://ark.cn-beijing.volces.com/api/v3/chat/completions
```

**认证：**
```
Authorization: Bearer {ARK_API_KEY}
```

**请求体示例：**
```json
{
  "model": "doubao-pro-128k",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "你好！"}
  ],
  "temperature": 0.7,
  "max_tokens": 1000
}
```

**响应体示例：**
```json
{
  "id": "021xxx",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "doubao-pro-128k",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "你好！有什么我可以帮您的吗？"
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

| 差异点 | OpenAI | 字节 ARK |
|--------|--------|----------|
| **端点** | `api.openai.com` | `ark.cn-beijing.volces.com` |
| **模型名** | `gpt-4` 等 | 需使用 Ark 模型端点 ID |
| **地区** | 全球 | 中国大陆为主 |

### 2. 原生格式说明

ARK 主要基于 OpenAI 兼容格式，没有显著的原生差异格式。

## 特殊功能支持

| 功能 | 支持情况 | 说明 |
|------|----------|------|
| 流式响应 | ✅ | 支持 SSE |
| 函数调用 | ✅ | 支持 tools |
| 系统提示 | ✅ | 支持 system role |
| 上下文缓存 | ✅ | 支持 Prompt Cache |
| 批处理 | ✅ | 支持 Batch API |

## 认证方式

```
Authorization: Bearer {ARK_API_KEY}
```

**注意：** 需要在火山引擎控制台创建 ARK API Key。

## 限流与配额

| 等级 | RPM | TPM |
|------|-----|-----|
| 免费试用 | 5-10 | 50K |
| 按量付费 | 100-10,000 | 100K-10M |

## SDK 与工具

| 语言 | SDK 地址 |
|------|----------|
| Python | `pip install volcengine-python-sdk` |
| Node.js | `npm install @volcengine/openapi` |
| HTTP | 直接调用 REST API |

## 参考资料

- [火山引擎 ARK 文档](https://www.volcengine.com/docs/82379/)
- [模型列表](https://www.volcengine.com/docs/82379/1311153)

## 更新记录

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-03-13 | 1.0 | 初始调研完成 |
