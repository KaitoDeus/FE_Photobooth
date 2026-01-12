// ============================================
// Page: Mode Selection - Chọn kiểu ảnh & thời gian
// ============================================

import React, { useState } from 'react';
import { Language, PhotoMode } from '../../../types';
import { getTranslation } from '../../../i18n';
import { Button } from '../../../components/common';
import './ModeSelectionPage.css';

export interface ModeSelectionPageProps {
  onSelectMode: (mode: PhotoMode, countdownSeconds: number) => void;
  lang: Language;
}

// Layout options with icons
interface LayoutOption {
  mode: PhotoMode;
  photoCount: number;
  icon: React.ReactNode;
  labelEn: string;
  labelVi: string;
}

const layoutOptions: LayoutOption[] = [
  // 4 ảnh dọc (1 cột x 4 hàng)
  {
    mode: PhotoMode.LAYOUT_4_STRIP,
    photoCount: 4,
    icon: (
      <svg viewBox="0 0 12 32" fill="currentColor">
        <rect x="1" y="1" width="10" height="6" rx="1" />
        <rect x="1" y="9" width="10" height="6" rx="1" />
        <rect x="1" y="17" width="10" height="6" rx="1" />
        <rect x="1" y="25" width="10" height="6" rx="1" />
      </svg>
    ),
    labelEn: '4 photos',
    labelVi: '4 ảnh',
  },
  // 4 ảnh lưới (2x2)
  {
    mode: PhotoMode.LAYOUT_4_GRID,
    photoCount: 4,
    icon: (
      <svg viewBox="0 0 22 22" fill="currentColor">
        <rect x="1" y="1" width="9" height="9" rx="1" />
        <rect x="12" y="1" width="9" height="9" rx="1" />
        <rect x="1" y="12" width="9" height="9" rx="1" />
        <rect x="12" y="12" width="9" height="9" rx="1" />
      </svg>
    ),
    labelEn: '4 photos',
    labelVi: '4 ảnh',
  },
  // 6 ảnh lưới (2x3)
  {
    mode: PhotoMode.LAYOUT_6_GRID,
    photoCount: 6,
    icon: (
      <svg viewBox="0 0 22 32" fill="currentColor">
        <rect x="1" y="1" width="9" height="9" rx="1" />
        <rect x="12" y="1" width="9" height="9" rx="1" />
        <rect x="1" y="12" width="9" height="9" rx="1" />
        <rect x="12" y="12" width="9" height="9" rx="1" />
        <rect x="1" y="23" width="9" height="9" rx="1" />
        <rect x="12" y="23" width="9" height="9" rx="1" />
      </svg>
    ),
    labelEn: '6 photos',
    labelVi: '6 ảnh',
  },
];

const countdownOptions = [3, 5, 10];

/**
 * Mode Selection Page - Choose photo layout and countdown time
 */
export const ModeSelectionPage: React.FC<ModeSelectionPageProps> = ({ 
  onSelectMode, 
  lang 
}) => {
  const t = getTranslation(lang).mode;
  const [selectedMode, setSelectedMode] = useState<PhotoMode>(PhotoMode.LAYOUT_4_GRID);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(3);
  const [showTimerDropdown, setShowTimerDropdown] = useState(false);


  const handleContinue = () => {
    onSelectMode(selectedMode, countdownSeconds);
  };

  const handleTimerSelect = (seconds: number) => {
    setCountdownSeconds(seconds);
    setShowTimerDropdown(false);
  };

  return (
    <div className="mode-page">
      {/* Background */}
      <div className="mode-page__bg">
        <div className="mode-page__bg-gradient"></div>
        <div className="mode-page__bg-glow mode-page__bg-glow--1"></div>
        <div className="mode-page__bg-glow mode-page__bg-glow--2"></div>
      </div>

      {/* Header */}
      <div className="mode-page__header">
        <span className="mode-page__step">{t.step}</span>
        <h1 className="mode-page__title">{t.headline}</h1>
        <p className="mode-page__subtitle">{t.subhead}</p>
      </div>

      {/* Timer Selector */}
      <div className="mode-page__controls">
        <div className="mode-page__selector">
          <button 
            className="mode-page__selector-btn"
            onClick={() => setShowTimerDropdown(!showTimerDropdown)}
          >
            <svg className="mode-page__selector-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <span className="mode-page__selector-label">
              {lang === 'en' ? `Delay ${countdownSeconds}s` : `Trễ ${countdownSeconds} giây`}
            </span>
            <svg className="mode-page__selector-arrow" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>

          {/* Timer Dropdown */}
          {showTimerDropdown && (
            <div className="mode-page__dropdown mode-page__dropdown--timer">
              {countdownOptions.map((seconds) => (
                <button
                  key={seconds}
                  className={`mode-page__dropdown-item ${countdownSeconds === seconds ? 'mode-page__dropdown-item--active' : ''}`}
                  onClick={() => handleTimerSelect(seconds)}
                >
                  <span className="mode-page__dropdown-label">
                    {lang === 'en' ? `${seconds} seconds` : `${seconds} giây`}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Layout Selection Grid - 3 cards */}
      <div className="mode-page__preview">
        <h3 className="mode-page__preview-title">
          {lang === 'en' ? 'Select Layout' : 'Chọn kiểu bố cục'}
        </h3>
        <div className="mode-page__layout-grid mode-page__layout-grid--3cols">
          {layoutOptions.map((layout) => (
            <button
              key={layout.mode}
              className={`mode-page__layout-card ${selectedMode === layout.mode ? 'mode-page__layout-card--active' : ''}`}
              onClick={() => setSelectedMode(layout.mode)}
            >
              <div className="mode-page__layout-icon">{layout.icon}</div>
              <span className="mode-page__layout-label">
                {lang === 'en' ? layout.labelEn : layout.labelVi}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="mode-page__footer">
        <Button
          variant="primary"
          size="lg"
          onClick={handleContinue}
          className="mode-page__continue-btn"
          rightIcon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          }
        >
          {t.continue}
        </Button>
      </div>

      {/* Click outside to close dropdown */}
      {showTimerDropdown && (
        <div 
          className="mode-page__overlay"
          onClick={() => setShowTimerDropdown(false)}
        />
      )}
    </div>
  );
};

export default ModeSelectionPage;
