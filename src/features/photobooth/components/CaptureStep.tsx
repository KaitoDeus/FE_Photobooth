import React from 'react';
import { LAYOUTS } from '../constants';
import { LayoutType } from '../types';

interface CaptureStepProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  flash: boolean;
  countDown: number | null;
  selectedLayout: LayoutType;
  photos: string[];
}

const CaptureStep: React.FC<CaptureStepProps> = ({
  videoRef,
  flash,
  countDown,
  selectedLayout,
  photos,
}) => {
  return (
    <div className="relative w-full h-full min-h-[500px] bg-black rounded-3xl overflow-hidden flex flex-col items-center justify-center">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="absolute inset-0 w-full h-full object-cover transform -scale-x-100" 
      />
      
      <div className={`absolute inset-0 bg-white transition-opacity duration-150 pointer-events-none ${flash ? 'opacity-100' : 'opacity-0'}`} />
      
      {countDown && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20">
          <span className="text-9xl font-bold text-white drop-shadow-lg animate-ping">{countDown}</span>
        </div>
      )}

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {Array.from({ length: LAYOUTS.find(l => l.id === selectedLayout)?.count || 4 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-3 h-3 rounded-full transition-colors ${i < photos.length ? 'bg-brand-500' : 'bg-white/30'}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default CaptureStep;
