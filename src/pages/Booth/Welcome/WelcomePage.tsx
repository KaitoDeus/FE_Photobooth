// ============================================
// Page: Welcome
// ============================================

import React, { useEffect } from 'react';
import { Language } from '../../../types';
import { getTranslation } from '../../../i18n';
import { Button } from '../../../components/common';
import './WelcomePage.css';

export interface WelcomePageProps {
  onStart: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

/**
 * Welcome Page - Entry point of the photobooth application
 */
export const WelcomePage: React.FC<WelcomePageProps> = ({ onStart, lang, setLang }) => {
  const t = getTranslation(lang).welcome;

  // Handle spacebar press to start
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        onStart();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStart]);

  return (
    <div className="welcome-page">
      {/* Language Switcher */}
      <div className="welcome-page__lang-switcher">
        <button 
          onClick={() => setLang('en')}
          className={`welcome-page__lang-btn ${lang === 'en' ? 'welcome-page__lang-btn--active' : ''}`}
        >
          EN
        </button>
        <button 
          onClick={() => setLang('vi')}
          className={`welcome-page__lang-btn ${lang === 'vi' ? 'welcome-page__lang-btn--active' : ''}`}
        >
          VI
        </button>
      </div>

      {/* Background Effects */}
      <div className="welcome-page__bg">
        <div className="welcome-page__bg-gradient"></div>
        <div className="welcome-page__bg-glow welcome-page__bg-glow--1"></div>
        <div className="welcome-page__bg-glow welcome-page__bg-glow--2"></div>
        <div className="welcome-page__bg-grain"></div>
      </div>

      {/* Main Content */}
      <div className="welcome-page__content">
        {/* Logo Area */}
        <div className="welcome-page__logo">
          <div className="welcome-page__logo-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5zM8.5 11c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm7 0c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/>
            </svg>
          </div>
          <h1 className="welcome-page__title">
            PHOTO<span className="welcome-page__title-highlight">BOOTH</span>
          </h1>
        </div>

        {/* CTA Area */}
        <div className="welcome-page__cta">
          <Button 
            variant="primary" 
            size="xl" 
            fullWidth
            onClick={onStart}
            className="welcome-page__start-btn"
            leftIcon={
              <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/>
              </svg>
            }
          >
            {t.cta}
          </Button>
          
          <div className="welcome-page__helper">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
            </svg>
            <span>{t.helper}</span>
          </div>
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="welcome-page__footer">
        <div className="welcome-page__instruction">
          <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
            <path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"/>
          </svg>
          <p>
            {t.touch} 
            <span className="welcome-page__key">{t.space}</span> 
            {t.toStart}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
