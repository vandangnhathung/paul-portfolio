'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { WorkItem as WorkItemType } from '@/lib/type'

interface WorkItemProps {
  item: WorkItemType
}

export const WorkItemCard = ({ item }: WorkItemProps) => {
  const { imgUrl, containerHeight, workName, workDate, type, url } = item
  const heightClassByContainer: Record<string, string> = {
    '200': 'h-[200px]',
    '250': 'h-[250px]',
    '300': 'h-[300px]',
    '350': 'h-[350px]',
    '400': 'h-[400px]',
    '450': 'h-[450px]',
    '500': 'h-[500px]',
    '550': 'h-[550px]',
  }
  const heightClass = heightClassByContainer[containerHeight] || 'h-[300px]'

  return (
    <div
      className={`work-item opacity-0 translate-y-[300px] ${type === 'img' ? 'p-0' : 'p-1'
        } relative mb-2 overflow-hidden rounded-lg border border-zinc-800`}
    >
      <div className="relative">
        <div className={`w-full ${heightClass} overflow-hidden rounded-lg`}>
          <Image
            src={imgUrl}
            alt={workName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover scale-110"
          />
        </div>

        <div className="absolute bottom-0 w-full flex justify-between p-4">
          <p className="font-medium">{workName}</p>
          <p className="text-zinc-400">{workDate}</p>
        </div>
      </div>

      {(type === 'blog' || type === 'article') && (
        <div className="mt-2">
          <Link href={url}>
            <button className="px-3 py-1 rounded border border-zinc-700 hover:bg-zinc-800 transition">
              {type === 'blog' ? 'Read Post' : 'View Article'}
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

