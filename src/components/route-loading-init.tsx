// src/components/route-loading-init.tsx
'use client'

import { useRouteLoadingSync } from '@/hooks/useRouteLoadingSync';

/**
 * Component to initialize route loading sync
 * Add this to your layout
 */
export function RouteLoadingInit() {
  useRouteLoadingSync();
  return null;
}