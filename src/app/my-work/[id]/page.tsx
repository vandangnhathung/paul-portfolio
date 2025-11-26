import { notFound } from 'next/navigation';
import { getWorkItemById, getWorkItemStaticParams } from '@/lib/get-work-items';
import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import { Link } from 'next-view-transitions';
import { importPage } from 'nextra/pages';
import { useMDXComponents as getMDXComponents } from '../../../../mdx-components';

type PageParams = {
  id: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

/**
 * Generate static params for all work items
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  return await getWorkItemStaticParams();
}

/**
 * Generate metadata for the work item page
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const workItem = await getWorkItemById(params.id);

  if (!workItem) {
    // Try to load as MDX content
    try {
      const { metadata } = await importPage(['my-work', params.id]);
      return metadata;
    } catch {
      return {
        title: 'Work Not Found',
      };
    }
  }

  return {
    title: workItem.workName,
    description: `Work item: ${workItem.workName} - ${workItem.workDate}`,
  };
}

/**
 * Work item detail page component
 * Displays individual work item details
 * @see https://nextra.org/docs/docs-theme/configuration
 */
export default async function WorkItemPage(props: PageProps): Promise<React.JSX.Element> {
  const params = await props.params;
  const workItem = await getWorkItemById(params.id);

  const Wrapper = getMDXComponents().wrapper;

  // If not a work item, try loading as MDX content
  if (!workItem) {
    try {
      // Try to load as MDX content from content/my-work/[id].mdx
      const result = await importPage(['my-work', params.id]);
      const MDXContent = result.default as React.ComponentType<Record<string, unknown>>;
      const mdxMetadata = result.metadata as Metadata;
      const mdxToc = result.toc as Array<{ id: string; depth: number; value: string }>;

      return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-6">
            <Link 
              href="/my-work" 
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 no-underline hover:underline mb-6 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
              Back to My Work
            </Link>
          </div>
          <div className="prose prose-invert max-w-none">
            {MDXContent && mdxMetadata && mdxToc && (
              // @ts-expect-error - Wrapper expects toc and metadata props
              <Wrapper toc={mdxToc} metadata={mdxMetadata}>
                <MDXContent {...props} params={params} />
              </Wrapper>
            )}
          </div>
        </div>
      );
    } catch {
      // If MDX also fails, return 404
      notFound();
    }
  }

  // Load MDX content from content/my-work/[id].mdx
  // @see https://nextra.org/docs/docs-theme/configuration
  let MDXContent: React.ComponentType<Record<string, unknown>> | null = null;
  let mdxMetadata: Metadata | null = null;
  let mdxToc: Array<{ id: string; depth: number; value: string }> | null = null;
  try {
    const result = await importPage(['my-work', params.id]);
    MDXContent = result.default as React.ComponentType<Record<string, unknown>>;
    mdxMetadata = result.metadata as Metadata;
    mdxToc = result.toc as Array<{ id: string; depth: number; value: string }>;
  } catch (error) {
    // If MDX content fails to load, continue without it
    console.warn('Failed to load MDX content:', error);
  }

  // If MDX content exists, render it as primary content
  if (MDXContent && mdxMetadata && mdxToc) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link 
            href="/my-work" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 no-underline hover:underline mb-6 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            Back to My Work
          </Link>
        </div>
        <div className="prose prose-invert max-w-none">
          {/* @ts-expect-error - Wrapper expects toc and metadata props */}
          <Wrapper toc={mdxToc} metadata={mdxMetadata}>
            <MDXContent {...props} params={params} />
          </Wrapper>
        </div>
      </div>
    );
  }

  // Fallback: Render work item template if no MDX content
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link 
          href="/my-work" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 no-underline hover:underline mb-6 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          Back to My Work
        </Link>
        <h1 className="text-4xl font-bold mb-2">{workItem.workName}</h1>
        <p className="text-zinc-400 text-lg">{workItem.workDate}</p>
      </div>

      <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden border border-zinc-800">
        <Image
          src={workItem.imgUrl}
          alt={workItem.workName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
          className="object-cover"
          priority
        />
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 rounded border border-zinc-700 text-sm capitalize">
            {workItem.type}
          </span>
        </div>
      </div>
    </div>
  );
}

