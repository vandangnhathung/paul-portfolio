# Registry Component Template

This template provides a reusable structure for creating new registry components. Follow these steps to create a new component:

## Quick Start

1. **Copy the template directory:**
   ```bash
   cp -r registry/paul/blocks/_template registry/paul/blocks/your-component-name
   ```

2. **Rename files:**
   ```bash
   cd registry/paul/blocks/your-component-name
   mv component-name.tsx your-component-name.tsx
   ```

3. **Update file contents:**
   - Replace `ComponentName` with your component name (PascalCase)
   - Replace `component-name` with your component name (kebab-case)
   - Update `registry-item.json` with your component details
   - Update `example.tsx` with your component usage

4. **Build the registry:**
   ```bash
   pnpm build
   ```

## File Structure

```
your-component-name/
├── your-component-name.tsx    # Main component file
├── example.tsx                # Example usage
└── registry-item.json         # Registry metadata
```

## Step-by-Step Guide

### 1. Component File (`your-component-name.tsx`)

- Use `"use client"` directive if the component uses React hooks or browser APIs
- Export a TypeScript interface for props: `YourComponentProps`
- Export the component function: `export function YourComponent(...)`
- Add JSDoc comments for props and the component
- Include API documentation link in comments if available

**Example:**
```tsx
"use client"

import React from "react"

export interface YourComponentProps {
  /** Description of the prop */
  exampleProp?: string
}

export function YourComponent({ exampleProp }: YourComponentProps) {
  return <div>{exampleProp}</div>
}
```

### 2. Example File (`example.tsx`)

- Import your component from the registry path
- Create a default export function showing component usage
- Include realistic example data

**Example:**
```tsx
import { YourComponent } from "@/registry/paul/blocks/your-component-name/your-component-name"

export default function Example() {
  return <YourComponent exampleProp="Example" />
}
```

### 3. Registry Item (`registry-item.json`)

Update these fields:
- `name`: kebab-case component name (e.g., `"your-component-name"`)
- `title`: Display name (e.g., `"Your Component Name"`)
- `description`: Brief description of what the component does
- `dependencies`: Array of npm package names required
- `files[].path`: Path to your component file
- `files[].target`: Where users will install the component

**Example:**
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

### 4. Multiple Files

If your component needs utility files (like `utils.ts`), add them to the `files` array:

```json
{
  "files": [
    {
      "path": "registry/paul/blocks/your-component-name/your-component-name.tsx",
      "type": "registry:component",
      "target": "components/paul/your-component-name.tsx"
    },
    {
      "path": "registry/paul/lib/utils.ts",
      "type": "registry:lib",
      "target": "lib/utils.ts"
    }
  ]
}
```

## Naming Conventions

- **Directory name**: `kebab-case` (e.g., `infinite-grid`)
- **Component file**: `kebab-case.tsx` (e.g., `infinite-grid.tsx`)
- **Component name**: `PascalCase` (e.g., `InfiniteGrid`)
- **Registry name**: `kebab-case` (e.g., `infinite-grid`)

## Testing

After creating your component:

1. **Build the registry:**
   ```bash
   pnpm build
   ```

2. **Check generated file:**
   ```bash
   ls public/r/paul/blocks/your-component-name.json
   ```

3. **Test installation:**
   ```bash
   pnpx shadcn@latest add http://localhost:3000/r/paul/blocks/your-component-name.json
   ```

## Common Patterns

### With Dependencies

If your component uses external libraries:

```json
{
  "dependencies": [
    "react",
    "gsap",
    "@gsap/react",
    "tailwind-merge"
  ]
}
```

### With Multiple Examples

You can create multiple example files:
- `example.tsx` - Basic usage
- `example-02.tsx` - Advanced usage
- `example-03.tsx` - Edge cases

### With TypeScript Types

Always use TypeScript interfaces for props:
```tsx
export interface ComponentProps {
  /** Prop description */
  requiredProp: string
  /** Optional prop description */
  optionalProp?: number
}
```

## Troubleshooting

### Component not appearing after build

- Check that `registry-item.json` exists and is valid JSON
- Verify file paths in `registry-item.json` are correct
- Run `pnpm index-registry` manually to see errors

### Import errors in example

- Make sure the import path matches your directory structure
- Use `@/registry/paul/blocks/your-component-name/your-component-name` format

### Build errors

- Check that all dependencies are listed in `registry-item.json`
- Verify TypeScript types are correct
- Ensure all imports are valid

## References

- [Registry System Documentation](../REGISTRY_SYSTEM.md)
- [shadcn Registry Schema](https://ui.shadcn.com/schema/registry-item.json)

