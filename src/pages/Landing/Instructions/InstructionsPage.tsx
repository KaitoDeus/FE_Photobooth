// ============================================
// Page: Instructions - How to Use PHOTObooth
// ============================================

import React from 'react';
import { Language } from '../../../types';
import { getTranslation } from '../../../i18n';
import { Navbar, Footer } from '../../../components/layout';
import './InstructionsPage.css';

export interface InstructionsPageProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onNavigate: (path: string) => void;
}

export const InstructionsPage: React.FC<InstructionsPageProps> = ({ lang, setLang, onNavigate }) => {
  const t = getTranslation(lang).instructions;

  const steps = [
    {
      step: '1',
      icon: '🖱️',
      title: t.step1Title,
      desc: t.step1Desc,
    },
    {
      step: '2',
      icon: '📸',
      title: t.step2Title,
      desc: t.step2Desc,
    },
    {
      step: '3',
      icon: '🎨',
      title: t.step3Title,
      desc: t.step3Desc,
    },
    {
      step: '4',
      icon: '⏱️',
      title: t.step4Title,
      desc: t.step4Desc,
    },
    {
      step: '5',
      icon: '✅',
      title: t.step5Title,
      desc: t.step5Desc,
    },
    {
      step: '6',
      icon: '📲',
      title: t.step6Title,
      desc: t.step6Desc,
    },
  ];

  const tips = [
    { icon: '💡', text: t.tip1 },
    { icon: '💡', text: t.tip2 },
    { icon: '💡', text: t.tip3 },
  ];

  return (
    <div className="instructions-page">
      <Navbar lang={lang} setLang={setLang} onNavigate={onNavigate} currentPath="/instructions" />

      {/* Hero Section */}
      <section className="instructions-page__hero">
        <div className="instructions-page__hero-bg">
          <div className="instructions-page__hero-glow"></div>
        </div>
        <h1 className="instructions-page__hero-title">{t.heroTitle}</h1>
        <p className="instructions-page__hero-desc">{t.heroDesc}</p>
      </section>

      {/* Steps Section */}
      <section className="instructions-page__steps">
        <h2 className="instructions-page__section-title">{t.stepsTitle}</h2>
        <div className="instructions-page__steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="instructions-page__step-card">
              <div className="instructions-page__step-number">{step.step}</div>
              <span className="instructions-page__step-icon">{step.icon}</span>
              <h3 className="instructions-page__step-title">{step.title}</h3>
              <p className="instructions-page__step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="instructions-page__tips">
        <h2 className="instructions-page__section-title">{t.tipsTitle}</h2>
        <div className="instructions-page__tips-list">
          {tips.map((tip, index) => (
            <div key={index} className="instructions-page__tip">
              <span className="instructions-page__tip-icon">{tip.icon}</span>
              <p className="instructions-page__tip-text">{tip.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="instructions-page__cta">
        <button className="instructions-page__cta-btn" onClick={() => onNavigate('/booth')}>
          {t.ctaBtn}
        </button>
      </section>

      <Footer lang={lang} onNavigate={onNavigate} />
    </div>
  );
};

export default InstructionsPage;
