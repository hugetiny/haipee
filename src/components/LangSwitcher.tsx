import { useTranslation } from 'react-i18next';

const langs = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ar', label: 'العربية' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'ru', label: 'Русский' },
  { code: 'pt', label: 'Português' },
  { code: 'it', label: 'Italiano' },
];

export default function LangSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'zh';

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-wrap justify-center items-center gap-1 glass-panel rounded-2xl md:rounded-full px-2 py-1.5 border border-white/10 max-w-[90vw] md:max-w-none">
      {langs.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold transition-all duration-200 cursor-pointer ${currentLang === lang.code
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
