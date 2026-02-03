import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Zap, Clock, ShieldCheck } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const TrustIndicators = () => {
  const { t } = useI18n();
  const SHOW_CLIENTS = false; // 👈 controla exibição

  const stats = [
    { icon: Building2, value: '10M+', label: t('trust.stats.verifications') },
    { icon: Zap, value: '99.9%', label: t('trust.stats.uptime') },
    { icon: Clock, value: '< 30s', label: t('trust.stats.time') },
    { icon: ShieldCheck, value: '100%', label: t('trust.stats.compliance') },
  ];

  const clients = [
    t('trust.clients.1'),
    t('trust.clients.2'),
    t('trust.clients.3'),
    t('trust.clients.4'),
    t('trust.clients.5'),
  ];

  const certifications = [
    t('trust.certs.1'),
    t('trust.certs.2'),
    t('trust.certs.3'),
    t('trust.certs.4'),
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
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
            {t('trust.title')}
          </h2>
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 text-center"
            >
              <stat.icon className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos (condicional) */}
        {SHOW_CLIENTS && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {clients.map((client, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 flex items-center justify-center text-center"
                >
                  <span className="text-gray-400 font-semibold">
                    {client}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            {t('trust.certs.title')}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 px-6 py-3 rounded-full"
              >
                <span className="text-green-400 font-semibold">
                  {cert}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustIndicators;
