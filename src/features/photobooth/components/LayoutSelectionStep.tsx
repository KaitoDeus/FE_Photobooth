import React from 'react';
import { ChevronRight } from 'lucide-react';
import Button from '../../../components/common/Button';
import { LAYOUTS, THEMES } from '../constants';
import { LayoutType, FrameTheme } from '../types';

interface LayoutSelectionStepProps {
  selectedLayout: LayoutType;
  selectedTheme: FrameTheme;
  onSelectLayout: (layout: LayoutType) => void;
  onSelectTheme: (theme: FrameTheme) => void;
  onConfirm: () => void;
}

const LayoutSelectionStep: React.FC<LayoutSelectionStepProps> = ({
  selectedLayout,
  selectedTheme,
  onSelectLayout,
  onSelectTheme,
  onConfirm,
}) => {
  return (
    <div className="p-6 md:p-10">
      <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Bước 1: Chọn Kiểu Ảnh</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {LAYOUTS.map((layout) => (
          <button
            key={layout.id}
            onClick={() => onSelectLayout(layout.id)}
            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
              selectedLayout === layout.id 
                ? 'border-brand-500 bg-brand-50 text-brand-600' 
                : 'border-slate-200 hover:border-brand-200 text-slate-500'
            }`}
          >
            {layout.icon}
            <span className="font-semibold">{layout.name}</span>
            <span className="text-xs">{layout.description}</span>
          </button>
        ))}
      </div>

      <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">Chọn Màu Viền</h4>
      <div className="flex gap-4 justify-center mb-10">
        {(Object.keys(THEMES) as FrameTheme[]).map((theme) => (
          <button
            key={theme}
            onClick={() => onSelectTheme(theme)}
            className={`w-10 h-10 rounded-full border-2 shadow-sm transition-transform ${
              selectedTheme === theme ? 'scale-125 ring-2 ring-offset-2 ring-brand-300' : 'hover:scale-110'
            } ${theme === 'MINIMAL' ? 'bg-white' : theme === 'CUTE' ? 'bg-pink-300' : theme === 'PASTEL' ? 'bg-blue-200' : 'bg-slate-800'}`}
          />
        ))}
      </div>

      <div className="text-center">
        <Button onClick={onConfirm} fullWidth>Tiếp Tục <ChevronRight size={18} /></Button>
      </div>
    </div>
  );
};

export default LayoutSelectionStep;
