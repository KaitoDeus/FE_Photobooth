// ============================================
// Custom Hook: useCountdown
// ============================================

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseCountdownOptions {
  initialSeconds: number;
  autoStart?: boolean;
  onComplete?: () => void;
  onTick?: (seconds: number) => void;
}

interface UseCountdownReturn {
  seconds: number;
  isRunning: boolean;
  isComplete: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  restart: (newSeconds?: number) => void;
}

/**
 * Custom hook for countdown timer
 */
export function useCountdown(options: UseCountdownOptions): UseCountdownReturn {
  const { initialSeconds, autoStart = false, onComplete, onTick } = options;
  
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);
  const onTickRef = useRef(onTick);

  // Keep callback refs updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
    onTickRef.current = onTick;
  }, [onComplete, onTick]);

  // Countdown logic
  useEffect(() => {
    if (!isRunning) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        const newSeconds = prev - 1;
        
        // Notify tick
        if (onTickRef.current) {
          onTickRef.current(newSeconds);
        }

        // Check completion
        if (newSeconds <= 0) {
          setIsRunning(false);
          setIsComplete(true);
          
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
          
          return 0;
        }

        return newSeconds;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  /**
   * Start countdown
   */
  const start = useCallback(() => {
    if (seconds > 0) {
      setIsRunning(true);
      setIsComplete(false);
    }
  }, [seconds]);

  /**
   * Pause countdown
   */
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  /**
   * Reset countdown to initial value
   */
  const reset = useCallback(() => {
    setIsRunning(false);
    setSeconds(initialSeconds);
    setIsComplete(false);
  }, [initialSeconds]);

  /**
   * Restart countdown with optional new duration
   */
  const restart = useCallback((newSeconds?: number) => {
    setSeconds(newSeconds ?? initialSeconds);
    setIsComplete(false);
    setIsRunning(true);
  }, [initialSeconds]);

  return {
    seconds,
    isRunning,
    isComplete,
    start,
    pause,
    reset,
    restart,
  };
}

export default useCountdown;
