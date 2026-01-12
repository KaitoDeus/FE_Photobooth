// ============================================
// User API Service
// ============================================

import { apiClient } from './apiClient';

/**
 * User response from backend
 */
export interface UserResponse {
  id: number;
  name: string;
  createdAt: string;
  sessionCount: number;
}

/**
 * Create user request
 */
export interface CreateUserRequest {
  name: string;
}

/**
 * User API service - connects to Spring Boot backend
 */
export const userApi = {
  /**
   * Create new user
   * POST /users
   */
  async create(data: CreateUserRequest): Promise<UserResponse> {
    return apiClient.post<UserResponse>('/users', data);
  },

  /**
   * Get all users
   * GET /users
   */
  async getAll(): Promise<UserResponse[]> {
    return apiClient.get<UserResponse[]>('/users');
  },

  /**
   * Get user by ID
   * GET /users/{id}
   */
  async getById(id: number): Promise<UserResponse> {
    return apiClient.get<UserResponse>(`/users/${id}`);
  },

  /**
   * Delete user
   * DELETE /users/{id}
   */
  async delete(id: number): Promise<void> {
    return apiClient.delete(`/users/${id}`);
  },
};

export default userApi;

