// ============================================
// Page: Camera Setup
// ============================================

import React, { useState, useCallback } from 'react';
import { Language } from '../../../types';
import { getTranslation } from '../../../i18n';
import { Button } from '../../../components/common';
import { requestCameraPermission, stopMediaStream } from '../../../utils';
import './CameraSetupPage.css';

export interface CameraSetupPageProps {
  onPermissionGranted: () => void;
  lang: Language;
}

type CameraState = 'idle' | 'requesting' | 'granted' | 'denied';

/**
 * Camera Setup Page - Request camera permission
 */
export const CameraSetupPage: React.FC<CameraSetupPageProps> = ({ 
  onPermissionGranted, 
  lang 
}) => {
  const t = getTranslation(lang).camera;
  const [cameraState, setCameraState] = useState<CameraState>('idle');

  const handleRequestCamera = useCallback(async () => {
    setCameraState('requesting');
    
    const stream = await requestCameraPermission();
    
    if (stream) {
      // Stop the test stream - we'll create a new one on the next page
      stopMediaStream(stream);
      setCameraState('granted');
      
      // Small delay for visual feedback
      setTimeout(() => {
        onPermissionGranted();
      }, 500);
    } else {
      setCameraState('denied');
    }
  }, [onPermissionGranted]);

  return (
    <div className="camera-page">
      {/* Background */}
      <div className="camera-page__bg">
        <div className="camera-page__bg-gradient"></div>
        <div className="camera-page__bg-glow"></div>
      </div>

      {/* Content */}
      <div className="camera-page__content">
        {/* Step indicator */}
        <span className="camera-page__step">{t.step}</span>

        {/* Icon */}
        <div className={`camera-page__icon ${cameraState === 'requesting' ? 'camera-page__icon--pulse' : ''} ${cameraState === 'granted' ? 'camera-page__icon--success' : ''}`}>
          {cameraState === 'granted' ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"/>
            </svg>
          )}
        </div>

        {/* Title */}
        <div className="camera-page__title-group">
          <h1 className="camera-page__title">
            {t.titleReady} <br />
            <span className="camera-page__title-highlight">{t.titleAction}</span>
          </h1>
          <p className="camera-page__desc">{t.desc}</p>
        </div>

        {/* Action */}
        <div className="camera-page__action">
          {cameraState !== 'denied' ? (
            <Button
              variant="primary"
              size="xl"
              onClick={handleRequestCamera}
              isLoading={cameraState === 'requesting'}
              disabled={cameraState === 'granted'}
              leftIcon={
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                </svg>
              }
            >
              {cameraState === 'requesting' ? t.connecting : t.allowBtn}
            </Button>
          ) : (
            <div className="camera-page__denied">
              <div className="camera-page__denied-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
              <h3>Camera Access Denied</h3>
              <p>{t.helpDesc}</p>
              <Button variant="outline" onClick={() => setCameraState('idle')}>
                Try Again
              </Button>
            </div>
          )}
        </div>

        {/* Help text */}
        {cameraState === 'idle' && (
          <div className="camera-page__help">
            <div className="camera-page__help-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
              </svg>
            </div>
            <div className="camera-page__help-text">
              <strong>{t.helpTitle}</strong>
              <span>{t.helpDesc}</span>
            </div>
          </div>
        )}

        {/* Loading state */}
        {cameraState === 'requesting' && (
          <p className="camera-page__waiting">{t.waiting}</p>
        )}
      </div>
    </div>
  );
};

export default CameraSetupPage;
