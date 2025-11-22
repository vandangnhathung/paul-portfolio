'use client'

import { useRouteLoadingStore } from '@/stores/route-loading-store';

/**
 * Utility hook to configure route loading duration
 * 
 * @example
 * ```tsx
 * // In your component
 * const { setDuration } = useRouteLoadingConfig();
 * 
 * // Set duration to 3 seconds
 * setDuration(3000);
 * ```
 */
export function useRouteLoadingConfig() {
  const setLoadingDuration = useRouteLoadingStore((state) => state.setLoadingDuration);
  const loadingDuration = useRouteLoadingStore((state) => state.loadingDuration);

  return {
    setDuration: (duration: number) => setLoadingDuration(duration),
    duration: loadingDuration,
  };
}

