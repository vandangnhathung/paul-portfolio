import type { WorkItem } from '@/lib/type'
import WorkImage3 from "../../public/assets/work/work-3.jpg";
import WorkImage4 from "../../public/assets/work/work-4.jpg";
import WorkImage5 from "../../public/assets/work/work-5.jpg";
import WorkImage6 from "../../public/assets/work/work-6.jpg";
import WorkImage7 from "../../public/assets/work/work-7.jpg";
import WorkImage9 from "../../public/assets/work/work-9.jpg";
import WorkImage10 from "../../public/assets/work/work-10.jpg";
import WorkImage11 from "../../public/assets/work/work-11.jpg";
import WorkImage12 from "../../public/assets/work/work-12.jpg";
import WorkImage13 from "../../public/assets/work/work-13.jpg";
import WorkImage16 from "../../public/assets/work/work-16.jpg";
import WorkImage17 from "../../public/assets/work/work-17.jpg";
import WorkImage18 from "../../public/assets/work/work-18.jpg";
import WorkImage19 from "../../public/assets/work/work-19.jpg";
import WorkImage20 from "../../public/assets/work/work-20.jpg";
import WorkImage21 from "../../public/assets/work/work-21.jpg";
import WorkImage22 from "../../public/assets/work/work-22.jpg";

// Centralized work items data
const workItems: WorkItem[] = [
  {
    id: "work-18-1",
    imgUrl: WorkImage18,
    containerHeight: "300",
    workName: "Work Name",
    workDate: "April 2024",
    type: "blog",
    url: "/my-work/work-18-1",
  },
  {
    id: "work-20-1",
    imgUrl: WorkImage20,
    containerHeight: "200",
    workName: "Work Name",
    workDate: "April 2024",
    type: "img",
    url: "/my-work/work-20-1",
  },
  {
    id: "work-3-1",
    imgUrl: WorkImage3,
    containerHeight: "500",
    workName: "Work Name",
    workDate: "April 2024",
    type: "article",
    url: "/my-work/work-3-1",
  },
  {
    id: "work-4-1",
    imgUrl: WorkImage4,
    containerHeight: "350",
    workName: "Work Name",
    workDate: "April 2024",
    type: "blog",
    url: "/my-work/work-4-1",
  },
  {
    id: "work-21-1",
    imgUrl: WorkImage21,
    containerHeight: "250",
    workName: "Work Name",
    workDate: "April 2024",
    type: "img",
    url: "/my-work/work-21-1",
  },
  {
    id: "work-6-1",
    imgUrl: WorkImage6,
    containerHeight: "450",
    workName: "Work Name",
    workDate: "April 2024",
    type: "article",
    url: "/my-work/work-6-1",
  },
  {
    id: "work-10-1",
    imgUrl: WorkImage10,
    containerHeight: "200",
    workName: "Work Name",
    workDate: "April 2024",
    type: "img",
    url: "/my-work/work-10-1",
  },
  {
    id: "work-5-1",
    imgUrl: WorkImage5,
    containerHeight: "350",
    workName: "Work Name",
    workDate: "April 2024",
    type: "article",
    url: "/my-work/work-5-1",
  },
  {
    id: "work-9-1",
    imgUrl: WorkImage9,
    containerHeight: "300",
    workName: "Work Name",
    workDate: "April 2024",
    type: "img",
    url: "/my-work/work-9-1",
  },
  {
    id: "work-10-2",
    imgUrl: WorkImage10,
    containerHeight: "450",
    workName: "Work Name",
    workDate: "April 2024",
    type: "article",
    url: "/my-work/work-10-2",
  },
  {
    id: "work-11-1",
    imgUrl: WorkImage11,
    containerHeight: "200",
    workName: "Work Name",
    workDate: "April 2024",
    type: "blog",
    url: "/my-work/work-11-1",
  },
  {
    id: "work-12-1",
    imgUrl: WorkImage12,
    containerHeight: "450",
    workName: "Work Name",
    workDate: "April 2024",
    type: "article",
    url: "/my-work/work-12-1",
  },
  {
    id: "work-13-1",
    imgUrl: WorkImage13,
    containerHeight: "200",
    workName: "Work Name",
    workDate: "April 2024",
    type: "img",
    url: "/my-work/work-13-1",
  },
  {
    id: "work-7-1",
    imgUrl: WorkImage7,
    containerHeight: "250",
    workName: "Work Name",
    workDate: "April 2024",
    type: "article",
    url: "/my-work/work-7-1",
  },
  {
    id: "work-22-1",
    imgUrl: WorkImage22,
    containerHeight: "350",
    workName: "Work Name",
    workDate: "April 2024",
    type: "img",
    url: "/my-work/work-22-1",
  },
  {
    id: "work-16-1",
    imgUrl: WorkImage16,
    containerHeight: "400",
    workName: "Work Name",
    workDate: "April 2024",
    type: "blog",
    url: "/my-work/work-16-1",
  },
  {
    id: "work-17-1",
    imgUrl: WorkImage17,
    containerHeight: "200",
    workName: "Work Name",
    workDate: "April 2024",
    type: "img",
    url: "/my-work/work-17-1",
  },
  {
    id: "work-18-2",
    imgUrl: WorkImage18,
    containerHeight: "500",
    workName: "Work Name",
    workDate: "April 2024",
    type: "blog",
    url: "/my-work/work-18-2",
  },
  {
    id: "work-19-1",
    imgUrl: WorkImage19,
    containerHeight: "450",
    workName: "Work Name",
    workDate: "April 2024",
    type: "img",
    url: "/my-work/work-19-1",
  },
];

/**
 * Get all work items
 * @returns WorkItem[] - Array of all work items
 */
export function getWorkItems(): WorkItem[] {
  return workItems;
}

/**
 * Get a work item by its ID
 * @param id - The ID of the work item to retrieve
 * @returns WorkItem | undefined - The work item if found, undefined otherwise
 */
export function getWorkItemById(id: string): WorkItem | undefined {
  return workItems.find((item) => item.id === id);
}

/**
 * Get static params for all work items (for static generation)
 * @returns Promise<Array<{ id: string }>> - Array of params for static generation
 */
export async function getWorkItemStaticParams(): Promise<Array<{ id: string }>> {
  return workItems.map((item) => ({
    id: item.id,
  }));
}

