import { useState, useRef, useEffect, useCallback } from 'react';
import { BoothStep, LayoutType, FrameTheme } from '../types';
import { LAYOUTS } from '../constants';

export const usePhotoBooth = () => {
  const [step, setStep] = useState<BoothStep>('INTRO');
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('CLASSIC_4');
  const [selectedTheme, setSelectedTheme] = useState<FrameTheme>('MINIMAL');
  const [photos, setPhotos] = useState<string[]>([]);
  const [countDown, setCountDown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setPermissionDenied(false);
    } catch (err) {
      console.error("Camera error:", err);
      setPermissionDenied(true);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      if (video.readyState < 2 || video.videoWidth === 0 || video.videoHeight === 0) {
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1); 
        ctx.filter = 'contrast(1.1) brightness(1.05) saturate(1.1)';
        ctx.drawImage(video, 0, 0);
        ctx.restore();
        
        setPhotos(prev => [...prev, canvas.toDataURL('image/jpeg', 0.9)]);
      }
    }
  }, []);

  const startCaptureSequence = async () => {
    setStep('CAPTURE');
    setPhotos([]);
    const targetCount = LAYOUTS.find(l => l.id === selectedLayout)?.count || 4;

    for (let i = 0; i < targetCount; i++) {
      for (let c = 3; c > 0; c--) {
        setCountDown(c);
        await new Promise(r => setTimeout(r, 1000));
      }
      setCountDown(null);

      setFlash(true);
      capturePhoto();
      await new Promise(r => setTimeout(r, 150));
      setFlash(false);

      if (i < targetCount - 1) {
        await new Promise(r => setTimeout(r, 2000));
      }
    }

    stopCamera();
    setStep('PROCESSING');
    await new Promise(r => setTimeout(r, 2000));
    setStep('RESULT');
  };

  const handleStart = () => setStep('SELECT_FRAME');

  const handleConfirmSelection = () => {
    startCamera();
    setStep('INSTRUCTION');
  };

  const handleRetake = () => {
    setPhotos([]);
    startCamera();
    setStep('INSTRUCTION');
  };
  
  const goToStart = () => {
    setStep('INTRO');
    setPhotos([]);
  };

  return {
    state: {
      step,
      selectedLayout,
      selectedTheme,
      photos,
      countDown,
      flash,
      permissionDenied
    },
    refs: {
      videoRef,
      canvasRef
    },
    actions: {
        setStep,
        setSelectedLayout,
        setSelectedTheme,
        startCamera,
        startCaptureSequence,
        handleStart,
        handleConfirmSelection,
        handleRetake,
        goToStart
    }
  };
};
