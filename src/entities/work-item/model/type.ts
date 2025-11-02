export interface WorkItem {
    id: string
    imgUrl: string
    containerHeight: string
    workName: string
    workDate: string
    type: 'blog' | 'article' | 'img'
    url: string
  }
  
  export type WorkItemType = 'blog' | 'article' | 'img'