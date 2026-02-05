import React, { useEffect } from 'react';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Gallery from '../components/landing/Gallery';
import Pricing from '../components/landing/Pricing';
import HowItWorks from '../components/landing/HowItWorks';
import Testimonials from '../components/landing/Testimonials';
import PhotoBooth from '../features/photobooth/PhotoBooth';
import { useLocation } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {

        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
        window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="bg-brand-50 overflow-x-hidden font-sans">
      <Hero />
      <Features />
      <Gallery />
      <Pricing />
      <HowItWorks />
      <Testimonials />
      <PhotoBooth />
    </div>
  );
};

export default HomePage;
