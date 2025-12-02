"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import React from "react";

/**
 * Component description goes here.
 * This is a reusable component template for the registry system.
 *
 * @see https://your-api-docs-url.com for API documentation
 */
export interface FadingTransitionProps {
  /** Array of images. **/
  images?: { url: string; title: string }[];
}

/**
 * FadingTransition - Brief description of what this component does
 *
 * @param props - Component props
 * @returns JSX element
 */
export function FadingTransition({ images }: FadingTransitionProps) {
  useGSAP(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.05,
    });
    lenis.start();

    gsap.registerPlugin(ScrollTrigger);
    const pinHeight = document.querySelector(".pin-height") as HTMLElement;
    const slider = document.querySelector(".slider") as HTMLElement;
    const medias = document.querySelectorAll(
      ".slide:not(.first-child) .slide-main-img"
    );

    ScrollTrigger.create({
      trigger: pinHeight,
      start: "top top",
      end: "bottom bottom",
      pin: slider,
    });

    gsap.to(medias, {
      maskImage: "linear-gradient(transparent -25%, #000 0%, #000 100%)",
      ease: "power3.inOut",
      stagger: 0.5,
      scrollTrigger: {
        trigger: pinHeight,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: true,
      },
    });

    const mediasBackground = document.querySelectorAll(
      ".slide:not(.first-child) .slide-bg-img"
    );
    gsap.to(mediasBackground, {
      maskImage: "linear-gradient(transparent -25%, #000 0%, #000 100%)",
      ease: "power3.inOut",
      stagger: 1,
      duration: 1,
      scrollTrigger: {
        trigger: pinHeight,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: true,
      },
    });
  });

  return (
    <div
      className="pin-height relative"
      style={{ height: `${(images?.length || 0) * 100}vh` }}
    >
      <div className="slider h-screen w-full relative z-10">
        {images?.map((image, index) => (
          <div
            className={clsx(
              "slide relative h-full",
              index === 0 ? "first-child" : ""
            )}
            key={image.url}
          >
            {/* background image */}
            <div
              className="slide-bg-img fixed top-0 left-0 w-full h-full z-10"
              style={
                index === 0
                  ? {}
                  : {
                      maskImage:
                        "linear-gradient(transparent 100%, #000 125%, #000 225%)",
                      WebkitMaskImage:
                        "linear-gradient(transparent 100%, #000 125%, #000 225%)",
                    }
              }
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* main image */}
            <div
              className="slide-main-img w-[30vw] aspect-square fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 overflow-hidden rounded-[0.8vw] z-20"
              style={
                index === 0
                  ? {}
                  : {
                      maskImage:
                        "linear-gradient(transparent 100%, #000 125%, #000 225%)",
                      WebkitMaskImage:
                        "linear-gradient(transparent 100%, #000 125%, #000 225%)",
                    }
              }
            >
              <div className="w-full h-full">
                <img
                  src={image.url}
                  alt={image.title}
                  className="media w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* content - positioned absolutely within pin-height, scrolls naturally */}
      {images?.map((image, index) => (
        <div 
          className="absolute w-full h-screen flex items-center justify-center z-30" 
          style={{ top: `${index * 100}vh` }}
          key={`title-${image.url}`}
        >
          <h2 className="text-4xl font-bold">{image.title}</h2>
        </div>
      ))}
    </div>
  );
}
