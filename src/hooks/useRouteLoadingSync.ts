// src/hooks/use-route-loading-sync.ts
'use client'

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useRouteLoadingStore } from '@/stores/routeLoadingStore';

/**
 * Hook to sync Next.js route changes with Zustand store
 * Animates progress bar from 0% to 100% over configurable duration
 * Call this once in your root layout or a provider component
 */
export function useRouteLoadingSync(): void {
  const pathname = usePathname();
  const setLoading = useRouteLoadingStore((state) => state.setLoading);
  const setProgress = useRouteLoadingStore((state) => state.setProgress);
  const loadingDuration = useRouteLoadingStore((state) => state.loadingDuration);
  const pathnameRef = useRef(pathname);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only trigger if pathname actually changed
    if (pathnameRef.current !== pathname) {
      // Reset progress and start loading
      setProgress(0);
      setLoading(true);
      pathnameRef.current = pathname;

      // Clear any existing animations/timeouts
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Start animation
      startTimeRef.current = Date.now();

      const animate = () => {
        if (!startTimeRef.current) return;

        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min((elapsed / loadingDuration) * 100, 100);

        setProgress(progress);

        if (progress < 100) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          // Animation complete, reset after a brief delay
          timeoutRef.current = setTimeout(() => {
            setLoading(false);
            setProgress(0);
            startTimeRef.current = null;
          }, 100);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [pathname, setLoading, setProgress, loadingDuration]);
}