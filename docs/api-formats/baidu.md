# 百度文心 API 格式调研

## 基本信息

| 字段 | 值 |
|------|-----|
| **Provider ID** | `baidu` |
| **Provider 名称** | 百度千帆/文心 |
| **官网** | https://cloud.baidu.com |
| **API 文档** | https://cloud.baidu.com/doc/WENXINWORKSHOP/s/ |
| **注册地址** | https://console.bce.baidu.com/ai/
| **调研日期** | 2026-03-13 |
| **文档版本** | v1.0 |

## 支持的格式类型

```toml
formats = ["baidu", "openai"]
```

百度千帆支持：
1. **原生百度 API** - 百度自研格式
2. **OpenAI 兼容模式** - 兼容 OpenAI API

## 模型级别的格式支持

| 模型 ID | 模型名称 | 支持的格式 | 默认格式 | 备注 |
|---------|----------|-----------|----------|------|
| ernie-4.0-turbo-8k | 文心 4.0 Turbo | `["baidu", "openai"]` | `baidu` | 最强性能 |
| ernie-3.5-8k | 文心 3.5 | `["baidu", "openai"]` | `baidu` | 平衡选择 |
| ernie-speed-128k | 文心 Speed | `["baidu", "openai"]` | `baidu` | 快速经济 |
| ernie-lite-8k | 文心 Lite | `["baidu", "openai"]` | `baidu` | 轻量模型 |

## 详细格式说明

### 1. 原生百度 API 格式

**端点：**
```
POST https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions
```

**认证：**
```
Authorization: Bearer {BAIDU_ACCESS_TOKEN}
```

**请求体示例：**
```json
{
  "messages": [
    {"role": "user", "content": "你好！"}
  ],
  "temperature": 0.7,
  "top_p": 0.95,
  "penalty_score": 1.0,
  "stream": false,
  "system": "你是一个有帮助的助手。"
}
```

**响应体示例：**
```json
{
  "id": "as-xxxx",
  "object": "chat.completion",
  "created": 1677652288,
  "result": "你好！有什么我可以帮您的吗？",
  "is_truncated": false,
  "need_clear_history": false,
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 20,
    "total_tokens": 30
  }
}
```

**与 OpenAI 格式的关键差异：**

| 差异点 | OpenAI | 百度原生 |
|--------|--------|----------|
| **端点** | `/v1/chat/completions` | `/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions` |
| **认证** | `Authorization: Bearer` | 需要先获取 Access Token |
| **响应内容** | `choices[0].message.content` | `result` (字符串，非对象) |
| **系统提示** | `messages[0].role="system"` | `system` 顶层字段 |
| **特殊字段** | 无 | `is_truncated`, `need_clear_history` |

### 2. OpenAI 兼容格式

**端点：**
```
POST https://qianfan.baidubce.com/v2/chat/completions
```

**说明：**
- 通过千帆平台提供 OpenAI 兼容 API
- 需先在千帆控制台创建应用

## 特殊功能支持

| 功能 | 支持情况 | 说明 |
|------|----------|------|
| 流式响应 | ✅ | 支持 SSE |
| 函数调用 | ✅ | 支持 functions |
| 系统提示 | ✅ | `system` 字段 |
| 插件 | ✅ | 支持文心插件 |
| 联网搜索 | ✅ | 支持 search 插件 |

## 认证方式

### 获取 Access Token
```bash
curl -X POST "https://aip.baidubce.com/oauth/2.0/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id={API_KEY}&client_secret={SECRET_KEY}"
```

### 使用 Token
```
Authorization: Bearer {ACCESS_TOKEN}
```

## SDK 与工具

| 语言 | SDK 地址 |
|------|----------|
| Python | `pip install qianfan` |
| JavaScript | `npm install @baiducloud/sdk` |
| HTTP | 直接调用 REST API |

## 参考资料

- [百度千帆文档](https://cloud.baidu.com/doc/WENXINWORKSHOP/s/)
- [模型列表](https://cloud.baidu.com/doc/WENXINWORKSHOP/s/)

## 更新记录

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-03-13 | 1.0 | 初始调研完成 |
