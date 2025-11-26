"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { RegistryItem } from '@/lib/registry-types';
import { RegistryPreview } from './registry-preview';
import { OpenInV0Button } from './open-in-v0-button';
import { getRegistryUrl } from '@/lib/getRegistryUrl';

type SandpackDemoProps = {
    registryItem: RegistryItem;
    height?: number;
    editorHeight?: number;
    exampleFileName?: string;
    codeEditor?: boolean;
    resizable?: boolean;
    openInV0?: boolean;
};

// Map component names to their example imports
const getExampleComponent = (name: string, exampleFile: string) => {
    const exampleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
        'infinite-grid-example': () => import('@/registry/paul/blocks/infinite-grid/example'),
        'infinite-image-carousel-example': () => import('@/registry/paul/blocks/infinite-image-carousel/example'),
        'infinite-image-carousel-example-02': () => import('@/registry/paul/blocks/infinite-image-carousel/example-02'),
    };

    const key = `${name}-${exampleFile}`;
    return exampleMap[key] || null;
};

export function SandpackDemo({
    registryItem,
    height = 450,
    editorHeight,
    exampleFileName,
    codeEditor = true,
    resizable = true,
    openInV0 = true,
}: SandpackDemoProps) {
    const exampleFile = exampleFileName || 'example';
    const importFn = getExampleComponent(registryItem.name, exampleFile);

    if (!importFn) {
        return (
            <RegistryPreview height={height} resizable={resizable}>
                <div className="p-8 flex items-center justify-center" style={{ minHeight: `${height - 60}px` }}>
                    <p className="text-zinc-500 text-sm">Example not found: {registryItem.name}/{exampleFile}</p>
                </div>
            </RegistryPreview>
        );
    }

    const ExampleComponent = dynamic(importFn, {
        loading: () => (
            <div className="p-8 flex items-center justify-center" style={{ minHeight: `${height - 60}px` }}>
                <p className="text-zinc-500 text-sm">Loading demo...</p>
            </div>
        ),
        ssr: false,
    });

    // Generate registry URL for V0
    const exampleRegistryUrl = getRegistryUrl({
        name: registryItem.name,
        fileNamePostfix: `-${exampleFile}`
    });

    return (
        <div className="mt-6">
            <RegistryPreview height={height} resizable={resizable}>
                <Suspense fallback={
                    <div className="p-8 flex items-center justify-center">
                        <p className="text-zinc-500 text-sm">Loading demo...</p>
                    </div>
                }>
                    <ExampleComponent />
                </Suspense>
            </RegistryPreview>
            
            {openInV0 && (
                <div className="mt-2 flex items-center justify-end">
                    <OpenInV0Button url={exampleRegistryUrl} text="Edit in" />
                </div>
            )}
        </div>
    );
}

