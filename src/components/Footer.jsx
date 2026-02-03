import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { Link } from 'react-router-dom';
import { LINKS } from '@/config/links';

const Footer = () => {
  const { t } = useI18n();

  const footerLinks = {
    product: [
      {
        label: t("footer.product.docs"),
        href: "/documentation",
        external: false,
      },
      {
        label: t("demo.menu.demo"),
        href: "/demo",
        external: false,
      },
      {
        label: t("footer.product.api"),
        href: LINKS.rapidapi.playground,
        external: true,
      },
      {
        label: t("footer.product.pricing"),
        href: "/pricing",
        external: false,
      },
    ],

    company: [
      { label: t("footer.company.about"), href: "/about", external: false },
    ],

    legal: [
      { label: t("footer.legal.privacy"), href: "/privacy", external: false },
      { label: t("footer.legal.terms"), href: "/terms", external: false },
    ],
  };




  const socialLinks = [
    { icon: Github, label: t('footer.social.github') },
    { icon: Twitter, label: t('footer.social.twitter') },
    { icon: Linkedin, label: t('footer.social.linkedin') },
    { icon: Mail, label: t('footer.social.email') },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-white mb-3">
                {t('footer.brand.title')}
              </h3>

              <p className="text-gray-400 mb-6 max-w-sm">
                {t('footer.brand.description')}
              </p>

              {/* Social icons (non-clickable) */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    whileHover={{ scale: 1.1, y: -2 }}
                    aria-label={social.label}
                    className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition-colors duration-300 cursor-default"
                  >
                    <social.icon className="w-5 h-5 text-gray-400 hover:text-white" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4">
                {t(`footer.sections.${category}`)}
              </h4>

              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-8 border-t border-slate-800"
        >
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
