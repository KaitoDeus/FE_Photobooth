// ============================================
// Component: Navbar
// ============================================

import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { getTranslation } from '../../i18n';
import './Navbar.css';

export interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onNavigate: (path: string) => void;
  currentPath: string;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, onNavigate, currentPath }) => {
  const t = getTranslation(lang).navbar;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Theme state - default to dark mode
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { path: '/', label: t.home },
    { path: '/features', label: t.features },
    { path: '/about', label: t.about },
    { path: '/instructions', label: t.instructions },
    { path: '/contact', label: lang === 'vi' ? 'Liên hệ' : 'Contact' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <button className="navbar__logo" onClick={() => onNavigate('/')}>
          <span className="navbar__logo-icon">📷</span>
          <span className="navbar__logo-text">PHOTO<span>booth</span></span>
        </button>

        {/* Desktop Navigation */}
        <div className="navbar__links">
          {navLinks.map((link) => (
            <button
              key={link.path}
              className={`navbar__link ${currentPath === link.path ? 'navbar__link--active' : ''}`}
              onClick={() => handleNavClick(link.path)}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div className="navbar__actions">
          {/* Language Switcher */}
          <div className="navbar__lang">
            <button
              className={`navbar__lang-btn ${lang === 'en' ? 'navbar__lang-btn--active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <span className="navbar__lang-divider">/</span>
            <button
              className={`navbar__lang-btn ${lang === 'vi' ? 'navbar__lang-btn--active' : ''}`}
              onClick={() => setLang('vi')}
            >
              VI
            </button>
          </div>

          {/* Theme Toggle */}
          <button 
            className="navbar__theme-toggle" 
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* CTA Button */}
          <button className="navbar__cta" onClick={() => onNavigate('/booth')}>
            {t.enterBooth}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`navbar__hamburger ${mobileMenuOpen ? 'navbar__hamburger--open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${mobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        {navLinks.map((link) => (
          <button
            key={link.path}
            className={`navbar__mobile-link ${currentPath === link.path ? 'navbar__mobile-link--active' : ''}`}
            onClick={() => handleNavClick(link.path)}
          >
            {link.label}
          </button>
        ))}
        <button className="navbar__mobile-cta" onClick={() => handleNavClick('/booth')}>
          {t.enterBooth}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
