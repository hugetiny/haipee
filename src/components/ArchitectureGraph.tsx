import { motion } from 'framer-motion';
import { Monitor, Smartphone, Server, Network, Bot } from 'lucide-react';
import { useTranslation } from 'node_modules/react-i18next';

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
          <h2 className="text-3xl md:text-5xl font-black mb-4">{t('arch_heading')}</h2>
          <p className="text-slate-400">{t('arch_sub')}</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 relative">
          {/* Vertical Divider */}
          <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
            <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
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
                  className="px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2"
                >
                  <span className="text-purple-400">{c.icon}</span>
                  {c.name}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Animated Arrow Down */}
          <div className="flex justify-center w-full h-16 relative">
            <motion.div
              className="w-1 h-full bg-gradient-to-b from-purple-500/0 via-purple-500 to-purple-500/0 rounded-full blur-[1px]"
              animate={{ y: [-30, 30], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            />
          </div>

          {/* Bot Tier */}
          <div className="w-full max-w-3xl glass-panel p-8 rounded-3xl border border-purple-500/30 relative shadow-[0_0_40px_rgba(168,85,247,0.15)] overflow-hidden">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/30 to-fuchsia-500/30 opacity-30 blur-xl pointer-events-none animate-pulse" />
            <h3 className="text-xs font-bold text-purple-400 mb-8 uppercase tracking-[0.2em] text-center relative z-10">
              {t('arch_bot_label')}
            </h3>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative z-10 w-full">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-full sm:w-[60%] px-8 py-6 rounded-2xl bg-gradient-to-br from-purple-600/30 to-indigo-600/30 border border-purple-400/50 text-xl font-black text-white flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(168,85,247,0.4)] backdrop-blur-xl"
              >
                <Bot className="text-purple-300" size={28} />
                OpenClaw
              </motion.div>
              <div className="w-full sm:w-[40%] flex flex-col gap-3">
                <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 flex items-center justify-center gap-2 w-full">
                  <Server size={14} className="text-slate-400" />
                  ZeroClaw (候补)
                </div>
                <div className="px-6 py-3 rounded-xl bg-white/5 border-dashed border border-white/20 text-sm font-medium text-slate-500 flex items-center justify-center gap-2 w-full">
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
                className={`w-1 h-full bg-gradient-to-b from-fuchsia-500/0 via-fuchsia-500 to-fuchsia-500/0 rounded-full blur-[1px] ${i > 0 ? 'hidden sm:block' : ''}`}
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
                  className="px-6 py-3 rounded-xl bg-white/[0.03] border border-white/5 font-semibold hover:bg-white/10 transition-all flex items-center gap-2 hover:border-fuchsia-500/40 hover:shadow-[0_0_15px_rgba(217,70,239,0.25)] text-slate-200"
                >
                  <Network size={16} className="text-fuchsia-400" />
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
