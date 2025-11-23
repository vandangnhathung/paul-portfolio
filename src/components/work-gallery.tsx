"use client";

import React, { useEffect } from "react";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Lenis from 'lenis'

import { WorkItemCard } from "@/components/work-item-card";
import { getWorkItems } from "@/lib/get-work-items";

gsap.registerPlugin(useGSAP);

export const WorkGallery = () => {
  const container = useRef<HTMLDivElement>(null);
  const workItems = getWorkItems();
  const lenisRef = useRef<Lenis | null>(null);
  const wheelHandlerRef = useRef<((e: WheelEvent) => void) | null>(null);
  const incrRef = useRef<number>(0);
  const yTo1Ref = useRef<((value: number) => void) | null>(null);
  const yTo2Ref = useRef<((value: number) => void) | null>(null);
  const yTo3Ref = useRef<((value: number) => void) | null>(null);
  const animationCompleteRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useGSAP(
    () => {
      gsap.to(".work-item", {
        y: 0,
        stagger: 0.025,
        opacity: 1,
        duration: 1,
        onComplete: () => {
          // Run the rest of the code after animation completes
          if (animationCompleteRef.current) {
            animationCompleteRef.current();
          }
        },
      });
    },
    { scope: container }
  );

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      lerp: 0.05,
    });
    // Stop Lenis to prevent conflicts with custom scroll handler
    lenis.stop();
    lenisRef.current = lenis;

    // force scroll-to-top on entry and when restored from bfcache
      // const handlePageShow = () => lenis.scrollTo(0, { immediate: true });
      // handlePageShow();
      // window.addEventListener("pageshow", handlePageShow);

    const initEffect = () => {
      // calculating the height of half a column to determine when it should loop.
      const col1 = document.querySelector(
        ".work-gallery .container1"
      ) as HTMLElement;
      const half1 = col1?.clientHeight / 2;
      const wrap1 = gsap.utils.wrap(-half1, 0);

      console.log("half1", half1);

      const yTo1 = gsap.quickTo(col1, "y", {
        duration: 1.5, // Changes over 0.5s
        ease: "power3", // Non-linear
        modifiers: {
          y: gsap.utils.unitize(wrap1),
        },
      });
      yTo1Ref.current = yTo1;

      const col2 = document.querySelector(
        ".work-gallery .container2"
      ) as HTMLElement;
      const half2 = col2?.clientHeight / 2;
      const wrap2 = gsap.utils.wrap(-half2, 0);

      const yTo2 = gsap.quickTo(col2, "y", {
        duration: 1.5, // Changes over 0.5s
        ease: "power3", // Non-linear
        modifiers: {
          y: gsap.utils.unitize(wrap2),
        },
      });
      yTo2Ref.current = yTo2;

      const col3 = document.querySelector(
        ".work-gallery .container3"
      ) as HTMLElement;
      const half3 = col3?.clientHeight / 2;
      const wrap3 = gsap.utils.wrap(-half3, 0);

      const yTo3 = gsap.quickTo(col3, "y", {
        duration: 1.5, // Changes over 0.5s
        ease: "power3", // Non-linear
        modifiers: {
          y: gsap.utils.unitize(wrap3),
        },
      });
      yTo3Ref.current = yTo3;

      const onWheel = (e: WheelEvent) => {
        incrRef.current -= e.deltaY / 2;
        console.log("incr", incrRef.current);
        if (yTo1Ref.current) yTo1Ref.current(incrRef.current);
        if (yTo2Ref.current) yTo2Ref.current(incrRef.current);
        if (yTo3Ref.current) yTo3Ref.current(incrRef.current);
      };

      wheelHandlerRef.current = onWheel;
      const opts: AddEventListenerOptions = { passive: true };
      window.addEventListener("wheel", onWheel, opts);
    };

    // Set up the callback to run after animation completes
    animationCompleteRef.current = () => {
      const onLoad = () => initEffect();

      if (document.readyState === "complete") {
        initEffect();
      } else {
        window.addEventListener("load", onLoad, { once: true });
      }
    };

    return () => {
      // Clean up wheel event listener
      if (wheelHandlerRef.current) {
        window.removeEventListener("wheel", wheelHandlerRef.current);
        wheelHandlerRef.current = null;
      }
      // Clean up Lenis instance
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      // Reset refs
      yTo1Ref.current = null;
      yTo2Ref.current = null;
      yTo3Ref.current = null;
      animationCompleteRef.current = null;
      // window.removeEventListener('pageshow', handlePageShow)
    };
  }, []);

  // Split work items into three columns for the masonry layout
  const column1 = workItems.filter((_, index) => index % 3 === 0);
  const column2 = workItems.filter((_, index) => index % 3 === 1);
  const column3 = workItems.filter((_, index) => index % 3 === 2);

  return (
    <div
      className="work-gallery overflow-hidden h-screen w-full flex flex-col lg:flex-row gap-2 no-scroll-anchor"
      ref={container}
    >
      <div className="container1 w-full h-max">
        {column1.map((item) => {
          return (
            <WorkItemCard key={item.id} item={item} />
          )
        })}
        {column1.map((item) => {
          return (
            <WorkItemCard key={item.id} item={item} />
          )
        })}
      </div>

      <div className="container2 w-full h-max">
        {column2.map((item) => (
          <WorkItemCard key={item.id} item={item} />
        ))}
        {column2.map((item) => (
          <WorkItemCard key={item.id} item={item} />
        ))}
      </div>

      <div className="container3 w-full h-max">
        {column3.map((item) => (
          <WorkItemCard key={item.id} item={item} />
        ))}
         {column3.map((item) => (
          <WorkItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
