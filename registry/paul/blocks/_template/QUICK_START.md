# Quick Start Guide

## Create a New Registry Component

### Method 1: Using the Script (Recommended)

```bash
pnpm create:registry my-component-name
```

This will:
- Create a new directory `registry/paul/blocks/my-component-name`
- Copy all template files
- Replace all placeholders with your component name
- Set up the correct file structure

### Method 2: Manual Copy

```bash
# Copy the template
cp -r registry/paul/blocks/_template registry/paul/blocks/my-component-name

# Rename the component file
cd registry/paul/blocks/my-component-name
mv component-name.tsx my-component-name.tsx

# Then manually replace:
# - ComponentName → MyComponentName (PascalCase)
# - component-name → my-component-name (kebab-case)
# - Update registry-item.json with your details
```

## After Creation

1. **Edit the component file** (`my-component-name.tsx`)
   - Implement your component logic
   - Add TypeScript types
   - Add JSDoc comments

2. **Edit the example file** (`example.tsx`)
   - Add realistic example usage
   - Show different use cases

3. **Edit registry-item.json**
   - Update `description` field
   - Add required `dependencies`
   - Verify file paths are correct

4. **Build the registry**
   ```bash
   pnpm build
   ```

5. **Test it**
   ```bash
   # Check generated file exists
   ls public/r/paul/blocks/my-component-name.json
   ```

## File Checklist

- [ ] `my-component-name.tsx` - Main component (exported)
- [ ] `example.tsx` - Example usage
- [ ] `registry-item.json` - Registry metadata
- [ ] Component name replaced everywhere
- [ ] Dependencies listed in registry-item.json
- [ ] Build successful (`pnpm build`)

## Example: Creating "button-group" Component

```bash
# Run the script
pnpm create:registry button-group

# This creates:
# registry/paul/blocks/button-group/
#   ├── button-group.tsx
#   ├── example.tsx
#   └── registry-item.json

# Then edit files and build
pnpm build
```

