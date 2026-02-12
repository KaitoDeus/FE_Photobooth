import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Reveal from '../common/Reveal';
import { Star, Camera, Sparkles, ArrowRight } from 'lucide-react';
import img1 from '../../assets/1.webp';
import img2 from '../../assets/2.webp';
import img3 from '../../assets/3.webp';
import img4 from '../../assets/4.webp';
import img5 from '../../assets/5.webp';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [activeLayer, setActiveLayer] = useState(0);
  const heroImages = [img1, img2, img3, img4, img5];

  // Auto-slide logic for the layered carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className="relative pt-16 pb-20 lg:pt-28 lg:pb-36 overflow-hidden bg-brand-50">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-100/20 via-transparent to-white/30 -z-10 pointer-events-none" />
      <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] bg-brand-200/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] bg-blue-100/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Content with original strings */}
          <div className="text-center lg:text-left space-y-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-brand-100">
                <Star className="w-4 h-4 text-brand-400 fill-brand-400" />
                <span className="text-sm font-semibold text-slate-600 tracking-wide">
                  #1 Photobooth Chuẩn Hàn tại Việt Nam
                </span>
              </div>
            </Reveal>
            
            <Reveal delay={0.1}>
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-[6rem] font-black text-slate-900 leading-[1] tracking-tighter">
                  Photo 
                  <span className="text-brand-500 relative inline-block italic pr-4">
                    Palette
                    <svg className="absolute w-full h-4 -bottom-2 left-0 text-brand-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                  </span>
                </h1>
                <p className="text-xl font-black text-brand-600 tracking-[0.2em] uppercase pt-2 opacity-80">
                  PHOTO BOOTH | 09:30 ~ 23:00
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Button 
                  onClick={() => document.getElementById('photobooth')?.scrollIntoView({ behavior: 'smooth' })}
                  withIcon
                  size="lg"
                  className="group shadow-xl shadow-brand-100"
                >
                  Chụp Thử Online
                </Button>
                <Button 
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                     navigate('/gallery');
                     window.scrollTo(0, 0);
                  }}
                  className="hover:border-brand-400 transition-colors"
                >
                  Xem Ảnh Mẫu
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex items-center justify-center lg:justify-start gap-5 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white shadow-md overflow-hidden ring-1 ring-slate-100">
                      <img 
                        src={`https://picsum.photos/seed/${i + 70}/100/100`} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-yellow-400 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-slate-500 font-medium">Được yêu thích bởi <span className="text-slate-900 font-bold">5000+</span> khách hàng</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Side: Layered Image Carousel */}
          <div className="relative h-[480px] lg:h-[620px] flex items-center justify-center">
            <div className="relative w-full h-full max-w-[500px]">
              {heroImages.map((src, index) => {
                const isActive = activeLayer === index;
                const isNext = (activeLayer + 1) % heroImages.length === index;
                const isPrev = (activeLayer - 1 + heroImages.length) % heroImages.length === index;

                let zIndex = 0;
                let opacity = 0;
                let scale = 0.8;
                let xTranslate = 0;
                let rotate = 0;

                if (isActive) {
                  zIndex = 30;
                  opacity = 1;
                  scale = 1;
                  xTranslate = 0;
                  rotate = 0;
                } else if (isNext) {
                  zIndex = 20;
                  opacity = 0.6;
                  scale = 0.85;
                  xTranslate = 40;
                  rotate = 5;
                } else if (isPrev) {
                  zIndex = 10;
                  opacity = 0.3;
                  scale = 0.75;
                  xTranslate = -40;
                  rotate = -5;
                }

                return (
                  <div
                    key={index}
                    className="absolute inset-0 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) flex items-center justify-center"
                    style={{
                      zIndex,
                      opacity,
                      transform: `translateX(${xTranslate}px) scale(${scale}) rotate(${rotate}deg)`,
                      pointerEvents: isActive ? 'auto' : 'none'
                    }}
                  >
                    <div className="w-full h-full bg-white rounded-[3rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] p-3 border-4 border-white overflow-hidden group/card relative">
                      <img 
                        src={src} 
                        alt={`Moment ${index + 1}`} 
                        className="w-full h-full object-cover rounded-[2.5rem] transition-transform duration-700 group-hover/card:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                );
              })}

              {/* Decorative Badge */}
              <div className="absolute -bottom-2 -right-2 lg:-bottom-4 lg:-right-6 z-40 bg-brand-500 text-white w-16 h-16 lg:w-24 lg:h-24 rounded-full shadow-2xl animate-bounce flex flex-col items-center justify-center ring-4 lg:ring-6 ring-white transition-transform hover:scale-110">
                <Camera size={18} className="mb-0.5 lg:w-7 lg:h-7" />
                <span className="text-[8px] lg:text-[11px] font-black uppercase tracking-widest block text-center">Live</span>
              </div>

              {/* Indicator Dots */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2.5 z-40">
                {heroImages.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveLayer(i)}
                    className={`h-2 transition-all duration-500 rounded-full ${activeLayer === i ? 'w-10 bg-brand-500' : 'w-2 bg-slate-200 hover:bg-brand-300'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;