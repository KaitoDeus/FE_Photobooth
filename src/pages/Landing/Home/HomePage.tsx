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
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ lang, onNavigate }) => {
  const t = getTranslation(lang).home;

  const features = [
    {
      icon: null,
      title: t.feature1Title,
      desc: t.feature1Desc,
    },
    {
      icon: null,
      title: t.feature2Title,
      desc: t.feature2Desc,
    },
    {
      icon: null,
      title: t.feature3Title,
      desc: t.feature3Desc,
    },
  ];

  const whyItems = [
    { icon: '', title: t.why1Title, desc: t.why1Desc },
    { icon: '', title: t.why2Title, desc: t.why2Desc },
    { icon: '', title: t.why3Title, desc: t.why3Desc },
  ];



  return (
    <div className="home-page">
      <Navbar lang={lang} onNavigate={onNavigate} currentPath="/home" />

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
              {t.startBtn}
            </button>
            <button className="home-page__hero-btn home-page__hero-btn--secondary" onClick={() => onNavigate('/contact')}>
              {'Liên hệ'}
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
      </section>

      <Footer lang={lang} onNavigate={onNavigate} />
    </div>
  );
};

export default HomePage;
