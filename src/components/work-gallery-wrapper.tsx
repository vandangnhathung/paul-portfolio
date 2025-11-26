import React from 'react';
import { InfiniteScrollWorkGallery } from '@/components/infinite-scroll-work-gallery';
import { getWorkItems } from '@/lib/get-work-items';

/**
 * Server component wrapper for WorkGallery
 * Fetches work items and passes them to the client component
 * @see https://nextra.org/docs/docs-theme/configuration
 */
export async function WorkGallery() {
  const workItems = await getWorkItems();
  
  return <InfiniteScrollWorkGallery workItems={workItems} />;
}

