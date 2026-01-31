// ============================================
// Page: Contact Info
// ============================================

import React from 'react';
import { Language } from '../../../types';
import { Navbar, Footer } from '../../../components/layout';
import './ContactPage.css';

export interface ContactPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang, onNavigate }) => {

  return (
    <div className="contact-page">
      <Navbar 
        lang={lang} 
        onNavigate={onNavigate} 
        currentPath="/contact" 
      />

      <main className="contact-page__content">
        <div className="contact-page__card">
          {/* Profile Image Container */}
          <div className="contact-page__image-container">
            <img 
              src="/images/avatar.jpg"
              alt="Developer" 
              className="contact-page__image"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('contact-page__image-fallback');
              }}
            />
            <div className="contact-page__image-fallback-content">
              <span></span>
            </div>
          </div>

          <h2 className="contact-page__role">NHÀ PHÁT TRIỂN</h2>
          <h1 className="contact-page__name">Võ Anh Khải</h1>

          <p className="contact-page__bio">
            Dự án cá nhân thể hiện kỹ năng phát triển React, TypeScript và Spring Boot.
          </p>

          <div className="contact-page__tags">
            <span className="contact-page__tag">React</span>
            <span className="contact-page__tag">TypeScript</span>
            <span className="contact-page__tag">Spring Boot</span>
            <span className="contact-page__tag">MySQL</span>
          </div>

          <div className="contact-page__links">
            <a href="mailto:voanhkhai@example.com" className="contact-page__link">
              Gửi Email
            </a>
            <a href="#" className="contact-page__link">
              LinkedIn
            </a>
            <a href="https://github.com/voanhkhai" className="contact-page__link">
              GitHub
            </a>
          </div>
        </div>
      </main>

      <Footer lang={lang} onNavigate={onNavigate} />
    </div>
  );
};
