// https://ui.shadcn.com/docs/registry
type GetRegistryUrlOptions = {
    name: string;
};

export function getRegistryUrl({ name }: GetRegistryUrlOptions): string {
    return `paul/blocks/${name}`;
}

