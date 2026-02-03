import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useI18n } from '@/i18n/I18nProvider';

import Pricing from '@/components/Pricing';
import FinalCTA from '@/components/FinalCTA';

const PricingPage = () => {
  const { t } = useI18n();

  return (
    <>
      <Helmet>
        <title>{t('pricing.meta.title')}</title>
        <meta name="description" content={t('pricing.meta.description')} />

        <link rel="canonical" href="https://lenzid.com/pricing" />

        <meta property="og:title" content={t('pricing.meta.og.title')} />
        <meta property="og:description" content={t('pricing.meta.og.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lenzid.com/pricing" />
      </Helmet>
      <div className="min-h-screen bg-slate-950 scroll-smooth">
        <Pricing />
        <FinalCTA />
      </div>
    </>
  );
};

export default PricingPage;
