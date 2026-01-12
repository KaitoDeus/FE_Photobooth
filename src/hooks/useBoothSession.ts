// ============================================
// Hook: useBoothSession
// ============================================
// Manages the photo booth session lifecycle:
// - Creates anonymous user when booth starts
// - Creates session for the user
// - Saves photos after capture

import { useState, useCallback } from 'react';
import { userApi, UserResponse } from '../api/userApi';
import { sessionApi, SessionResponse } from '../api/sessionApi';
import { photoApi, PhotoResponse } from '../api/photoApi';
import { uploadApi, UploadResponse } from '../api/uploadApi';

/**
 * Booth session state
 */
interface BoothSessionState {
  user: UserResponse | null;
  session: SessionResponse | null;
  photos: PhotoResponse[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to manage booth session with backend
 */
export const useBoothSession = () => {
  const [state, setState] = useState<BoothSessionState>({
    user: null,
    session: null,
    photos: [],
    isLoading: false,
    error: null,
  });

  /**
   * Start a new booth session
   * Creates an anonymous user and a new session
   */
  const startSession = useCallback(async (userName?: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Create anonymous user with timestamp-based name
      const displayName = userName || `Guest_${Date.now()}`;
      const user = await userApi.create({ name: displayName });
      
      console.log('✅ User created:', user);

      // Create session for the user
      const session = await sessionApi.create({ userId: user.id });
      
      console.log('✅ Session created:', session);

      setState(prev => ({
        ...prev,
        user,
        session,
        photos: [],
        isLoading: false,
        error: null,
      }));

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to start session';
      console.error('❌ Failed to start session:', errorMessage);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      return false;
    }
  }, []);

  /**
   * Save a captured photo to the session
   * @param imageDataUrl - The base64 data URL of the captured photo
   */
  const savePhoto = useCallback(async (imageDataUrl: string): Promise<PhotoResponse | null> => {
    if (!state.session) {
      console.warn('⚠️ No active session to save photo');
      return null;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // For now, we save the data URL directly
      // In production, you would upload to a file server first
      const photo = await photoApi.create({
        sessionId: state.session.id,
        imageUrl: imageDataUrl,
      });

      console.log('✅ Photo saved:', photo.id);

      setState(prev => ({
        ...prev,
        photos: [...prev.photos, photo],
        isLoading: false,
      }));

      return photo;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save photo';
      console.error('❌ Failed to save photo:', errorMessage);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      return null;
    }
  }, [state.session]);

  /**
   * Save multiple photos at once (for batch saving after all captures)
   */
  const savePhotos = useCallback(async (imageDataUrls: string[]): Promise<PhotoResponse[]> => {
    if (!state.session) {
      console.warn('⚠️ No active session to save photos');
      return [];
    }

    setState(prev => ({ ...prev, isLoading: true }));

    const savedPhotos: PhotoResponse[] = [];

    try {
      for (const imageUrl of imageDataUrls) {
        const photo = await photoApi.create({
          sessionId: state.session.id,
          imageUrl,
        });
        savedPhotos.push(photo);
        console.log('✅ Photo saved:', photo.id);
      }

      setState(prev => ({
        ...prev,
        photos: [...prev.photos, ...savedPhotos],
        isLoading: false,
      }));

      console.log(`✅ All ${savedPhotos.length} photos saved successfully`);
      return savedPhotos;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save photos';
      console.error('❌ Failed to save photos:', errorMessage);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      return savedPhotos;
    }
  }, [state.session]);

  /**
   * Upload photo to server and save to database
   * This saves the image file to the server and creates a photo record
   * @param imageDataUrl - The base64 data URL of the image
   * @returns Upload result with image URL
   */
  const uploadAndSavePhoto = useCallback(async (imageDataUrl: string): Promise<UploadResponse | null> => {
    if (!state.session) {
      console.warn('⚠️ No active session to upload photo');
      return null;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // Upload the image to the server
      const result = await uploadApi.uploadBase64({
        imageData: imageDataUrl,
        sessionId: state.session.id,
        extension: 'png',
      });

      if (result.success) {
        console.log('✅ Photo uploaded and saved:', result);
        
        // If photoId is returned, it means the photo record was created
        if (result.photoId) {
          // Fetch the photo record to add to state
          const photo = await photoApi.getById(result.photoId);
          setState(prev => ({
            ...prev,
            photos: [...prev.photos, photo],
            isLoading: false,
          }));
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } else {
        throw new Error(result.error || 'Upload failed');
      }

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload photo';
      console.error('❌ Failed to upload photo:', errorMessage);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      return null;
    }
  }, [state.session]);

  /**
   * End the current session and reset state
   */
  const endSession = useCallback(() => {
    console.log('📷 Session ended');
    setState({
      user: null,
      session: null,
      photos: [],
      isLoading: false,
      error: null,
    });
  }, []);

  /**
   * Clear any errors
   */
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    // State
    user: state.user,
    session: state.session,
    photos: state.photos,
    isLoading: state.isLoading,
    error: state.error,
    hasActiveSession: !!state.session,

    // Actions
    startSession,
    savePhoto,
    savePhotos,
    uploadAndSavePhoto,
    endSession,
    clearError,
  };
};

export default useBoothSession;

