import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import privacy480 from "@/assets/images/privacy-480.webp";
import privacy800 from "@/assets/images/privacy-800.webp";
import privacy1200 from "@/assets/images/privacy-1200.webp";

const PrivacyTrust = () => {
  const { t } = useI18n();

  const trustPoints = [
    t('privacy.points.1'),
    t('privacy.points.2'),
    t('privacy.points.3'),
    t('privacy.points.4'),
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {t('privacy.title')}
            </h2>

            <p className="text-xl text-gray-400 mb-8">
              {t('privacy.subtitle')}
            </p>

            <div className="space-y-4">
              {trustPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-1.5 rounded-lg mt-1 group-hover:scale-110 transition-transform duration-300">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={privacy800}
                  srcSet={`
                    ${privacy480} 480w,
                    ${privacy800} 800w,
                    ${privacy1200} 1200w
                  `}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                  decoding="async"
                  alt={t("privacy.imageAlt")}
                  className="w-full h-auto object-cover"
                />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyTrust;
