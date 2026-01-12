// ============================================
// Photo API Service
// ============================================

import { apiClient } from './apiClient';

/**
 * Photo response from backend
 */
export interface PhotoResponse {
  id: number;
  sessionId: number;
  imageUrl: string;
  createdAt: string;
}

/**
 * Create photo request
 */
export interface CreatePhotoRequest {
  sessionId: number;
  imageUrl: string;
}

/**
 * Photo API service - connects to Spring Boot backend
 */
export const photoApi = {
  /**
   * Create photo record
   * POST /photos
   */
  async create(data: CreatePhotoRequest): Promise<PhotoResponse> {
    return apiClient.post<PhotoResponse>('/photos', data);
  },

  /**
   * Get all photos (optionally filtered by sessionId)
   * GET /photos?sessionId=
   */
  async getAll(sessionId?: number): Promise<PhotoResponse[]> {
    const params = sessionId ? { sessionId } : undefined;
    return apiClient.get<PhotoResponse[]>('/photos', { params });
  },

  /**
   * Get photo by ID
   * GET /photos/{id}
   */
  async getById(id: number): Promise<PhotoResponse> {
    return apiClient.get<PhotoResponse>(`/photos/${id}`);
  },

  /**
   * Get photos by session ID
   * GET /photos?sessionId=
   */
  async getBySessionId(sessionId: number): Promise<PhotoResponse[]> {
    return apiClient.get<PhotoResponse[]>('/photos', {
      params: { sessionId },
    });
  },

  /**
   * Delete photo
   * DELETE /photos/{id}
   */
  async delete(id: number): Promise<void> {
    return apiClient.delete(`/photos/${id}`);
  },
};

export default photoApi;

