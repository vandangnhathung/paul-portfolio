"use client";

import React, { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import {
  FaHome,
  FaFolderOpen,
  FaCamera,
  FaGithub,
  FaEnvelope,
  FaSpinner,
} from "react-icons/fa";
import { useRouteLoadingStore } from "@/stores/route-loading-store";
import clsx from "clsx";

interface DockItemProps {
  IconComponent: React.ComponentType<{
    size: string;
    style: React.CSSProperties;
  }>;
  path: string;
  isHovered: boolean;
  isNeighbor: boolean;
  onMouseEnter: () => void;
  external: boolean;
}

const DockItem = ({
  IconComponent,
  path,
  isHovered,
  isNeighbor,
  onMouseEnter,
  external,
}: DockItemProps) => {
  const scale = isHovered ? 2 : isNeighbor ? 2 : 1;
  const margin = isHovered || isNeighbor ? "28px" : "4px";
  const linkStyle = {
    transform: `scale(${scale})`,
    margin: `0 ${margin}`,
    transition: "all 900ms cubic-bezier(0.075,0.82,0.165,1)",
  };

  return (
    <div
      className="relative w-10 h-10 max-[900px]:w-[30px] max-[900px]:h-[30px] bg-[var(--dark-btn-bg)] border border-[var(--dark-card-border)] rounded-[30px] m-0 flex justify-center items-center origin-bottom"
      style={linkStyle}
      onMouseEnter={onMouseEnter}
    >
      {external ? (
        <a href={path} target="_blank" rel="noopener noreferrer">
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <IconComponent size="14px" style={{ color: "hsl(0, 0%, 50%)" }} />
          </div>
        </a>
      ) : (
        <Link href={path}>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <IconComponent size="14px" style={{ color: "hsl(0, 0%, 50%)" }} />
          </div>
        </Link>
      )}
    </div>
  );
};

const LoadingItem = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="absolute left-[calc(100%-8px)] -translate-x-full top-1/2 -translate-y-1/2">
      <div
        className={clsx(
          "w-10 h-10 transition-opacity duration-700 max-[900px]:w-[30px] max-[900px]:h-[30px] bg-[var(--dark-btn-bg)] border border-[var(--dark-card-border)] rounded-[30px] flex justify-center items-center origin-bottom",
          {
            "opacity-100": isLoading,
            "opacity-0": !isLoading,
          }
        )}
      >
        <div className="animate-spin">
          <FaSpinner size="14px" style={{ color: "hsl(0, 0%, 50%)" }} />
        </div>
      </div>
    </div>
  );
};
// Dock component
export const Dock = () => {
  const [hoveredIndex, setHoveredIndex] = useState(-100);
  const [hoverEffectsEnabled, setHoverEffectsEnabled] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const isEnabled = window.innerWidth >= 900;
      setHoverEffectsEnabled(isEnabled);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (hoverEffectsEnabled) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (hoverEffectsEnabled) {
      setTimeout(() => {
        setHoveredIndex(-100);
      }, 50);
    }
  };

  const icons = [
    { icon: FaHome, path: "/" },
    { icon: FaFolderOpen, path: "/my-work" },
    { icon: FaCamera, path: "/photos" },
    {
      icon: FaGithub,
      path: "https://github.com/vandangnhathung",
      external: true,
    },
    {
      icon: FaEnvelope,
      path: "mailto:contact@vandangnhathung@gmail.com",
      external: true,
    },
  ];

  const isLoading = useRouteLoadingStore((state) => state.isLoading);

  useEffect(() => {
    if (isLoading) {
      setHoveredIndex(-100);
    }
  }, [isLoading]);

  return (
    <div
      className="w-max fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 py-2 px-1 flex justify-center bg-[var(--dark-bg-color)] border border-[var(--dark-card-border)] rounded-[40px] origin-center cursor-pointer z-[1000000]"
      onMouseLeave={handleMouseLeave}
    >
      <div className="mx-auto flex">
        {icons.map((item, index) => (
          <DockItem
            key={index}
            IconComponent={item.icon}
            path={item.path}
            isHovered={index === hoveredIndex}
            isNeighbor={
              hoveredIndex >= 0 && Math.abs(index - hoveredIndex) === 1
            }
            onMouseEnter={() => handleMouseEnter(index)}
            external={item.external || false}
          />
        ))}
        
        <div className={clsx("transition-width duration-300", {"w-10 mx-1":isLoading, "w-0": !isLoading})}></div>
        <LoadingItem isLoading={isLoading} />
      </div>
    </div>
  );
};
