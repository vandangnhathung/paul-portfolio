'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { WorkItem as WorkItemType } from '@/lib/type'

interface WorkItemProps {
  item: WorkItemType
  containerHeight?: number
}

export const WorkItemCard = ({ item, containerHeight: overrideHeight }: WorkItemProps) => {
  const { imgUrl, containerHeight, workName, workDate, type, url } = item
  const finalHeight: number = overrideHeight ?? Number(containerHeight)
  const heightClassByContainer: Record<number, string> = {
    1: 'h-[200px]',
    2: 'h-[250px]',
    3: 'h-[300px]',
    4: 'h-[350px]',
    5: 'h-[400px]',
    6: 'h-[450px]',
    7: 'h-[500px]',
    8: 'h-[550px]',
  }
  const heightClass: string = heightClassByContainer[finalHeight] || 'h-[300px]'

  return (
    <div
      className={`work-item opacity-0 translate-y-[300px] ${type === 'img' ? 'p-0' : 'p-1'
        } relative mb-2 overflow-hidden rounded-lg border border-zinc-800`}
    >
      <Link href={url} className="block">
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
            <p className="text-xs sm:font-medium">{workName}</p>
          </div>
        </div>
      </Link>

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

