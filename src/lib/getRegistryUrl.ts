// https://ui.shadcn.com/docs/registry
type GetRegistryUrlOptions = {
    name: string;
    fileNamePostfix?: string;
};

export function getRegistryUrl({ name, fileNamePostfix }: GetRegistryUrlOptions): string {
    // Get base URL from environment or use deployed URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
        (typeof window !== 'undefined' ? window.location.origin : 'https://paul-portfolio-gamma.vercel.app');
    
    const folder = 'r'; // Registry folder
    const path = `paul/blocks/${name}${fileNamePostfix || ''}`;
    
    return `${baseUrl}/${folder}/${path}.json`;
}

