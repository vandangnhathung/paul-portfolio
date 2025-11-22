// src/components/route-loading-init.tsx
'use client'

import { useRouteLoadingSync } from '@/hooks/use-route-loading-sync';

/**
 * Component to initialize route loading sync
 * Add this to your layout
 */
export function RouteLoadingInit() {
  useRouteLoadingSync();
  return null;
}