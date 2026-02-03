import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Camera, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const HowItWorks = () => {
  const { t } = useI18n();

  const steps = [
    {
      number: 1,
      icon: PlusCircle,
      title: t('how.steps.1.title'),
      description: t('how.steps.1.description'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      number: 2,
      icon: Camera,
      title: t('how.steps.2.title'),
      description: t('how.steps.2.description'),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      number: 3,
      icon: Shield,
      title: t('how.steps.3.title'),
      description: t('how.steps.3.description'),
      gradient: 'from-orange-500 to-red-500',
    },
    {
      number: 4,
      icon: CheckCircle,
      title: t('how.steps.4.title'),
      description: t('how.steps.4.description'),
      gradient: 'from-green-500 to-emerald-500',
    },
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
            {t('how.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('how.subtitle')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 items-stretch">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative h-full flex"
            >
              <div className={`bg-gradient-to-br ${step.gradient} p-[2px] rounded-2xl h-full flex`}>
                <div className="bg-slate-900 rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`bg-gradient-to-br ${step.gradient} p-3 rounded-xl`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-5xl font-bold text-white/10">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line flex-1">
                    {step.description}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-8 h-8 text-gray-600" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-[2px] rounded-2xl shadow-2xl">
            <div className="bg-slate-900 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-400">cURL</span>
                <span className="text-xs text-blue-400">
                  {t('how.code.label')}
                </span>
              </div>

              <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre">
<code>{`curl --request POST \\
  --url https://auth-face-biometric-authentication-api.p.rapidapi.com/wp-json/biometry/v1/enroll \\
  --header 'Content-Type: application/json' \\
  --header 'x-rapidapi-host: auth-face-biometric-authentication-api.p.rapidapi.com' \\
  --header 'x-rapidapi-key: YOUR_RAPIDAPI_KEY' \\
  --data '{
    "external_user_id": "YOUR_USER_ID",
    "redirect_url": "https://client.example.com/final-redirect",
    "client_state": "uuid-generated-by-client"
  }'`}</code>
</pre>


              <div className="mt-4 pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  {t('how.code.footer')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
