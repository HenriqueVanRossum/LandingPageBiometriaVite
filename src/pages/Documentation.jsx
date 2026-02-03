import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/I18nProvider';

import DocumentationSection from '@/components/DocumentationSection';

const Documentation = () => {
  const { t } = useI18n();

  return (
    <>
      <Helmet>
        <title>{t('docs.meta.title')}</title>
        <meta name="description" content={t('docs.meta.description')} />

        <link rel="canonical" href="https://lenzid.com/documentation" />

        <meta property="og:title" content={t('docs.meta.title')} />
        <meta property="og:description" content={t('docs.meta.description')} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lenzid.com/documentation" />
      </Helmet>

      <div className="relative z-0 min-h-screen bg-slate-950 text-gray-300 pt-24">

        <section className="pb-6">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {t('docs.page.title')}
              </h1>

              <p className="text-gray-400 text-lg">
                {t('docs.page.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Full documentation */}
        <DocumentationSection />
      </div>
    </>
  );
};

export default Documentation;
