import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nProvider';

const About = () => {
  const { t } = useI18n();

  return (
    <>
      <Helmet>
        <title>{t('about.meta.title')}</title>
        <meta name="description" content={t('about.meta.description')} />

        <link rel="canonical" href="https://lenzid.com/about" />

        <meta property="og:title" content={t('about.meta.title')} />
        <meta property="og:description" content={t('about.meta.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lenzid.com/about" />
      </Helmet>

      <div className="min-h-screen bg-slate-950 text-gray-300 pt-24">
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {t('about.title')}
              </h1>

              <p className="text-gray-400 mb-12">
                {t('about.subtitle')}
              </p>

              <div className="space-y-10 text-base leading-relaxed">
                {Array.from({ length: 5 }, (_, i) => i + 1).map((n) => (
                  <section key={n}>
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      {t(`about.sections.${n}.title`)}
                    </h2>
                    <p>{t(`about.sections.${n}.text`)}</p>
                  </section>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
