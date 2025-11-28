# Paul Portfolio - Component Registry System

A modern component registry system with live code editing powered by Sandpack. This system allows you to showcase React components with interactive demos that users can edit directly in the browser.

## 🚀 Features

- **Live Code Editing**: Edit component code directly in the browser with instant preview
- **File Explorer**: Navigate between component files seamlessly
- **TypeScript Support**: Full TypeScript support with path aliases
- **Import Transformation**: Automatic import path transformation for Sandpack compatibility
- **Static Generation**: Build-time registry generation for optimal performance
- **CDN Ready**: Static JSON files served directly from CDN

## 📁 Project Structure

```
paul-portfolio/
├── registry/
│   └── paul/
│       └── blocks/
│           ├── _template/              # Template for new components
│           ├── scrolling-sections/     # Example component
│           │   ├── scrolling-sections.tsx
│           │   ├── example.tsx
│           │   └── registry-item.json
│           └── ...
├── src/
│   ├── components/
│   │   ├── sandpack-demo.tsx          # Sandpack editor component
│   │   ├── registry-demo.tsx           # Server component wrapper
│   │   └── ...
│   └── lib/
│       ├── getSandpackFiles.ts         # File reading & import transformation
│       ├── getCodeItemFromPath.ts      # File reading helper
│       ├── getRegistryItem.ts          # Registry item loader
│       └── ...
├── content/
│   └── my-work/
│       └── scrolling-sections.mdx      # MDX pages using components
└── scripts/
    └── index-registry.ts               # Build-time registry generator
```

## 🎯 Quick Start

### Adding a New Component

1. **Copy the template:**
   ```bash
   cp -r registry/paul/blocks/_template registry/paul/blocks/your-component-name
   ```

2. **Rename and update files:**
   ```bash
   cd registry/paul/blocks/your-component-name
   mv component-name.tsx your-component-name.tsx
   ```

3. **Create your component** (`your-component-name.tsx`):
   ```tsx
   "use client"

   import React from "react"

   export interface YourComponentProps {
     /** Description of the prop */
     exampleProp?: string
   }

   /**
    * YourComponent - Brief description
    * 
    * @param props - Component props
    * @returns JSX element
    */
   export function YourComponent({ exampleProp = "default" }: YourComponentProps) {
     return (
       <div className="p-4">
         <h1>Your Component</h1>
         <p>{exampleProp}</p>
       </div>
     )
   }
   ```

4. **Create example file** (`example.tsx`):
   ```tsx
   import { YourComponent } from "./your-component-name"

   export default function Example() {
     return (
       <div className="container mx-auto p-8">
         <YourComponent exampleProp="Example value" />
       </div>
     )
   }
   ```

5. **Update registry-item.json**:
   ```json
   {
     "$schema": "https://ui.shadcn.com/schema/registry-item.json",
     "name": "your-component-name",
     "type": "registry:component",
     "title": "Your Component Name",
     "description": "Brief description of what this component does.",
     "dependencies": ["react"],
     "files": [
       {
         "path": "registry/paul/blocks/your-component-name/your-component-name.tsx",
         "type": "registry:component",
         "target": "components/paul/your-component-name.tsx"
       }
     ]
   }
   ```

6. **Add to registry import map** (`src/lib/getRegistryItem.ts`):
   ```typescript
   const registryImports: Record<string, () => Promise<any>> = {
     // ... existing imports
     'your-component-name': () => import('@/registry/paul/blocks/your-component-name/registry-item.json'),
   };
   ```

7. **Build and test:**
   ```bash
   pnpm build
   ```

## 📝 Using Components in MDX

### Basic Usage

```mdx
---
title: Your Component
---

# Your Component

<RegistryDemo name="your-component-name" height={500} />

## Installation

<RegistryInstall name="your-component-name" />

## Props

<RegistryPropsTable name="your-component-name" />
```

### With Code Editor

```mdx
<RegistryDemo 
  name="your-component-name" 
  height={500}
  editorHeight={400}
  codeEditor={true}
/>
```

### Preview Only (No Editor)

```mdx
<RegistryDemo 
  name="your-component-name" 
  height={500}
  codeEditor={false}
/>
```

### Multiple Examples

```mdx
<RegistryDemo name="your-component-name" exampleFileName="example" />
<RegistryDemo name="your-component-name" exampleFileName="example-02" />
```

## 🔧 How It Works

### 1. Registry System

The registry system uses a build-time generation approach:

1. **Discovery**: Script finds all `registry-item.json` files
2. **Reading**: Reads component files and embeds content
3. **Generation**: Creates static JSON files in `public/r/paul/blocks/`
4. **Serving**: Next.js serves static files from CDN

### 2. Sandpack Integration

When a user views a component demo:

1. **Server Component** (`RegistryDemo`):
   - Loads registry item metadata
   - Calls `getSandpackFiles()` to read files
   - Transforms import paths for Sandpack
   - Passes files to client component

2. **Client Component** (`SandpackDemo`):
   - Receives files as props
   - Renders Sandpack editor with live preview
   - Users can edit code and see changes instantly

### 3. Import Path Transformation

The system automatically transforms imports:

**Registry paths** → **Sandpack paths**
- `@/registry/paul/blocks/scrolling-sections/scrolling-sections` → `@/components/paul/scrolling-sections`
- `./scrolling-sections` → `@/components/paul/scrolling-sections`

This ensures imports work correctly in Sandpack's virtual file system.

## 📚 Component Props

### RegistryDemo Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Registry component name (kebab-case) |
| `height` | `number` | `400` | Preview height in pixels |
| `editorHeight` | `number` | `300` | Code editor height in pixels |
| `exampleFileName` | `string` | `"example"` | Example file name (without .tsx) |
| `codeEditor` | `boolean` | `true` | Show code editor (false = preview only) |
| `resizable` | `boolean` | `true` | Allow preview resizing |
| `openInV0` | `boolean` | `true` | Show "Open in V0" button |

### Example Usage

```tsx
<RegistryDemo 
  name="scrolling-sections"
  height={600}
  editorHeight={400}
  codeEditor={true}
  resizable={true}
  openInV0={true}
/>
```

## 🎨 Import Path Conventions

### In Example Files

Use **relative imports** for the main component:

```tsx
// ✅ Good - Relative import
import { ScrollingSections } from "./scrolling-sections";

// ✅ Also good - Registry path (will be transformed)
import { ScrollingSections } from "@/registry/paul/blocks/scrolling-sections/scrolling-sections";
```

### In Component Files

Use **registry paths** for imports:

```tsx
// ✅ Good - Registry path
import { SomeUtil } from "@/registry/paul/lib/utils";
```

The transformation system handles both patterns automatically.

## 🛠️ Development

### Running Locally

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build registry
pnpm build
```

### Available Scripts

```bash
# Development
pnpm dev              # Start Next.js dev server

# Building
pnpm build            # Full build (includes registry generation)
pnpm build:registry   # Build registry only
pnpm index-registry   # Run registry generation script

# Linting
pnpm lint             # Run ESLint
```

### Adding Dependencies

When adding a new component with dependencies:

1. **Add to registry-item.json**:
   ```json
   {
     "dependencies": ["react", "gsap", "@gsap/react"]
   }
   ```

2. **Install in project** (if needed):
   ```bash
   pnpm add gsap @gsap/react
   ```

## 📖 File Structure Details

### Component Directory

```
your-component-name/
├── your-component-name.tsx    # Main component
├── example.tsx                 # Example usage (required)
├── example-02.tsx             # Optional: Additional examples
└── registry-item.json         # Registry metadata (required)
```

### registry-item.json Structure

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "component-name",              // kebab-case, unique identifier
  "type": "registry:component",         // Always "registry:component"
  "title": "Component Name",             // Display name
  "description": "Component description", // Brief description
  "dependencies": ["react"],             // npm package names
  "files": [
    {
      "path": "registry/paul/blocks/component-name/component-name.tsx",
      "type": "registry:component",
      "target": "components/paul/component-name.tsx"  // Where users install it
    }
  ]
}
```

## 🐛 Troubleshooting

### Component Not Found

**Error**: `Registry item not found: component-name`

**Solution**:
1. Check that `registry-item.json` exists
2. Verify the component name matches exactly (case-sensitive)
3. Add component to `getRegistryItem.ts` import map
4. Run `pnpm build` to regenerate

### Import Errors in Sandpack

**Error**: `Could not find module in path: './component-name'`

**Solution**:
1. Ensure example file uses relative import: `import { Component } from "./component-name"`
2. Check that component file exists and exports correctly
3. Verify `registry-item.json` has correct `target` path

### Build Errors

**Error**: `Failed to read file`

**Solution**:
1. Verify file paths in `registry-item.json` are correct
2. Check that files exist in the expected locations
3. Ensure file permissions are correct

### Sandpack Not Loading

**Error**: Sandpack editor not rendering

**Solution**:
1. Check browser console for errors
2. Verify `@codesandbox/sandpack-react` is installed
3. Ensure `files` prop is passed correctly
4. Check network tab for failed file loads

## 🔍 Advanced Usage

### Custom Example Files

Create multiple example files:

```bash
registry/paul/blocks/your-component/
├── example.tsx      # Basic usage
├── example-02.tsx   # Advanced usage
└── example-03.tsx   # Edge cases
```

Use them in MDX:

```mdx
<RegistryDemo name="your-component" exampleFileName="example" />
<RegistryDemo name="your-component" exampleFileName="example-02" />
```

### Multiple Component Files

If your component needs utility files:

```json
{
  "files": [
    {
      "path": "registry/paul/blocks/your-component/your-component.tsx",
      "type": "registry:component",
      "target": "components/paul/your-component.tsx"
    },
    {
      "path": "registry/paul/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
}
```

### Custom Dependencies

Add external libraries:

```json
{
  "dependencies": [
    "react",
    "gsap",
    "@gsap/react",
    "tailwind-merge",
    "clsx"
  ]
}
```

Sandpack will automatically install these packages.

## 📚 API Reference

### getSandpackFiles()

Reads registry files and transforms imports for Sandpack.

```typescript
async function getSandpackFiles({
  registryItem: RegistryItem,
  exampleFileName?: string
}): Promise<SandpackFiles>
```

**Parameters**:
- `registryItem`: Registry item metadata
- `exampleFileName`: Example file name (default: `"example"`)

**Returns**: `SandpackFiles` object ready for SandpackProvider

### getCodeItemFromPath()

Reads a file from the filesystem.

```typescript
async function getCodeItemFromPath({
  path: string
}): Promise<{ code: string }>
```

**Parameters**:
- `path`: Relative file path from project root

**Returns**: Object with `code` property containing file content

### getRegistryItem()

Loads registry item metadata.

```typescript
async function getRegistryItem(
  name?: string,
  exampleFileName?: string
): Promise<RegistryItem | null>
```

**Parameters**:
- `name`: Component name (kebab-case)
- `exampleFileName`: Optional example file name

**Returns**: Registry item or `null` if not found

## 🎓 Best Practices

1. **Component Structure**:
   - Use TypeScript interfaces for props
   - Add JSDoc comments for documentation
   - Use `"use client"` directive when needed

2. **Example Files**:
   - Use relative imports for main component
   - Include realistic example data
   - Show common use cases

3. **Naming**:
   - Directory: `kebab-case` (e.g., `scrolling-sections`)
   - Component: `PascalCase` (e.g., `ScrollingSections`)
   - File: `kebab-case.tsx` (e.g., `scrolling-sections.tsx`)

4. **Dependencies**:
   - List all required npm packages
   - Use exact versions when needed
   - Keep dependencies minimal

5. **Documentation**:
   - Write clear descriptions
   - Document all props
   - Include usage examples

## 📄 License

[Your License Here]

## 🙏 Acknowledgments

- Inspired by [ui.phucbm.com](https://ui.phucbm.com)
- Built with [Sandpack](https://sandpack.codesandbox.io/)
- Uses [shadcn/ui](https://ui.shadcn.com/) registry schema

---

**Last Updated**: December 2024
