'use client'

import { useEffect } from 'react';
import { useRouteLoadingStore } from '@/stores/routeLoadingStore';

/**
 * Fixed top loading bar component
 * Shows a yellow progress bar at the top of the page during route changes
 */
export function RouteProgressBar() {
  const progress = useRouteLoadingStore((state) => state.progress);
  const isLoading = useRouteLoadingStore((state) => state.isLoading);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999999] pointer-events-none"
      style={{
        height: '1px',
        backgroundColor: 'yellow',
        transform: `scaleX(${progress / 100})`,
        transformOrigin: 'left',
        transition: isLoading ? 'transform 0.1s linear' : 'none',
        opacity: isLoading || progress > 0 ? 1 : 0,
      }}
    />
  );
}

