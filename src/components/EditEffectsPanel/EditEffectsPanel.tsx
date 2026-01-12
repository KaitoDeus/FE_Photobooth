// ============================================
// Component: Edit Effects Panel
// ============================================

import React from 'react';
import { Language } from '../../types';
import { getTranslation } from '../../i18n';
import { PHOTO_FILTERS } from '../../utils';
import { Button } from '../common';
import './EditEffectsPanel.css';

export interface EditEffectsPanelProps {
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
  onClose: () => void;
  lang: Language;
}

const filterOptions = Object.keys(PHOTO_FILTERS);

/**
 * Edit Effects Panel - Filter selection overlay
 */
export const EditEffectsPanel: React.FC<EditEffectsPanelProps> = ({
  selectedFilter,
  onSelectFilter,
  onClose,
  lang,
}) => {
  const t = getTranslation(lang).effects;

  const handleApply = () => {
    onClose();
  };

  const handleReset = () => {
    onSelectFilter('none');
  };

  return (
    <div className="effects-panel">
      {/* Overlay */}
      <div className="effects-panel__overlay" onClick={onClose}></div>
      
      {/* Panel */}
      <div className="effects-panel__content">
        {/* Header */}
        <div className="effects-panel__header">
          <h2 className="effects-panel__title">{t.title}</h2>
          <button className="effects-panel__close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>

        {/* Active Filter */}
        <div className="effects-panel__active">
          <span className="effects-panel__active-label">{t.active}:</span>
          <span className="effects-panel__active-value">{selectedFilter}</span>
        </div>

        {/* Filter Grid */}
        <div className="effects-panel__grid">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              className={`effects-panel__filter ${selectedFilter === filter ? 'effects-panel__filter--active' : ''}`}
              onClick={() => onSelectFilter(filter)}
            >
              <div 
                className="effects-panel__filter-preview"
                style={{ 
                  filter: PHOTO_FILTERS[filter as keyof typeof PHOTO_FILTERS] || 'none' 
                }}
              ></div>
              <span className="effects-panel__filter-name">{filter}</span>
              {selectedFilter === filter && (
                <span className="effects-panel__filter-check">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="effects-panel__actions">
          <Button variant="ghost" onClick={handleReset}>
            {t.reset}
          </Button>
          <Button variant="primary" onClick={handleApply}>
            {t.apply}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditEffectsPanel;
