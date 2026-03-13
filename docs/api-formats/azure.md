# Azure OpenAI API 格式调研

## 基本信息

| 字段 | 值 |
|------|-----|
| **Provider ID** | `azure` |
| **Provider 名称** | Azure OpenAI Service |
| **官网** | https://azure.microsoft.com/en-us/products/ai-services/openai-service |
| **API 文档** | https://learn.microsoft.com/en-us/azure/ai-services/openai/reference |
| **注册地址** | https://portal.azure.com |
| **调研日期** | 2026-03-13 |
| **文档版本** | v1.0 |

## 支持的格式类型

```toml
formats = ["azure", "openai"]
```

Azure OpenAI 主要基于 OpenAI 格式，但有 Azure 特定的扩展。

## 模型级别的格式支持

| 模型 ID | 模型名称 | 支持的格式 | 默认格式 | 备注 |
|---------|----------|-----------|----------|------|
| gpt-4o | GPT-4o | `["azure", "openai"]` | `azure` | 全球部署 |
| gpt-4 | GPT-4 | `["azure", "openai"]` | `azure` | 全球部署 |
| gpt-35-turbo | GPT-3.5 Turbo | `["azure", "openai"]` | `azure` | 全球部署 |
| o1 | O1 | `["azure", "openai"]` | `azure` | 推理模型 |

## 详细格式说明

### 1. Azure OpenAI 格式

**端点：**
```
POST https://{your-resource-name}.openai.azure.com/openai/deployments/{deployment-id}/chat/completions?api-version=2024-10-21
```

**认证：**
```
api-key: {AZURE_OPENAI_API_KEY}
```
或
```
Authorization: Bearer {AZURE_OPENAI_TOKEN}
```

**请求体示例：**
```json
{
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ],
  "temperature": 0.7,
  "max_tokens": 1000,
  "top_p": 1.0,
  "frequency_penalty": 0.0,
  "presence_penalty": 0.0
}
```

**与 OpenAI 格式的关键差异：**

| 差异点 | OpenAI | Azure OpenAI |
|--------|--------|--------------|
| **端点结构** | `/v1/chat/completions` | `/openai/deployments/{deployment-id}/chat/completions` |
| **API 版本** | 无（内置） | 必需 `?api-version=YYYY-MM-DD` |
| **认证** | `Authorization: Bearer` | `api-key` header 或 Azure AD |
| **部署** | 直接使用模型名 | 需要先在 Azure 创建 Deployment |
| **资源名** | 无 | 需要 `{your-resource-name}` |

### 2. OpenAI 兼容模式

Azure 也支持通过 Azure AI Studio 使用标准 OpenAI 客户端调用。

## 特殊功能支持

| 功能 | 支持情况 | 说明 |
|------|----------|------|
| 流式响应 | ✅ | 支持 SSE |
| 函数调用 | ✅ | 支持 tools/functions |
| 多模态 | ✅ | GPT-4o 支持 vision |
| 系统提示 | ✅ | 支持 system role |
| 数据驻留 | ✅ | 可配置部署区域 |
| 私有网络 | ✅ | 支持 VNet 集成 |
| 内容过滤 | ✅ | 集成 Azure Content Safety |

## 认证方式

### API Key
```
api-key: {AZURE_OPENAI_API_KEY}
```

### Azure Active Directory (推荐生产环境)
```
Authorization: Bearer {AAD_TOKEN}
```

## 限流与配额

| 层级 | RPM | TPM |
|------|-----|-----|
| 免费 (F0) | 6 | 1,000 |
| 标准 (S0) | 240-2400 | 240K-2.4M |
| 高级 | 按需定制 | 按需定制 |

*注：配额根据部署 tier 和区域不同*

## SDK 与工具

| 语言 | SDK 地址 |
|------|----------|
| Python | `pip install openai` (使用 Azure 端点) |
| Node.js | `npm install openai` (使用 Azure 端点) |
| .NET | `Azure.AI.OpenAI` NuGet |

## 参考资料

- [Azure OpenAI 文档](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [API 参考](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference)
- [部署模型指南](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource)

## 更新记录

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-03-13 | 1.0 | 初始调研完成 |
