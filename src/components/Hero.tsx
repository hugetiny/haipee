import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'node_modules/react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-10 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">

        {/* Robot logo with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
          className="flex justify-center mb-6"
        >
          <img
            src="/logo-robot.svg"
            alt="Hapi AI Robot Logo"
            style={{ width: 110, height: 'auto', display: 'block' }}
          />
        </motion.div>

        {/* App name */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm font-bold text-violet-400 tracking-[0.3em] uppercase mb-4"
        >
          Hapi AI
        </motion.p>

        {/* Main headline */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <span className="text-white/90">{t('hero_title_1')} </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300">
            {t('hero_title_2')}
          </span>
        </motion.h1>

        {/* Concise hero subtitle */}
        <motion.p
          className="text-xl md:text-2xl font-semibold text-slate-300 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t('hero_subtitle')}
        </motion.p>

        {/* Value prop */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="mb-10 max-w-2xl mx-auto glass-panel rounded-2xl px-8 py-6 border border-white/10"
        >
          <p className="text-lg font-bold text-white mb-2">{t('vp_heading')}</p>
          <p className="text-slate-400 text-base leading-relaxed">{t('vp_sub')}</p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <button className="flex items-center justify-center gap-2 bg-white/85 text-black px-8 py-4 rounded-full font-bold hover:bg-white/95 hover:scale-105 transition-all w-full sm:w-auto">
            🤖 {t('cta_primary')}
          </button>
          <a
            href="#architecture"
            className="flex items-center justify-center gap-2 glass-panel text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto border border-white/10"
          >
            {t('cta_secondary')}
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
