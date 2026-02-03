import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nProvider';
import BackToHomeButton from '@/components/BackToHomeButton';

const Terms = () => {
  const { t } = useI18n();

  return (
    <>
      <Helmet>
        <title>{t('terms.meta.title')}</title>
        <meta name="description" content={t('terms.meta.description')} />

        <link rel="canonical" href="https://lenzid.com/terms" />

        <meta property="og:title" content={t('terms.meta.title')} />
        <meta property="og:description" content={t('terms.meta.description')} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lenzid.com/terms" />
      </Helmet>

      <div className="min-h-screen bg-slate-950 text-gray-300">
        <section className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {t('terms.policy.title')}
              </h1>

              <div className="mb-8">
                <BackToHomeButton />
              </div>

              <p className="text-gray-400 mb-10">
                {t('terms.updatedAt')}
              </p>

              <div className="space-y-8 text-base leading-relaxed">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <section key={n}>
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      {t(`terms.sections.${n}.title`)}
                    </h2>
                    <p>{t(`terms.sections.${n}.text`)}</p>
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

export default Terms;
