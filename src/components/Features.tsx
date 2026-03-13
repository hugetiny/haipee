import { motion } from 'framer-motion';
import { Unlock, Zap, Layers, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Layers size={24} />,
      title: t('feat_simplify_title'),
      description: t('feat_simplify_desc'),
    },
    {
      icon: <Globe size={24} />,
      title: t('feat_devices_title'),
      description: t('feat_devices_desc'),
    },
    {
      icon: <Unlock size={24} />,
      title: t('feat_nolock_title'),
      description: t('feat_nolock_desc'),
    },
    {
      icon: <Zap size={24} />,
      title: t('feat_openclaw_title'),
      description: t('feat_openclaw_desc'),
    },
  ];

  return (
    <section className="py-24 relative z-10 w-full overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-purple-500/10 blur-[100px] rounded-full z-0" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl md:text-5xl font-black mb-4 relative z-10"
          >
            {t('features_heading')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg relative z-10"
          >
            {t('features_sub')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-panel p-8 rounded-2xl hover:bg-white/[0.05] transition-all duration-300 border border-white/5 hover:border-purple-500/30 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
