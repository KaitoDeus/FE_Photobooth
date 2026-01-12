// ============================================
// Upload API Service
// ============================================

import { apiClient } from './apiClient';

/**
 * Base64 upload request
 */
export interface Base64UploadRequest {
  imageData: string;     // Base64 encoded image (with or without data URL prefix)
  sessionId?: number;    // Optional: link to session
  extension?: string;    // Optional: file extension (default: png)
}

/**
 * Upload response from backend
 */
export interface UploadResponse {
  success: boolean;
  imageUrl: string;      // Public URL to access the image
  filename: string;      // Saved filename
  photoId?: number;      // ID of the photo in database (if saved)
  error?: string;        // Error message if failed
}

/**
 * Upload API service - handles file uploads
 */
export const uploadApi = {
  /**
   * Upload image as base64
   * POST /upload/base64
   */
  async uploadBase64(data: Base64UploadRequest): Promise<UploadResponse> {
    return apiClient.post<UploadResponse>('/upload/base64', data);
  },

  /**
   * Upload image as file
   * POST /upload/file
   */
  async uploadFile(file: File | Blob, sessionId?: number): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (sessionId) {
      formData.append('sessionId', String(sessionId));
    }
    
    // Use fetch directly for multipart upload
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
    const response = await fetch(`${API_BASE_URL}/upload/file`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }
    
    return response.json();
  },
};

export default uploadApi;
