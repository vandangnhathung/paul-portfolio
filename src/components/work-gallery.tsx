'use client'

import React, { useEffect } from "react";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { WorkItemCard } from "@/components/work-item-card";
import { getWorkItems } from "@/lib/get-work-items";

gsap.registerPlugin(useGSAP);

export const WorkGallery = () => {
  const container = useRef<HTMLDivElement>(null);
  const workItems = getWorkItems();

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

  // Split work items into three columns for the masonry layout
  const column1 = workItems.filter((_, index) => index % 3 === 0);
  const column2 = workItems.filter((_, index) => index % 3 === 1);
  const column3 = workItems.filter((_, index) => index % 3 === 2);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-2 mb-40 no-scroll-anchor" ref={container}>
      <div className="flex-1 w-full h-full">
        {column1.map((item) => (
          <WorkItemCard key={item.id} item={item} />
        ))}
      </div>

      <div className="flex-1 w-full h-full">
        {column2.map((item) => (
          <WorkItemCard key={item.id} item={item} />
        ))}
      </div>

      <div className="flex-1 w-full h-full">
        {column3.map((item) => (
          <WorkItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

