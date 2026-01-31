// ============================================
// Application Type Definitions
// ============================================

/**
 * Supported languages in the application
 */
export type Language = 'vi';

/**
 * Screen names for navigation
 */
export enum ScreenName {
  WELCOME = 'WELCOME',
  MODE_SELECTION = 'MODE_SELECTION',
  CAMERA_SETUP = 'CAMERA_SETUP',
  LIVE_PREVIEW = 'LIVE_PREVIEW',
  CAPTURE = 'CAPTURE',  // New: handles countdown + photo capture
  COUNTDOWN = 'COUNTDOWN',
  REVIEW = 'REVIEW',
  ACTIONS = 'ACTIONS',
  THANK_YOU = 'THANK_YOU',
}

/**
 * Photo capture modes - Layout options
 */
export enum PhotoMode {
  LAYOUT_4_STRIP = '4_STRIP',    // 4 ảnh dọc (1 cột x 4 hàng)
  LAYOUT_4_GRID = '4_GRID',      // 4 ảnh lưới (2x2)
  LAYOUT_6_GRID = '6_GRID',      // 6 ảnh lưới (2x3)
}

/**
 * Available photo filters
 */
export type PhotoFilter = 
  | 'none'
  | 'grayscale'
  | 'sepia'
  | 'vintage'
  | 'warm'
  | 'cool'
  | 'contrast'
  | 'brightness';

/**
 * Application global state
 */
export interface AppState {
  currentScreen: ScreenName;
  mode: PhotoMode;
  selectedFilter: PhotoFilter;
  selectedFrame: string;
  capturedImages: string[];
  language: Language;
  isLoading: boolean;
}

/**
 * Navigation actions
 */
export interface NavigationActions {
  navigateTo: (screen: ScreenName) => void;
  goBack: () => void;
  reset: () => void;
}

/**
 * Screen component common props
 */
export interface ScreenProps {
  lang: Language;
}
