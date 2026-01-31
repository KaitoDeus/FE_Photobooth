// ============================================
// Main Application Component
// ============================================

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ScreenName, PhotoMode, Language } from './types';
import {
  WelcomePage,
  ModeSelectionPage,
  CameraSetupPage,
  LivePreviewPage,
  CapturePage,
  CountdownPage,
  ReviewPage,
  ActionsPage,
  ThankYouPage,
  HomePage,
  AboutPage,
  InstructionsPage,
  ContactPage,
} from './pages';
import { EditEffectsPanel, FrameSelectionPanel, QrModal, CustomFrame, FloatingNav } from './components';
import { useBoothSession } from './hooks';
import './styles/globals.css';

// Extended screen type to include landing pages
type AppScreen = ScreenName | 'HOME' | 'ABOUT' | 'INSTRUCTIONS' | 'CONTACT';

// Helper to get photo count from mode
const getPhotoCount = (mode: PhotoMode): number => {
  switch (mode) {
    case PhotoMode.LAYOUT_4_STRIP:
    case PhotoMode.LAYOUT_4_GRID:
      return 4;
    case PhotoMode.LAYOUT_6_GRID:
      return 6;
    default:
      return 4;
  }
};

/**
 * Main Application Component
 * Supports browser back/forward navigation using History API
 */
const App: React.FC = () => {
  // Navigation state
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(ScreenName.WELCOME);
  
  // Photo settings
  const [mode, setMode] = useState<PhotoMode>(PhotoMode.LAYOUT_4_GRID);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [selectedFrame, setSelectedFrame] = useState('none');
  const [countdownSeconds, setCountdownSeconds] = useState(3);
  
  // Multi-photo capture state
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [currentShot, setCurrentShot] = useState(1);
  
  // UI state
  const [showFilters, setShowFilters] = useState(false);
  const [showFrames, setShowFrames] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [customFrame, setCustomFrame] = useState<CustomFrame | null>(null);
  
  // Language
  const [lang] = useState<Language>('vi');

  // Booth session management (connects to backend)
  const boothSession = useBoothSession();
  const hasSavedPhotosRef = useRef(false);

  // Map screen names to URL-friendly paths
  const screenToPath: Record<AppScreen, string> = {
    [ScreenName.WELCOME]: '/booth',
    [ScreenName.MODE_SELECTION]: '/booth/mode',
    [ScreenName.CAMERA_SETUP]: '/booth/camera',
    [ScreenName.LIVE_PREVIEW]: '/booth/preview',
    [ScreenName.CAPTURE]: '/booth/capture',
    [ScreenName.COUNTDOWN]: '/booth/countdown',
    [ScreenName.REVIEW]: '/booth/review',
    [ScreenName.ACTIONS]: '/booth/actions',
    [ScreenName.THANK_YOU]: '/booth/thanks',
    'HOME': '/',
    'ABOUT': '/about',
    'INSTRUCTIONS': '/instructions',
    'CONTACT': '/contact',
  };

  const pathToScreen: Record<string, AppScreen> = {
    '/': 'HOME',
    '/home': 'HOME',
    '/booth': ScreenName.WELCOME,
    '/booth/mode': ScreenName.MODE_SELECTION,
    '/booth/camera': ScreenName.CAMERA_SETUP,
    '/booth/preview': ScreenName.LIVE_PREVIEW,
    '/booth/capture': ScreenName.CAPTURE,
    '/booth/countdown': ScreenName.COUNTDOWN,
    '/booth/review': ScreenName.REVIEW,
    '/booth/actions': ScreenName.ACTIONS,
    '/booth/thanks': ScreenName.THANK_YOU,
    '/about': 'ABOUT',
    '/contact': 'CONTACT',
    '/instructions': 'INSTRUCTIONS',
  };

  // Initialize from URL on mount
  useEffect(() => {
    const path = window.location.pathname;
    const screen = pathToScreen[path];
    if (screen) {
      setCurrentScreen(screen);
    } else {
      // If path is invalid, redirect to Home
      window.history.replaceState({ screen: 'HOME' }, '', '/');
      setCurrentScreen('HOME');
    }
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.screen) {
        setCurrentScreen(event.state.screen);
      } else {
        // Fallback to URL path
        const path = window.location.pathname;
        const screen = pathToScreen[path] || 'HOME';
        setCurrentScreen(screen);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation helper with history support
  const navigateTo = useCallback((screen: AppScreen, replace = false) => {
    const path = screenToPath[screen];
    const state = { screen };
    
    if (replace) {
      window.history.replaceState(state, '', path);
    } else {
      window.history.pushState(state, '', path);
    }
    
    setCurrentScreen(screen);
  }, []);

  // Navigation for landing pages (using path strings)
  const navigateToPath = useCallback((path: string) => {
    const screen = pathToScreen[path];
    if (screen) {
      navigateTo(screen);
    }
  }, [navigateTo]);

  // Screen handlers
  const handleStart = async () => {
    // Start a new session when user enters the booth
    const success = await boothSession.startSession();
    if (success) {
      console.log('📷 Booth session started');
    } else {
      console.warn('⚠️ Failed to start session, continuing offline');
    }
    hasSavedPhotosRef.current = false;
    navigateTo(ScreenName.MODE_SELECTION);
  };
  
  const handleSelectMode = (m: PhotoMode, seconds: number) => {
    setMode(m);
    setCountdownSeconds(seconds);
    // Reset capture state when selecting new mode
    setCapturedPhotos([]);
    setCurrentShot(1);
    navigateTo(ScreenName.CAMERA_SETUP);
  };
  
  const handlePermissionGranted = () => navigateTo(ScreenName.LIVE_PREVIEW);
  
  // When user clicks capture button on LivePreview
  const handleCaptureClick = () => {
    setShowFilters(false);
    // Reset photos and start capture flow
    setCapturedPhotos([]);
    setCurrentShot(1);
    navigateTo(ScreenName.CAPTURE);
  };

  // When a photo is captured
  const handlePhotoCaptured = useCallback((photoDataUrl: string) => {
    const totalPhotos = getPhotoCount(mode);
    const newPhotos = [...capturedPhotos, photoDataUrl];
    setCapturedPhotos(newPhotos);
    
    if (newPhotos.length < totalPhotos) {
      // More photos to take
      setCurrentShot(newPhotos.length + 1);
      // Navigate to capture again (this will restart the camera and countdown)
      // Use a small delay to allow state to update
      setTimeout(() => {
        // Re-trigger capture page by navigating
        navigateTo(ScreenName.CAPTURE, true);
      }, 100);
    } else {
      // All photos taken, save to backend and go to review
      if (boothSession.hasActiveSession && !hasSavedPhotosRef.current) {
        console.log('💾 Saving photos to backend...');
        hasSavedPhotosRef.current = true;
        // Save all photos to backend
        boothSession.savePhotos(newPhotos).then(savedPhotos => {
          console.log(`✅ Saved ${savedPhotos.length} photos to backend`);
        }).catch(err => {
          console.error('Failed to save photos:', err);
        });
      }
      navigateTo(ScreenName.REVIEW, true);
    }
  }, [mode, capturedPhotos, navigateTo, boothSession]);
  
  const handleCountdownComplete = () => navigateTo(ScreenName.REVIEW, true);
  
  const handleRetake = () => {
    // Reset and go back to preview
    setCapturedPhotos([]);
    setCurrentShot(1);
    navigateTo(ScreenName.LIVE_PREVIEW);
  };
  
  const handleAccept = () => navigateTo(ScreenName.ACTIONS);
  
  const handlePrint = () => navigateTo(ScreenName.THANK_YOU);
  
  const handleReset = () => {
    setSelectedFilter('none');
    setShowQr(false);
    setCapturedPhotos([]);
    setCurrentShot(1);
    hasSavedPhotosRef.current = false;
    // End the session
    boothSession.endSession();
    // Replace all history and go to home
    window.history.pushState({ screen: 'HOME' }, '', '/');
    setCurrentScreen('HOME');
  };

  // Go back handler for FloatingNav
  const handleGoBack = () => {
    window.history.back();
  };

  // Determine if we should show booth navigation
  const boothScreens: AppScreen[] = [
    ScreenName.WELCOME,
    ScreenName.MODE_SELECTION,
    ScreenName.CAMERA_SETUP,
    ScreenName.LIVE_PREVIEW,
    ScreenName.CAPTURE,
    ScreenName.REVIEW,
    ScreenName.ACTIONS,
    ScreenName.THANK_YOU,
  ];
  const isBoothScreen = boothScreens.includes(currentScreen as ScreenName);
  
  // Don't show back on Welcome (first booth screen)
  const showBackButton = isBoothScreen && currentScreen !== ScreenName.WELCOME;

  // Total photos for current mode
  const totalPhotos = getPhotoCount(mode);

  return (
    <div className="app">
      {/* Floating Navigation for Booth Screens */}
      {isBoothScreen && (
        <FloatingNav
          lang={lang}
          onBack={showBackButton ? handleGoBack : undefined}
          onNavigate={navigateToPath}
          showBack={showBackButton}
        />
      )}

      {/* Landing Pages */}
      {currentScreen === 'HOME' && (
        <HomePage 
          lang={lang} 
          onNavigate={navigateToPath}
        />
      )}
      
      {currentScreen === 'ABOUT' && (
        <AboutPage 
          lang={lang} 
          onNavigate={navigateToPath}
        />
      )}
      
      {currentScreen === 'INSTRUCTIONS' && (
        <InstructionsPage 
          lang={lang} 
          onNavigate={navigateToPath}
        />
      )}
      


      {currentScreen === 'CONTACT' && (
        <ContactPage 
          lang={lang} 
          onNavigate={navigateToPath}
        />
      )}

      {/* Photo Booth Screens */}
      {/* Welcome Screen */}
      {currentScreen === ScreenName.WELCOME && (
        <WelcomePage 
          onStart={handleStart} 
          lang={lang} 
        />
      )}
      
      {/* Mode Selection Screen */}
      {currentScreen === ScreenName.MODE_SELECTION && (
        <ModeSelectionPage 
          onSelectMode={handleSelectMode} 
          lang={lang}
        />
      )}
      
      {/* Camera Setup Screen */}
      {currentScreen === ScreenName.CAMERA_SETUP && (
        <CameraSetupPage 
          onPermissionGranted={handlePermissionGranted} 
          lang={lang}
        />
      )}
      
      {/* Live Preview Screen */}
      {currentScreen === ScreenName.LIVE_PREVIEW && (
        <>
          <LivePreviewPage 
            mode={mode} 
            onCapture={handleCaptureClick} 
            onOpenFilters={() => setShowFilters(true)}
            onOpenFrames={() => setShowFrames(true)}
            selectedFilter={selectedFilter}
            selectedFrame={selectedFrame}
            lang={lang}
          />
          {showFilters && (
            <EditEffectsPanel 
              selectedFilter={selectedFilter}
              onSelectFilter={setSelectedFilter}
              onClose={() => setShowFilters(false)}
              lang={lang}
            />
          )}
          {showFrames && (
            <FrameSelectionPanel 
              selectedFrame={selectedFrame}
              onSelectFrame={setSelectedFrame}
              customFrame={customFrame}
              onCustomFrameUpload={setCustomFrame}
              onRemoveCustomFrame={() => setCustomFrame(null)}
              onClose={() => setShowFrames(false)}
              lang={lang}
            />
          )}
        </>
      )}

      {/* Capture Screen - Handles countdown + actual photo capture */}
      {currentScreen === ScreenName.CAPTURE && (
        <CapturePage
          key={currentShot} // Force re-mount for each shot
          mode={mode}
          currentShot={currentShot}
          totalShots={totalPhotos}
          selectedFilter={selectedFilter}
          onPhotoCaptured={handlePhotoCaptured}
          countdownSeconds={countdownSeconds}
        />
      )}

      {/* Legacy Countdown Screen (kept for compatibility) */}
      {currentScreen === ScreenName.COUNTDOWN && (
        <CountdownPage 
          onComplete={handleCountdownComplete} 
          lang={lang}
          countdownSeconds={countdownSeconds}
        />
      )}

      {/* Review Screen */}
      {currentScreen === ScreenName.REVIEW && (
        <ReviewPage 
          onAccept={handleAccept} 
          onRetake={handleRetake}
          selectedFilter={selectedFilter}
          capturedPhotos={capturedPhotos}
          mode={mode}
          lang={lang}
        />
      )}

      {/* Actions Screen */}
      {currentScreen === ScreenName.ACTIONS && (
        <>
          <ActionsPage 
            onPrint={handlePrint} 
            onRetake={handleRetake}
            onOpenQR={() => setShowQr(true)}
            onSavePhoto={boothSession.uploadAndSavePhoto}
            capturedPhotos={capturedPhotos}
            customFrame={customFrame}
            selectedFrame={selectedFrame}
            mode={mode}
            lang={lang}
          />
          <QrModal 
            isOpen={showQr}
            onClose={() => setShowQr(false)} 
            lang={lang}
          />
        </>
      )}

      {/* Thank You Screen */}
      {currentScreen === ScreenName.THANK_YOU && (
        <ThankYouPage 
          onReset={handleReset} 
          lang={lang}
        />
      )}
    </div>
  );
};

export default App;
