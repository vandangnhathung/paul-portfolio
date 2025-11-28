// https://codesandbox.io/docs/sandpack
import type { RegistryItem } from '@/lib/registry-types';
import { getCodeItemFromPath } from '@/lib/getCodeItemFromPath';
import path from 'path';
import type { SandpackFiles } from '@codesandbox/sandpack-react';

type Props = {
    registryItem: RegistryItem;
    exampleFileName?: string;
};

/**
 * Reads all files listed in a registry item (including example.tsx) and returns an object
 * with transformed import paths for Sandpack compatibility.
 * 
 * This function:
 * 1. Reads all component files from the registry
 * 2. Reads the example file
 * 3. Transforms import paths from registry paths to Sandpack-compatible paths
 * 4. Returns a SandpackFiles object ready for SandpackProvider
 */
export async function getSandpackFiles({
    registryItem,
    exampleFileName = "example",
}: Props): Promise<SandpackFiles> {
    const componentName = registryItem.name;

    // Find the main component file (e.g., scrolling-sections/scrolling-sections.tsx)
    const mainFile = registryItem.files.find((file) =>
        file.path.endsWith(`${componentName}/${componentName}.tsx`)
    );

    if (!mainFile) {
        throw new Error(`Main component file not found for ${componentName}`);
    }

    // Get the directory of the main file
    // Example: "registry/paul/blocks/scrolling-sections"
    const mainFileDir = path.dirname(mainFile.path);

    // Step 2: Read all registry files in parallel
    const registryCodeItems = await Promise.all(
        registryItem.files.map((file) => getCodeItemFromPath({ path: file.path }))
    );

    // Step 3: Read example.tsx from the same directory as the main file
    // Example: "registry/paul/blocks/scrolling-sections/example.tsx"
    const examplePath = `${mainFileDir}/${exampleFileName}.tsx`;
    const exampleCodeItem = await getCodeItemFromPath({ path: examplePath });

    // Step 4: Build mapping of registry paths to target paths
    // This maps: "@/registry/paul/blocks/scrolling-sections/scrolling-sections"
    //        to: "@/components/paul/scrolling-sections"
    const importMapping = new Map<string, string>();

    registryItem.files.forEach((file) => {
        // Remove file extension from target
        // "components/paul/scrolling-sections.tsx" → "components/paul/scrolling-sections"
        const ext = path.extname(file.target);
        const targetWithoutExt = ext ? file.target.slice(0, -ext.length) : file.target;

        // Remove file extension from file.path for the registry import
        // "registry/paul/blocks/scrolling-sections/scrolling-sections.tsx"
        // → "registry/paul/blocks/scrolling-sections/scrolling-sections"
        const fileExt = path.extname(file.path);
        const filePathWithoutExt = fileExt ? file.path.slice(0, -fileExt.length) : file.path;

        // Create the registry import path (with @ alias)
        const registryImportPath = `@/${filePathWithoutExt}`;

        // Map to the target path (with @ alias)
        importMapping.set(registryImportPath, `@/${targetWithoutExt}`);
    });

    // Step 5: Transform import paths in code
    function transformImports(code: string): string {
        let transformedCode = code;

        // First, handle relative imports (e.g., "./scrolling-sections")
        // These need to be transformed to use the @ alias path
        registryItem.files.forEach((file) => {
            const ext = path.extname(file.target);
            const targetWithoutExt = ext ? file.target.slice(0, -ext.length) : file.target;
            const sandpackPath = `@/${targetWithoutExt}`;
            
            // Get the component name from the file path
            const componentName = path.basename(file.path, path.extname(file.path));
            
            // Match relative imports like "./scrolling-sections" or "./scrolling-sections.tsx"
            const relativePatterns = [
                // Pattern: "./component-name" or "./component-name.tsx"
                new RegExp(`(['"])\\./${componentName}(\\.tsx)?\\1`, 'g'),
                // Pattern: "../component-name" (if in subdirectory)
                new RegExp(`(['"])\\.\\./${componentName}(\\.tsx)?\\1`, 'g'),
            ];
            
            relativePatterns.forEach(pattern => {
                transformedCode = transformedCode.replace(pattern, `$1${sandpackPath}$1`);
            });
        });

        // Then, handle @/ registry imports
        importMapping.forEach((targetPath, registryPath) => {
            // Match both single and double quotes, and handle potential spaces
            // Escape special regex characters in the registry path
            const regex = new RegExp(
                `(['"])${registryPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`,
                'g'
            );
            // Replace registry import paths with Sandpack-compatible paths
            transformedCode = transformedCode.replace(regex, `$1${targetPath}$1`);
        });

        return transformedCode;
    }

    // Step 6: Build result object
    const result: SandpackFiles = {};

    // Add App.tsx first (transformed example.tsx)
    // This is the entry point that Sandpack will render
    result["/App.tsx"] = {
        code: transformImports(exampleCodeItem.code),
        active: true,      // This is the active file shown in Sandpack
        readOnly: false,   // Users can edit it
        hidden: false,     // Visible in file explorer
    };

    // Add transformed registry files
    registryItem.files.forEach((file, index) => {
        result[`/${file.target}`] = {
            code: transformImports(registryCodeItems[index].code),
            readOnly: false,
            hidden: false,
        };
    });

    // Add tsconfig.json for TypeScript support and path aliases
    result["/tsconfig.json"] = {
        code: `{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "lib": ["dom", "es2015"],
    "jsx": "react-jsx",
     "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}`,
        readOnly: true,    // Users can't edit config
        active: false,
        hidden: true,      // Hidden from file explorer
    };

    return result;
}

