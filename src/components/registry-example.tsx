// RegistryExample.tsx (Server Component)
// https://ui.shadcn.com/docs/registry
import * as React from "react";
import { getRegistryItem } from "@/lib/getRegistryItem";
import { SandpackExampleCode } from "@/components/sandpack-example-code";

type Props = { name: string };

export async function RegistryExample({ name }: Props) {
    const registryItem = await getRegistryItem(name);
    
    if (!registryItem) {
        return (
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                <p className="text-sm text-zinc-400">Registry item not found: {name}</p>
            </div>
        );
    }
    
    return (
        <SandpackExampleCode registryItem={registryItem} />
    );
}

