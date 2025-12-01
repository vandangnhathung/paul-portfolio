import {generateDefinition, TSDoc} from "nextra/tsdoc";
import {getRegistryItem} from "@/lib/getRegistryItem";
import {getCodeItemFromPath} from "@/lib/getCodeItemFromPath";

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

    try {
        // Read the component file content
        const codeItem = await getCodeItemFromPath({ path: registryItem.files[0].path });
        
        // Simple extraction: find the export interface/type line and everything until the matching closing brace
        // This handles nested braces by counting them
        const lines = codeItem.code.split('\n');
        let startLine = -1;
        let braceCount = 0;
        let inType = false;
        let extractedLines: string[] = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const typeMatch = line.match(new RegExp(`export\\s+(interface|type)\\s+${propsType}`));
            
            if (typeMatch) {
                startLine = i;
                inType = true;
                extractedLines.push(line);
                // Count opening braces in this line
                braceCount += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
                continue;
            }
            
            if (inType) {
                extractedLines.push(line);
                braceCount += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
                
                if (braceCount === 0) {
                    break;
                }
            }
        }
        
        if (extractedLines.length === 0) {
            return (
                <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                    <p className="text-sm text-zinc-400">Type {propsType} not found in component file</p>
                </div>
            );
        }
        
        const typeCode = extractedLines.join('\n');
        const definition = generateDefinition({
            code: typeCode,
        });

        return <TSDoc definition={definition} />;
    } catch (error) {
        return (
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                <p className="text-sm text-zinc-400">Error loading type definition: {error instanceof Error ? error.message : String(error)}</p>
            </div>
        );
    }
}
