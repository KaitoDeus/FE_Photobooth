// ============================================
// Page: Countdown
// ============================================

import React from 'react';
import { Language } from '../../../types';
import { getTranslation } from '../../../i18n';
import { useCountdown } from '../../../hooks';
import './CountdownPage.css';

export interface CountdownPageProps {
  onComplete: () => void;
  lang: Language;
  countdownSeconds?: number;
  shotNumber?: number;
  totalShots?: number;
}

/**
 * Countdown Page - Countdown before photo capture
 */
export const CountdownPage: React.FC<CountdownPageProps> = ({ 
  onComplete, 
  lang,
  countdownSeconds = 3,
  shotNumber = 1,
  totalShots = 1,
}) => {
  const t = getTranslation(lang).countdown;
  
  const { seconds, isComplete } = useCountdown({
    initialSeconds: countdownSeconds,
    autoStart: true,
    onComplete,
  });

  return (
    <div className="countdown-page">
      {/* Background with flash effect */}
      <div className={`countdown-page__bg ${isComplete ? 'countdown-page__bg--flash' : ''}`}>
        <div className="countdown-page__bg-gradient"></div>
        <div className="countdown-page__bg-radial"></div>
      </div>

      {/* Shot counter */}
      {totalShots > 1 && (
        <div className="countdown-page__shot-counter">
          <span className="countdown-page__shot-label">{t.shot}</span>
          <span className="countdown-page__shot-number">{shotNumber}/{totalShots}</span>
        </div>
      )}

      {/* Main countdown */}
      <div className="countdown-page__content">
        {!isComplete ? (
          <>
            <p className="countdown-page__label">{t.getReady}</p>
            <div className="countdown-page__number-wrapper">
              <span 
                key={seconds} // Force re-render for animation
                className="countdown-page__number"
              >
                {seconds}
              </span>
            </div>
          </>
        ) : (
          <div className="countdown-page__flash-text">
            {t.flash}
          </div>
        )}
      </div>

      {/* Progress ring */}
      <svg className="countdown-page__ring" viewBox="0 0 100 100">
        <circle
          className="countdown-page__ring-bg"
          cx="50"
          cy="50"
          r="45"
        />
        <circle
          className="countdown-page__ring-progress"
          cx="50"
          cy="50"
          r="45"
          style={{
            strokeDashoffset: (seconds / countdownSeconds) * 283,
          }}
        />
      </svg>
    </div>
  );
};

export default CountdownPage;
