// https://ui.shadcn.com/docs/registry
export type RegistryItem = {
    $schema?: string;
    name: string;
    type: string;
    title: string;
    description: string;
    dependencies: string[];
    files: Array<{
        path: string;
        type: string;
        target: string;
    }>;
    example?: React.ComponentType;
};

