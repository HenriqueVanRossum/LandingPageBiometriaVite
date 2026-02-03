import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';
import { LINKS } from '@/config/links';

const MainMenu = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const menuLinks = [
  { label: t("footer.company.about"), href: "/about", external: false },
  { label: t("footer.product.docs"), href: "/documentation", external: false },

  
  { label: t("demo.menu.demo"), href: "/demo", external: false },

  { label: t("footer.product.api"), href: LINKS.rapidapi.playground, external: true },
  { label: t("footer.product.pricing"), href: "/pricing", external: false },

  { label: t("footer.legal.privacy"), href: "/privacy", external: false },
  { label: t("footer.legal.terms"), href: "/terms", external: false },
];


  // 🔹 Fecha ao clicar fora (botão + menu)
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-white font-bold text-lg">
          {t('footer.brand.title')}
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-8">
          {menuLinks.map((link, i) =>
            link.external ? (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={i}
                to={link.href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile: botão + menu */}
        <div ref={wrapperRef} className="md:hidden">

          {/* Hamburger / X animado */}
          <button
            onClick={() => setOpen(v => !v)}
            className="relative w-8 h-8 text-white"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className={`absolute left-0 top-1/2 w-full h-0.5 bg-white transition-all duration-300 ${
                open ? 'rotate-45' : '-translate-y-2'
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 w-full h-0.5 bg-white transition-all duration-300 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 w-full h-0.5 bg-white transition-all duration-300 ${
                open ? '-rotate-45' : 'translate-y-2'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu — MESMO FUNDO, MESMA ESTRUTURA */}
      {open && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800">
          <nav className="flex flex-col px-4 py-4 gap-4">
            {menuLinks.map((link, i) =>
              link.external ? (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={i}
                  to={link.href}
                  className="text-gray-300 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default MainMenu;
