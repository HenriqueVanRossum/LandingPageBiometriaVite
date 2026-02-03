import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useI18n } from '@/i18n/I18nProvider';
import { LINKS } from '@/config/links';
const DeveloperIntegration = () => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('javascript');
  const { toast } = useToast();

  const codeExamples = {
    javascript: `// Create biometric session (Enroll)
const response = await fetch(
  'https://auth-face-biometric-authentication-api.p.rapidapi.com/wp-json/biometry/v1/enroll',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': 'auth-face-biometric-authentication-api.p.rapidapi.com',
      'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY'
    },
    body: JSON.stringify({
      external_user_id: 'YOUR_USER_ID',
      redirect_url: 'https://www.google.com',
      client_state: 'uuid-generated-by-client'
    })
  }
);

const data = await response.json();

if (data.success) {
  // Redirect user to biometric capture
  window.location.href = data.biometry_url;
}`,

    python: `import requests

url = 'https://auth-face-biometric-authentication-api.p.rapidapi.com/wp-json/biometry/v1/enroll'

headers = {
    'Content-Type': 'application/json',
    'x-rapidapi-host': 'auth-face-biometric-authentication-api.p.rapidapi.com',
    'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY'
}

payload = {
    'external_user_id': 'YOUR_USER_ID',
    'redirect_url': 'https://www.google.com',
    'client_state': 'uuid-generated-by-client'
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

if data.get('success'):
    biometry_url = data['biometry_url']`,

    curl: `curl --request POST \\
  --url https://auth-face-biometric-authentication-api.p.rapidapi.com/wp-json/biometry/v1/enroll \\
  --header 'Content-Type: application/json' \\
  --header 'x-rapidapi-host: auth-face-biometric-authentication-api.p.rapidapi.com' \\
  --header 'x-rapidapi-key: YOUR_RAPIDAPI_KEY' \\
  --data '{
    "external_user_id": "YOUR_USER_ID",
    "redirect_url": "https://www.google.com",
    "client_state": "uuid-generated-by-client"
  }'

# Response example:
{
  "success": true,
  "client_state": "cc85686d-a091-4459-8b55-520a2d571be0",
  "biometry_url": "https://auth.lenzid.com/?t=<SIGNED_SESSION_TOKEN>"
}`,
  };

  const handleViewDocs = () => {
    window.open(LINKS.rapidapi.home, '_blank', 'noopener,noreferrer');
  };


  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('dev.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('dev.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Language Tabs */}
          <div className="flex gap-2 mb-4">
            {['javascript', 'python', 'curl'].map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveTab(lang)}
                className={`px-6 py-3 rounded-t-xl font-semibold transition-all duration-300 ${
                  activeTab === lang
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-slate-800 text-gray-400 hover:text-white'
                }`}
              >
                {t(`dev.tabs.${lang}`)}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl blur-2xl" />
            <div className="relative bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-2xl">
              <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre">
                <code>{codeExamples[activeTab]}</code>
              </pre>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={handleViewDocs}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              {t('dev.cta.docs')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DeveloperIntegration;
