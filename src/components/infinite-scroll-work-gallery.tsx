"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Lenis from 'lenis'
import { WorkItemCard } from "@/components/work-item-card";
import type { WorkItem } from '@/lib/type';

gsap.registerPlugin(useGSAP);

const COLUMN_COUNT = 3;

type InfiniteScrollWorkGalleryProps = {
  workItems?: WorkItem[];
};

export const InfiniteScrollWorkGallery = ({ workItems: initialWorkItems }: InfiniteScrollWorkGalleryProps) => {
  // ============================================================================
  // STEP 1: Initialize refs and get work items data
  // ============================================================================
  // Store references to DOM elements and animation functions needed throughout
  // the component lifecycle for custom scroll behavior
  const container = useRef<HTMLDivElement>(null);
  const workItems = initialWorkItems || [];
  const lenisRef = useRef<Lenis | null>(null);
  const wheelHandlerRef = useRef<((e: WheelEvent) => void) | null>(null);
  const incrRef = useRef<number>(0);
  const yToRefs = useRef<Array<((value: number) => void) | null>>([]);
  const animationCompleteRef = useRef<(() => void) | null>(null);

  // ============================================================================
  // STEP 2: Disable browser's default scroll restoration
  // ============================================================================
  // Prevent browser from automatically restoring scroll position on page load,
  // which would interfere with our custom scroll animation system
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // ============================================================================
  // STEP 3: Play entrance animation when component mounts
  // ============================================================================
  // Animate all work items from hidden/offset position to visible with a
  // staggered cascade effect. Once complete, trigger custom scroll initialization.
  useGSAP(
    () => {
      gsap.to(".work-item", {
        y: 0,
        stagger: 0.025,
        opacity: 1,
        duration: 1,
        onComplete: () => {
          if (animationCompleteRef.current) {
            animationCompleteRef.current();
          }
        },
      });
    },
    { scope: container }
  );

  // ============================================================================
  // STEP 4: Setup custom infinite scroll system
  // ============================================================================
  // Create a custom scroll experience where wheel events animate columns
  // independently with infinite looping. This replaces standard page scrolling
  // with a smooth, controlled animation system.
  useEffect(() => {
    // Initialize Lenis (kept for potential future use, but stopped for now)
    const lenis = new Lenis({
      lerp: 0.05,
    });
    lenis.stop();
    lenisRef.current = lenis;

    // Initialize the column animation system
    const initEffect = () => {
      // Create animation functions for each column that can smoothly move
      // columns up/down with wrapping for infinite scroll effect
      const yToFunctions = Array.from({ length: COLUMN_COUNT }, (_, i) => {
        const colIndex = i + 1;
        const col = document.querySelector(
          `.work-gallery .container${colIndex}`
        ) as HTMLElement;

        if (!col) return null;

        const half = col.clientHeight / 2;
        const wrap = gsap.utils.wrap(-half, 0);

        return gsap.quickTo(col, "y", {
          duration: 1.5,
          ease: "power3",
          modifiers: {
            y: gsap.utils.unitize(wrap),
          },
        });
      });

      yToRefs.current = yToFunctions;

      // Listen to wheel events and translate scroll delta into column animations
      const onWheel = (e: WheelEvent) => {
        incrRef.current -= e.deltaY / 2;
        yToRefs.current.forEach((yTo) => {
          if (yTo) yTo(incrRef.current);
        });
      };

      wheelHandlerRef.current = onWheel;
      window.addEventListener("wheel", onWheel, { passive: true });
    };

    // Wait for initial animation to complete before enabling custom scroll
    animationCompleteRef.current = () => {
      const onLoad = () => initEffect();

      if (document.readyState === "complete") {
        initEffect();
      } else {
        window.addEventListener("load", onLoad, { once: true });
      }
    };

    // Cleanup: remove all event listeners and destroy instances on unmount
    return () => {
      if (wheelHandlerRef.current) {
        window.removeEventListener("wheel", wheelHandlerRef.current);
        wheelHandlerRef.current = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      yToRefs.current = [];
      animationCompleteRef.current = null;
    };
  }, []);

  // ============================================================================
  // STEP 5: Distribute work items across columns
  // ============================================================================
  // Split the work items array into equal columns using modulo distribution
  // (item 0 goes to col 0, item 1 to col 1, item 2 to col 2, item 3 to col 0, etc.)
  const columns = Array.from({ length: COLUMN_COUNT }, (_, colIndex) =>
    workItems.filter((_, index) => index % COLUMN_COUNT === colIndex)
  );

  // Show loading state if no work items
  if (workItems.length === 0) {
    return (
      <div className="work-gallery overflow-hidden h-screen w-full flex items-center justify-center">
        <p className="text-zinc-400">Loading work items...</p>
      </div>
    );
  }

  // ============================================================================
  // STEP 6: Render the gallery layout
  // ============================================================================
  // Create a masonry-style layout with columns. Each column renders its items
  // twice (original + duplicate) to enable seamless infinite scrolling when
  // columns wrap around during animation.
  return (
    <div
      className="work-gallery overflow-hidden h-screen w-full flex flex-col lg:flex-row gap-2 no-scroll-anchor"
      ref={container}
    >
      {columns.map((column, colIndex) => (
        <div key={colIndex} className={`container${colIndex + 1} w-full h-max`}>
          {column.map((item) => (
            <WorkItemCard key={item.id} item={item} />
          ))}
          {column.map((item) => (
            <WorkItemCard key={`duplicate-${item.id}`} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
};

