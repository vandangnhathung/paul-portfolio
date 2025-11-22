import { notFound } from 'next/navigation';
import { getWorkItemById, getWorkItemStaticParams } from '@/lib/get-work-items';
import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

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
  const workItem = getWorkItemById(params.id);

  if (!workItem) {
    return {
      title: 'Work Not Found',
    };
  }

  return {
    title: workItem.workName,
    description: `Work item: ${workItem.workName} - ${workItem.workDate}`,
  };
}

/**
 * Work item detail page component
 * Displays individual work item details
 */
export default async function WorkItemPage(props: PageProps): Promise<React.JSX.Element> {
  const params = await props.params;
  const workItem = getWorkItemById(params.id);

  if (!workItem) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
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
        
        {/* Add your work item content here */}
        <p className="text-zinc-300">
          This is a placeholder for the work item content. You can add more details about this work item here.
        </p>
      </div>
    </div>
  );
}

