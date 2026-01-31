// ============================================
// Component: FloatingNav - Global navigation header
// Back button + Menu dropdown for all pages
// ============================================

import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../../types';
import { getTranslation } from '../../i18n';
import './FloatingNav.css';

export interface FloatingNavProps {
  lang: Language;
  onBack?: () => void;
  onNavigate: (path: string) => void;
  showBack?: boolean;
  transparent?: boolean;
}

/**
 * Floating Navigation with Back button and Menu dropdown
 */
export const FloatingNav: React.FC<FloatingNavProps> = ({
  lang,
  onBack,
  onNavigate,
  showBack = true,
  transparent = true,
}) => {
  const t = getTranslation(lang).navbar;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuLinks = [
    { path: '/', label: t.home, icon: '🏠' },
    { path: '/about', label: t.about, icon: '📖' },
    { path: '/contact', label: lang === 'vi' ? 'Liên hệ' : 'Contact', icon: '📞' },
    { path: '/instructions', label: t.instructions, icon: '📋' },
    { path: '/booth', label: t.enterBooth || 'Photo Booth', icon: '📸' },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (path: string) => {
    onNavigate(path);
    setMenuOpen(false);
  };

  return (
    <div className={`floating-nav ${transparent ? 'floating-nav--transparent' : ''}`}>
      {/* Back Button */}
      {showBack && onBack && (
        <button className="floating-nav__back" onClick={onBack} aria-label="Go back">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          <span>{lang === 'vi' ? 'Quay lại' : 'Back'}</span>
        </button>
      )}

      {/* Spacer */}
      <div className="floating-nav__spacer" />

      {/* Menu Button */}
      <div className="floating-nav__menu-container" ref={menuRef}>
        <button 
          className={`floating-nav__menu-btn ${menuOpen ? 'floating-nav__menu-btn--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            {menuOpen ? (
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            ) : (
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            )}
          </svg>
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="floating-nav__dropdown">
            {menuLinks.map((link) => (
              <button
                key={link.path}
                className="floating-nav__dropdown-item"
                onClick={() => handleMenuClick(link.path)}
              >
                <span className="floating-nav__dropdown-icon">{link.icon}</span>
                <span className="floating-nav__dropdown-label">{link.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingNav;
