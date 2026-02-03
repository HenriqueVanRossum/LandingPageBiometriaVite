import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, Server } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const Features = () => {
  const { t } = useI18n();

  const features = [
    {
      icon: Lock,
      title: t('features.items.1.title'),
      description: t('features.items.1.description'),
      gradient: 'from-blue-600 to-blue-400',
      bgPattern: 'bg-blue-500/5',
    },
    {
      icon: Shield,
      title: t('features.items.2.title'),
      description: t('features.items.2.description'),
      gradient: 'from-purple-600 to-purple-400',
      bgPattern: 'bg-purple-500/5',
    },
    {
      icon: Server,
      title: t('features.items.3.title'),
      description: t('features.items.3.description'),
      gradient: 'from-green-600 to-green-400',
      bgPattern: 'bg-green-500/5',
    },
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-opacity duration-500`}
              />
              <div
                className={`relative bg-gradient-to-br ${feature.gradient} p-[2px] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300`}
              >
                <div
                  className={`${feature.bgPattern} bg-slate-900 rounded-2xl p-8 h-full`}
                >
                  <div
                    className={`bg-gradient-to-br ${feature.gradient} p-4 rounded-xl inline-block mb-6`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
