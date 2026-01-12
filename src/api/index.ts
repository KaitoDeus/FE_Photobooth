// ============================================
// API Services - Main Export
// ============================================

export { apiClient } from './apiClient';
export { userApi } from './userApi';
export type { UserResponse, CreateUserRequest } from './userApi';
export { sessionApi } from './sessionApi';
export type { SessionResponse, CreateSessionRequest } from './sessionApi';
export { photoApi } from './photoApi';
export type { PhotoResponse, CreatePhotoRequest } from './photoApi';
export { uploadApi } from './uploadApi';
export type { UploadResponse, Base64UploadRequest } from './uploadApi';
