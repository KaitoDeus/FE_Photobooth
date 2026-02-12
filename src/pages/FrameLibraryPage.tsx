import React, { useState, useEffect, useCallback } from 'react';
import { Search, ChevronDown, Cherry, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from '../components/common/Reveal';

interface Frame {
  id: string;
  name: string;
  layout: string;
  category: string;
  color: string;
  borderColor: string;
  textColor: string;
}

const frames: Frame[] = [
  { id: '1', name: 'XinhAirlines', layout: '1x4', category: 'COOL', color: 'bg-blue-50', borderColor: 'border-blue-400', textColor: 'text-blue-500' },
  { id: '2', name: 'Quốc Khánh 2/9', layout: '1x4', category: 'EVENT', color: 'bg-red-50', borderColor: 'border-red-500', textColor: 'text-red-500' },
  { id: '3', name: 'Seonghyeon', layout: '1x4', category: 'CUTE', color: 'bg-pink-50', borderColor: 'border-pink-300', textColor: 'text-pink-400' },
  { id: '4', name: 'Basic-11', layout: '1x4', category: 'BASIC', color: 'bg-purple-50', borderColor: 'border-purple-300', textColor: 'text-purple-400' },
  { id: '5', name: 'Vintage Film', layout: '1x4', category: 'COOL', color: 'bg-amber-50', borderColor: 'border-amber-700', textColor: 'text-amber-700' },
  { id: '6', name: 'Summer Vibe', layout: '1x4', category: 'CUTE', color: 'bg-green-50', borderColor: 'border-green-400', textColor: 'text-green-500' },
  { id: '9', name: 'Basic-6', layout: '2x2', category: 'BASIC', color: 'bg-slate-50', borderColor: 'border-slate-800', textColor: 'text-slate-800' },
  { id: '10', name: 'Magazine', layout: '2x2', category: 'COOL', color: 'bg-white', borderColor: 'border-black', textColor: 'text-black' },
  { id: '11', name: 'Valentine\'s Day', layout: '2x2', category: 'CUTE', color: 'bg-pink-50', borderColor: 'border-pink-400', textColor: 'text-pink-500' },
  { id: '12', name: 'Basic-4', layout: '2x2', category: 'BASIC', color: 'bg-orange-50', borderColor: 'border-orange-600', textColor: 'text-orange-600' },
  { id: '17', name: 'Loopy', layout: '2x3', category: 'CUTE', color: 'bg-pink-50', borderColor: 'border-pink-300', textColor: 'text-pink-400' },
  { id: '18', name: 'Basic-5', layout: '2x3', category: 'BASIC', color: 'bg-yellow-50', borderColor: 'border-yellow-600', textColor: 'text-yellow-700' },
  { id: '7', name: 'Cyberpunk', layout: '1x4', category: 'COOL', color: 'bg-slate-900', borderColor: 'border-cyan-400', textColor: 'text-cyan-400' },
  { id: '19', name: 'Netflix', layout: '2x3', category: 'COOL', color: 'bg-black', borderColor: 'border-red-600', textColor: 'text-red-600' },
];

const FrameStrip = ({ frame, filled, size = 'md' }: { frame: Frame; filled: boolean; size?: 'sm' | 'md' }) => {
  const isStrip = frame.layout === '1x4';
  const slotCount = frame.layout === '2x3' ? 6 : 4;
  const slots = Array.from({ length: slotCount }, (_, i) => i + 1);

  const sizeClasses = {
      sm: {
          '1x4': 'w-12 h-36', // 48px x 144px
          'other': 'w-24 h-36' // 96px x 144px
      },
      md: {
          '1x4': 'w-16 h-48', // 64px x 192px
          'other': 'w-32 h-48' // 128px x 192px
      }
  };

  const dimensions = frame.layout === '1x4' ? sizeClasses[size]['1x4'] : sizeClasses[size]['other'];

  let wrapperClasses = `border-2 py-1 px-1 gap-1 shadow-sm transition-transform hover:scale-105 duration-300 ${frame.borderColor} ${filled ? 'translate-y-2' : ''} ${dimensions}`;
  
  if (frame.layout === '1x4') {
    wrapperClasses += ' flex flex-col items-center justify-between';
  } else {
    // Grid layouts (2x2, 2x3)
    wrapperClasses += ' grid';
    if (frame.layout === '2x2') wrapperClasses += ' grid-cols-2 grid-rows-2';
    if (frame.layout === '2x3') wrapperClasses += ' grid-cols-2 grid-rows-3';
  }

  return (
    <div 
      className={wrapperClasses}
      style={{ backgroundColor: filled ? 'white' : 'transparent' }}
    >
        {slots.map((i) => (
            <div 
                key={i} 
                className={`w-full h-full border ${filled ? 'bg-slate-200' : 'bg-white'} border-slate-100/50 overflow-hidden relative`}
            >
                {filled && (
                    <img 
                      src={`https://picsum.photos/seed/${frame.id}-${i}/100/100`} 
                      alt="pose" 
                      className="w-full h-full object-cover opacity-80"
                      loading="lazy"
                      onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.style.backgroundColor = '#e2e8f0';
                      }}
                    />
                )}
            </div>
        ))}
    </div>
  );
};


interface CustomDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ value, options, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
         setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
       <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium bg-white hover:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 flex justify-between items-center transition-all duration-300 hover:shadow-md"
       >
          <span>{value === 'All' ? placeholder : value}</span>
          <ChevronDown size={18} className={`text-slate-400 transition-transform duration-500 ${isOpen ? 'rotate-180 text-brand-500' : ''}`} />
       </button>
       
       <div className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-brand-100 overflow-hidden transition-all duration-300 origin-top z-50 ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
           <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((option) => (
                  <div 
                     key={option}
                     onClick={() => { onChange(option); setIsOpen(false); }}
                     className={`px-4 py-3 cursor-pointer transition-colors duration-200 text-sm font-medium ${value === option ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-500'}`}
                  >
                     {option === 'All' ? placeholder : option}
                  </div>
              ))}
           </div>
       </div>
    </div>
  );
};

const FrameCard: React.FC<{ frame: Frame; index: number; onClick: () => void }> = ({ frame, index, onClick }) => {
  return (
    <Reveal key={frame.id} delay={index * 0.05} className="group h-full">
      <div 
        className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-brand-100 hover:border-brand-400 flex flex-col items-center h-full cursor-pointer relative"
        onClick={onClick}
      >
        <div className="flex justify-center gap-2 sm:gap-4 w-full mb-4">
             {/* Left: Original */}
             <div className="flex flex-col items-center gap-3">
                 <div className="bg-brand-50/30 p-2 rounded-xl">
                    <FrameStrip frame={frame} filled={false} size="sm" />
                 </div>
                 <span className="px-3 py-1 bg-brand-300 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-sm">Khung Gốc</span>
             </div>

             {/* Right: Preview */}
             <div className="flex flex-col items-center gap-3">
                 <div className="bg-blue-50/30 p-2 rounded-xl">
                    <FrameStrip frame={frame} filled={true} size="sm" />
                 </div>
                 <span className="px-3 py-1 bg-blue-300 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-sm">Xem trước</span>
             </div>
        </div>

        {/* Info */}
        <div className="mt-auto text-center">
             <h3 className={`text-lg sm:text-xl font-bold text-brand-500 mb-1`}>{frame.name}</h3>
             <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {frame.layout} • {frame.category}
             </p>
        </div>
      </div>
    </Reveal>
  );
};

const FrameLibraryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLayout, setActiveLayout] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredFrames = frames.filter(frame => {
    const matchesCategory = activeCategory === 'All' || frame.category === activeCategory;
    const matchesLayout = activeLayout === 'All' || frame.layout === activeLayout;
    const matchesSearch = frame.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesLayout && matchesSearch;
  });

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null && filteredFrames.length > 0 ? (prev + 1) % filteredFrames.length : null));
  }, [filteredFrames.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null && filteredFrames.length > 0 ? (prev - 1 + filteredFrames.length) % filteredFrames.length : null));
  }, [filteredFrames.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  const categories = ['All', 'COOL', 'CUTE', 'BASIC', 'EVENT', 'VINTAGE'];
  const layouts = ['All', '1x4', '2x2', '2x3'];

  return (
    <div className="pt-20 min-h-screen bg-brand-50">
        <section id="features" className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <Reveal className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
             <Cherry className="text-brand-500 animate-bounce" />
             <h2 className="text-3xl md:text-4xl font-bold text-brand-500">
               Kho Frame
             </h2>
             <Cherry className="text-brand-500 animate-bounce" />
          </div>
          <p className="text-green-500 font-medium">
            Xem trước ảnh lên khung nhé ✨
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal className="bg-white border border-slate-100 shadow-lg rounded-2xl p-4 mb-16 w-full mx-auto relative z-30">
            <div className="flex flex-col md:flex-row gap-4">
                 <div className="relative w-full md:w-1/4 z-20">
                    <CustomDropdown 
                        value={activeLayout}
                        options={layouts}
                        onChange={setActiveLayout}
                        placeholder="Tất Cả Layout"
                    />
                 </div>
                 <div className="relative w-full md:w-1/4 z-10">
                    <CustomDropdown 
                        value={activeCategory}
                        options={categories}
                        onChange={setActiveCategory}
                        placeholder="Tất Cả Danh Mục"
                    />
                 </div>
                 <div className="relative w-full md:w-2/4">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500" size={20} />
                    <input 
                        type="text" 
                        placeholder="Tìm tên khung..." 
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-brand-500 hover:border-brand-300 transition-all duration-300 hover:shadow-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
            </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredFrames.map((frame, index) => (
                <FrameCard 
                    key={frame.id} 
                    frame={frame} 
                    index={index} 
                    onClick={() => setSelectedIndex(index)}
                />
            ))}
        </div>

      </div>
        </section>

      {/* Lightbox Modal */}
      {selectedIndex !== null && filteredFrames[selectedIndex] && (
        <div 
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
        >
            {/* Close Button */}
            <button 
                onClick={() => setSelectedIndex(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20 z-10"
            >
                <X size={24} />
            </button>

            {/* Prev Button */}
            <button 
                onClick={handlePrev}
                className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors bg-white/10 p-3 rounded-full hover:bg-white/20 z-10"
            >
                <ChevronLeft size={32} />
            </button>

            {/* Frame Content */}
            <div 
                className="relative max-w-full max-h-full flex items-center justify-center p-10 animate-in fade-in zoom-in duration-300 select-none"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="transform scale-[1.5] md:scale-[2] pointer-events-none">
                     <FrameStrip frame={filteredFrames[selectedIndex]} filled={true} />
                </div>
            </div>

            {/* Next Button */}
            <button 
                onClick={handleNext}
                className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors bg-white/10 p-3 rounded-full hover:bg-white/20 z-10"
            >
                <ChevronRight size={32} />
            </button>
        </div>
      )}
    </div>
  );
};

export default FrameLibraryPage;
