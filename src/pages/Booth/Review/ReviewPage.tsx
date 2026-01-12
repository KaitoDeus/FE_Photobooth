// ============================================
// Page: Review - Review all captured photos
// ============================================

import React from 'react';
import { Language, PhotoMode } from '../../../types';
import { getTranslation } from '../../../i18n';
import { Button } from '../../../components/common';
import './ReviewPage.css';

export interface ReviewPageProps {
  onAccept: () => void;
  onRetake: () => void;
  selectedFilter: string;
  capturedPhotos?: string[];
  mode?: PhotoMode;
  lang: Language;
}

/**
 * Review Page - Review all captured photos in a grid/strip layout
 */
export const ReviewPage: React.FC<ReviewPageProps> = ({ 
  onAccept, 
  onRetake,
  selectedFilter,
  capturedPhotos = [],
  mode = PhotoMode.LAYOUT_4_GRID,
  lang 
}) => {
  const t = getTranslation(lang).review;
  
  // Determine layout class based on mode
  const getLayoutClass = () => {
    switch (mode) {
      case PhotoMode.LAYOUT_4_STRIP:
        return 'review-page__grid--strip-4';
      case PhotoMode.LAYOUT_4_GRID:
        return 'review-page__grid--grid-4';
      case PhotoMode.LAYOUT_6_GRID:
        return 'review-page__grid--grid-6';
      default:
        return 'review-page__grid--grid-4';
    }
  };

  // Get layout description
  const getLayoutLabel = () => {
    switch (mode) {
      case PhotoMode.LAYOUT_4_STRIP:
        return '4 Photos Strip';
      case PhotoMode.LAYOUT_4_GRID:
        return '4 Photos Grid';
      case PhotoMode.LAYOUT_6_GRID:
        return '6 Photos Grid';
      default:
        return 'Photos';
    }
  };

  // Placeholder for empty slots
  const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gUGhvdG88L3RleHQ+PC9zdmc+';

  // Get expected photo count
  const getExpectedCount = () => {
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

  const expectedCount = getExpectedCount();
  
  // Fill with placeholders if needed
  const displayPhotos = [...capturedPhotos];
  while (displayPhotos.length < expectedCount) {
    displayPhotos.push(placeholderImage);
  }

  return (
    <div className="review-page">
      {/* Background */}
      <div className="review-page__bg">
        <div className="review-page__bg-gradient"></div>
        {capturedPhotos.length > 0 && (
          <div 
            className="review-page__bg-blur" 
            style={{ backgroundImage: `url(${capturedPhotos[0]})` }}
          ></div>
        )}
      </div>

      {/* Header */}
      <div className="review-page__header">
        <span className="review-page__badge">{t.session}</span>
        <span className="review-page__layout-badge">{getLayoutLabel()}</span>
      </div>

      {/* Content */}
      <div className="review-page__content">
        <div className="review-page__title-group">
          <h1 className="review-page__title">{t.title}</h1>
          <p className="review-page__subtitle">
            {capturedPhotos.length} / {expectedCount} photos captured
          </p>
        </div>

        {/* Photo Grid/Strip */}
        <div className="review-page__frame">
          <div className={`review-page__grid ${getLayoutClass()}`}>
            {displayPhotos.map((photo, index) => (
              <div key={index} className="review-page__photo-slot">
                <img 
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className={`review-page__photo ${photo === placeholderImage ? 'review-page__photo--placeholder' : ''}`}
                />
                <span className="review-page__photo-number">{index + 1}</span>
              </div>
            ))}
          </div>
          
          {/* Filter indicator */}
          {selectedFilter !== 'none' && (
            <div className="review-page__filter-badge">
              ✨ {selectedFilter}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="review-page__actions">
          <Button
            variant="outline"
            size="lg"
            onClick={onRetake}
            leftIcon={
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
              </svg>
            }
          >
            {t.retake}
          </Button>
          
          <Button
            variant="primary"
            size="lg"
            onClick={onAccept}
            disabled={capturedPhotos.length < expectedCount}
            rightIcon={
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            }
          >
            {capturedPhotos.length < expectedCount ? 'Incomplete' : t.accept}
          </Button>
        </div>

        {/* Keyboard hint */}
        <p className="review-page__hint">{t.instruction}</p>
      </div>
    </div>
  );
};

export default ReviewPage;
