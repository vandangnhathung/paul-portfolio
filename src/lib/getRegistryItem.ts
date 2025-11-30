// https://ui.shadcn.com/docs/registry
import type { RegistryItem } from '@/lib/registry-types';

/**
 * Helper function to dynamically import registry items
 * Uses a function that returns the import to help webpack analyze the dependency
 */
function getRegistryImport(name: string) {
    // Map component names to their registry JSON imports
    // This helps webpack statically analyze the imports
    const registryImports: Record<string, () => Promise<{ default?: RegistryItem; [key: string]: unknown }>> = {
        'infinite-grid': () => import('@/registry/paul/blocks/infinite-grid/registry-item.json'),
        'infinite-image-carousel': () => import('@/registry/paul/blocks/infinite-image-carousel/registry-item.json'),
        'scrolling-sections': () => import('@/registry/paul/blocks/scrolling-sections/registry-item.json'),
    };

    return registryImports[name];
}

/**
 * Load a registry item for a component.
 * If exampleFileName is provided, loads {exampleFileName}.json and merges it with registry-item.json:
 * - Other fields are overridden by example JSON
 * - Files array is merged (example files are added to base files)
 * - Falls back to registry-item.json if example JSON not found
 */
export async function getRegistryItem(
    name?: string,
    exampleFileName?: string
): Promise<RegistryItem | null> {
    if (!name) return null;

    // Load default registry-item.json first
    let baseItem: RegistryItem | null = null;
    try {
        const importFn = getRegistryImport(name);
        
        if (!importFn) {
            console.warn(`Registry item not found in import map: "${name}"`);
            return null;
        }

        const mod = await importFn();
        
        // Handle both cases: mod.default (webpack) or mod itself (some bundlers)
        const importedData = mod.default || mod;
        baseItem = importedData as RegistryItem;
        
        // Validate that we got a valid registry item
        if (!baseItem || typeof baseItem !== 'object' || !baseItem.name) {
            console.warn(`Invalid registry item structure for: "${name}"`, {
                received: baseItem,
                modDefault: mod.default,
                mod: mod,
            });
            return null;
        }
    } catch (error) {
        console.error(`Registry item not found for: "${name}"`, {
            error,
            errorMessage: error instanceof Error ? error.message : String(error),
            errorStack: error instanceof Error ? error.stack : undefined,
            attemptedPath: `@/registry/paul/blocks/${name}/registry-item.json`,
        });
        return null;
    }

    // If no exampleFileName, return base item as-is
    if (!exampleFileName) {
        return baseItem;
    }

    // Try to load example-specific overrides
    try {
        const mod = await import(
            `@/registry/paul/blocks/${name}/${exampleFileName}.json`
        );
        // Handle both cases: mod.default (webpack) or mod itself (some bundlers)
        const exampleOverrides = (mod.default || mod) as Partial<RegistryItem>;

        // Merge: base item with example overrides
        // Files array is merged, other fields are overridden
        const merged: RegistryItem = {
            ...baseItem,
            ...exampleOverrides,
            // Merge files arrays instead of replacing
            files: [
                ...(baseItem.files || []),
                ...(exampleOverrides.files || []),
            ],
        };

        return merged;
    } catch {
        // Example JSON doesn't exist - return base item
        return baseItem;
    }
}

