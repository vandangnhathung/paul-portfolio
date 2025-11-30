"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
    children: React.ReactNode;
    height?: number;
    resizable?: boolean;
};

export function RegistryPreview({ children, height = 450, resizable = true }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const [panelWidth, setPanelWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const update = () => {
            const gw = containerRef.current?.offsetWidth ?? 0;
            const pw = panelRef.current?.offsetWidth ?? 0;
            setContainerWidth(gw);
            setPanelWidth(pw);
        };

        const panelEl = panelRef.current;
        const groupEl = containerRef.current;

        if (!panelEl || !groupEl) return;

        const roPanel = new ResizeObserver(update);
        const roGroup = new ResizeObserver(update);

        roPanel.observe(panelEl);
        roGroup.observe(groupEl);

        update();

        return () => {
            roPanel.disconnect();
            roGroup.disconnect();
        };
    }, []);

    const atFullWidth =
        containerWidth > 0 && Math.abs(panelWidth - containerWidth) <= 5;

    return (
        <div
            data-component="demo-registry-client"
            ref={containerRef}
            className="group relative bg-zinc-900/50 rounded-md overflow-hidden border border-zinc-800"
        >
            {resizable ? (
                <div className="relative">
                    {/* main panel */}
                    <div ref={panelRef} className="relative h-full">
                        {!atFullWidth && (
                            <div
                                className={cn(
                                    "absolute top-1 left-1/2 -translate-x-1/2 z-10 opacity-0",
                                    "transition duration-200 scale-75 opacity-0",
                                    "group-hover:opacity-100 group-hover:scale-100"
                                )}
                            >
                                <span className="px-2 py-1 text-xs bg-zinc-800 text-zinc-200 rounded">
                                    {Math.round(panelWidth)}px
                                </span>
                            </div>
                        )}
                        <div
                            className="[&>*]:min-h-full"
                            style={{ height: `${height}px` }}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    ref={panelRef}
                    className="relative h-full [&>*]:min-h-full"
                    style={{ height: `${height}px` }}
                >
                    {children}
                </div>
            )}

            {/* border */}
            <div className="z-20 absolute inset-0 border border-zinc-800 pointer-events-none rounded-md" />
        </div>
    );
}

