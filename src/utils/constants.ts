// ============================================
// Application Constants
// ============================================

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  TIMEOUT: 10000,
} as const;

/**
 * Photo capture settings
 */
export const PHOTO_CONFIG = {
  COUNTDOWN_SECONDS: 3,
  MAX_PHOTOS_PER_SESSION: 10,
  IMAGE_QUALITY: 0.9,
  IMAGE_FORMAT: 'image/jpeg',
  MAX_IMAGE_WIDTH: 1920,
  MAX_IMAGE_HEIGHT: 1080,
} as const;

/**
 * Available photo filters with CSS values
 */
export const PHOTO_FILTERS = {
  none: '',
  grayscale: 'grayscale(100%)',
  sepia: 'sepia(100%)',
  vintage: 'sepia(50%) contrast(90%) brightness(90%)',
  warm: 'sepia(30%) saturate(140%)',
  cool: 'saturate(80%) hue-rotate(180deg)',
  contrast: 'contrast(150%)',
  brightness: 'brightness(120%)',
} as const;

/**
 * Photo frames available (CSS-based)
 */
export const PHOTO_FRAMES = [
  { 
    id: 'none', 
    name: 'No Frame', 
    nameVi: 'Không khung',
    css: '' 
  },
  { 
    id: 'classic', 
    name: 'Classic White', 
    nameVi: 'Trắng cổ điển',
    css: 'border: 12px solid white; box-shadow: 0 4px 20px rgba(0,0,0,0.3);' 
  },
  { 
    id: 'vintage', 
    name: 'Vintage Brown', 
    nameVi: 'Nâu vintage',
    css: 'border: 10px solid #8B4513; box-shadow: inset 0 0 10px rgba(0,0,0,0.3), 0 4px 15px rgba(0,0,0,0.4);' 
  },
  { 
    id: 'polaroid', 
    name: 'Polaroid', 
    nameVi: 'Polaroid',
    css: 'border: 8px solid white; border-bottom: 40px solid white; box-shadow: 0 4px 20px rgba(0,0,0,0.25);' 
  },
  { 
    id: 'neon', 
    name: 'Neon Glow', 
    nameVi: 'Neon phát sáng',
    css: 'border: 4px solid #ff00ff; box-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #00ffff, inset 0 0 10px rgba(255,0,255,0.2);' 
  },
  { 
    id: 'gold', 
    name: 'Golden', 
    nameVi: 'Vàng kim',
    css: 'border: 8px solid; border-image: linear-gradient(135deg, #d4af37, #f4e5bc, #d4af37) 1; box-shadow: 0 4px 20px rgba(212,175,55,0.4);' 
  },
  { 
    id: 'rainbow', 
    name: 'Rainbow', 
    nameVi: 'Cầu vồng',
    css: 'border: 6px solid; border-image: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet) 1; box-shadow: 0 0 15px rgba(255,0,0,0.3);' 
  },
] as const;

/**
 * Photo modes configuration
 */
export const PHOTO_MODES = {
  SINGLE: {
    label: 'Single Photo',
    count: 1,
    layout: '1x1',
  },
  STRIP: {
    label: 'Photo Strip',
    count: 4,
    layout: '1x4',
  },
  GRID: {
    label: 'Photo Grid',
    count: 4,
    layout: '2x2',
  },
  GIF: {
    label: 'Animated GIF',
    count: 6,
    layout: 'sequence',
  },
} as const;

/**
 * Animation durations (in ms)
 */
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  PAGE_TRANSITION: 400,
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  LANGUAGE: 'photobooth_language',
  THEME: 'photobooth_theme',
  SETTINGS: 'photobooth_settings',
} as const;

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;
