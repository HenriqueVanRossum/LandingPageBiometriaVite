import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useI18n } from '@/i18n/I18nProvider';

const DocumentationSection = () => {
  const { t } = useI18n();

  const sections = [
    'docs.api_overview.content',
    'docs.title.content',
    'docs.toc.content',
    'docs.overview.content',
    'docs.features.content',
    'docs.architecture.content',
    'docs.biometric_endpoints.content',
    'docs.base_payload.content',
    'docs.enroll.content',
    'docs.verify.content',
    'docs.identify.content',
    'docs.update_embedding.content',
    'docs.session_response.content',
    'docs.integration_flow.content',
    'docs.result_endpoint.content',
    'docs.management.content',
    'docs.security.content',
    'docs.best_practices.content',
    'docs.privacy.content',
  ];

  return (
    <section className="pt-6 bg-gradient-to-b from-slate-950 to-slate-900 pb-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {sections.map((key, index) => {
          const isIntegrationFlow = key === 'docs.integration_flow.content';

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.03 }}
              className="
                prose prose-invert prose-slate max-w-none
                mb-12
                prose-h1:mt-0
                prose-h1:mb-6
                overflow-x-auto
                prose-table:block
              "
            >
              {isIntegrationFlow ? (
                <div className="overflow-x-auto">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {t(key)}
                  </ReactMarkdown>
                </div>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {t(key)}
                </ReactMarkdown>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default DocumentationSection;
