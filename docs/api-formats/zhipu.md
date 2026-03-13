# 智谱 AI (ChatGLM) API 格式调研

## 基本信息

| 字段 | 值 |
|------|-----|
| **Provider ID** | `zhipu` |
| **Provider 名称** | 智谱 AI (ChatGLM) |
| **官网** | https://www.zhipuai.cn |
| **API 文档** | https://open.bigmodel.cn/dev/api |
| **注册地址** | https://open.bigmodel.cn |
| **调研日期** | 2026-03-13 |
| **文档版本** | v1.0 |

## 支持的格式类型

```toml
formats = ["openai"]
```

智谱 AI 主要使用 OpenAI 兼容格式。

## 模型级别的格式支持

| 模型 ID | 模型名称 | 支持的格式 | 默认格式 | 备注 |
|---------|----------|-----------|----------|------|
| glm-4-plus | GLM-4 Plus | `["openai"]` | `openai` | 最强性能 |
| glm-4 | GLM-4 | `["openai"]` | `openai` | 标准版 |
| glm-4-air | GLM-4 Air | `["openai"]` | `openai` | 快速版 |
| glm-4-flash | GLM-4 Flash | `["openai"]` | `openai` | 免费版 |
| glm-4v | GLM-4V | `["openai"]` | `openai` | 多模态 |

## 详细格式说明

### 1. OpenAI 兼容格式

**端点：**
```
POST https://open.bigmodel.cn/api/paas/v4/chat/completions
```

**认证：**
```
Authorization: Bearer {ZHIPU_API_KEY}
```

**请求体示例：**
```json
{
  "model": "glm-4",
  "messages": [
    {"role": "system", "content": "你是一个有帮助的 AI 助手。"},
    {"role": "user", "content": "你好！"}
  ],
  "temperature": 0.7,
  "max_tokens": 1000,
  "top_p": 0.95
}
```

**响应体示例：**
```json
{
  "id": "xxx",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "glm-4",
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

| 差异点 | OpenAI | 智谱 AI |
|--------|--------|---------|
| **端点** | `api.openai.com` | `open.bigmodel.cn/api/paas/v4` |
| **模型名** | `gpt-4` 等 | `glm-4`, `glm-4-plus` 等 |

### 2. 原生 SDK 格式

智谱提供 Python SDK，底层仍是 OpenAI 兼容格式。

## 特殊功能支持

| 功能 | 支持情况 | 说明 |
|------|----------|------|
| 流式响应 | ✅ | 支持 SSE |
| 函数调用 | ✅ | 支持 tools |
| 多模态 | ✅ | GLM-4V 支持图像 |
| 系统提示 | ✅ | 支持 system role |
| 联网搜索 | ✅ | 支持 Web Search |
| 代码解释器 | ✅ | 支持 Code Interpreter |

## 认证方式

```
Authorization: Bearer {ZHIPU_API_KEY}
```

## 限流与配额

| 等级 | RPM | TPM | 免费额度 |
|------|-----|-----|----------|
| 免费版 | 10-100 | 10K-100K | 有 |
| 付费版 | 100-10,000 | 100K-10M | 无限制 |

## SDK 与工具

| 语言 | SDK 地址 |
|------|----------|
| Python | `pip install zhipuai` |
| HTTP | 直接调用 REST API |

## 参考资料

- [智谱 AI 开放平台](https://open.bigmodel.cn)
- [API 文档](https://open.bigmodel.cn/dev/api)
- [模型列表](https://open.bigmodel.cn/modelcenter/square)

## 更新记录

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-03-13 | 1.0 | 初始调研完成 |
