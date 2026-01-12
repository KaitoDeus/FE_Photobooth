// ============================================
// Page: Features - Redesigned
// ============================================

import React from 'react';
import { Language } from '../../../types';
import { getTranslation } from '../../../i18n';
import { Navbar, Footer } from '../../../components/layout';
import './FeaturesPage.css';

export interface FeaturesPageProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onNavigate: (path: string) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ lang, setLang, onNavigate }) => {
  const t = getTranslation(lang).features;

  const photoModes = [
    { icon: '📷', title: t.modesSingle, desc: t.modesSingleDesc, color: '#a855f7' },
    { icon: '🎞️', title: t.modesStrip, desc: t.modesStripDesc, color: '#ec4899' },
    { icon: '🔲', title: t.modesGrid, desc: t.modesGridDesc, color: '#6366f1' },
    { icon: '🎬', title: t.modesGif, desc: t.modesGifDesc, color: '#14b8a6' },
  ];

  const aiFeatures = [
    { icon: '✂️', title: t.aiBg, desc: t.aiBgDesc, badge: 'AI' },
    { icon: '🎨', title: t.aiFilters, desc: t.aiFiltersDesc, badge: 'NEW' },
    { icon: '🏷️', title: t.aiStickers, desc: t.aiStickersDesc, badge: '100+' },
  ];

  const shareOptions = [
    { icon: '📱', title: t.shareQr, desc: t.shareQrDesc },
    { icon: '⬇️', title: t.shareDownload, desc: t.shareDownloadDesc },
    { icon: '🖨️', title: t.sharePrint, desc: t.sharePrintDesc },
  ];

  const techSpecs = [
    { icon: '🌐', title: t.techBrowser, desc: t.techBrowserDesc },
    { icon: '📹', title: t.techCamera, desc: t.techCameraDesc },
    { icon: '📶', title: t.techConnection, desc: t.techConnectionDesc },
  ];

  return (
    <div className="features-page">
      <Navbar lang={lang} setLang={setLang} onNavigate={onNavigate} currentPath="/features" />

      {/* Hero Section */}
      <section className="features-page__hero">
        <div className="features-page__hero-bg">
          <div className="features-page__hero-glow features-page__hero-glow--1"></div>
          <div className="features-page__hero-glow features-page__hero-glow--2"></div>
          <div className="features-page__hero-glow features-page__hero-glow--3"></div>
        </div>
        <div className="features-page__hero-content">
          <span className="features-page__hero-badge">✨ Full Featured</span>
          <h1 className="features-page__hero-title">
            {t.heroTitle.split('&')[0]}
            <span className="features-page__hero-highlight">&{t.heroTitle.split('&')[1] || ''}</span>
          </h1>
          <p className="features-page__hero-desc">{t.heroDesc}</p>
        </div>
      </section>

      {/* Photo Modes - Horizontal showcase */}
      <section className="features-page__modes">
        <div className="features-page__modes-header">
          <span className="features-page__section-badge">📸</span>
          <h2 className="features-page__section-title">{t.modesTitle}</h2>
          <p className="features-page__section-subtitle">{lang === 'en' ? 'Choose your perfect capture style' : 'Chọn phong cách chụp hoàn hảo'}</p>
        </div>
        <div className="features-page__modes-showcase">
          {photoModes.map((mode, index) => (
            <div 
              key={index} 
              className="features-page__mode-card"
              style={{'--accent-color': mode.color} as React.CSSProperties}
            >
              <div className="features-page__mode-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="features-page__mode-icon-wrapper">
                <span className="features-page__mode-icon">{mode.icon}</span>
              </div>
              <h3 className="features-page__mode-title">{mode.title}</h3>
              <p className="features-page__mode-desc">{mode.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Features - Premium section */}
      <section className="features-page__ai">
        <div className="features-page__ai-bg"></div>
        <div className="features-page__ai-content">
          <div className="features-page__ai-header">
            <span className="features-page__ai-badge">🤖 Powered by AI</span>
            <h2 className="features-page__ai-title">{t.aiTitle}</h2>
            <p className="features-page__ai-subtitle">{lang === 'en' ? 'Smart technology for stunning results' : 'Công nghệ thông minh cho kết quả ấn tượng'}</p>
          </div>
          <div className="features-page__ai-grid">
            {aiFeatures.map((feature, index) => (
              <div key={index} className="features-page__ai-card">
                <div className="features-page__ai-card-badge">{feature.badge}</div>
                <div className="features-page__ai-card-icon">{feature.icon}</div>
                <h3 className="features-page__ai-card-title">{feature.title}</h3>
                <p className="features-page__ai-card-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Options */}
      <section className="features-page__share">
        <div className="features-page__share-header">
          <span className="features-page__section-badge">🚀</span>
          <h2 className="features-page__section-title">{t.shareTitle}</h2>
        </div>
        <div className="features-page__share-grid">
          {shareOptions.map((option, index) => (
            <div key={index} className="features-page__share-card">
              <div className="features-page__share-icon">{option.icon}</div>
              <div className="features-page__share-content">
                <h4 className="features-page__share-title">{option.title}</h4>
                <p className="features-page__share-desc">{option.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Requirements */}
      <section className="features-page__tech">
        <div className="features-page__tech-header">
          <h2 className="features-page__section-title">{t.techTitle}</h2>
        </div>
        <div className="features-page__tech-cards">
          {techSpecs.map((spec, index) => (
            <div key={index} className="features-page__tech-card">
              <span className="features-page__tech-icon">{spec.icon}</span>
              <h4 className="features-page__tech-title">{spec.title}</h4>
              <p className="features-page__tech-desc">{spec.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="features-page__cta">
        <div className="features-page__cta-content">
          <h2 className="features-page__cta-title">{lang === 'en' ? 'Ready to capture moments?' : 'Sẵn sàng lưu khoảnh khắc?'}</h2>
          <button className="features-page__cta-btn" onClick={() => onNavigate('/booth')}>
            {getTranslation(lang).home.startBtn}
          </button>
        </div>
      </section>

      <Footer lang={lang} onNavigate={onNavigate} />
    </div>
  );
};

export default FeaturesPage;
