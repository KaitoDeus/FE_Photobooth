// ============================================
// Page: Live Preview - Camera page with filters and frames
// ============================================

import React, { useRef, useEffect, useState } from 'react';
import { PhotoMode, Language } from '../../../types';
import { requestCameraPermission, stopMediaStream, PHOTO_FRAMES } from '../../../utils';
import './LivePreviewPage.css';

export interface LivePreviewPageProps {
  mode: PhotoMode;
  onCapture: () => void;
  onOpenFilters: () => void;
  onOpenFrames: () => void;
  selectedFilter: string;
  selectedFrame: string;
  lang: Language;
}

/**
 * Live Preview Page - Camera view with capture controls
 */
export const LivePreviewPage: React.FC<LivePreviewPageProps> = ({
  mode,
  onCapture,
  onOpenFilters,
  onOpenFrames,
  selectedFilter,
  selectedFrame,
  lang: _lang, // eslint-disable-line @typescript-eslint/no-unused-vars
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Get photo count based on mode
  const getPhotoCount = () => {
    switch (mode) {
      case PhotoMode.LAYOUT_4_STRIP:
      case PhotoMode.LAYOUT_4_GRID:
        return 4;
      case PhotoMode.LAYOUT_6_GRID:
        return 6;
      default:
        return 4;
    }
  };

  // Get frame CSS
  const getFrameStyle = () => {
    const frame = PHOTO_FRAMES.find(f => f.id === selectedFrame);
    return frame?.css || '';
  };

  // Start camera on mount
  useEffect(() => {
    const startCamera = async () => {
      const mediaStream = await requestCameraPermission();
      if (mediaStream && videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
    };
    startCamera();

    // Cleanup on unmount
    return () => {
      if (stream) {
        stopMediaStream(stream);
      }
    };
  }, []);

  // Stop stream when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stopMediaStream(stream);
      }
    };
  }, [stream]);

  return (
    <div className="live-preview-page">
      {/* Header */}
      <div className="live-preview-page__header">
        <div className="live-preview-page__header-left">
          <span className="live-preview-page__preview-badge">📷 PREVIEW</span>
          <span className="live-preview-page__grid-badge">{getPhotoCount()} GRID</span>
        </div>
        <div className="live-preview-page__header-right">
          <span className="live-preview-page__title">Photo Booth</span>
        </div>
      </div>

      {/* Camera Preview */}
      <div className="live-preview-page__camera-container">
        <div 
          className={`live-preview-page__camera-frame filter-${selectedFilter}`}
          style={{ cssText: getFrameStyle() } as React.CSSProperties}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="live-preview-page__video"
          />
          {/* Face guide oval - only show if no frame */}
          {selectedFrame === 'none' && (
            <div className="live-preview-page__face-guide" />
          )}
        </div>
        {/* Frame indicator */}
        {selectedFrame !== 'none' && (
          <div className="live-preview-page__frame-badge">
            🖼️ {PHOTO_FRAMES.find(f => f.id === selectedFrame)?.name}
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="live-preview-page__controls">
        {/* Filters Button */}
        <button
          className="live-preview-page__control-btn"
          onClick={onOpenFilters}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>
          </svg>
          <span>FILTERS</span>
        </button>

        {/* Shutter Button */}
        <button
          className="live-preview-page__shutter"
          onClick={onCapture}
          aria-label="Capture"
        >
          <div className="live-preview-page__shutter-inner" />
        </button>

        {/* Frames Button */}
        <button 
          className={`live-preview-page__control-btn ${selectedFrame !== 'none' ? 'live-preview-page__control-btn--active' : ''}`}
          onClick={onOpenFrames}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"/>
          </svg>
          <span>FRAMES</span>
        </button>
      </div>
    </div>
  );
};

export default LivePreviewPage;
