import nextra from 'nextra'

const withNextra = nextra({
    defaultShowCopyCode: true,
    // readingTime: true
})

// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra({
    // ... Other Next.js config options

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Allow all HTTPS domains
            },
        ],
    },

    webpack: (config) => {
        // Exclude markdown files from being processed as modules
        // This prevents server-only code from being bundled in client components
        // Note: We don't exclude JSON files because they need to be importable as modules
        config.module.rules.push({
            test: /registry\/paul\/blocks\/.*\.(md|mdx)$/,
            type: 'asset/source',
        });

        // Enable dynamic imports for JSON files in the registry directory
        // This allows template literal imports like: import(`@/registry/paul/blocks/${name}/registry-item.json`)
        config.resolve.extensionAlias = {
            '.js': ['.js', '.ts', '.tsx'],
            '.jsx': ['.jsx', '.tsx'],
            '.json': ['.json'],
        };

        return config;
    },


    async rewrites(){
        return [
            {
                source: '/ingest/static/:path*',
                destination: 'https://us-assets.i.posthog.com/static/:path*',
            },
            {
                source: '/ingest/:path*',
                destination: 'https://us.i.posthog.com/:path*',
            },
        ]
    },
    // This is required to support PostHog trailing slash API requests
    skipTrailingSlashRedirect: true,
})
