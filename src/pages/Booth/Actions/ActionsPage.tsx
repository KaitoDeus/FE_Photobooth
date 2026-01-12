// ============================================
// Page: Actions - With Photo Strip Preview
// ============================================

import React, { useState, useEffect } from 'react';
import { Language, PhotoMode } from '../../../types';
import { getTranslation } from '../../../i18n';
import { Button, Card } from '../../../components/common';
import { compositePhotosWithFrame, generatePhotoStrip, downloadFile, PhotoLayout } from '../../../utils';
import './ActionsPage.css';

// Re-export CustomFrame type for use
interface CustomFrame {
  id: string;
  name: string;
  imageUrl: string;
  slots: {
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
}

// Map PhotoMode to PhotoLayout
const getPhotoLayout = (mode: PhotoMode): PhotoLayout => {
  switch (mode) {
    case PhotoMode.LAYOUT_6_GRID:
      return '6-grid';
    case PhotoMode.LAYOUT_4_GRID:
      return '4-grid';
    case PhotoMode.LAYOUT_4_STRIP:
    default:
      return '4-strip';
  }
};

export interface ActionsPageProps {
  onPrint: () => void;
  onRetake: () => void;
  onOpenQR: () => void;
  onSavePhoto?: (imageDataUrl: string) => Promise<unknown>;
  capturedPhotos: string[];
  customFrame: CustomFrame | null;
  selectedFrame: string;
  mode: PhotoMode;
  lang: Language;
}

/**
 * Actions Page - Print, download, share options with preview
 */
export const ActionsPage: React.FC<ActionsPageProps> = ({ 
  onPrint, 
  onRetake,
  onSavePhoto,
  capturedPhotos,
  customFrame,
  selectedFrame,
  mode,
  lang 
}) => {
  const t = getTranslation(lang).actions;
  const [copies, setCopies] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);

  // Get layout based on mode
  const photoLayout = getPhotoLayout(mode);

  // Generate preview on mount
  useEffect(() => {
    const generatePreview = async () => {
      if (capturedPhotos.length === 0) return;
      
      setIsGeneratingPreview(true);
      
      try {
        let preview: string;
        
        if (customFrame && selectedFrame === 'custom') {
          // Use custom uploaded frame
          preview = await compositePhotosWithFrame(
            capturedPhotos,
            customFrame.imageUrl,
            customFrame.slots
          );
        } else {
          // Use built-in frame - generate photo strip/grid based on mode
          preview = await generatePhotoStrip(
            capturedPhotos,
            selectedFrame,
            'PhotoBooth',
            photoLayout
          );
        }
        
        setPreviewImage(preview);
      } catch (error) {
        console.error('Failed to generate preview:', error);
      } finally {
        setIsGeneratingPreview(false);
      }
    };
    
    generatePreview();
  }, [capturedPhotos, customFrame, selectedFrame]);

  const handleDownload = async () => {
    if (!previewImage) {
      console.warn('No preview image to download');
      return;
    }

    setIsDownloading(true);

    try {
      // Save to database first if callback is provided
      if (onSavePhoto) {
        console.log('💾 Saving photo to server...');
        await onSavePhoto(previewImage);
        console.log('✅ Photo saved to database!');
      }

      // Then download to user's device
      const timestamp = new Date().toISOString().slice(0, 10);
      const frameName = customFrame?.name || selectedFrame;
      const filename = `photobooth_${frameName}_${timestamp}.png`;

      downloadFile(previewImage, filename);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="actions-page">
      {/* Background */}
      <div className="actions-page__bg">
        <div className="actions-page__bg-gradient"></div>
        <div className="actions-page__bg-glow actions-page__bg-glow--1"></div>
        <div className="actions-page__bg-glow actions-page__bg-glow--2"></div>
      </div>

      {/* Content */}
      <div className="actions-page__content">
        {/* Header */}
        <div className="actions-page__header">
          <h1 className="actions-page__title">{t.title}</h1>
          <p className="actions-page__subtitle">{t.subtitle}</p>
        </div>

        {/* Photo Strip Preview */}
        <div className="actions-page__preview">
          {isGeneratingPreview ? (
            <div className="actions-page__preview-loading">
              <div className="actions-page__preview-spinner" />
              <span>{lang === 'vi' ? 'Đang tạo ảnh...' : 'Generating...'}</span>
            </div>
          ) : previewImage ? (
            <img 
              src={previewImage} 
              alt="Photo Strip Preview" 
              className="actions-page__preview-image"
            />
          ) : (
            <div className="actions-page__preview-empty">
              <span>{lang === 'vi' ? 'Không có ảnh' : 'No photos'}</span>
            </div>
          )}
        </div>

        {/* Print Options */}
        <Card variant="glass" className="actions-page__print-card">
          <div className="actions-page__print-content">
          {/* Copies */}
          <div className="actions-page__option-group">
            <label className="actions-page__label">{t.copies}</label>
            <div className="actions-page__copies">
              <button 
                className="actions-page__copies-btn"
                onClick={() => setCopies(Math.max(1, copies - 1))}
                disabled={copies <= 1}
              >
                −
              </button>
              <span className="actions-page__copies-value">{copies}</span>
              <button 
                className="actions-page__copies-btn"
                onClick={() => setCopies(Math.min(5, copies + 1))}
                disabled={copies >= 5}
              >
                +
              </button>
            </div>
          </div>

            {/* Print Button */}
            <Button
              variant="primary"
              size="xl"
              fullWidth
              onClick={onPrint}
              leftIcon={
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
                </svg>
              }
            >
              {t.printBtn}
            </Button>
          </div>
        </Card>

        {/* Secondary Actions */}
        <div className="actions-page__secondary">
          <button 
            className={`actions-page__action-btn ${isDownloading ? 'actions-page__action-btn--loading' : ''}`}
            onClick={handleDownload}
            disabled={isDownloading || !previewImage}
          >
            <div className="actions-page__action-icon">
              {isDownloading ? (
                <div className="actions-page__spinner" />
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
              )}
            </div>
            <div className="actions-page__action-text">
              <span className="actions-page__action-title">
                {isDownloading ? (lang === 'vi' ? 'Đang tải...' : 'Downloading...') : t.download}
              </span>
              <span className="actions-page__action-desc">{t.downloadDesc}</span>
            </div>
          </button>


        </div>

        {/* Retake Button */}
        <button className="actions-page__retake" onClick={onRetake}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
          </svg>
          {t.retake}
        </button>
      </div>
    </div>
  );
};

export default ActionsPage;
