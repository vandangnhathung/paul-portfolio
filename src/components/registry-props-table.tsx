import {generateDefinition, TSDoc} from "nextra/tsdoc";
import {getRegistryItem} from "@/lib/getRegistryItem";

export async function RegistryPropsTable({type, name}: { type?: string, name: string }) {
    const registryItem = await getRegistryItem(name);

    if (!registryItem) {
        return (
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                <p className="text-sm text-zinc-400">Registry item not found: {name}</p>
            </div>
        );
    }

    if (!registryItem.title) {
        return (
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                <p className="text-sm text-zinc-400">Registry item missing title: {name}</p>
            </div>
        );
    }

    if (!registryItem.files || registryItem.files.length === 0) {
        return (
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                <p className="text-sm text-zinc-400">Registry item missing files: {name}</p>
            </div>
        );
    }

    const propsType = type || `${registryItem.title.replaceAll(' ', '')}Props`;

    const definition = generateDefinition({
        code: `
import type { ${propsType} } from '@/${registryItem.files[0].path}'
export default ${propsType}
`,
    });

    return <TSDoc definition={definition}/>;
}
