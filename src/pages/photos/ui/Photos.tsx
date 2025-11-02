'use client'
import React from "react";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./photos.css";
import WorkImage1 from "@/assets/work/work-1.jpg";
import WorkImage2 from "@/assets/work/work-2.jpg";
import WorkImage3 from "@/assets/work/work-3.jpg";
import WorkImage4 from "@/assets/work/work-4.jpg";
import WorkImage5 from "@/assets/work/work-5.jpg";
import WorkImage6 from "@/assets/work/work-6.jpg";
import WorkImage7 from "@/assets/work/work-7.jpg";
import WorkImage8 from "@/assets/work/work-8.jpg";
import WorkImage10 from "@/assets/work/work-10.jpg";
import WorkImage11 from "@/assets/work/work-11.jpg";
import WorkImage12 from "@/assets/work/work-12.jpg";
import WorkImage13 from "@/assets/work/work-13.jpg";
import WorkImage14 from "@/assets/work/work-14.jpg";
import WorkImage15 from "@/assets/work/work-15.jpg";
import WorkImage16 from "@/assets/work/work-16.jpg";
import WorkImage17 from "@/assets/work/work-17.jpg";
import WorkImage18 from "@/assets/work/work-18.jpg";
import WorkImage19 from "@/assets/work/work-19.jpg";
import WorkImage20 from "@/assets/work/work-20.jpg";
import WorkImage21 from "@/assets/work/work-21.jpg";
import WorkImage22 from "@/assets/work/work-22.jpg";

gsap.registerPlugin(useGSAP);

const Photos = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".photos-col img", { y: 300, stagger: 0.025, opacity: 0 });
    },
    { scope: container }
  );

  return (
    <div className="container page-photos" ref={container}>
      <div className="photos-col ">
        <Image src={WorkImage1} alt="" />
        <Image src={WorkImage2} alt="" />
        <Image src={WorkImage3} alt="" />
        <Image src={WorkImage4} alt="" />
        <Image src={WorkImage5} alt="" />
        <Image src={WorkImage6} alt="" />
        <Image src={WorkImage7} alt="" />
        <Image src={WorkImage8} alt="" />
      </div>
      <div className="photos-col">
        <Image src={WorkImage16} alt="" />
        <Image src={WorkImage10} alt="" />
        <Image src={WorkImage11} alt="" />
        <Image src={WorkImage12} alt="" />
        <Image src={WorkImage13} alt="" />
        <Image src={WorkImage14} alt="" />
        <Image src={WorkImage15} alt="" />
        <Image src={WorkImage16} alt="" />
      </div>
      <div className="photos-col">
        <Image src={WorkImage17} alt="" />
        <Image src={WorkImage18} alt="" />
        <Image src={WorkImage19} alt="" />
        <Image src={WorkImage20} alt="" />
        <Image src={WorkImage21} alt="" />
        <Image src={WorkImage22} alt="" />
        <Image src={WorkImage1} alt="" />
        <Image src={WorkImage2} alt="" />
      </div>
    </div>
  );
};

export default Photos;
