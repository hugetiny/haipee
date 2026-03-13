import './i18n';
import AnimatedBackground from './components/AnimatedBackground';
import Hero from './components/Hero';
import Features from './components/Features';
import ArchitectureGraph from './components/ArchitectureGraph';
import LangSwitcher from './components/LangSwitcher';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen relative selection:bg-violet-500/30 text-white font-sans antialiased overflow-x-hidden">
      <AnimatedBackground />
      <LangSwitcher />
      <Hero />
      <Features />
      <ArchitectureGraph />
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/5 relative z-10 glass-panel">
        <p>{t('footer', { year: new Date().getFullYear() })}</p>
      </footer>
    </main>
  );
}

export default App;
