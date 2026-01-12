// ============================================
// API Type Definitions
// ============================================

/**
 * Base API response structure
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============================================
// User Types
// ============================================

export interface User {
  id: number;
  name: string;
  createdAt: string;
}

export interface CreateUserDto {
  name: string;
}

export interface UpdateUserDto {
  name?: string;
}

// ============================================
// Session Types
// ============================================

export interface Session {
  id: number;
  userId: number;
  createdAt: string;
  user?: User;
  photos?: Photo[];
}

export interface CreateSessionDto {
  userId: number;
}

// ============================================
// Photo Types
// ============================================

export interface Photo {
  id: number;
  sessionId: number;
  imageUrl: string;
  createdAt: string;
  session?: Session;
}

export interface CreatePhotoDto {
  sessionId: number;
  imageUrl: string;
}

export interface UploadPhotoDto {
  sessionId: number;
  image: File | Blob;
}
