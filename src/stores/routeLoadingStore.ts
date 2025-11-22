// src/stores/route-loading-store.ts
'use client'

import { create } from 'zustand';

interface RouteLoadingState {
  isLoading: boolean;
  progress: number; // 0 to 100
  loadingDuration: number; // Duration in milliseconds (default: 2000ms)
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  setLoadingDuration: (duration: number) => void;
}

/**
 * Zustand store for managing route loading state
 * Lightweight and performant - only re-renders components that use this store
 */
export const useRouteLoadingStore = create<RouteLoadingState>((set) => ({
  isLoading: false,
  progress: 0,
  loadingDuration: 2000, // Default 2 seconds
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setProgress: (progress: number) => set({ progress: Math.max(0, Math.min(100, progress)) }),
  setLoadingDuration: (duration: number) => set({ loadingDuration: duration }),
}));