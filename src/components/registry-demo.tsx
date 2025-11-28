// RegistryDemo.tsx (Server Component)
// https://ui.shadcn.com/docs/registry
import { getRegistryItem } from "@/lib/getRegistryItem";
import { getSandpackFiles } from "@/lib/getSandpackFiles";
import React from "react";
import { SandpackDemo } from "@/components/sandpack-demo";

type Props = {
    name?: string;
    height?: number;
    editorHeight?: number;
    exampleFileName?: string;
    codeEditor?: boolean;
    resizable?: boolean;
    openInV0?: boolean;
};

export async function RegistryDemo({
    name,
    height,
    editorHeight,
    exampleFileName,
    codeEditor = true,
    resizable = true,
    openInV0 = true,
}: Props) {
    if (!name) {
        return (
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                <p className="text-sm text-zinc-400">Registry item name is required</p>
            </div>
        );
    }

    const registryItem = await getRegistryItem(name, exampleFileName);

    if (!registryItem) {
        return (
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                <p className="text-sm text-zinc-400">Registry item not found: {name}</p>
            </div>
        );
    }

    // Fetch files for Sandpack
    const files = await getSandpackFiles({
        registryItem,
        exampleFileName: exampleFileName || 'example',
    });

    return (
        <SandpackDemo
            registryItem={registryItem}
            files={files}
            height={height}
            editorHeight={editorHeight}
            exampleFileName={exampleFileName}
            codeEditor={codeEditor}
            resizable={resizable}
            openInV0={openInV0}
        />
    );
}
