import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/I18nProvider';
import { LINKS } from '@/config/links';
import hero480 from "@/assets/images/hero-480.webp";
import hero960 from "@/assets/images/hero-960.webp";
import hero1920 from "@/assets/images/hero-1920.webp";


const Hero = () => {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let idleId;

    if ('requestIdleCallback' in window) {
      idleId = requestIdleCallback(() => setAnimate(true));
    } else {
      idleId = setTimeout(() => setAnimate(true), 300);
    }

    return () => {
      if ('cancelIdleCallback' in window) {
        cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

  {/* ✅ Background local (melhor LCP) */}
  <img
    src={hero960}
    srcSet={`
      ${hero480} 480w,
      ${hero960} 960w,
      ${hero1920} 1920w
    `}
    sizes="100vw"
    alt=""
    loading="eager"
    decoding="async"
    className="absolute inset-0 w-full h-full object-cover"
  />




      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-slate-900/80" />

      {/* Floating Icons (animam depois do LCP) */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-blue-500/20"
        initial={false}
        animate={animate && !reduceMotion ? { y: [0, -20, 0] } : false}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Shield size={80} />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/4 text-purple-500/20"
        initial={false}
        animate={animate && !reduceMotion ? { y: [0, 20, 0] } : false}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <Lock size={60} />
      </motion.div>

      {/* ✅ Content (min-height evita CLS) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[520px]">

        <motion.div
          initial={false}
          animate={animate && !reduceMotion ? { y: [0, -6, 0] } : false}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl"
        >
          {/* H1 puro */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              {t('hero.title.highlight')}
            </span>
            <br />
            <span className="text-white">
              {t('hero.title.main')}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-300 text-center max-w-4xl mx-auto mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() =>
                window.open(LINKS.rapidapi.playground, '_blank', 'noopener,noreferrer')
              }
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-7 text-lg rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              {t('hero.cta.startFree')}
            </Button>

            <Button
              onClick={() =>
                window.open(LINKS.rapidapi.home, '_blank', 'noopener,noreferrer')
              }
              variant="outline"
              className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-6 text-lg rounded-xl backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              {t('hero.cta.tryRapidapi')}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={false}
        animate={animate && !reduceMotion ? { y: [0, 10, 0] } : false}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={animate && !reduceMotion ? { y: [0, 16, 0] } : false}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
