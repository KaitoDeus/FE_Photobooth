// ============================================
// Page: Thank You
// ============================================

import React, { useEffect, useState } from 'react';
import { Language } from '../../../types';
import { getTranslation } from '../../../i18n';
import { Button } from '../../../components/common';
import './ThankYouPage.css';

export interface ThankYouPageProps {
  onReset: () => void;
  lang: Language;
  autoResetSeconds?: number;
}

/**
 * Thank You Page - Final screen after printing
 */
export const ThankYouPage: React.FC<ThankYouPageProps> = ({ 
  onReset, 
  lang,
  autoResetSeconds = 15,
}) => {
  const t = getTranslation(lang).thankYou;
  const [countdown, setCountdown] = useState(autoResetSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onReset();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onReset]);

  return (
    <div className="thankyou-page">
      {/* Background */}
      <div className="thankyou-page__bg">
        <div className="thankyou-page__bg-gradient"></div>
        <div className="thankyou-page__bg-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="thankyou-page__particle"
              style={{
                '--delay': `${Math.random() * 5}s`,
                '--duration': `${3 + Math.random() * 4}s`,
                '--x': `${Math.random() * 100}%`,
              } as React.CSSProperties}
            ></div>
          ))}
        </div>
        <div className="thankyou-page__bg-glow thankyou-page__bg-glow--1"></div>
        <div className="thankyou-page__bg-glow thankyou-page__bg-glow--2"></div>
      </div>

      {/* Content */}
      <div className="thankyou-page__content">
        {/* Success Icon */}
        <div className="thankyou-page__icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>

        {/* Title */}
        <h1 className="thankyou-page__title">{t.title}</h1>
        
        {/* Subtitle */}
        <div className="thankyou-page__subtitle-group">
          <p className="thankyou-page__subtitle">{t.subtitle}</p>
          <p className="thankyou-page__subtitle-secondary">{t.subtitle2}</p>
        </div>

        {/* Auto reset countdown */}
        <div className="thankyou-page__countdown">
          <div className="thankyou-page__countdown-circle">
            <svg viewBox="0 0 100 100">
              <circle
                className="thankyou-page__countdown-bg"
                cx="50"
                cy="50"
                r="45"
              />
              <circle
                className="thankyou-page__countdown-progress"
                cx="50"
                cy="50"
                r="45"
                style={{
                  strokeDashoffset: ((autoResetSeconds - countdown) / autoResetSeconds) * 283,
                }}
              />
            </svg>
            <span className="thankyou-page__countdown-number">{countdown}</span>
          </div>
          <span className="thankyou-page__countdown-label">{t.seconds}</span>
        </div>

        <p className="thankyou-page__auto-text">{t.autoReturn}</p>

        {/* Shoot Again Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={onReset}
          leftIcon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/>
            </svg>
          }
        >
          {t.shootAgain}
        </Button>
      </div>
    </div>
  );
};

export default ThankYouPage;
