# Registry System Documentation

## Overview

This project now uses a **build-time registry generation system** similar to [ui.phucbm.com](https://ui.phucbm.com), which generates static JSON files at build time instead of dynamically serving them at runtime.

## Architecture

### Before (Runtime Approach)
- API Route: `/r/[...path]/route.ts`
- Reads files at request time
- Dynamic server rendering
- ❌ Slower performance
- ❌ No CDN caching

### After (Build-time Approach)
- Build Script: `scripts/index-registry.ts`
- Runs during build (postbuild)
- Generates static JSON files
- ✅ Faster (served by CDN)
- ✅ Better caching
- ✅ No server processing

## How It Works

### 1. Build Process

```bash
pnpm build
  ↓
next build (.next/)
  ↓
postbuild (automatic)
  ↓
pnpm build:registry
  ↓
pnpm index-registry
  ↓
tsx scripts/index-registry.ts
  ↓
Generates: public/r/paul/blocks/*.json
```

### 2. Registry Generation Script

The script (`scripts/index-registry.ts`) does the following:

1. **Discovers** all `registry-item.json` files in `registry/paul/blocks/`
2. **Reads** each component file referenced in the registry items
3. **Embeds** the full file content into the JSON
4. **Outputs** static JSON files to `public/r/paul/blocks/`

### 3. Output Structure

```
public/r/paul/blocks/
├── infinite-grid.json
└── infinite-image-carousel.json
```

Each JSON file contains:
- Component metadata (name, description, dependencies)
- **Full source code** embedded in the `content` field

### 4. Static File Serving

Next.js automatically serves files from `public/` directory, so:

- URL: `https://your-domain.com/r/paul/blocks/infinite-grid.json`
- Served as: Static file (no API route needed)
- Cached by: CDN (Vercel Edge Network)

## Usage

### For Users Installing Components

```bash
# Install a component using shadcn CLI
pnpx shadcn@latest add https://paul-portfolio-gamma.vercel.app/r/paul/blocks/infinite-grid.json
```

### For Developers Adding New Components

1. **Create component directory:**
   ```bash
   mkdir -p registry/paul/blocks/my-component
   ```

2. **Add files:**
   - `my-component.tsx` - Main component
   - `example.tsx` - Example usage
   - `registry-item.json` - Metadata

3. **Build:**
   ```bash
   pnpm build
   ```
   
   The script automatically:
   - Discovers your new component
   - Generates `public/r/paul/blocks/my-component.json`
   - Embeds the full source code

4. **Deploy:**
   ```bash
   git add .
   git commit -m "feat: add my-component"
   git push
   ```
   
   Vercel automatically rebuilds and serves the new component.

## Scripts

### Available Commands

```bash
# Run registry generation manually
pnpm index-registry

# Full build (includes registry generation)
pnpm build

# Build registry only
pnpm build:registry
```

### package.json Scripts

```json
{
  "scripts": {
    "postbuild": "pnpm build:registry",
    "build:registry": "pnpm index-registry",
    "index-registry": "tsx scripts/index-registry.ts"
  }
}
```

## File Structure

```
paul-portfolio/
├── registry/
│   └── paul/
│       └── blocks/
│           ├── infinite-grid/
│           │   ├── registry-item.json       # Source metadata
│           │   ├── infinite-grid.tsx        # Source component
│           │   └── example.tsx              # Example usage
│           └── infinite-image-carousel/
│               ├── registry-item.json
│               ├── infinite-image-carousel.tsx
│               ├── example.tsx
│               └── example-02.tsx
├── scripts/
│   └── index-registry.ts                    # Build script
└── public/
    └── r/                                    # Generated (gitignored)
        └── paul/
            └── blocks/
                ├── infinite-grid.json       # With embedded content
                └── infinite-image-carousel.json
```

## Example: registry-item.json

**Source** (`registry/paul/blocks/infinite-grid/registry-item.json`):

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "infinite-grid",
  "type": "registry:component",
  "title": "Infinite Grid",
  "description": "Infinite grid effect applied to a grid of images.",
  "dependencies": ["gsap", "react", "@gsap/react"],
  "files": [
    {
      "path": "registry/paul/blocks/infinite-grid/infinite-grid.tsx",
      "type": "registry:component",
      "target": "components/paul/infinite-grid.tsx"
    }
  ]
}
```

**Generated** (`public/r/paul/blocks/infinite-grid.json`):

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "infinite-grid",
  "type": "registry:component",
  "title": "Infinite Grid",
  "description": "Infinite grid effect applied to a grid of images.",
  "dependencies": ["gsap", "react", "@gsap/react"],
  "files": [
    {
      "path": "registry/paul/blocks/infinite-grid/infinite-grid.tsx",
      "type": "registry:component",
      "target": "components/paul/infinite-grid.tsx",
      "content": "\"use client\"\nimport React, {useRef} from \"react\"..."
    }
  ]
}
```

Note: The `content` field is automatically added with the full source code.

## Benefits

### Performance
- **Static files** served directly by CDN
- **No server processing** on each request
- **Better caching** (HTTP cache headers)

### Developer Experience
- **Automatic generation** during build
- **No manual updates** needed
- **Consistent with ui.phucbm.com** architecture

### Deployment
- **Vercel optimized** - static files served from Edge Network
- **No API routes needed** - simpler deployment
- **Version controlled** - builds are reproducible

## Troubleshooting

### Registry not updating after changes

Run a full build:
```bash
pnpm build
```

### Generated files not showing in deployment

Check that `public/r/` is in `.gitignore` but **not** in `.vercelignore`.
The files are generated during Vercel's build process.

### Component not found error

1. Check that `registry-item.json` exists
2. Verify file paths in the JSON are correct
3. Run `pnpm index-registry` and check output

## References

- **Inspiration:** [ui.phucbm.com](https://ui.phucbm.com) ([source](https://github.com/phucbm/ui.phucbm.com))
- **shadcn registry schema:** https://ui.shadcn.com/schema/registry-item.json
- **Next.js static files:** https://nextjs.org/docs/app/building-your-application/optimizing/static-assets

---

**Last Updated:** November 26, 2025

