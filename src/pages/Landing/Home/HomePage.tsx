// ============================================
// Page: Home - Landing Page
// ============================================

import React from 'react';
import { Language } from '../../../types';
import { getTranslation } from '../../../i18n';
import { Navbar, Footer } from '../../../components/layout';
import './HomePage.css';

export interface HomePageProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ lang, setLang, onNavigate }) => {
  const t = getTranslation(lang).home;

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: t.feature1Title,
      desc: t.feature1Desc,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-7c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/>
        </svg>
      ),
      title: t.feature2Title,
      desc: t.feature2Desc,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8 6h8v-8h-8v8zm2-6h4v4h-4v-4z"/>
        </svg>
      ),
      title: t.feature3Title,
      desc: t.feature3Desc,
    },
  ];

  const whyItems = [
    { icon: '⚡', title: t.why1Title, desc: t.why1Desc },
    { icon: '🔒', title: t.why2Title, desc: t.why2Desc },
    { icon: '📸', title: t.why3Title, desc: t.why3Desc },
  ];



  return (
    <div className="home-page">
      <Navbar lang={lang} setLang={setLang} onNavigate={onNavigate} currentPath="/home" />

      {/* Hero Section */}
      <section className="home-page__hero">
        <div className="home-page__hero-bg">
          <div className="home-page__hero-glow home-page__hero-glow--1"></div>
          <div className="home-page__hero-glow home-page__hero-glow--2"></div>
        </div>
        
        <div className="home-page__hero-content">
          <span className="home-page__badge">{t.badge}</span>
          <h1 className="home-page__hero-title">
            {t.heroTitle}
            <br />
            <span className="home-page__hero-highlight">{t.heroHighlight}</span>
          </h1>
          <p className="home-page__hero-desc">{t.heroDesc}</p>
          
          <div className="home-page__hero-actions">
            <button className="home-page__hero-btn home-page__hero-btn--primary" onClick={() => onNavigate('/booth')}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
              {t.startBtn}
            </button>
            <button className="home-page__hero-btn home-page__hero-btn--secondary" onClick={() => onNavigate('/contact')}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              {lang === 'vi' ? 'Liên hệ' : 'Contact'}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-page__features">
        <div className="home-page__section-header">
          <h2 className="home-page__section-title">{t.featuresTitle}</h2>
          <p className="home-page__section-desc">{t.featuresDesc}</p>
        </div>

        <div className="home-page__features-grid">
          {features.map((feature, index) => (
            <div key={index} className="home-page__feature-card">
              <div className="home-page__feature-icon">{feature.icon}</div>
              <h3 className="home-page__feature-title">{feature.title}</h3>
              <p className="home-page__feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Section */}
      <section className="home-page__why">
        <div className="home-page__why-content">
          <h2 className="home-page__why-title">
            {t.whyTitle}
            <br />
            <span className="home-page__why-highlight">{t.whyHighlight}</span>
          </h2>

          <div className="home-page__why-list">
            {whyItems.map((item, index) => (
              <div key={index} className="home-page__why-item">
                <span className="home-page__why-icon">{item.icon}</span>
                <div className="home-page__why-text">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="home-page__cta">
        <div className="home-page__cta-content">
          <h2 className="home-page__cta-title">{t.ctaTitle}</h2>
          <p className="home-page__cta-desc">{t.ctaDesc}</p>
          <button className="home-page__cta-btn" onClick={() => onNavigate('/booth')}>
            {t.ctaBtn}
          </button>
        </div>
        <div className="home-page__cta-icon">📷</div>
      </section>

      <Footer lang={lang} onNavigate={onNavigate} />
    </div>
  );
};

export default HomePage;
