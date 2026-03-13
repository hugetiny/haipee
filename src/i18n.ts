import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector/cjs';

const resources = {
  zh: {
    translation: {
      badge: '欢迎来到 Haipee AI',
      hero_title_1: '人人都能用',
      hero_title_2: 'AI 机器人',
      hero_subtitle: 'Haipee AI，你 Haipee 吗？',
      cta_primary: '敬请期待',
      cta_secondary: '架构揭秘',

      vp_heading: '不止会说，更能行动。',
      vp_sub: '不用切换十几个 AI app。它可以帮你赚钱，提高效率，也可以是可靠的伙伴。',

      features_heading: '告别束缚，AI 本应自由',
      features_sub: '打破生态垄断，打造轻量、透明、多端通用的 AI 体验。',

      feat_simplify_title: '费用透明',
      feat_simplify_desc: '没有月付年付消费陷阱,完全基于AI源头厂商的token,用多少买多少,积极推广免费模型',

      feat_devices_title: '多端支持',
      feat_devices_desc: '支持电脑、手机全平台，AI 就在你手边。',

      feat_nolock_title: '自由切换',
      feat_nolock_desc: '不被单一厂商绑定。自由选择 Gemini, Claude, OpenAI... 喜欢哪个用哪个。',

      feat_openclaw_title: '多种选择',
      feat_openclaw_desc: '可以灵活切换不同的 AI 助手，适应各种场景。',

      arch_heading: '核心架构',
      arch_sub: '打通全平台，聚合顶尖模型，自由不受限。',
      arch_client_label: '客户端层 (Multi-Platform App)',
      arch_bot_label: '智能交互层（灵活切换助手）',
      arch_model_label: '模型接入层（厂商自由选）',
      arch_more: '...更多',

      footer: '© {{year}} Haipee AI 版权所有。',
    }
  },
  en: {
    translation: {
      badge: 'Welcome to Haipee AI',
      hero_title_1: 'AI Robots',
      hero_title_2: 'For Everyone',
      hero_subtitle: 'Haipee AI — Stay Haipee.',
      cta_primary: 'Coming Soon',
      cta_secondary: 'Architecture Revealed',

      vp_heading: 'More than just talk — real action.',
      vp_sub: 'Stop juggling dozens of AI apps. Earn more, work smarter, and always have a reliable AI partner by your side.',

      features_heading: 'Break the chains, AI should be free',
      features_sub: 'Breaking ecosystem monopolies to build a lightweight, transparent, and cross-platform AI experience.',

      feat_simplify_title: 'Transparent Pricing',
      feat_simplify_desc: 'No monthly or yearly subscription traps. Completely based on token usage from AI providers — pay only for what you use. We actively promote free models.',

      feat_devices_title: 'Multi-platform Support',
      feat_devices_desc: 'Haipee AI is always with you — available on macOS, Windows, Linux, Android, and iOS.',

      feat_nolock_title: 'Switch Freely',
      feat_nolock_desc: 'No vendor lock-in. Choose between Gemini, Claude, OpenAI... use whichever you prefer.',

      feat_openclaw_title: 'Multiple Options',
      feat_openclaw_desc: 'Flexibly switch between different AI assistants to adapt to any scenario.',

      arch_heading: 'Core Architecture',
      arch_sub: 'Universal platform connectivity with top-tier models — true freedom.',
      arch_client_label: 'Client Layer (Multi-Platform App)',
      arch_bot_label: 'Intelligent Interaction Layer (Swap Agents)',
      arch_model_label: 'Model Access Layer (Vendor Choice)',
      arch_more: '...more',

      footer: '© {{year}} Haipee AI. All rights reserved.',
    }
  },
  ja: {
    translation: {
      badge: 'Haipee AI へようこそ',
      hero_title_1: '誰でも使える',
      hero_title_2: 'AI ロボット',
      hero_subtitle: 'Haipee AI — ハッピー？',
      cta_primary: '近日公開',
      cta_secondary: 'アーキテクチャ公開',

      vp_heading: '対話を超えて、実行へ。',
      vp_sub: '数多くの AI アプリを切り替える必要はありません。収益化、効率向上、信頼できるパートナー — すべてをこれひとつで。',

      features_heading: '束縛からの解放、AI は自由であるべき',
      features_sub: 'エコシステムの独占を打ち破り、軽量で透明、マルチプラットフォーム対応の AI 体験を。',

      feat_simplify_title: '透明な価格設定',
      feat_simplify_desc: '月額・年額の定期購読トラップはありません。プロバイダーのトークン使用量に基づいた完全従量課金。無料モデルも積極的に推奨。',

      feat_devices_title: 'マルチデバイス対応',
      feat_devices_desc: 'PCもスマホも全プラットフォーム対応。AI がいつでもそばに。',

      feat_nolock_title: '自由に切り替え',
      feat_nolock_desc: '特定のベンダーに縛られません。Gemini、Claude、OpenAI... お好きなモデルを自由に選択。',

      feat_openclaw_title: '多様な選択肢',
      feat_openclaw_desc: 'AI アシスタントを柔軟に切り替え、あらゆるシーンに対応。',

      arch_heading: 'コアアーキテクチャ',
      arch_sub: '全プラットフォームとトップモデルを統合。真の自由を。',
      arch_client_label: 'クライアント層 (マルチプラットフォームアプリ)',
      arch_bot_label: 'インテリジェント対話層（エージェント切り替え）',
      arch_model_label: 'モデルアクセス層（ベンダー自由選択）',
      arch_more: '...さらに追加',

      footer: '© {{year}} Haipee AI. 無断複写・転載を禁じます。',
    }
  },
  fr: {
    translation: {
      badge: 'Bienvenue sur Haipee AI',
      hero_title_1: 'Des robots AI',
      hero_title_2: 'pour tous',
      hero_subtitle: 'Haipee AI — Et vous, êtes-vous Haipee ?',
      cta_primary: 'Prochainement',
      cta_secondary: 'Architecture révélée',
      vp_heading: 'Plus qu\'une simple discussion — une véritable action.',
      vp_sub: 'Plus besoin de jongler entre des dizaines d\'applications d\'IA. Que vous cherchiez à gagner de l\'argent, à gagner en efficacité ou à disposer d\'un partenaire fiable.',
      features_heading: 'Libérez l\'IA, elle doit être libre',
      features_sub: 'Briser les monopoles pour une expérience IA légère, transparente et multi-plateforme.',
      feat_simplify_title: 'Tarification transparente',
      feat_simplify_desc: 'Pas de pièges d\'abonnement mensuel ou annuel. Basé sur l\'utilisation réelle des tokens des fournisseurs. Nous promouvons les modèles gratuits.',
      feat_devices_title: 'Support multi-plateforme',
      feat_devices_desc: 'Disponible sur toutes les plateformes, PC et mobile. L\'IA est toujours à portée de main.',
      feat_nolock_title: 'Changement libre',
      feat_nolock_desc: 'Pas d\'enfermement propriétaire. Choisissez entre Gemini, Claude, OpenAI... utilisez celui que vous préférez.',
      feat_openclaw_title: 'Multiples options',
      feat_openclaw_desc: 'Changez d\'assistant IA selon vos besoins et les scénarios.',
      arch_heading: 'Architecture centrale',
      arch_sub: 'Connectivité universelle avec les meilleurs modèles — une vraie liberté.',
      arch_client_label: 'Couche Client (App multi-plateforme)',
      arch_bot_label: 'Interaction intelligente (Changement d\'agent)',
      arch_model_label: 'Accès Modèle (Choix du fournisseur)',
      arch_more: '...plus',
      footer: '© {{year}} Haipee AI. Tous droits réservés.',
    }
  },
  de: {
    translation: {
      badge: 'Willkommen bei Haipee AI',
      hero_title_1: 'AI-Roboter',
      hero_title_2: 'für alle',
      hero_subtitle: 'Haipee AI — Werde Haipee.',
      cta_primary: 'Demnächst verfügbar',
      cta_secondary: 'Architektur enthüllt',
      vp_heading: 'Mehr als nur Chat — echtes Handeln.',
      vp_sub: 'Kein Wechseln mehr zwischen dutzenden KI-Apps. Ob zum Geldverdienen, zur Effizienzsteigerung oder als zuverlässiger Partner.',
      features_heading: 'KI befreien, KI sollte frei sein',
      features_sub: 'Ökosystem-Monopole brechen für ein leichtgewichtiges, transparentes und plattformübergreifendes KI-Erlebnis.',
      feat_simplify_title: 'Transparente Preise',
      feat_simplify_desc: 'Keine Abofallen für Monat oder Jahr. Basierend auf dem Token-Verbrauch der Anbieter. Wir fördern kostenlose Modelle.',
      feat_devices_title: 'Multi-Plattform-Support',
      feat_devices_desc: 'Auf allen Plattformen verfügbar, PC und Handy. Die KI ist immer griffbereit.',
      feat_nolock_title: 'Frei wechseln',
      feat_nolock_desc: 'Keine Anbieterbindung. Wählen Sie zwischen Gemini, Claude, OpenAI... nutzen Sie, was Sie bevorzugen.',
      feat_openclaw_title: 'Vielfältige Optionen',
      feat_openclaw_desc: 'Wechseln Sie flexibel zwischen verschiedenen KI-Assistenten für jedes Szenario.',
      arch_heading: 'Kernarchitektur',
      arch_sub: 'Universelle Konnektivität mit Top-Modellen — echte Freiheit.',
      arch_client_label: 'Client-Ebene (Multi-Plattform-App)',
      arch_bot_label: 'Intelligente Interaktion (Agentenwechsel)',
      arch_model_label: 'Modellzugriff (Anbieterwahl)',
      arch_more: '...mehr',
      footer: '© {{year}} Haipee AI. Alle Rechte vorbehalten.',
    }
  },
  es: {
    translation: {
      badge: 'Bienvenido a Haipee AI',
      hero_title_1: 'Robots de IA',
      hero_title_2: 'para todos',
      hero_subtitle: 'Haipee AI — ¿Feliz con Haipee?',
      cta_primary: 'Próximamente',
      cta_secondary: 'Arquitectura revelada',
      vp_heading: 'Más que hablar: acción real.',
      vp_sub: 'Olvídate de alternar entre docenas de apps de IA. Ya sea para ganar dinero, aumentar tu eficiencia o tener un socio confiable.',
      features_heading: 'Libera la IA, la IA debe ser libre',
      features_sub: 'Rompiendo monopolios para una experiencia de IA ligera, transparente y multiplataforma.',
      feat_simplify_title: 'Precios transparentes',
      feat_simplify_desc: 'Sin trampas de suscripción mensual o anual. Basado en el uso de tokens de los proveedores. Promovemos modelos gratuitos.',
      feat_devices_title: 'Soporte multiplataforma',
      feat_devices_desc: 'Disponible en todas las plataformas, PC y móvil. La IA está siempre a tu alcance.',
      feat_nolock_title: 'Cambio libre',
      feat_nolock_desc: 'Sin dependencia de proveedores. Elige entre Gemini, Claude, OpenAI... usa el que prefieras.',
      feat_openclaw_title: 'Múltiples opciones',
      feat_openclaw_desc: 'Cambia de asistente de IA de forma flexible para cualquier situación.',
      arch_heading: 'Arquitectura central',
      arch_sub: 'Conectividad universal con los mejores modelos: verdadera libertad.',
      arch_client_label: 'Capa de Cliente (App multiplataforma)',
      arch_bot_label: 'Interacción inteligente (Cambio de agentes)',
      arch_model_label: 'Acceso a Modelos (Elección de proveedor)',
      arch_more: '...más',
      footer: '© {{year}} Haipee AI. Todos los derechos reservados.',
    }
  },
  ko: {
    translation: {
      badge: 'Haipee AI에 오신 것을 환영합니다',
      hero_title_1: '누구나 사용할 수 있는',
      hero_title_2: 'AI 로봇',
      hero_subtitle: 'Haipee AI — 오늘도 행복하게',
      cta_primary: '출시 예정',
      cta_secondary: '아키텍처 공개',
      vp_heading: '대화를 넘어, 실제로 행동하는 AI.',
      vp_sub: '이제 수십 개의 AI 앱을 오가며 쓸 필요가 없습니다. 수익 창출부터 업무 효율 향상까지, 든든한 파트너가 되어드립니다.',
      features_heading: '속박에서 벗어나기, AI는 자유로워야 합니다',
      features_sub: '생태계 독점을 깨고 가볍고 투명하며 모든 플랫폼에서 사용 가능한 AI 경험을 제공합니다.',
      feat_simplify_title: '투명한 가격 책정',
      feat_simplify_desc: '월간/연간 구독 함정이 없습니다. 제공업체의 토큰 사용량에 따른 완전 종량제. 무료 모델도 적극 추천합니다.',
      feat_devices_title: '멀티 플랫폼 지원',
      feat_devices_desc: 'PC와 모바일 모든 플랫폼 지원. AI가 언제나 당신 곁에 있습니다.',
      feat_nolock_title: '자유로운 전환',
      feat_nolock_desc: '특정 업체에 종속되지 않습니다. Gemini, Claude, OpenAI... 원하는 모델을 자유롭게 선택하세요.',
      feat_openclaw_title: '다양한 선택지',
      feat_openclaw_desc: '상황에 맞게 다양한 AI 어시스턴트를 유연하게 교체하며 사용하세요.',
      arch_heading: '핵심 아키텍처',
      arch_sub: '모든 플랫폼과 최상위 모델을 연결하는 진정한 자유.',
      arch_client_label: '클라이언트 계층 (멀티 플랫폼 앱)',
      arch_bot_label: '지능형 대화 계층 (에이전트 전환)',
      arch_model_label: '모델 액세스 계층 (업체 자유 선택)',
      arch_more: '...더 보기',
      footer: '© {{year}} Haipee AI. 모든 권리 보유.',
      Korea: true,
    }
  },
  ru: {
    translation: {
      badge: 'Добро пожаловать в Haipee AI',
      hero_title_1: 'AI-роботы',
      hero_title_2: 'для всех',
      hero_subtitle: 'Haipee AI — Будьте Haipee.',
      cta_primary: 'Скоро запуск',
      cta_secondary: 'Архитектура',
      vp_heading: 'Больше чем просто чат — реальные действия.',
      vp_sub: 'Забудьте о десятках AI-приложений. Зарабатывайте, повышайте эффективность и находите надежного партнера — всё в одном месте.',
      features_heading: 'Освободите ИИ — он должен быть свободным',
      features_sub: 'Разрушаем монополии для легкого, прозрачного и кроссплатформенного ИИ.',
      feat_simplify_title: 'Прозрачные цены',
      feat_simplify_desc: 'Никаких ловушек с месячной или годовой подпиской. Оплата только за использованные токены. Мы активно продвигаем бесплатные модели.',
      feat_devices_title: 'Мультиплатформенность',
      feat_devices_desc: 'Доступно на всех платформах, ПК и мобильных. ИИ всегда под рукой.',
      feat_nolock_title: 'Свободный выбор',
      feat_nolock_desc: 'Никакой привязки к вендору. Выбирайте между Gemini, Claude, OpenAI... используйте то, что нравится.',
      feat_openclaw_title: 'Множество вариантов',
      feat_openclaw_desc: 'Гибко переключайтесь между разными AI-ассистентами для любых сценариев.',
      arch_heading: 'Ядро архитектуры',
      arch_sub: 'Универсальное подключение к топовым моделям — настоящая свобода.',
      arch_client_label: 'Клиентский слой (мультиплатформенное приложение)',
      arch_bot_label: 'Интеллектуальный слой (смена агентов)',
      arch_model_label: 'Слой доступа к моделям (выбор вендора)',
      arch_more: '...и другие',
      footer: '© {{year}} Haipee AI. Все права защищены.',
    }
  },
  pt: {
    translation: {
      badge: 'Bem-vindo ao Haipee AI',
      hero_title_1: 'Robôs de IA',
      hero_title_2: 'para todos',
      hero_subtitle: 'Haipee AI — Fique Haipee.',
      cta_primary: 'Em breve',
      cta_secondary: 'Arquitetura revelada',
      vp_heading: 'Mais do que conversa — ação real.',
      vp_sub: 'Chega de alternar entre dezenas de apps de IA. Use um só para ganhar dinheiro, aumentar sua eficiência ou ter um parceiro confiável.',
      features_heading: 'Liberte a IA, a IA deve ser livre',
      features_sub: 'Quebrando monopólios para uma experiência de IA leve, transparente e multiplataforma.',
      feat_simplify_title: 'Preço transparente',
      feat_simplify_desc: 'Sem armadilhas de assinatura mensal ou anual. Baseado no uso real de tokens. Promovemos modelos gratuitos.',
      feat_devices_title: 'Suporte multiplataforma',
      feat_devices_desc: 'Disponível em todas as plataformas, PC e celular. A IA está sempre à mão.',
      feat_nolock_title: 'Troca livre',
      feat_nolock_desc: 'Sem fidelização a fornecedores. Escolha entre Gemini, Claude, OpenAI... use o que preferir.',
      feat_openclaw_title: 'Múltiplas opções',
      feat_openclaw_desc: 'Alterne de forma flexível entre diferentes assistentes de IA para qualquer cenário.',
      arch_heading: 'Arquitetura central',
      arch_sub: 'Conectividade universal com modelos de topo — liberdade real.',
      arch_client_label: 'Camada de Cliente (App multiplataforma)',
      arch_bot_label: 'Interação inteligente (Troca de agentes)',
      arch_model_label: 'Acesso a Modelos (Escolha do fornecedor)',
      arch_more: '...mais',
      footer: '© {{year}} Haipee AI. Todos os direitos reservados.',
    }
  },
  it: {
    translation: {
      badge: 'Benvenuto in Haipee AI',
      hero_title_1: 'Robot AI',
      hero_title_2: 'per tutti',
      hero_subtitle: 'Haipee AI — Felice con Haipee?',
      cta_primary: 'Prossimamente',
      cta_secondary: 'Architettura svelata',
      vp_heading: 'Più di una semplice chat — azione reale.',
      vp_sub: 'Niente più salti tra decine di app AI. Guadagna di più, aumenta l\'efficienza e trova un partner affidabile.',
      features_heading: 'Libera l\'IA, l\'IA deve essere libera',
      features_sub: 'Rompere i monopoli per un\'esperienza IA leggera, trasparente e multi-piattaforma.',
      feat_simplify_title: 'Prezzi trasparenti',
      feat_simplify_desc: 'Nessuna trappola di abbonamento mensile o annuale. Basato sul consumo effettivo di token. Promuoviamo modelli gratuiti.',
      feat_devices_title: 'Supporto multi-piattaforma',
      feat_devices_desc: 'Disponibile su tutte le piattaforme, PC e mobile. L\'IA è sempre a portata di mano.',
      feat_nolock_title: 'Cambio libero',
      feat_nolock_desc: 'Nessun vincolo con i fornitori. Scegli tra Gemini, Claude, OpenAI... usa quello che preferisci.',
      feat_openclaw_title: 'Molteplici opzioni',
      feat_openclaw_desc: 'Passa in modo flessibile tra diversi assistenti AI per ogni scenario.',
      arch_heading: 'Architettura principale',
      arch_sub: 'Connettività universale con i migliori modelli — vera libertà.',
      arch_client_label: 'Livello Cliente (App multi-piattaforma)',
      arch_bot_label: 'Interazione intelligente (Cambio agenti)',
      arch_model_label: 'Accesso ai Modelli (Scelta del fornitore)',
      arch_more: '...altro',
      footer: '© {{year}} Haipee AI. Tutti i diritti riservati.',
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
