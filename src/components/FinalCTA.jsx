import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/I18nProvider';
import { LINKS } from '@/config/links';

const FinalCTA = () => {
  const { t } = useI18n();

  const handleStartFree = () => {
    window.open(LINKS.rapidapi.playground, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ backgroundSize: '200% 200%' }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('finalCta.title')}
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            {t('finalCta.subtitle')}
          </p>

          <Button
            onClick={handleStartFree}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-10 py-7 text-lg rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            {t('finalCta.cta.startFree')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
