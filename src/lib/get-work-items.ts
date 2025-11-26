import type { WorkItem } from '@/lib/type'
import { normalizePages } from 'nextra/normalize-pages'
import { getPageMap } from 'nextra/page-map'
import { importPage } from 'nextra/pages'
import type { Metadata } from 'next'
import WorkImage1 from "../../public/assets/work/work-1.jpg";

// Default image to use when no image is specified in frontmatter
const DEFAULT_WORK_IMAGE = WorkImage1;

/**
 * Get all work items dynamically from MDX files in content/my-work/
 * Excludes index.mdx
 * @see https://nextra.org/docs/docs-theme/configuration
 * @returns Promise<WorkItem[]> - Array of all work items
 */
export async function getWorkItems(): Promise<WorkItem[]> {
  try {
    // Get page map for my-work route
    const { directories } = normalizePages({
      list: await getPageMap('/my-work'),
      route: '/my-work'
    });

    // Filter out index.mdx and convert to WorkItem format
    const workItems = await Promise.all(
      directories
        .filter((item) => item.name !== 'index')
        .map(async (item) => {
          const id = item.name;
          let metadata: Metadata = {};
          
          // Try to load metadata from the MDX file
          try {
            const result = await importPage(['my-work', id]);
            metadata = result.metadata as Metadata;
          } catch (error) {
            console.warn(`Failed to load metadata for ${id}:`, error);
          }

          // Extract frontmatter fields
          const frontMatter = metadata as Record<string, unknown>;
          const title = (frontMatter.title as string) || id;
          const date = (frontMatter.date as string) || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
          const category = (frontMatter.category as string) || '';
          const image = frontMatter.image as string | undefined;
          const containerHeight = (frontMatter.containerHeight as string) || '400';

          // Determine type based on category or default to 'img'
          let type: 'blog' | 'article' | 'img' = 'img';
          if (category.toLowerCase().includes('blog')) {
            type = 'blog';
          } else if (category.toLowerCase().includes('article')) {
            type = 'article';
          }

          // Use provided image or default
          const imgUrl = image || DEFAULT_WORK_IMAGE;

          return {
            id,
            imgUrl,
            containerHeight,
            workName: title,
            workDate: date,
            type,
            url: `/my-work/${id}`,
          } as WorkItem;
        })
    );

    return workItems;
  } catch (error) {
    console.error('Failed to load work items:', error);
    return [];
  }
}

/**
 * Get a work item by its ID
 * @param id - The ID of the work item to retrieve
 * @returns Promise<WorkItem | undefined> - The work item if found, undefined otherwise
 */
export async function getWorkItemById(id: string): Promise<WorkItem | undefined> {
  const workItems = await getWorkItems();
  return workItems.find((item) => item.id === id);
}

/**
 * Get static params for all work items (for static generation)
 * @returns Promise<Array<{ id: string }>> - Array of params for static generation
 */
export async function getWorkItemStaticParams(): Promise<Array<{ id: string }>> {
  const workItems = await getWorkItems();
  return workItems.map((item) => ({
    id: item.id,
  }));
}

