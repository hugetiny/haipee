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
  'zh-TW': {
    translation: {
      badge: '歡迎來到 Haipee AI',
      hero_title_1: '人人都能用',
      hero_title_2: 'AI 機器人',
      hero_subtitle: 'Haipee AI，你 Haipee 嗎？',
      cta_primary: '敬請期待',
      cta_secondary: '架構揭秘',

      vp_heading: '不只會說，更能行動。',
      vp_sub: '不用切換十幾個 AI app。它可以幫你賺錢，提高效率，也可以是可靠的夥伴。',

      features_heading: '告別束縛，AI 本應自由',
      features_sub: '打破生態壟斷，打造輕量、透明、多端通用的 AI 體驗。',

      feat_simplify_title: '費用透明',
      feat_simplify_desc: '沒有月付年付消費陷阱，完全基於AI源頭廠商的token，用多少買多少，積極推廣免費模型',

      feat_devices_title: '多端支援',
      feat_devices_desc: '支援電腦、手機全平台，AI 就在你手邊。',

      feat_nolock_title: '自由切換',
      feat_nolock_desc: '不被單一廠商綁定。自由選擇 Gemini, Claude, OpenAI... 喜歡哪個用哪個。',

      feat_openclaw_title: '多種選擇',
      feat_openclaw_desc: '可以靈活切換不同的 AI 助手，適應各種場景。',

      arch_heading: '核心架構',
      arch_sub: '打通全平台，聚合頂尖模型，自由不受限。',
      arch_client_label: '用戶端層 (Multi-Platform App)',
      arch_bot_label: '智慧互動層（靈活切換助手）',
      arch_model_label: '模型接入層（廠商自由選）',
      arch_more: '...更多',

      footer: '© {{year}} Haipee AI 版權所有。',
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
      cta_secondary: '仕組みを見る',

      vp_heading: '話すだけじゃない、行動へ。',
      vp_sub: 'AI アプリを切り替える必要なし。稼ぐ、効率化、頼れるパートナー — これ一つで全部。',

      features_heading: '縛りから解放、AI は自由であれ',
      features_sub: 'エコシステムの独占を壊し、軽くて透明、どの端末でも使える AI を。',

      feat_simplify_title: '料金は透明',
      feat_simplify_desc: '月額・年額の罠はなし。使った分だけ。無料モデルもどんどん推奨。',

      feat_devices_title: 'どの端末でも',
      feat_devices_desc: 'PCもスマホも全部対応。AI はいつもそばに。',

      feat_nolock_title: '自由に選ぶ',
      feat_nolock_desc: '特定のベンダーに縛られない。Gemini、Claude、OpenAI... 好きなのを選んで使おう。',

      feat_openclaw_title: '選べる選択肢',
      feat_openclaw_desc: 'AI アシスタントを気軽に切り替え、どんな場面でも対応。',

      arch_heading: '核心アーキテクチャ',
      arch_sub: '全プラットフォームとトップモデルを統合。本当の自由を。',
      arch_client_label: 'クライアント層 (マルチプラットフォームアプリ)',
      arch_bot_label: '対話層（エージェント切り替え）',
      arch_model_label: 'モデル層（ベンダー自由選び）',
      arch_more: '...もっと',

      footer: '© {{year}} Haipee AI. All rights reserved.',
    }
  },
  fr: {
    translation: {
      badge: 'Bienvenue sur Haipee AI',
      hero_title_1: 'Robots IA',
      hero_title_2: 'pour tous',
      hero_subtitle: 'Haipee AI — Et toi, tu es Haipee ?',
      cta_primary: 'Bientôt',
      cta_secondary: 'Architecture',

      vp_heading: 'Plus qu\'une discussion — de l\'action.',
      vp_sub: 'Finis de jongler entre apps IA. Gagne plus, sois plus efficace, avec un partenaire fiable.',

      features_heading: 'Libère l\'IA',
      features_sub: 'Casser les monopoles pour une IA légère, transparente et multi-plateforme.',

      feat_simplify_title: 'Prix transparents',
      feat_simplify_desc: 'Pas de pièges d\'abo. Paye ce que tu consommes. On promeut les modèles gratuits.',

      feat_devices_title: 'Toutes plateformes',
      feat_devices_desc: 'Dispo partout, PC et mobile. L\'IA toujours là.',

      feat_nolock_title: 'Libre choix',
      feat_nolock_desc: 'Pas de blocage. Gemini, Claude, OpenAI... utilise celui que tu veux.',

      feat_openclaw_title: 'Plusieurs options',
      feat_openclaw_desc: 'Change d\'assistant IA facilement selon tes besoins.',

      arch_heading: 'Architecture',
      arch_sub: 'Toutes plateformes et meilleurs modèles — vraie liberté.',
      arch_client_label: 'Client (Multi-plateforme)',
      arch_bot_label: 'Interaction (Changement agent)',
      arch_model_label: 'Accès Modèles (Choix fournisseur)',
      arch_more: '...plus',

      footer: '© {{year}} Haipee AI. Tous droits réservés.',
    }
  },
  de: {
    translation: {
      badge: 'Willkommen bei Haipee AI',
      hero_title_1: 'KI-Roboter',
      hero_title_2: 'für alle',
      hero_subtitle: 'Haipee AI — Bleib Haipee.',
      cta_primary: 'Demnächst',
      cta_secondary: 'Architektur',

      vp_heading: 'Mehr als Chat — echtes Handeln.',
      vp_sub: 'Schluss mit dutzenden KI-Apps. Mehr verdienen, effizienter arbeiten, verlässlicher Partner — alles in einem.',

      features_heading: 'Mach KI frei',
      features_sub: 'Monopole brechen für eine leichte, transparente, plattformübergreifende KI-Erfahrung.',

      feat_simplify_title: 'Preise transparent',
      feat_simplify_desc: 'Keine Abo-Fallen. Nur Token-Verbrauch bezahlen. Kostenlose Modelle fördern wir.',

      feat_devices_title: 'Alle Plattformen',
      feat_devices_desc: 'Auf allen Geräten verfügbar. Die KI ist immer da.',

      feat_nolock_title: 'Frei wählen',
      feat_nolock_desc: 'Nicht an einen Anbieter gebunden. Gemini, Claude, OpenAI... nutz, was dir gefällt.',

      feat_openclaw_title: 'Viele Optionen',
      feat_openclaw_desc: 'Flexibel zwischen KI-Assistenten wechseln für jedes Szenario.',

      arch_heading: 'Kernarchitektur',
      arch_sub: 'Alle Plattformen und Top-Modelle verbunden — echte Freiheit.',
      arch_client_label: 'Client (Multi-Plattform)',
      arch_bot_label: 'Interaktion (Agenten-Wechsel)',
      arch_model_label: 'Modell-Zugriff (Anbieter-Wahl)',
      arch_more: '...mehr',

      footer: '© {{year}} Haipee AI. Alle Rechte vorbehalten.',
    }
  },
  es: {
    translation: {
      badge: 'Bienvenido a Haipee AI',
      hero_title_1: 'Robots IA',
      hero_title_2: 'para todos',
      hero_subtitle: 'Haipee AI — ¿Estás Haipee?',
      cta_primary: 'Próximamente',
      cta_secondary: 'Arquitectura',

      vp_heading: 'Más que hablar: acción.',
      vp_sub: 'Olvida cambiar entre apps de IA. Gana más, sé más eficiente, con un socio confiable.',

      features_heading: 'Libera la IA',
      features_sub: 'Rompiendo monopolios para una IA ligera, transparente y multiplataforma.',

      feat_simplify_title: 'Precios claros',
      feat_simplify_desc: 'Sin trampas de suscripción. Pagas lo que usas. Promovemos modelos gratis.',

      feat_devices_title: 'Todas las plataformas',
      feat_devices_desc: 'En todos los dispositivos. La IA siempre a mano.',

      feat_nolock_title: 'Libertad total',
      feat_nolock_desc: 'Sin ataduras. Gemini, Claude, OpenAI... usa el que quieras.',

      feat_openclaw_title: 'Muchas opciones',
      feat_openclaw_desc: 'Cambia de asistente IA fácilmente según necesites.',

      arch_heading: 'Arquitectura',
      arch_sub: 'Todas las plataformas y mejores modelos — libertad real.',
      arch_client_label: 'Cliente (Multiplataforma)',
      arch_bot_label: 'Interacción (Cambio agentes)',
      arch_model_label: 'Acceso Modelos (Elección proveedor)',
      arch_more: '...más',

      footer: '© {{year}} Haipee AI. Todos los derechos reservados.',
    }
  },
  ko: {
    translation: {
      badge: 'Haipee AI에 온 걸 환영해',
      hero_title_1: '누구나 쓰는',
      hero_title_2: 'AI 로봇',
      hero_subtitle: 'Haipee AI — 행복해지자',
      cta_primary: '곧 나와',
      cta_secondary: '구조 보기',
      vp_heading: '말만 하는 게 아냐, 실제로 행동해.',
      vp_sub: 'AI 앱을 여기저기 옮겨 다닐 필요 없어. 수익도 내고, 효율도 높이고, 든든한 파트너도 — 이 하나로 다 돼.',
      features_heading: '속박은 그만, AI는 자유로워야 해',
      features_sub: '생태계 독점을 깨고 가볍고 투명한 AI를 모든 기기에서.',
      feat_simplify_title: '투명한 가격',
      feat_simplify_desc: '월간/연간 구독 함정이 없습니다. 제공업체의 토큰 사용량에 따른 완전 종량제. 무료 모델도 적극 추천합니다.',
      feat_devices_title: '모든 플랫폼',
      feat_devices_desc: 'PC든 모바일이든 다 지원. AI가 언제나 곁에 있어.',
      feat_nolock_title: '맘대로 바꿔',
      feat_nolock_desc: '특정 업체에 묶이지 않아. Gemini, Claude, OpenAI... 맘에 드는 걸로 써.',
      feat_openclaw_title: '선택지 많아',
      feat_openclaw_desc: '상황에 따라 AI 어시스턴트를 자유롭게 갈아 타면서 써.',
      arch_heading: '핵심 구조',
      arch_sub: '모든 플랫폼과 최고 모델을 연결 — 진짜 자유.',
      arch_client_label: '클라이언트 계층 (멀티 플랫폼 앱)',
      arch_bot_label: '대화 계층 (에이전트 전환)',
      arch_model_label: '모델 계층 (업체 선택)',
      arch_more: '...더 보기',
      footer: '© {{year}} Haipee AI. All rights reserved.',
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
      cta_secondary: 'Arquitetura',
      vp_heading: 'Mais do que conversa — ação real.',
      vp_sub: 'Chega de ficar alternando entre apps de IA. Ganhe mais, seja mais eficiente, com um parceiro confiável.',
      features_heading: 'Liberte a IA',
      features_sub: 'Quebre monopólios. IA leve, transparente e em todas as plataformas.',
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
      cta_secondary: 'Come funziona',
      vp_heading: 'Non solo chiacchiere — azione concreta.',
      vp_sub: 'Basta saltare tra mille app AI. Più guadagno, più efficienza, un partner affidabile — tutto qui.',
      features_heading: 'Libera l\'IA',
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
  },
  hi: {
    translation: {
      badge: 'Haipee AI में आपका स्वागत है',
      hero_title_1: 'सभी के लिए',
      hero_title_2: 'AI रोबोट',
      hero_subtitle: 'Haipee AI — क्या आप Haipee हैं?',
      cta_primary: 'जल्द आ रहा है',
      cta_secondary: 'आर्किटेक्चर प्रकट',
      vp_heading: 'सिर्फ बातचीत नहीं — असली कार्रवाई।',
      vp_sub: 'दर्जनों AI ऐप्स के बीच स्विच करना बंद करें। कमाई करें, दक्षता बढ़ाएं, और एक विश्वसनीय साथी पाएं।',
      features_heading: 'बंधनों से मुक्त, AI को स्वतंत्र होना चाहिए',
      features_sub: 'हल्का, पारदर्शी, और क्रॉस-प्लेटफॉर्म AI अनुभव के लिए इकोसिस्टम एकाधिकार को तोड़ना।',
      feat_simplify_title: 'पारदर्शी मूल्य निर्धारण',
      feat_simplify_desc: 'कोई मासिक/वार्षिक सब्सक्रिप्शन जाल नहीं। AI प्रदाताओं के टोकन उपयोग पर पूरी तरह आधारित। मुफ्त मॉडलों को बढ़ावा देते हैं।',
      feat_devices_title: 'क्रॉस-प्लेटफॉर्म समर्थन',
      feat_devices_desc: 'macOS, Windows, Linux, Android, iOS पर उपलब्ध। AI हमेशा आपके साथ।',
      feat_nolock_title: 'स्वतंत्र रूप से बदलें',
      feat_nolock_desc: 'किसी एक विक्रेता से बंधे नहीं। Gemini, Claude, OpenAI... जो पसंद हो वो इस्तेमाल करें।',
      feat_openclaw_title: 'कई विकल्प',
      feat_openclaw_desc: 'किसी भी परिदृश्य के लिए विभिन्न AI सहायकों के बीच लचीले ढंग से स्विच करें।',
      arch_heading: 'मुख्य वास्तुकला',
      arch_sub: 'सभी प्लेटफार्मों और शीर्ष मॉडलों को जोड़ना — असली स्वतंत्रता।',
      arch_client_label: 'क्लाइंट परत (मल्टी-प्लेटफॉर्म ऐप)',
      arch_bot_label: 'बुद्धिमान इंटरैक्शन परत (सहायक बदलें)',
      arch_model_label: 'मॉडल एक्सेस परत (विक्रेता चुनें)',
      arch_more: '...और अधिक',
      footer: '© {{year}} Haipee AI। सर्वाधिकार सुरक्षित।',
    }
  },
  ar: {
    translation: {
      badge: 'مرحباً بك في Haipee AI',
      hero_title_1: 'روبوتات الذكاء الاصطناعي',
      hero_title_2: 'للجميع',
      hero_subtitle: 'Haipee AI — هل أنت Haipee؟',
      cta_primary: 'قريباً',
      cta_secondary: 'الكشف عن البنية',
      vp_heading: 'أكثر من مجرد محادثة — فعل حقيقي.',
      vp_sub: 'توقف عن التنقل بين عشرات تطبيقات الذكاء الاصطناعي. اكسب المال، وزّع فعاليتك، واعثر على شريك موثوق.',
      features_heading: 'التحرر من القيود، يجب أن يكون الذكاء الاصطناعي حراً',
      features_sub: 'كسر احتكارات النظام البيئي لتجربة ذكاء اصطناعي خفيفة وشفافة ومتعددة المنصات.',
      feat_simplify_title: 'تسعير شفاف',
      feat_simplify_desc: 'لا فخاش اشتراك شهرية أو سنوية. بالكامل بناءً على استخدام الرمز المميز من مزودي الذكاء الاصطناعي. نحن نروج للنماذج المجانية.',
      feat_devices_title: 'دعم متعدد المنصات',
      feat_devices_desc: 'متاح على جميع المنصات، أجهزة الكمبيوتر والهواتف. الذكاء الاصطناعي دائماً في متناول يدك.',
      feat_nolock_title: 'تبديل حر',
      feat_nolock_desc: 'لا تقيد ببائع واحد. اختر بين Gemini و Claude و OpenAI... استخدم ما تفضله.',
      feat_openclaw_title: 'خيارات متعددة',
      feat_openclaw_desc: 'بدّل بمرونة بين مساعدين ذكاء اصطناعي مختلفين لأي سيناريو.',
      arch_heading: 'البنية الأساسية',
      arch_sub: 'التواصل الشامل مع أفضل النماذج — الحرية الحقيقية.',
      arch_client_label: 'طبقة العميل (تطبيق متعدد المنصات)',
      arch_bot_label: 'طبقة التفاعل الذكي (تبديل الوكلاء)',
      arch_model_label: 'طبقة الوصول إلى النماذج (اختيار المزود)',
      arch_more: '...المزيد',
      footer: '© {{year}} Haipee AI. جميع الحقوق محفوظة.',
    }
  },
  bn: {
    translation: {
      badge: 'Haipee AI-তে স্বাগতম',
      hero_title_1: 'সবার জন্য',
      hero_title_2: 'AI রোবট',
      hero_subtitle: 'Haipee AI — আপনি কি Haipee?',
      cta_primary: 'শীঘ্রই আসছে',
      cta_secondary: 'স্থাপত্য প্রকাশ',
      vp_heading: 'শুধু কথোপকথা নয় — বাস্তব ক্রিয়া।',
      vp_sub: 'ডজন ডজন AI অ্যাপের মধ্যে সুইচ করা বন্ধ করুন। আয় করুন, দক্ষতা বাড়ান, এবং একটি নির্ভরযোগ্য সঙ্গী পান।',
      features_heading: 'বাঁধন থেকে মুক্তি, AI মুক্ত হওয়া উচিত',
      features_sub: 'হালকা, স্বচ্ছ এবং ক্রস-প্ল্যাটফর্ম AI অভিজ্ঞতার জন্য ইকোসিস্টেম একচেটিয়া ভেঙে ফেলা।',
      feat_simplify_title: 'স্বচ্ছ মূল্য নির্ধারণ',
      feat_simplify_desc: 'কোনো মাসিক/বার্ষিক সাবস্ক্রিপশন ফাঁদ নেই। AI প্রদানকারীদের টোকেন ব্যবহারের উপর পুরোপুরি ভিত্তি করে। আমরা বিনামূল্যে মডেল প্রচার করি।',
      feat_devices_title: 'ক্রস-প্ল্যাটফর্ম সমর্থন',
      feat_devices_desc: 'সমস্ত প্ল্যাটফর্মে উপলব্ধ, PC এবং মোবাইল। AI সবসময় আপনার হাতের কাছে।',
      feat_nolock_title: 'স্বাধীনভাবে পরিবর্তন করুন',
      feat_nolock_desc: 'একক বিক্রেতার সাথে বাঁধা নেই। Gemini, Claude, OpenAI... যেটি পছন্দ সেটি ব্যবহার করুন।',
      feat_openclaw_title: 'বহু বিকল্প',
      feat_openclaw_desc: 'যেকোনো পরিস্থিতিতে বিভিন্ন AI সহকারীর মধ্যে নমনীয়ভাবে স্যুইচ করুন।',
      arch_heading: 'মূল স্থাপত্য',
      arch_sub: 'সমস্ত প্ল্যাটফর্ম এবং শীর্ষ মডেল সংযুক্ত করা — আসল স্বাধীনতা।',
      arch_client_label: 'ক্লায়েন্ট স্তর (মাল্টি-প্ল্যাটফর্ম অ্যাপ)',
      arch_bot_label: 'বুদ্ধিমান ইন্টারঅ্যাকশন স্তর (সহকারী পরিবর্তন)',
      arch_model_label: 'মডেল অ্যাক্সেস স্তর (বিক্রেতা নির্বাচন)',
      arch_more: '...আরও',
      footer: '© {{year}} Haipee AI। সর্বস্বত্ব সংরক্ষিত।',
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
