import { useTranslation } from 'node_modules/react-i18next';

const langs = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日本語' },
];

export default function LangSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'zh';

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-1 glass-panel rounded-full px-2 py-1.5 border border-white/10">
      {langs.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${currentLang === lang.code
              ? 'bg-white/15 text-white'
              : 'text-slate-400 hover:text-white'
            }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
