"use client"

import { useGSAP } from "@gsap/react";
import React from "react"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
/**
 * Component description goes here.
 * This is a reusable component template for the registry system.
 * 
 * @see https://your-api-docs-url.com for API documentation
 */
export interface ScrollingSectionsProps {
  /** Description of the prop */
  exampleProp?: string
}

/**
 * ScrollingSections - Brief description of what this component does
 * 
 * @param props - Component props
 * @returns JSX element
 */
gsap.registerPlugin(ScrollTrigger)

export function ScrollingSections({ exampleProp = "default value" }: ScrollingSectionsProps) {

  useGSAP(() => {
    const slides = document.querySelectorAll('.slide');

    // Guard check: ensure slides exist
    if (!slides || slides.length === 0) return;

    slides.forEach((slide, index) => {
      const contentWrapper = slide.querySelector('.content-wrapper');
      if (!contentWrapper) return;
      const content = contentWrapper.querySelector('.content')

      // Guard check: ensure content exists before animating
      if (!content) return;

      if (index !== slides.length - 1) {
        gsap.to(content, {
          rotationZ: (Math.random() - 0.5) * 10,
          scale: 0.7, // Slight reduction of the content
          ease: 'power1.in',
          rotationX: 40,
          scrollTrigger: {
            pin: contentWrapper,
            trigger: slide,
            markers: true,
            start: 'top 0%',
            end: '+=' + window.innerHeight,
            scrub: true,
          },
        })

        gsap.to(content, {
          autoAlpha: 0, // Ends at opacity: 0 and visibility: hidden
          ease: 'power1.in', // Starts gradually
          scrollTrigger: {
            trigger: content, // Listens to the position of content
            start: 'top -80%', // Starts when the top exceeds 80% of the viewport
            end: '+=' + 0.2 * window.innerHeight, // Ends 20% later
            scrub: true // Progresses with the scroll
          }
        })
      }


    })
  })


  return (
    <div className="">
      <div className="slide w-full h-screen">
        <div className="content-wrapper w-full h-full">
          <div className="content relative w-full h-full bg-red-500">
            <div className="absolute top-0 left-0">content 1</div>
          </div>
        </div>
      </div>

      <div className="slide w-full h-screen relative">
        <div className="content-wrapper w-full h-full">
          <div className="content relative w-full h-full bg-blue-500">
            <div className="absolute top-0 left-0">content 2</div>
          </div>
        </div>
      </div>

      <div className="slide w-full h-screen relative">
        <div className="content-wrapper w-full h-full">
          <div className="content relative w-full h-full bg-green-500">
            <div className="absolute top-0 left-0">content 3</div>
          </div>
        </div>
      </div>

      <div className="slide w-full h-screen relative">
        <div className="content-wrapper w-full h-full">
          <div className="content relative w-full h-full bg-yellow-500">
            <div className="absolute top-0 left-0">content 4</div>
          </div>
        </div>
      </div>

      <div className="slide w-full h-screen relative">
        <div className="content-wrapper w-full h-full">
          <div className="content relative w-full h-full bg-purple-500">
            <div className="absolute top-0 left-0">content 5</div>
          </div>
        </div>
      </div>
    </div>
  )
}

