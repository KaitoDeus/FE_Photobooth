// ============================================
// Component: Navbar
// ============================================

import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { getTranslation } from '../../i18n';
import './Navbar.css';

export interface NavbarProps {
  lang: Language;
  onNavigate: (path: string) => void;
  currentPath: string;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onNavigate, currentPath }) => {
  const t = getTranslation(lang).navbar;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll detection for hiding navbar
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled (for styling)
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine if scrolling down (for hiding)
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t.home },
    { path: '/about', label: t.about },
    { path: '/instructions', label: t.instructions },
    { path: '/contact', label: 'Liên hệ' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${isHidden ? 'navbar--hidden' : ''}`}>
      <div className="navbar__container">
        {/* Logo */}
        <button className="navbar__logo" onClick={() => onNavigate('/')}>
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
