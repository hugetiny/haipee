import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Nav / Badge
      badge: 'Welcome to Hapi AI',

      // Hero
      hero_title_1: 'Everyone can use',
      hero_title_2: 'AI Robots',
      hero_subtitle: 'Beyond chatting \u2014 AI that truly acts for you.',
      cta_primary: 'Try Now',
      cta_secondary: 'See Architecture',

      // Value Propositions
      vp_heading: 'AI is not just a chatbox.',
      vp_sub: 'It can help you earn money, write software, or be your virtual companion — anytime, anywhere.',

      // Features
      features_heading: 'A truly free AI experience',
      features_sub: 'Break the monopoly of a single AI ecosystem. Build a lightweight, transparent, cross-platform intelligent foundation.',

      feat_simplify_title: 'Keep it Simple',
      feat_simplify_desc: 'HapiAI lets you access every model from every platform with a single tap — no switching between multiple AI apps.',

      feat_devices_title: 'All Your Devices',
      feat_devices_desc: 'HapiAI is always with you. Supports all popular devices including macOS, Windows, Linux, Android, and iOS.',

      feat_nolock_title: 'No Vendor Lock',
      feat_nolock_desc: 'Freely switch between Gemini, Claude, OpenAI and more. You control the choice, not the vendor.',

      feat_openclaw_title: 'Powered by OpenClaw',
      feat_openclaw_desc: 'A flexible bot layer that can swap AI agents on demand — adapting to any task, any platform, any workflow.',

      // Architecture
      arch_heading: 'Core Architecture',
      arch_sub: 'Seamlessly connecting all platforms with top-tier models — true No Vendor Lock',
      arch_client_label: 'Client Layer (Multi-Platform App)',
      arch_bot_label: 'Flexible Bot Layer (Swap Agents Freely)',
      arch_model_label: 'Model Layer (No Vendor Lock)',
      arch_more: '...more',

      // Footer
      footer: '© {{year}} Hapi AI. All rights reserved. Powered by OpenClaw.',
    }
  },
  zh: {
    translation: {
      badge: '欢迎使用 Hapi AI',

      hero_title_1: '人人都能用',
      hero_title_2: 'AI 机器人',
      hero_subtitle: '不只是问答，AI 真正为你而动。',
      cta_primary: '立即体验',
      cta_secondary: '了解架构',

      vp_heading: 'AI 不再只是聊天框。',
      vp_sub: '不用切换十几个 AI app。它可以帮你赚钱、帮你写软件，也可以是随时随地的可靠伙伴。',

      features_heading: '真正自由的 AI 体验',
      features_sub: '打破由单一寡头垄断的 AI 生态，构建轻量、透明、全平台适配的新一代智能底座。',

      feat_simplify_title: '化繁为简',
      feat_simplify_desc: 'HapiAI 让你无需切换各种 AI app，一键方便调用所有平台的所有大模型。',

      feat_devices_title: '所有设备',
      feat_devices_desc: 'HapiAI 随时随地在你身边。支持所有流行设备，包括 macOS、Windows、Linux、Android 和 iOS。',

      feat_nolock_title: 'No Vendor Lock',
      feat_nolock_desc: '彻底告别单一模型厂商的绑定，自由切换 Gemini、Claude、OpenAI 等顶尖模型，将选择权交还给你。',

      feat_openclaw_title: 'OpenClaw 驱动',
      feat_openclaw_desc: '灵活可替换的机器人层，按需切换 AI Agent，适应任何任务、任何平台、任何工作流。',

      arch_heading: '核心原生架构',
      arch_sub: '无缝连接全平台与全量顶尖模型，真正的 No Vendor Lock',
      arch_client_label: '简化使用，客户端层 (Multi-Platform App)',
      arch_bot_label: '灵活机器人层（按需切换 Agent）',
      arch_model_label: '模型接入层 (No Vendor Lock)',
      arch_more: '...更多扩展',

      footer: '© {{year}} Hapi AI 版权所有。由 OpenClaw 驱动。',
    }
  },
  ja: {
    translation: {
      badge: 'Hapi AI へようこそ',

      hero_title_1: '誰でも使える',
      hero_title_2: 'AI ロボット',
      hero_subtitle: '問答を超えて、AIが本当に動く。',
      cta_primary: '今すぐ試す',
      cta_secondary: 'アーキテクチャを見る',

      vp_heading: 'AIはチャットボックスではない。',
      vp_sub: '十数ものAIアプリを切り替える必要はありません。収益化・ソフトウェア開発・いつでも頼れるパートナー、すべて一つで。',

      features_heading: '本当に自由なAI体験',
      features_sub: '単一AIエコシステムの独占を打ち破り、軽量・透明・全プラットフォーム対応の次世代AIを構築。',

      feat_simplify_title: '複雑さを省く',
      feat_simplify_desc: 'HapiAI なら複数のAIアプリを切り替える必要なし。すべてのプラットフォームの大規模モデルをワンタップで呼び出せます。',

      feat_devices_title: 'すべてのデバイス',
      feat_devices_desc: 'HapiAI はいつでもあなたのそばに。macOS・Windows・Linux・Android・iOS など主要デバイスをすべてサポート。',

      feat_nolock_title: 'ベンダーロックなし',
      feat_nolock_desc: 'Gemini・Claude・OpenAI など最高のモデルを自由に切り替え可能。選択権はベンダーではなく、あなた自身に。',

      feat_openclaw_title: 'OpenClaw 搭載',
      feat_openclaw_desc: 'オンデマンドでAIエージェントを切り替えられる柔軟なボット層。あらゆるタスク・プラットフォーム・ワークフローに対応。',

      arch_heading: 'コアアーキテクチャ',
      arch_sub: '全プラットフォームとトップモデルをシームレスに接続 — 真のベンダーロックフリー',
      arch_client_label: 'クライアント層 (マルチプラットフォームアプリ)',
      arch_bot_label: '柔軟なボット層（エージェントを自由に交換）',
      arch_model_label: 'モデル層 (ベンダーロックなし)',
      arch_more: '...さらに追加予定',

      footer: '© {{year}} Hapi AI. All rights reserved. OpenClaw 搭載。',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    detection: {
      order: ['navigator', 'htmlTag', 'localStorage'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
