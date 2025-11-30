"use client";

import React from 'react';
import {
    SandpackCodeEditor,
    SandpackFileExplorer,
    SandpackLayout,
    SandpackPreview,
    SandpackProvider,
    SandpackProviderProps
} from "@codesandbox/sandpack-react";
import { aquaBlue } from "@codesandbox/sandpack-themes";
import { FaCode, FaGamepad } from "react-icons/fa";
import type { RegistryItem } from '@/lib/registry-types';
import type { SandpackFiles } from '@codesandbox/sandpack-react';
import { RegistryPreview } from './registry-preview';
import { OpenInV0Button } from './open-in-v0-button';
import { getRegistryUrl } from '@/lib/getRegistryUrl';

type SandpackDemoProps = {
    registryItem: RegistryItem;
    files: SandpackFiles;
    height?: number;
    editorHeight?: number;
    exampleFileName?: string;
    codeEditor?: boolean;
    resizable?: boolean;
    openInV0?: boolean;
};

export function SandpackDemo({
    registryItem,
    files,
    height = 400,
    editorHeight = 300,
    exampleFileName = "example",
    codeEditor = true,
    resizable = true,
    openInV0 = true,
}: SandpackDemoProps) {
    // Convert dependencies array to object with 'latest' versions
    const dependencies: Record<string, string> = {};
    registryItem.dependencies.forEach(dependency => {
        dependencies[dependency] = 'latest';
    });

    const sandpackProps: SandpackProviderProps = {
        theme: aquaBlue,
        template: "react-ts",
        options: {
            externalResources: ["https://cdn.tailwindcss.com"],
            initMode: "user-visible",
        },
        customSetup: {
            dependencies: dependencies
        },
        files: files,
        style: {
            [`--sp-layout-height` as any]: `${height}px`
        }
    };

    // Generate registry URL for V0
    const exampleRegistryUrl = getRegistryUrl({
        name: registryItem.name,
        fileNamePostfix: `-${exampleFileName}`
    });

    return (
        <div className="mt-6">
            <SandpackProvider key={registryItem.name} {...sandpackProps}>
                <RegistryPreview height={height} resizable={resizable}>
                    <SandpackPreview showOpenInCodeSandbox={false} />
                </RegistryPreview>

                {!codeEditor && (
                    <div className="mt-2 text-sm text-slate-500 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <FaGamepad className="w-5" /> Interactive Playground
                        </div>
                        <div className="flex items-center gap-2">
                            {openInV0 && <OpenInV0Button text="Open in" url={exampleRegistryUrl} />}
                        </div>
                    </div>
                )}

                {codeEditor && (
                    <>
                        <div className="mt-4 text-sm text-slate-500 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <FaCode className="w-5" /> Live Playground · Edit and see changes instantly
                            </div>

                        </div>

                        <SandpackLayout
                            className="mt-2"
                            style={{ [`--sp-layout-height` as any]: `${editorHeight}px` }}
                        >
                            <SandpackFileExplorer />
                            <SandpackCodeEditor
                                closableTabs={true}
                                showTabs={true}
                                showLineNumbers={true}
                                showRunButton={true}
                            />
                        </SandpackLayout>
                        <div className="flex items-center justify-end gap-2 ext-sm text-slate-500 mt-2">
                            <span>Or edit with AI support by </span>
                            <OpenInV0Button text="Open in" url={exampleRegistryUrl} />
                        </div>
                    </>
                )}
            </SandpackProvider>
        </div>
    );
}

