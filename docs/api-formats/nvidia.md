# Nvidia NIM API 格式调研

## 基本信息

| 字段 | 值 |
|------|-----|
| **Provider ID** | `nvidia` |
| **Provider 名称** | Nvidia NIM (Nvidia Inference Microservices) |
| **官网** | https://www.nvidia.com/en-us/ai/ |
| **API 文档** | https://docs.nvidia.com/nim/ |
| **注册地址** | https://build.nvidia.com/explore/discover |
| **调研日期** | 2026-03-13 |
| **文档版本** | v1.0 |

## 支持的格式类型

```toml
formats = ["openai"]
```

Nvidia NIM 提供 OpenAI 兼容的 API 格式。

## 模型级别的格式支持

| 模型 ID | 模型名称 | 支持的格式 | 默认格式 | 备注 |
|---------|----------|-----------|----------|------|
| meta/llama-3.1-8b-instruct | Llama 3.1 8B | `["openai"]` | `openai` | Meta 模型 |
| meta/llama-3.3-70b-instruct | Llama 3.3 70B | `["openai"]` | `openai` | Meta 模型 |
| mistralai/mistral-7b-instruct | Mistral 7B | `["openai"]` | `openai` | Mistral 模型 |
| google/gemma-2-9b-it | Gemma 2 9B | `["openai"]` | `openai` | Google 模型 |

## 详细格式说明

### 1. OpenAI 兼容格式

**端点：**
```
POST https://integrate.api.nvidia.com/v1/chat/completions
```

**认证：**
```
Authorization: Bearer {NVIDIA_API_KEY}
```

**请求体示例：**
```json
{
  "model": "meta/llama-3.1-8b-instruct",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ],
  "temperature": 0.7,
  "max_tokens": 1000,
  "top_p": 0.95,
  "stream": false
}
```

**响应体示例：**
```json
{
  "id": "chatcmpl-xxx",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "meta/llama-3.1-8b-instruct",
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
- 端点使用 `integrate.api.nvidia.com`
- 模型名包含命名空间如 `meta/llama-3.1-8b-instruct`
- 支持多种开源模型（Meta、Mistral、Google 等）

## 特殊功能支持

| 功能 | 支持情况 | 说明 |
|------|----------|------|
| 流式响应 | ✅ | 支持 SSE |
| 函数调用 | ✅ | 支持 tools（部分模型） |
| 多模态 | ❌ | 主要支持文本 |
| 系统提示 | ✅ | 支持 system role |
| 自托管 | ✅ | NIM 支持本地/私有云部署 |
| GPU 优化 | ✅ | 针对 Nvidia GPU 优化推理 |

## 认证方式

```
Authorization: Bearer {NVIDIA_API_KEY}
```

## 限流与配额

| 等级 | RPM | TPM | 免费额度 |
|------|-----|-----|----------|
| 免费层 | 20 | 40,000 | 1000 API 调用 |
| 开发者 | 100-1000 | 100K-1M | 按需付费 |

## SDK 与工具

| 语言 | SDK 地址 |
|------|----------|
| Python | `pip install openai` (使用 Nvidia 端点) |
| JavaScript | 使用 OpenAI SDK |
| HTTP | 直接调用 REST API |

## 参考资料

- [Nvidia NIM 文档](https://docs.nvidia.com/nim/)
- [Build Nvidia 模型列表](https://build.nvidia.com/explore/discover)

## 更新记录

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-03-13 | 1.0 | 初始调研完成 |
