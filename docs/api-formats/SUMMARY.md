# API 格式支持汇总表

> 本文档汇总所有 AI Provider 的 API 格式支持情况。

> 最后更新：2026-03-13

## 按 Provider 汇总

### Tier 1 - 国际核心厂商

| Provider | 支持格式 | 默认格式 | 文档 |
|----------|----------|----------|------|
| **OpenAI** | `["openai"]` | `openai` | [openai.md](./openai.md) |
| **Anthropic** | `["anthropic"]` | `anthropic` | [anthropic.md](./anthropic.md) |
| **Google Gemini** | `["gemini", "openai"]` | `gemini` | [gemini.md](./gemini.md) |
| **Azure OpenAI** | `["azure", "openai"]` | `azure` | [azure.md](./azure.md) |

### Tier 2 - 国内主要厂商

| Provider | 支持格式 | 默认格式 | 文档 |
|----------|----------|----------|------|
| **阿里云灵积** | `["aliyun", "openai"]` | `aliyun` | [aliyun.md](./aliyun.md) |
| **百度文心** | `["baidu", "openai"]` | `baidu` | [baidu.md](./baidu.md) |
| **字节跳动** | `["bytedance", "openai"]` | `bytedance` | [bytedance.md](./bytedance.md) |
| **智谱 AI** | `["openai"]` | `openai` | [zhipu.md](./zhipu.md) |

### Tier 3 - 第三方聚合平台

| Provider | 支持格式 | 默认格式 | 文档 |
|----------|----------|----------|------|
| **OpenCode** | `["openai", "anthropic", "gemini", "opencode-zen"]` | `opencode-zen` | [opencode.md](./opencode.md) |
| **Cloudflare** | `["openai"]` | `openai` | [cloudflare.md](./cloudflare.md) |
| **Nvidia NIM** | `["openai"]` | `openai` | [nvidia.md](./nvidia.md) |

---

## 按 Model 汇总

### OpenCode Zen 系列（重点）

| Model | 支持格式 | 默认 | 备注 |
|-------|----------|------|------|
| **zen-4k** | `["openai", "anthropic", "gemini", "opencode-zen"]` | `opencode-zen` | 4种格式全支持 |
| **zen-32k** | `["openai", "anthropic"]` | `openai` | 仅支持2种格式 ⚠️ |
| **zen-128k** | `["openai", "anthropic", "gemini", "opencode-zen"]` | `opencode-zen` | 4种格式全支持 |

**注意：** Zen-32k 不支持 Gemini 和 Zen 原生格式，仅支持 OpenAI 和 Anthropic 格式。

### 阿里云通义千问

| Model | 支持格式 | 默认 |
|-------|----------|------|
| qwen-max | `["aliyun", "openai"]` | `aliyun` |
| qwen-plus | `["aliyun", "openai"]` | `aliyun` |
| qwen-turbo | `["aliyun", "openai"]` | `aliyun` |
| qwen-vl-max | `["aliyun", "openai"]` | `aliyun` |

### 百度文心

| Model | 支持格式 | 默认 |
|-------|----------|------|
| ernie-4.0-turbo-8k | `["baidu", "openai"]` | `baidu` |
| ernie-3.5-8k | `["baidu", "openai"]` | `baidu` |
| ernie-speed-128k | `["baidu", "openai"]` | `baidu` |

### 其他模型

| Provider | Model | 支持格式 | 默认 |
|----------|-------|----------|------|
| OpenAI | gpt-4o | `["openai"]` | `openai` |
| OpenAI | gpt-4-turbo | `["openai"]` | `openai` |
| Anthropic | claude-3-5-sonnet | `["anthropic"]` | `anthropic` |
| Anthropic | claude-3-opus | `["anthropic"]` | `anthropic` |
| Gemini | gemini-2.0-flash | `["gemini", "openai"]` | `gemini` |
| Gemini | gemini-1.5-pro | `["gemini", "openai"]` | `gemini` |
| Azure | gpt-4o | `["azure", "openai"]` | `azure` |
| 字节 | doubao-pro-128k | `["openai"]` | `openai` |
| 智谱 | glm-4-plus | `["openai"]` | `openai` |

---

## 格式特征对比

| 格式 | 端点 | 认证方式 | 系统提示位置 | 响应内容位置 |
|------|------|----------|--------------|--------------|
| **openai** | `/v1/chat/completions` | `Authorization: Bearer` | `messages[0].role="system"` | `choices[0].message.content` |
| **anthropic** | `/v1/messages` | `x-api-key` | `system` (独立字段) | `content[0].text` |
| **gemini** | `/v1beta/models/{model}:generateContent` | Query `?key=` | `systemInstruction.parts` | `candidates[0].content.parts[0].text` |
| **azure** | `/openai/deployments/{id}/chat/completions` | `api-key` | `messages[0].role="system"` | `choices[0].message.content` |
| **aliyun** | `/api/v1/services/aigc/text-generation/generation` | `Authorization: Bearer` | `input.messages` | `output.choices[0].message.content` |
| **baidu** | `/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions` | `Authorization: Bearer` | `system` (顶层字段) | `result` (字符串) |
| **bytedance** | `/api/v3/chat/completions` | `Authorization: Bearer` | `messages[0].role="system"` | `choices[0].message.content` |
| **opencode-zen** | `/v2/zen/generate` | `Authorization: Bearer` | `input.messages` | `output.text` |

---

## 功能支持矩阵

| Provider | 流式 | 函数调用 | 多模态 | 系统提示 | 特殊功能 |
|----------|------|----------|--------|----------|----------|
| OpenAI | ✅ | ✅ | ✅ | ✅ | JSON Mode, Seed |
| Anthropic | ✅ | ✅ (Tool Use) | ✅ | ✅ | Computer Use, Prompt Caching |
| Gemini | ✅ | ✅ | ✅ | ✅ | 原生多模态, 安全过滤 |
| Azure | ✅ | ✅ | ✅ | ✅ | 数据驻留, 私有网络 |
| 阿里云 | ✅ | ✅ | ✅ | ✅ | 联网搜索, 文生图 |
| 百度 | ✅ | ✅ | ❌ | ✅ | 插件, 联网搜索 |
| 字节 | ✅ | ✅ | ❌ | ✅ | 上下文缓存, 批处理 |
| 智谱 | ✅ | ✅ | ✅ | ✅ | 联网搜索, 代码解释器 |
| OpenCode | ✅ | ✅ | ✅ | ✅ | Zen 优化模式, 成本分析 |
| Cloudflare | ✅ | ❌ | ✅ | ✅ | AI Gateway, Vectorize |
| Nvidia | ✅ | ✅ (部分) | ❌ | ✅ | 自托管, GPU 优化 |

---

## 推荐格式选择指南

### 场景 1: 从 OpenAI 迁移
- **推荐格式**: `openai`
- **适用 Provider**: 几乎所有都支持
- **零改动**: 只需修改 `base_url` 和 `api_key`

### 场景 2: 使用 Claude 生态
- **推荐格式**: `anthropic`
- **适用 Provider**: Anthropic, OpenCode
- **优势**: 原生支持 Claude 特有功能

### 场景 3: 多模态需求
- **推荐格式**: `gemini`
- **适用 Provider**: Google Gemini, OpenCode
- **优势**: 原生图像/视频/音频支持

### 场景 4: 成本敏感 + 高性能
- **推荐格式**: `opencode-zen`
- **适用 Provider**: OpenCode (zen-4k, zen-128k)
- **优势**: Zen 优化模式, 成本最低

### 场景 5: 国内合规
- **推荐格式**: 各厂商原生格式
- **适用 Provider**: 阿里云, 百度, 字节, 智谱
- **优势**: 数据不出境, 符合监管

---

## 统计信息

| 统计项 | 数量 |
|--------|------|
| 已调研 Provider | 11 |
| 已调研 Model | 30+ |
| 支持的格式类型 | 9 |
| 多格式支持 Provider | 6 |
| 仅 OpenAI 格式 | 5 |

---

## 待补充 Provider

- [ ] Kilo
- [ ] Poe
- [ ] XiaomiMimo
- [ ] Together AI
- [ ] Groq
- [ ] Fireworks
- [ ] Cohere
- [ ] AI21

---

## 更新记录

| 日期 | 版本 | 变更 |
|------|------|------|
| 2026-03-13 | 1.0 | 初始版本，包含 11 个 Provider，重点关注 OpenCode Zen 系列 |
