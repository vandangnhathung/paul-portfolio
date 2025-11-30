"use client";

import React from 'react';
import type { RegistryItem } from '@/lib/registry-types';

type SandpackExampleCodeProps = {
    registryItem: RegistryItem;
};

export function SandpackExampleCode({ registryItem }: SandpackExampleCodeProps) {
    // For now, we'll show a simple code block
    // In a full implementation, this would show the example code with syntax highlighting
    return (
        <div className="my-4 bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <pre className="text-sm text-zinc-200 overflow-x-auto">
                <code>{`import { ${registryItem.title.replaceAll(' ', '')} } from "@/registry/paul/blocks/${registryItem.name}/${registryItem.name}"

export default function Example() {
    return <${registryItem.title.replaceAll(' ', '')} />
}`}</code>
            </pre>
        </div>
    );
}

