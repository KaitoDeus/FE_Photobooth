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
    { path: '/', label: t.home, icon: '' },
    { path: '/about', label: t.about, icon: '' },
    { path: '/contact', label: 'Liên hệ', icon: '' },
    { path: '/instructions', label: t.instructions, icon: '' },
    { path: '/booth', label: t.enterBooth || 'Photo Booth', icon: '' },
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
          <span>Quay lại</span>
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
          <span>{menuOpen ? '✕' : '☰'}</span>
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
