// https://ui.shadcn.com/docs/registry
import type { RegistryItem } from '@/lib/registry-types';

export async function getRegistryItem(name?: string, exampleFileName?: string): Promise<RegistryItem> {
    if (!name) {
        throw new Error('Registry item name is required');
    }

    try {
        // Load registry item JSON file using dynamic import
        // Map component names to their registry JSON imports
        const registryMap: Record<string, () => Promise<{ default: RegistryItem }>> = {
            'infinite-grid': () => import('@/registry/paul/blocks/infinite-grid/registry-item.json'),
            'infinite-image-carousel': () => import('@/registry/paul/blocks/infinite-image-carousel/registry-item.json'),
        };

        const importFn = registryMap[name];
        if (!importFn) {
            throw new Error(`Registry item not found: ${name}`);
        }

        const registryItemModule = await importFn();
        const registryItem: RegistryItem = registryItemModule.default || registryItemModule;

        return registryItem;
    } catch (error) {
        throw new Error(`Failed to load registry item: ${name}. ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

