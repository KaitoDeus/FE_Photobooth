// ============================================
// Page: About Us - Redesigned
// ============================================

import React from 'react';
import { Language } from '../../../types';
import { getTranslation } from '../../../i18n';
import { Navbar, Footer } from '../../../components/layout';
import './AboutPage.css';

export interface AboutPageProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang, setLang, onNavigate }) => {
  const t = getTranslation(lang).about;

  const values = [
    { icon: '✨', title: t.value1Title, desc: t.value1Desc, color: '#a855f7' },
    { icon: '🎨', title: t.value2Title, desc: t.value2Desc, color: '#ec4899' },
    { icon: '🔒', title: t.value3Title, desc: t.value3Desc, color: '#6366f1' },
  ];

  const stats = [
    { value: '1M+', label: t.stat1, icon: '📸' },
    { value: '50K+', label: t.stat2, icon: '👥' },
    { value: '10K+', label: t.stat3, icon: '🎉' },
    { value: '50+', label: t.stat4, icon: '🌍' },
  ];

  const timeline = [
    { year: '2024', title: lang === 'en' ? 'The Beginning' : 'Khởi Đầu', desc: lang === 'en' ? 'PHOTObooth was born from a simple idea' : 'PHOTObooth ra đời từ ý tưởng đơn giản' },
    { year: '2024', title: lang === 'en' ? 'First Release' : 'Phiên Bản Đầu', desc: lang === 'en' ? 'Launched with core features' : 'Ra mắt với các tính năng cốt lõi' },
    { year: '2025', title: lang === 'en' ? 'AI Integration' : 'Tích Hợp AI', desc: lang === 'en' ? 'Smart filters and effects added' : 'Thêm bộ lọc và hiệu ứng thông minh' },
  ];

  return (
    <div className="about-page">
      <Navbar lang={lang} setLang={setLang} onNavigate={onNavigate} currentPath="/about" />

      {/* Hero Section */}
      <section className="about-page__hero">
        <div className="about-page__hero-bg">
          <div className="about-page__hero-glow about-page__hero-glow--1"></div>
          <div className="about-page__hero-glow about-page__hero-glow--2"></div>
        </div>
        <div className="about-page__hero-content">
          <span className="about-page__hero-badge">🚀 {lang === 'en' ? 'About Us' : 'Về Chúng Tôi'}</span>
          <h1 className="about-page__hero-title">
            {t.heroTitle.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="about-page__hero-highlight">{t.heroTitle.split(' ').slice(-1)}</span>
          </h1>
          <p className="about-page__hero-desc">{t.heroDesc}</p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="about-page__stats-banner">
        {stats.map((stat, index) => (
          <div key={index} className="about-page__stat-item">
            <span className="about-page__stat-icon">{stat.icon}</span>
            <span className="about-page__stat-value">{stat.value}</span>
            <span className="about-page__stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Story Section */}
      <section className="about-page__story">
        <div className="about-page__story-container">
          <div className="about-page__story-badge">📖 {t.storyTitle}</div>
          <div className="about-page__story-content">
            <p className="about-page__story-text">{t.storyP1}</p>
            <p className="about-page__story-text">{t.storyP2}</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-page__timeline">
        <h2 className="about-page__section-title">{lang === 'en' ? 'Our Journey' : 'Hành Trình'}</h2>
        <div className="about-page__timeline-track">
          {timeline.map((item, index) => (
            <div key={index} className="about-page__timeline-item">
              <div className="about-page__timeline-dot"></div>
              <div className="about-page__timeline-year">{item.year}</div>
              <h4 className="about-page__timeline-title">{item.title}</h4>
              <p className="about-page__timeline-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="about-page__vision">
        <div className="about-page__vision-bg"></div>
        <div className="about-page__vision-content">
          <span className="about-page__vision-icon">🎯</span>
          <h2 className="about-page__vision-title">{t.visionTitle}</h2>
          <p className="about-page__vision-desc">{t.visionDesc}</p>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-page__values">
        <h2 className="about-page__section-title">{t.valuesTitle}</h2>
        <div className="about-page__values-grid">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="about-page__value-card"
              style={{'--accent-color': value.color} as React.CSSProperties}
            >
              <div className="about-page__value-icon-wrapper">
                <span className="about-page__value-icon">{value.icon}</span>
              </div>
              <h3 className="about-page__value-title">{value.title}</h3>
              <p className="about-page__value-desc">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-page__cta">
        <div className="about-page__cta-content">
          <h2 className="about-page__cta-title">{lang === 'en' ? 'Ready to start?' : 'Sẵn sàng bắt đầu?'}</h2>
          <p className="about-page__cta-desc">{lang === 'en' ? 'Experience the magic of PHOTObooth today' : 'Trải nghiệm sự kỳ diệu của PHOTObooth ngay hôm nay'}</p>
          <button className="about-page__cta-btn" onClick={() => onNavigate('/booth')}>
            {getTranslation(lang).home.startBtn}
          </button>
        </div>
      </section>

      <Footer lang={lang} onNavigate={onNavigate} />
    </div>
  );
};

export default AboutPage;
