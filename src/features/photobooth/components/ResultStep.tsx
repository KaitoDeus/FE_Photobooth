import React from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import Button from '../../../components/common/Button';
import { THEMES } from '../constants';
import { LayoutType, FrameTheme } from '../types';

interface ResultStepProps {
  photos: string[];
  selectedLayout: LayoutType;
  selectedTheme: FrameTheme;
  onRetake: () => void;
  onBooking: () => void;
}

const ResultStep: React.FC<ResultStepProps> = ({
  photos,
  selectedLayout,
  selectedTheme,
  onRetake,
  onBooking,
}) => {
  const gridClass = 
    selectedLayout === 'CLASSIC_4' ? 'grid-cols-2 aspect-[3/4]' :
    selectedLayout === 'FUN_6' ? 'grid-cols-2 aspect-[1/2]' : 
    'grid-cols-1 aspect-[1/2]';

  return (
    <div className="p-4 md:p-8 flex flex-col md:flex-row gap-8 items-center justify-center">
      <div 
        className={`
          relative p-4 shadow-2xl rotate-1 transition-transform hover:rotate-0 duration-500 
          ${THEMES[selectedTheme]} border-4 max-w-sm w-full rounded-sm
        `}
      >
        <div className={`grid ${gridClass} gap-3`}>
          {photos.map((photo, idx) => (
            <img 
              key={idx} 
              src={photo} 
              className="w-full h-full object-cover border border-black/5 block shadow-sm bg-white" 
              alt={`Capture ${idx}`} 
            />
          ))}
        </div>

        <div className={`mt-4 text-center font-bold tracking-widest uppercase text-xs opacity-70 ${selectedTheme === 'EVENT' ? 'text-white' : 'text-slate-900'}`}>
          Palette Studio • {new Date().toLocaleDateString('vi-VN')}
        </div>
        
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white/30 w-8 h-8 rounded-full backdrop-blur-md border border-white/40 shadow-inner"></div>
      </div>

      <div className="flex flex-col gap-4 max-w-xs text-center md:text-left">
        <h3 className="text-2xl font-bold text-slate-900">Xinh quá trời ơi! 😍</h3>
        <p className="text-slate-600 text-sm">
          Đây chỉ là ảnh demo thôi đó. Ghé studio để được chụp với ánh sáng chuyên nghiệp và nhận ảnh in xịn xò nhé!
        </p>
        
        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={onBooking}>
            <Sparkles size={18} className="mr-2" />
            Đặt Lịch Chụp Thật
          </Button>
          <Button variant="secondary" onClick={onRetake}>
            <RefreshCw size={18} className="mr-2" />
            Chụp Lại Demo
          </Button>
        </div>
        
        <p className="text-xs text-brand-400 mt-2 italic">
          *Ảnh demo không được lưu trên hệ thống để bảo vệ quyền riêng tư.
        </p>
      </div>
    </div>
  );
};

export default ResultStep;
