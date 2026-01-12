// ============================================
// Custom Hook: useKeyboard
// ============================================

import { useEffect, useCallback, useRef } from 'react';

interface KeyboardHandlers {
  [key: string]: () => void;
}

interface UseKeyboardOptions {
  enabled?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

/**
 * Custom hook for keyboard event handling
 */
export function useKeyboard(
  handlers: KeyboardHandlers,
  options: UseKeyboardOptions = {}
): void {
  const { enabled = true, preventDefault = true, stopPropagation = false } = options;
  
  const handlersRef = useRef(handlers);

  // Keep handlers ref updated
  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) {
        return;
      }

      // Get the handler for this key
      const handler = handlersRef.current[event.key] || handlersRef.current[event.code];

      if (handler) {
        if (preventDefault) {
          event.preventDefault();
        }
        
        if (stopPropagation) {
          event.stopPropagation();
        }
        
        handler();
      }
    },
    [enabled, preventDefault, stopPropagation]
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, enabled]);
}

/**
 * Predefined key constants for common keys
 */
export const Keys = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: ' ',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  TAB: 'Tab',
  BACKSPACE: 'Backspace',
  DELETE: 'Delete',
} as const;

export default useKeyboard;
