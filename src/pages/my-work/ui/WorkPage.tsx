'use client'

import React, { useEffect } from "react";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import WorkImage3 from "@/assets/work/work-3.jpg";
import WorkImage4 from "@/assets/work/work-4.jpg";
import WorkImage5 from "@/assets/work/work-5.jpg";
import WorkImage6 from "@/assets/work/work-6.jpg";
import WorkImage7 from "@/assets/work/work-7.jpg";
import WorkImage9 from "@/assets/work/work-9.jpg";
import WorkImage10 from "@/assets/work/work-10.jpg";
import WorkImage11 from "@/assets/work/work-11.jpg";
import WorkImage12 from "@/assets/work/work-12.jpg";
import WorkImage13 from "@/assets/work/work-13.jpg";
import WorkImage16 from "@/assets/work/work-16.jpg";
import WorkImage17 from "@/assets/work/work-17.jpg";
import WorkImage18 from "@/assets/work/work-18.jpg";
import WorkImage19 from "@/assets/work/work-19.jpg";
import WorkImage20 from "@/assets/work/work-20.jpg";
import WorkImage21 from "@/assets/work/work-21.jpg";
import WorkImage22 from "@/assets/work/work-22.jpg";
import { WorkItemCard } from "@/entities/work-item/WorkItemCard";

gsap.registerPlugin(useGSAP);

const MyWork = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, []);

  useGSAP(() => {
    gsap.to(".work-item", { y: 0, stagger: 0.025, opacity: 1 });
  },
    { scope: container }
  );



  return (
    <div className="w-full flex flex-col lg:flex-row gap-2 mb-40 no-scroll-anchor" ref={container}>
      <div className="flex-1 w-full h-full">
        <WorkItemCard
          item={{
            id: "work-18-1",
            imgUrl: WorkImage18,
            containerHeight: "300",
            workName: "Work Name",
            workDate: "April 2024",
            type: "blog",
            url: "/post",
          }}
        />
        <WorkItemCard
          item={{
            id: "work-20-1",
            imgUrl: WorkImage20,
            containerHeight: "200",
            workName: "Work Name",
            workDate: "April 2024",
            type: "img",
            url: "/post",
          }}
        />
        <WorkItemCard
          item={{
            id: "work-3-1",
            imgUrl: WorkImage3,
            containerHeight: "500",
            workName: "Work Name",
            workDate: "April 2024",
            type: "article",
            url: "/post",
          }}
        />
        <WorkItemCard
          item={{
            id: "work-4-1",
            imgUrl: WorkImage4,
            containerHeight: "350",
            workName: "Work Name",
            workDate: "April 2024",
            type: "blog",
            url: "/post",
          }}
        />
        <WorkItemCard
          item={{
            id: "work-21-1",
            imgUrl: WorkImage21,
            containerHeight: "250",
            workName: "Work Name",
            workDate: "April 2024",
            type: "img",
            url: "/post",
          }}
        />
        <WorkItemCard
          item={{
            id: "work-6-1",
            imgUrl: WorkImage6,
            containerHeight: "450",
            workName: "Work Name",
            workDate: "April 2024",
            type: "article",
            url: "/post",
          }}
        />
      </div>

      <div className="flex-1 w-full h-full">
        <WorkItemCard
          item={{
            id: "work-10-1",
            imgUrl: WorkImage10,
            containerHeight: "200",
            workName: "Work Name",
            workDate: "April 2024",
            type: "img",
            url: "/post",
          }}
        />
        <WorkItemCard
          item={{
            id: "work-5-1",
            imgUrl: WorkImage5,
            containerHeight: "350",
            workName: "Work Name",
            workDate: "April 2024",
            type: "article",
            url: "/post",
          }}
        />
        <WorkItemCard
          item={{
            id: "work-9-1",
            imgUrl: WorkImage9,
            containerHeight: "300",
            workName: "Work Name",
            workDate: "April 2024",
            type: "img",
            url: "/post",
          }}
        />
        <WorkItemCard
          item={{
            id: "work-10-2",
            imgUrl: WorkImage10,
            containerHeight: "450",
            workName: "Work Name",
            workDate: "April 2024",
            type: "article",
            url: "/post",
          }}
        />
        <WorkItemCard
          item={{
            id: "work-11-1",
            imgUrl: WorkImage11,
            containerHeight: "200",
            workName: "Work Name",
            workDate: "April 2024",
            type: "blog",
            url: "/post",
          }}
        />
        <WorkItemCard
          item={{
            id: "work-12-1",
            imgUrl: WorkImage12,
            containerHeight: "450",
            workName: "Work Name",
            workDate: "April 2024",
            type: "article",
            url: "/post",
          }}
        />
        <WorkItemCard
          item={{
            id: "work-13-1",
            imgUrl: WorkImage13,
            containerHeight: "200",
            workName: "Work Name",
            workDate: "April 2024",
            type: "img",
            url: "/post",
          }}
        />
      </div>

      <div className="flex-1 w-full h-full">
        <WorkItemCard
          item={{
            id: "work-7-1",
            imgUrl: WorkImage7,
            containerHeight: "250",
            workName: "Work Name",
            workDate: "April 2024",
            type: "article",
            url: "/post",
          }}
        />
        <WorkItemCard
          item={{
            id: "work-22-1",
            imgUrl: WorkImage22,
            containerHeight: "350",
            workName: "Work Name",
            workDate: "April 2024",
            type: "img",
            url: "/post",
          }}
        />
        <WorkItemCard
          item={{
            id: "work-16-1",
            imgUrl: WorkImage16,
            containerHeight: "400",
            workName: "Work Name",
            workDate: "April 2024",
            type: "blog",
            url: "/post",
          }}
        />
        <WorkItemCard
          item={{
            id: "work-17-1",
            imgUrl: WorkImage17,
            containerHeight: "200",
            workName: "Work Name",
            workDate: "April 2024",
            type: "img",
            url: "/post",
          }}
        />
        <WorkItemCard
          item={{
            id: "work-18-2",
            imgUrl: WorkImage18,
            containerHeight: "500",
            workName: "Work Name",
            workDate: "April 2024",
            type: "blog",
            url: "/post",
          }}
        />
        <WorkItemCard
          item={{
            id: "work-19-1",
            imgUrl: WorkImage19,
            containerHeight: "450",
            workName: "Work Name",
            workDate: "April 2024",
            type: "img",
            url: "/post",
          }}
        />
      </div>
    </div>
  );
};

export default MyWork;
