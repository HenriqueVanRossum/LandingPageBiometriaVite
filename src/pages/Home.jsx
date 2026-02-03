import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useI18n } from '@/i18n/I18nProvider';

import Hero from '@/components/Hero';

// Lazy abaixo da dobra
const HowItWorks = lazy(() => import('@/components/HowItWorks'));
const Features = lazy(() => import('@/components/Features'));
const PrivacyTrust = lazy(() => import('@/components/PrivacyTrust'));
const DeveloperIntegration = lazy(() => import('@/components/DeveloperIntegration'));
const TrustIndicators = lazy(() => import('@/components/TrustIndicators'));
const Pricing = lazy(() => import('@/components/Pricing'));
const FinalCTA = lazy(() => import('@/components/FinalCTA'));

/**
 * Skeleton leve para melhorar Speed Index
 */
const BelowFoldSkeleton = () => (
  <div className="max-w-6xl mx-auto px-4 py-24 space-y-24 opacity-30">
    <div className="h-40 bg-white/5 rounded-2xl" />
    <div className="h-40 bg-white/5 rounded-2xl" />
    <div className="h-40 bg-white/5 rounded-2xl" />
  </div>
);

const Home = () => {
  const { t } = useI18n();
  const [showBelowFold, setShowBelowFold] = useState(false);

  /**
   * Só carrega o conteúdo abaixo da dobra
   * quando o usuário começa a interagir
   */
  useEffect(() => {
    const onScroll = () => {
      setShowBelowFold(true);
      window.removeEventListener('scroll', onScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // fallback de segurança (caso não role)
    const timeout = setTimeout(() => setShowBelowFold(true), 3000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <link rel="canonical" href="https://lenzid.com/" />
      </Helmet>

      <div className="min-h-screen bg-slate-950 scroll-smooth">
        {/* 🔥 LCP real */}
        <Hero />

        {/* Conteúdo abaixo da dobra */}
        {showBelowFold && (
          <Suspense fallback={<BelowFoldSkeleton />}>
            <HowItWorks />
            <Features />
            <PrivacyTrust />
            <DeveloperIntegration />
            <TrustIndicators />
            <Pricing />
            <FinalCTA />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default Home;
