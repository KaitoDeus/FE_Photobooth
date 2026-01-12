// ============================================
// Component: QR Modal
// ============================================

import React from 'react';
import { Language } from '../../types';
import { getTranslation } from '../../i18n';
import { Button, Modal } from '../common';
import './QrModal.css';

export interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrUrl?: string;
  lang: Language;
}

/**
 * QR Modal - Display QR code for sharing
 */
export const QrModal: React.FC<QrModalProps> = ({
  isOpen,
  onClose,
  qrUrl = 'https://example.com/photo/123',
  lang,
}) => {
  const t = getTranslation(lang).qr;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t.title}
      size="sm"
    >
      <div className="qr-modal">
        <p className="qr-modal__desc">{t.desc}</p>
        
        {/* QR Code Placeholder */}
        <div className="qr-modal__code">
          <div className="qr-modal__code-placeholder">
            <svg viewBox="0 0 100 100" fill="none">
              <rect x="0" y="0" width="30" height="30" fill="currentColor"/>
              <rect x="35" y="0" width="10" height="10" fill="currentColor"/>
              <rect x="50" y="0" width="10" height="10" fill="currentColor"/>
              <rect x="70" y="0" width="30" height="30" fill="currentColor"/>
              <rect x="5" y="5" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="4"/>
              <rect x="75" y="5" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="4"/>
              <rect x="10" y="10" width="10" height="10" fill="currentColor"/>
              <rect x="80" y="10" width="10" height="10" fill="currentColor"/>
              <rect x="0" y="35" width="10" height="10" fill="currentColor"/>
              <rect x="20" y="35" width="10" height="10" fill="currentColor"/>
              <rect x="45" y="35" width="15" height="15" fill="currentColor"/>
              <rect x="70" y="35" width="10" height="10" fill="currentColor"/>
              <rect x="0" y="50" width="10" height="10" fill="currentColor"/>
              <rect x="35" y="50" width="10" height="10" fill="currentColor"/>
              <rect x="90" y="50" width="10" height="10" fill="currentColor"/>
              <rect x="0" y="70" width="30" height="30" fill="currentColor"/>
              <rect x="5" y="75" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="4"/>
              <rect x="10" y="80" width="10" height="10" fill="currentColor"/>
              <rect x="40" y="70" width="10" height="10" fill="currentColor"/>
              <rect x="55" y="70" width="15" height="15" fill="currentColor"/>
              <rect x="80" y="70" width="10" height="10" fill="currentColor"/>
              <rect x="35" y="85" width="10" height="10" fill="currentColor"/>
              <rect x="70" y="85" width="10" height="20" fill="currentColor"/>
              <rect x="90" y="85" width="10" height="15" fill="currentColor"/>
            </svg>
          </div>
        </div>

        {/* URL */}
        <div className="qr-modal__url">
          <span>{qrUrl}</span>
        </div>

        {/* Close Button */}
        <Button variant="primary" fullWidth onClick={onClose}>
          {t.close}
        </Button>
      </div>
    </Modal>
  );
};

export default QrModal;
