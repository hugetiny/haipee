import { motion } from 'framer-motion';
import { Monitor, Smartphone, Server, Network, Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ArchitectureGraph() {
  const { t } = useTranslation();

  const clients = [
    { name: 'macOS', icon: <Monitor size={14} /> },
    { name: 'Windows', icon: <Monitor size={14} /> },
    { name: 'Linux', icon: <Monitor size={14} /> },
    { name: 'Android', icon: <Smartphone size={14} /> },
    { name: 'iOS', icon: <Smartphone size={14} /> },
  ];

  const models = ['Gemini', 'Claude', 'OpenAI', 'GLM', 'Kimi', t('arch_more').replace('...', '')];

  return (
    <section id="architecture" className="py-24 relative z-10 bg-black/40 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">{t('arch_heading')}</h2>
          <p className="text-slate-400">{t('arch_sub')}</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 relative">
          {/* Vertical Divider */}
          <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
            <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
          </div>

          {/* Client Tier */}
          <div className="w-full glass-panel p-8 rounded-3xl border border-white/10 relative shadow-2xl">
            <h3 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-[0.2em] text-center">
              {t('arch_client_label')}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {clients.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="px-5 py-2.5 rounded-xl border text-sm font-medium transition-all flex items-center gap-2"
                  style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)' }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <span style={{ color: '#34d399' }}>{c.icon}</span>
                  {c.name}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Animated Arrow Down */}
          <div className="flex justify-center w-full h-16 relative">
            <motion.div
              className="w-1 h-full bg-gradient-to-b rounded-full"
              style={{ background: 'linear-gradient(to bottom, rgba(168,85,247,0), rgba(16,185,129,1), rgba(168,85,247,0))', filter: 'blur(1px)' }}
              animate={{ y: [-30, 30], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            />
          </div>

          {/* Bot Tier */}
          <div className="w-full max-w-3xl glass-panel p-8 rounded-3xl border relative overflow-hidden" style={{ borderColor: 'rgba(16,185,129,0.3)', boxShadow: '0 0 40px rgba(16,185,129,0.15)' }}>
            <div className="absolute -inset-[1px] pointer-events-none animate-pulse" style={{ background: 'linear-gradient(to right, rgba(16,185,129,0.3), rgba(132,204,22,0.3))', opacity: 0.3, filter: 'blur(12px)' }} />
            <h3 className="text-xs font-bold text-emerald-400 mb-8 uppercase tracking-[0.2em] text-center relative z-10">
              {t('arch_bot_label')}
            </h3>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative z-10 w-full">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-full sm:w-[60%] px-8 py-6 rounded-2xl border text-xl font-black text-white flex items-center justify-center gap-3"
                style={{ background: 'linear-gradient(to bottom right, rgba(5,150,105,0.3), rgba(22,163,74,0.3))', borderColor: 'rgba(52,211,153,0.5)', boxShadow: '0 0 20px rgba(16,185,129,0.4)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
              >
                <Bot style={{ color: '#6ee7b7' }} size={28} />
                OpenClaw
              </motion.div>
              <div className="w-full sm:w-[40%] flex flex-col gap-3">
                <div className="px-6 py-3 rounded-xl border text-sm font-medium text-slate-300 flex items-center justify-center gap-2 w-full" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <Server size={14} style={{ color: '#94a3b8' }} />
                  ZeroClaw (候补)
                </div>
                <div className="px-6 py-3 rounded-xl border border-dashed text-sm font-medium text-slate-500 flex items-center justify-center gap-2 w-full" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)' }}>
                  {t('arch_more')}
                </div>
              </div>
            </div>
          </div>

          {/* Animated Arrows Down */}
          <div className="flex justify-center w-full h-16 relative gap-12">
            {[1.5, 1.8, 1.6].map((dur, i) => (
              <motion.div
                key={i}
                className={`w-1 h-full rounded-full ${i > 0 ? 'hidden sm:block' : ''}`}
                style={{ background: 'linear-gradient(to bottom, rgba(192,38,211,0), rgba(132,204,22,1), rgba(192,38,211,0))', filter: 'blur(1px)' }}
                animate={{ y: [-30, 30], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: dur, ease: 'linear', delay: i * 0.3 }}
              />
            ))}
          </div>

          {/* Models Tier */}
          <div className="w-full glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h3 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-[0.2em] text-center">
              {t('arch_model_label')}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {models.map((m, i) => (
                <motion.div
                  key={m}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="px-6 py-3 rounded-xl border font-semibold transition-all flex items-center gap-2 text-slate-200"
                  style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)' }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(132,204,22,0.4)', boxShadow: '0 0 15px rgba(132,204,22,0.25)' }}
                >
                  <Network size={16} style={{ color: '#a3e635' }} />
                  {m}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
