// ============================================
// Component: Frame Selection Panel
// ============================================

import React from 'react';
import { PHOTO_FRAMES } from '../../utils';
import { Language } from '../../types';
import { FrameUploadSection, CustomFrame } from '../FrameUploadSection';
import './FrameSelectionPanel.css';

export interface FrameSelectionPanelProps {
  selectedFrame: string;
  onSelectFrame: (frameId: string) => void;
  customFrame: CustomFrame | null;
  onCustomFrameUpload: (frame: CustomFrame) => void;
  onRemoveCustomFrame: () => void;
  onClose: () => void;
  lang: Language;
}

/**
 * Frame Selection Panel - Allows user to choose a frame for their photos
 */
export const FrameSelectionPanel: React.FC<FrameSelectionPanelProps> = ({
  selectedFrame,
  onSelectFrame,
  customFrame,
  onCustomFrameUpload,
  onRemoveCustomFrame,
  onClose,
  lang,
}) => {
  const title = lang === 'vi' ? 'Chọn Khung Ảnh' : 'Select Frame';
  const applyBtn = lang === 'vi' ? 'Áp Dụng' : 'Apply';
  const builtInLabel = lang === 'vi' ? 'Khung Có Sẵn' : 'Built-in Frames';
  const customLabel = lang === 'vi' ? 'Khung Tùy Chỉnh' : 'Custom Frame';

  return (
    <div className="frame-panel">
      {/* Backdrop */}
      <div className="frame-panel__backdrop" onClick={onClose} />
      
      {/* Panel */}
      <div className="frame-panel__content">
        {/* Header */}
        <div className="frame-panel__header">
          <h2 className="frame-panel__title">{title}</h2>
          <button className="frame-panel__close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Custom Frame Upload Section */}
        <div className="frame-panel__section">
          <h3 className="frame-panel__section-title">{customLabel}</h3>
          <FrameUploadSection
            customFrame={customFrame}
            onFrameUpload={(frame) => {
              onCustomFrameUpload(frame);
              onSelectFrame('custom');
            }}
            onRemoveFrame={() => {
              onRemoveCustomFrame();
              onSelectFrame('none');
            }}
            lang={lang}
          />
          {customFrame && (
            <button
              className={`frame-panel__custom-select ${selectedFrame === 'custom' ? 'frame-panel__custom-select--active' : ''}`}
              onClick={() => onSelectFrame('custom')}
            >
              <img src={customFrame.imageUrl} alt={customFrame.name} />
              <span>{lang === 'vi' ? 'Sử dụng khung này' : 'Use this frame'}</span>
              {selectedFrame === 'custom' && (
                <div className="frame-panel__check">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
              )}
            </button>
          )}
        </div>

        {/* Built-in Frames */}
        <div className="frame-panel__section">
          <h3 className="frame-panel__section-title">{builtInLabel}</h3>
          <div className="frame-panel__grid">
            {PHOTO_FRAMES.map((frame) => (
              <button
                key={frame.id}
                className={`frame-panel__item ${selectedFrame === frame.id ? 'frame-panel__item--active' : ''}`}
                onClick={() => onSelectFrame(frame.id)}
              >
                <div 
                  className={`frame-panel__preview frame-panel__preview--${frame.id}`}
                >
                  <div className="frame-panel__preview-inner" />
                </div>
                <span className="frame-panel__name">
                  {lang === 'vi' ? frame.nameVi : frame.name}
                </span>
                {selectedFrame === frame.id && (
                  <div className="frame-panel__check">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button className="frame-panel__apply" onClick={onClose}>
          {applyBtn}
        </button>
      </div>
    </div>
  );
};

export default FrameSelectionPanel;
