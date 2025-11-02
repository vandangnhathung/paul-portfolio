'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { WorkItem as WorkItemType } from '@/pages/my-work/index'
import styles from './workItem.module.css'

interface WorkItemProps {
  item: WorkItemType
}

export function WorkItemCard({ item }: WorkItemProps) {
  const { imgUrl, containerHeight, workName, workDate, type, url } = item

  return (
    <div className={`${styles.workItem} ${styles[`type-${type}`]}`}>
      <div className={`${styles.workItemImg} ${styles[`work-${containerHeight}`]}`}>
        <div className={styles.workItemImgWrapper}>
          <Image 
            src={imgUrl} 
            alt={workName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
          />
        </div>

        <div className={styles.workItemInfo}>
          <p className={styles.workName}>{workName}</p>
          <p className={styles.workDate}>{workDate}</p>
        </div>
      </div>

      {(type === 'blog' || type === 'article') && (
        <div className={styles.workItemCta}>
          <Link href={url}>
            <button>
              {type === 'blog' ? 'Read Post' : 'View Article'}
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}