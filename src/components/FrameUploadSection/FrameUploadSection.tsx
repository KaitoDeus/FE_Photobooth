// ============================================
// Component: Frame Upload Section
// ============================================

import React, { useRef, useState } from 'react';
import { Language } from '../../types';
import './FrameUploadSection.css';

export interface CustomFrame {
  id: string;
  name: string;
  imageUrl: string;
  // Photo slot positions (percentage-based for responsive)
  slots: {
    x: number;      // % from left
    y: number;      // % from top
    width: number;  // % of frame width
    height: number; // % of frame height
  }[];
}

export interface FrameUploadSectionProps {
  customFrame: CustomFrame | null;
  onFrameUpload: (frame: CustomFrame) => void;
  onRemoveFrame: () => void;
  lang: Language;
}

/**
 * Frame Upload Section - Allows user to upload custom frame PNG
 */
export const FrameUploadSection: React.FC<FrameUploadSectionProps> = ({
  customFrame,
  onFrameUpload,
  onRemoveFrame,
  lang,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const texts = {
    en: {
      upload: 'Upload Custom Frame',
      uploadDesc: 'PNG with transparent photo areas',
      processing: 'Processing...',
      remove: 'Remove',
      uploaded: 'Custom Frame Uploaded',
    },
    vi: {
      upload: 'Tải Khung Tùy Chỉnh',
      uploadDesc: 'PNG có vùng ảnh trong suốt',
      processing: 'Đang xử lý...',
      remove: 'Xóa',
      uploaded: 'Đã Tải Khung Tùy Chỉnh',
    },
  };

  const t = texts[lang];

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.includes('png')) {
      alert('Please upload a PNG file');
      return;
    }

    setIsProcessing(true);

    try {
      // Read file as data URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        
        // Create custom frame with default 4-slot vertical strip layout
        // These positions assume a frame like the graduation example
        const customFrameData: CustomFrame = {
          id: `custom-${Date.now()}`,
          name: file.name.replace('.png', ''),
          imageUrl,
          // Default 4-slot vertical strip positions (adjust as needed)
          slots: [
            { x: 8, y: 5, width: 84, height: 21 },   // Slot 1
            { x: 8, y: 28, width: 84, height: 21 },  // Slot 2
            { x: 8, y: 51, width: 84, height: 21 },  // Slot 3
            { x: 8, y: 74, width: 84, height: 21 },  // Slot 4
          ],
        };

        onFrameUpload(customFrameData);
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing frame:', error);
      setIsProcessing(false);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="frame-upload">
      <input
        ref={fileInputRef}
        type="file"
        accept=".png,image/png"
        onChange={handleFileChange}
        className="frame-upload__input"
      />

      {!customFrame ? (
        <button
          className="frame-upload__button"
          onClick={handleUploadClick}
          disabled={isProcessing}
        >
          <div className="frame-upload__icon">
            {isProcessing ? (
              <div className="frame-upload__spinner" />
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
              </svg>
            )}
          </div>
          <div className="frame-upload__text">
            <span className="frame-upload__title">
              {isProcessing ? t.processing : t.upload}
            </span>
            <span className="frame-upload__desc">{t.uploadDesc}</span>
          </div>
        </button>
      ) : (
        <div className="frame-upload__preview">
          <img 
            src={customFrame.imageUrl} 
            alt={customFrame.name}
            className="frame-upload__preview-img"
          />
          <div className="frame-upload__preview-info">
            <span className="frame-upload__preview-name">{customFrame.name}</span>
            <span className="frame-upload__preview-status">{t.uploaded}</span>
          </div>
          <button 
            className="frame-upload__remove"
            onClick={onRemoveFrame}
          >
            {t.remove}
          </button>
        </div>
      )}
    </div>
  );
};

export default FrameUploadSection;
