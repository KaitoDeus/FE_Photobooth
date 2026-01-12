// ============================================
// Utility Helper Functions
// ============================================

import { STORAGE_KEYS } from './constants';
import type { Language } from '../types';

/**
 * Format date to locale string
 */
export function formatDate(date: string | Date, locale = 'en-US'): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format time to locale string
 */
export function formatTime(date: string | Date, locale = 'en-US'): string {
  const d = new Date(date);
  return d.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format date and time
 */
export function formatDateTime(date: string | Date, locale = 'en-US'): string {
  return `${formatDate(date, locale)} ${formatTime(date, locale)}`;
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Delay execution
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: never[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Convert data URL to Blob
 */
export function dataUrlToBlob(dataUrl: string): Blob {
  const [header, data] = dataUrl.split(',');
  const mimeMatch = header.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const binary = atob(data);
  const array = new Uint8Array(binary.length);
  
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  
  return new Blob([array], { type: mime });
}

/**
 * Convert Blob to data URL
 */
export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Download file from URL or data
 */
export function downloadFile(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  }
}

/**
 * Get saved language from local storage
 */
export function getSavedLanguage(): Language {
  const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  return (saved === 'vi' || saved === 'en') ? saved : 'en';
}

/**
 * Save language to local storage
 */
export function saveLanguage(lang: Language): void {
  localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
}

/**
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Check if camera is available
 */
export async function isCameraAvailable(): Promise<boolean> {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.some((device) => device.kind === 'videoinput');
  } catch {
    return false;
  }
}

/**
 * Request camera permission
 */
export async function requestCameraPermission(): Promise<MediaStream | null> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        facingMode: 'user',
      },
    });
    return stream;
  } catch (error) {
    console.error('Camera permission denied:', error);
    return null;
  }
}

/**
 * Stop media stream
 */
export function stopMediaStream(stream: MediaStream | null): void {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
}

/**
 * Classnames utility (simple version)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Photo slot positions for frame compositing
 */
export interface PhotoSlot {
  x: number;      // % from left
  y: number;      // % from top
  width: number;  // % of frame width
  height: number; // % of frame height
}

/**
 * Load image from URL
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Composite photos into a custom frame
 * Photos are drawn first, then frame is overlaid on top
 */
export async function compositePhotosWithFrame(
  photos: string[],
  frameImageUrl: string,
  slots: PhotoSlot[]
): Promise<string> {
  // Load frame image to get dimensions
  const frameImg = await loadImage(frameImageUrl);
  const frameWidth = frameImg.naturalWidth;
  const frameHeight = frameImg.naturalHeight;
  
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = frameWidth;
  canvas.height = frameHeight;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  // Fill white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, frameWidth, frameHeight);
  
  // Draw each photo in its slot
  for (let i = 0; i < Math.min(photos.length, slots.length); i++) {
    const photo = photos[i];
    const slot = slots[i];
    
    try {
      const photoImg = await loadImage(photo);
      
      // Calculate actual pixel positions from percentages
      const x = (slot.x / 100) * frameWidth;
      const y = (slot.y / 100) * frameHeight;
      const slotWidth = (slot.width / 100) * frameWidth;
      const slotHeight = (slot.height / 100) * frameHeight;
      
      // Draw photo to fill the slot (cover mode)
      const photoRatio = photoImg.naturalWidth / photoImg.naturalHeight;
      const slotRatio = slotWidth / slotHeight;
      
      let sourceX = 0, sourceY = 0, sourceWidth = photoImg.naturalWidth, sourceHeight = photoImg.naturalHeight;
      
      if (photoRatio > slotRatio) {
        // Photo is wider - crop sides
        sourceWidth = photoImg.naturalHeight * slotRatio;
        sourceX = (photoImg.naturalWidth - sourceWidth) / 2;
      } else {
        // Photo is taller - crop top/bottom
        sourceHeight = photoImg.naturalWidth / slotRatio;
        sourceY = (photoImg.naturalHeight - sourceHeight) / 2;
      }
      
      ctx.drawImage(
        photoImg,
        sourceX, sourceY, sourceWidth, sourceHeight,
        x, y, slotWidth, slotHeight
      );
    } catch (error) {
      console.error(`Failed to load photo ${i}:`, error);
    }
  }
  
  // Draw frame on top (frame should have transparent areas for photos)
  ctx.drawImage(frameImg, 0, 0, frameWidth, frameHeight);
  
  // Export as PNG
  return canvas.toDataURL('image/png', 1.0);
}

/**
 * Frame color configurations
 */
export const FRAME_COLORS: Record<string, { border: string; background: string; text: string }> = {
  none: { border: '#ffffff', background: '#ffffff', text: '#333333' },
  classic: { border: '#ffffff', background: '#ffffff', text: '#333333' },
  vintage: { border: '#8B4513', background: '#f5e6d3', text: '#5a3d2b' },
  polaroid: { border: '#ffffff', background: '#ffffff', text: '#333333' },
  neon: { border: '#ff00ff', background: '#1a0a1a', text: '#ff00ff' },
  gold: { border: '#d4af37', background: '#fff8e7', text: '#8b7355' },
  rainbow: { border: '#ff6b6b', background: '#fff0f0', text: '#e74c3c' },
};

/**
 * Layout types for photo strips
 */
export type PhotoLayout = '4-strip' | '4-grid' | '6-grid';

/**
 * Generate a photo strip/grid with colored frame
 * Supports multiple layouts based on photoLayout parameter
 */
export async function generatePhotoStrip(
  photos: string[],
  frameId: string = 'classic',
  brandingText: string = 'PhotoBooth',
  photoLayout: PhotoLayout = '4-strip'
): Promise<string> {
  const padding = 20;
  const photoGap = 8;
  const bottomBarHeight = 50;
  const colors = FRAME_COLORS[frameId] || FRAME_COLORS.classic;
  
  let canvasWidth: number;
  let canvasHeight: number;
  let photoPositions: { x: number; y: number; width: number; height: number }[] = [];
  
  if (photoLayout === '6-grid') {
    // 6 photos: 3 rows x 2 columns
    const cols = 2;
    const rows = 3;
    canvasWidth = 500;
    const photoWidth = (canvasWidth - (padding * 2) - photoGap) / cols;
    const photoHeight = Math.round(photoWidth * 0.75); // 4:3 ratio
    canvasHeight = padding + (rows * photoHeight) + ((rows - 1) * photoGap) + padding + bottomBarHeight;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        photoPositions.push({
          x: padding + col * (photoWidth + photoGap),
          y: padding + row * (photoHeight + photoGap),
          width: photoWidth,
          height: photoHeight,
        });
      }
    }
  } else if (photoLayout === '4-grid') {
    // 4 photos: 2 rows x 2 columns
    const cols = 2;
    const rows = 2;
    canvasWidth = 500;
    const photoWidth = (canvasWidth - (padding * 2) - photoGap) / cols;
    const photoHeight = Math.round(photoWidth * 0.75); // 4:3 ratio
    canvasHeight = padding + (rows * photoHeight) + ((rows - 1) * photoGap) + padding + bottomBarHeight;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        photoPositions.push({
          x: padding + col * (photoWidth + photoGap),
          y: padding + row * (photoHeight + photoGap),
          width: photoWidth,
          height: photoHeight,
        });
      }
    }
  } else {
    // 4-strip: 4 photos vertical
    const rows = 4;
    canvasWidth = 300;
    const photoWidth = canvasWidth - (padding * 2);
    const photoHeight = Math.round(photoWidth * 0.75);
    canvasHeight = padding + (rows * photoHeight) + ((rows - 1) * photoGap) + padding + bottomBarHeight;
    
    for (let row = 0; row < rows; row++) {
      photoPositions.push({
        x: padding,
        y: padding + row * (photoHeight + photoGap),
        width: photoWidth,
        height: photoHeight,
      });
    }
  }
  
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  // Fill background
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  // Draw border around entire strip
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, canvasWidth - 6, canvasHeight - 6);
  
  // Draw each photo
  for (let i = 0; i < Math.min(photos.length, photoPositions.length); i++) {
    const photo = photos[i];
    const pos = photoPositions[i];
    
    try {
      const photoImg = await loadImage(photo);
      
      // Draw photo with cover mode
      const photoRatio = photoImg.naturalWidth / photoImg.naturalHeight;
      const slotRatio = pos.width / pos.height;
      
      let sourceX = 0, sourceY = 0, sourceWidth = photoImg.naturalWidth, sourceHeight = photoImg.naturalHeight;
      
      if (photoRatio > slotRatio) {
        sourceWidth = photoImg.naturalHeight * slotRatio;
        sourceX = (photoImg.naturalWidth - sourceWidth) / 2;
      } else {
        sourceHeight = photoImg.naturalWidth / slotRatio;
        sourceY = (photoImg.naturalHeight - sourceHeight) / 2;
      }
      
      // Draw white border around photo
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(pos.x - 2, pos.y - 2, pos.width + 4, pos.height + 4);
      
      // Draw photo
      ctx.drawImage(
        photoImg,
        sourceX, sourceY, sourceWidth, sourceHeight,
        pos.x, pos.y, pos.width, pos.height
      );
      
      // Draw thin border around photo
      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 1;
      ctx.strokeRect(pos.x, pos.y, pos.width, pos.height);
      
    } catch (error) {
      console.error(`Failed to load photo ${i}:`, error);
      // Draw placeholder
      ctx.fillStyle = '#e0e0e0';
      ctx.fillRect(pos.x, pos.y, pos.width, pos.height);
    }
  }
  
  // Draw bottom branding bar
  const bottomY = canvasHeight - bottomBarHeight;
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, bottomY, canvasWidth, bottomBarHeight);
  
  // Draw branding text (left)
  ctx.fillStyle = colors.text;
  ctx.font = 'bold 14px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(brandingText, padding, bottomY + (bottomBarHeight / 2));
  
  // Draw date (right)
  const today = new Date();
  const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  ctx.textAlign = 'right';
  ctx.fillText(dateStr, canvasWidth - padding, bottomY + (bottomBarHeight / 2));
  
  // Export as PNG
  return canvas.toDataURL('image/png', 1.0);
}

