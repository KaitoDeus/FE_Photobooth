// ============================================
// Session API Service
// ============================================

import { apiClient } from './apiClient';

/**
 * Session response from backend
 */
export interface SessionResponse {
  id: number;
  userId: number;
  createdAt: string;
  photoCount: number;
}

/**
 * Create session request
 */
export interface CreateSessionRequest {
  userId: number;
}

/**
 * Session API service - connects to Spring Boot backend
 */
export const sessionApi = {
  /**
   * Create new session
   * POST /sessions
   */
  async create(data: CreateSessionRequest): Promise<SessionResponse> {
    return apiClient.post<SessionResponse>('/sessions', data);
  },

  /**
   * Get session by ID
   * GET /sessions/{id}
   */
  async getById(id: number): Promise<SessionResponse> {
    return apiClient.get<SessionResponse>(`/sessions/${id}`);
  },

  /**
   * Delete session
   * DELETE /sessions/{id}
   */
  async delete(id: number): Promise<void> {
    return apiClient.delete(`/sessions/${id}`);
  },
};

export default sessionApi;

