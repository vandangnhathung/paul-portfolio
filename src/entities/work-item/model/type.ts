import type { StaticImageData } from 'next/image'

export interface WorkItem {
    id: string
    imgUrl: string | StaticImageData
    containerHeight: string
    workName: string
    workDate: string
    type: 'blog' | 'article' | 'img'
    url: string
  }
  
  export type WorkItemType = 'blog' | 'article' | 'img'