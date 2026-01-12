// ============================================
// Page: Capture - Takes photo from camera stream
// ============================================

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { PhotoMode } from '../../../types';
import { requestCameraPermission, stopMediaStream } from '../../../utils';
import './CapturePage.css';

export interface CapturePageProps {
  mode: PhotoMode;
  currentShot: number;
  totalShots: number;
  selectedFilter: string;
  onPhotoCaptured: (photoDataUrl: string) => void;
  countdownSeconds: number;
}

/**
 * Capture Page - Shows camera preview with countdown and captures photo
 */
export const CapturePage: React.FC<CapturePageProps> = ({
  mode: _mode,
  currentShot,
  totalShots,
  selectedFilter,
  onPhotoCaptured,
  countdownSeconds,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [countdown, setCountdown] = useState(countdownSeconds);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  // Start camera on mount
  useEffect(() => {
    let mounted = true;
    
    const startCamera = async () => {
      const mediaStream = await requestCameraPermission();
      if (mounted && mediaStream && videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          if (mounted) {
            setIsCameraReady(true);
          }
        };
      }
    };
    
    startCamera();

    return () => {
      mounted = false;
      if (stream) {
        stopMediaStream(stream);
      }
    };
  }, []);

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stopMediaStream(stream);
      }
    };
  }, [stream]);

  // Countdown logic - only start when camera is ready
  useEffect(() => {
    if (!isCameraReady) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Take the photo!
      capturePhoto();
    }
  }, [countdown, isCameraReady]);

  // Capture photo from video stream
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Set canvas size to video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas (mirror effect)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    // Apply filter effect if selected
    if (selectedFilter && selectedFilter !== 'none') {
      applyFilter(ctx, canvas.width, canvas.height, selectedFilter);
    }

    // Flash effect
    setIsFlashing(true);
    
    // Convert to data URL
    const photoDataUrl = canvas.toDataURL('image/jpeg', 0.95);
    
    // Stop and cleanup camera
    if (stream) {
      stopMediaStream(stream);
    }

    // Small delay for flash effect, then callback
    setTimeout(() => {
      onPhotoCaptured(photoDataUrl);
    }, 300);
  }, [stream, selectedFilter, onPhotoCaptured]);

  // Apply CSS filter-like effects to canvas
  const applyFilter = (ctx: CanvasRenderingContext2D, width: number, height: number, filter: string) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    switch (filter) {
      case 'grayscale':
        for (let i = 0; i < data.length; i += 4) {
          const gray = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
          data[i] = gray;
          data[i + 1] = gray;
          data[i + 2] = gray;
        }
        break;
      case 'sepia':
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
          data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
          data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        }
        break;
      case 'vintage':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.1);
          data[i + 1] = data[i + 1] * 0.9;
          data[i + 2] = data[i + 2] * 0.8;
        }
        break;
      case 'bright':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.2);
          data[i + 1] = Math.min(255, data[i + 1] * 1.2);
          data[i + 2] = Math.min(255, data[i + 2] * 1.2);
        }
        break;
      case 'contrast':
        const factor = 1.3;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
          data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
          data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
        }
        break;
    }

    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <div className={`capture-page ${isFlashing ? 'capture-page--flash' : ''}`}>
      {/* Background */}
      <div className="capture-page__bg">
        <div className="capture-page__bg-gradient" />
      </div>

      {/* Shot counter */}
      <div className="capture-page__shot-counter">
        <span className="capture-page__shot-label">SHOT</span>
        <span className="capture-page__shot-number">{currentShot}/{totalShots}</span>
      </div>

      {/* Camera View */}
      <div className="capture-page__camera-container">
        <div className={`capture-page__camera-frame filter-${selectedFilter}`}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="capture-page__video"
          />
          {/* Face guide */}
          <div className="capture-page__face-guide" />
        </div>
      </div>

      {/* Countdown */}
      <div className="capture-page__countdown">
        {!isCameraReady ? (
          <div className="capture-page__loading">
            <span>Starting camera...</span>
          </div>
        ) : countdown > 0 ? (
          <>
            <p className="capture-page__label">Get Ready!</p>
            <div className="capture-page__number-wrapper">
              <span key={countdown} className="capture-page__number">
                {countdown}
              </span>
            </div>
          </>
        ) : (
          <div className="capture-page__flash-text">📸</div>
        )}
      </div>

      {/* Hidden canvas for capturing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Flash overlay */}
      {isFlashing && <div className="capture-page__flash-overlay" />}
    </div>
  );
};

export default CapturePage;
