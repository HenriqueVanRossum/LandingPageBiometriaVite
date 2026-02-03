import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Rocket, Star } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { LINKS } from '@/config/links';

const Pricing = () => {
  const { t } = useI18n();

  const plans = [
    {
      name: t('pricing.plans.basic.name'),
      price: t('pricing.plans.basic.price'),
      period: t('pricing.plans.basic.period'),
      icon: Zap,
      gradient: 'from-blue-600 to-blue-400',
      bgPattern: 'bg-blue-500/5',
      requests: t('pricing.plans.basic.requests'),
      dailyLimit: t('pricing.plans.basic.dailyLimit'),
      dailyLimitDetail: t('pricing.plans.basic.dailyLimitDetail'),
      userLimit: t('pricing.plans.basic.userLimit'),
      userLimitDetail: t('pricing.plans.basic.userLimitDetail'),
      bandwidth: t('pricing.plans.basic.bandwidth'),
      bandwidthFee: t('pricing.plans.basic.bandwidthFee'),
      cta: t('pricing.plans.basic.cta'),
      popular: false,
    },
    {
      name: t('pricing.plans.pro.name'),
      price: t('pricing.plans.pro.price'),
      period: t('pricing.plans.pro.period'),
      icon: Crown,
      gradient: 'from-purple-600 to-purple-400',
      bgPattern: 'bg-purple-500/5',
      requests: t('pricing.plans.pro.requests'),
      dailyLimit: t('pricing.plans.pro.dailyLimit'),
      dailyLimitDetail: t('pricing.plans.pro.dailyLimitDetail'),
      userLimit: t('pricing.plans.pro.userLimit'),
      userLimitDetail: t('pricing.plans.pro.userLimitDetail'),
      bandwidth: t('pricing.plans.pro.bandwidth'),
      bandwidthFee: t('pricing.plans.pro.bandwidthFee'),
      cta: t('pricing.plans.pro.cta'),
      popular: false,
    },
    {
      name: t('pricing.plans.ultra.name'),
      price: t('pricing.plans.ultra.price'),
      period: t('pricing.plans.ultra.period'),
      icon: Rocket,
      gradient: 'from-green-600 to-green-400',
      bgPattern: 'bg-green-500/5',
      requests: t('pricing.plans.ultra.requests'),
      dailyLimit: t('pricing.plans.ultra.dailyLimit'),
      dailyLimitDetail: t('pricing.plans.ultra.dailyLimitDetail'),
      userLimit: t('pricing.plans.ultra.userLimit'),
      userLimitDetail: t('pricing.plans.ultra.userLimitDetail'),
      bandwidth: t('pricing.plans.ultra.bandwidth'),
      bandwidthFee: t('pricing.plans.ultra.bandwidthFee'),
      cta: t('pricing.plans.ultra.cta'),
      popular: true,
    },
    {
      name: t('pricing.plans.mega.name'),
      price: t('pricing.plans.mega.price'),
      period: t('pricing.plans.mega.period'),
      icon: Star,
      gradient: 'from-orange-600 to-orange-400',
      bgPattern: 'bg-orange-500/5',
      requests: t('pricing.plans.mega.requests'),
      dailyLimit: t('pricing.plans.mega.dailyLimit'),
      dailyLimitDetail: t('pricing.plans.mega.dailyLimitDetail'),
      userLimit: t('pricing.plans.mega.userLimit'),
      userLimitDetail: t('pricing.plans.mega.userLimitDetail'),
      bandwidth: t('pricing.plans.mega.bandwidth'),
      bandwidthFee: t('pricing.plans.mega.bandwidthFee'),
      cta: t('pricing.plans.mega.cta'),
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative group"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className={`bg-gradient-to-r ${plan.gradient} px-4 py-1 rounded-full text-white text-sm font-semibold`}>
                    {t('pricing.popular')}
                  </div>
                </div>
              )}

              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-opacity duration-500`} />

              <div className={`relative bg-gradient-to-br ${plan.gradient} p-[2px] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300`}>
                <div className={`${plan.bgPattern} bg-slate-900 rounded-2xl p-6 h-full flex flex-col`}>
                  <div className={`bg-gradient-to-br ${plan.gradient} p-3 rounded-xl inline-block mb-4 self-start`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-2">{plan.period}</span>
                    </div>
                  </div>

                  <div className="mb-6 pb-6 border-b border-gray-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-400">{t('pricing.requestsLabel')}</span>
                    </div>
                    <div className="text-white font-semibold">{plan.requests}</div>
                  </div>

                  <div className="space-y-4 mb-8 flex-grow">
                    <div className="text-sm font-semibold text-gray-400 mb-3">
                      {t('pricing.featuresLabel')}
                    </div>

                    <div className="flex items-start">
                      <div className={`bg-gradient-to-br ${plan.gradient} p-1 rounded-full mr-3 mt-0.5`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <div className="text-gray-300 text-sm">{plan.dailyLimit}</div>
                        <div className="text-gray-500 text-xs">{plan.dailyLimitDetail}</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className={`bg-gradient-to-br ${plan.gradient} p-1 rounded-full mr-3 mt-0.5`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <div className="text-gray-300 text-sm">{plan.userLimit}</div>
                        <div className="text-gray-500 text-xs">{plan.userLimitDetail}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 text-sm">
                    <div className="text-gray-400 mb-1">{t('pricing.bandwidthLabel')}</div>
                    <div className="text-white">
                      {plan.bandwidth}{' '}
                      <span className="text-gray-500">{plan.bandwidthFee}</span>
                    </div>
                  </div>

                  <a
                    href={LINKS.rapidapi.pricing}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center w-full bg-gradient-to-r ${plan.gradient} text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
