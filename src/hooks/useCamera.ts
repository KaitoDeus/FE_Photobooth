// ============================================
// Custom Hook: useCamera
// ============================================

import { useState, useRef, useCallback, useEffect } from 'react';
import { PHOTO_CONFIG } from '../utils/constants';

interface UseCameraOptions {
  autoStart?: boolean;
  facingMode?: 'user' | 'environment';
}

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  stream: MediaStream | null;
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  capturePhoto: () => string | null;
  switchCamera: () => Promise<void>;
}

/**
 * Custom hook for camera operations
 */
export function useCamera(options: UseCameraOptions = {}): UseCameraReturn {
  const { autoStart = false, facingMode = 'user' } = options;
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFacingMode, setCurrentFacingMode] = useState<'user' | 'environment'>(facingMode);

  /**
   * Start camera stream
   */
  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: PHOTO_CONFIG.MAX_IMAGE_WIDTH },
          height: { ideal: PHOTO_CONFIG.MAX_IMAGE_HEIGHT },
          facingMode: currentFacingMode,
        },
        audio: false,
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
        setIsReady(true);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to access camera';
      setError(errorMessage);
      console.error('Camera error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentFacingMode]);

  /**
   * Stop camera stream
   */
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsReady(false);
  }, [stream]);

  /**
   * Capture photo from video stream
   */
  const capturePhoto = useCallback((): string | null => {
    if (!videoRef.current || !isReady) {
      return null;
    }

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return null;
    }

    // Flip horizontally for selfie mode
    if (currentFacingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0);

    return canvas.toDataURL(PHOTO_CONFIG.IMAGE_FORMAT, PHOTO_CONFIG.IMAGE_QUALITY);
  }, [isReady, currentFacingMode]);

  /**
   * Switch between front and back camera
   */
  const switchCamera = useCallback(async () => {
    stopCamera();
    setCurrentFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
    await startCamera();
  }, [stopCamera, startCamera]);

  // Auto start camera if option is enabled
  useEffect(() => {
    if (autoStart) {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [autoStart]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    videoRef,
    stream,
    isLoading,
    isReady,
    error,
    startCamera,
    stopCamera,
    capturePhoto,
    switchCamera,
  };
}

export default useCamera;
