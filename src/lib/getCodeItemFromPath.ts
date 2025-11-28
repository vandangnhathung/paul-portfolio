import { readFile } from 'fs/promises';
import path from 'path';

type GetCodeItemFromPathOptions = {
    path: string;
};

/**
 * Reads a file from the filesystem and returns its content as a code string.
 * Used by getSandpackFiles to read component and example files.
 * 
 * @param filePath - Relative path from project root (e.g., "registry/paul/blocks/scrolling-sections/scrolling-sections.tsx")
 * @returns Object with code property containing the file content
 */
export async function getCodeItemFromPath({ path: filePath }: GetCodeItemFromPathOptions): Promise<{ code: string }> {
    // Join the current working directory with the relative file path
    // Example: process.cwd() = "/Users/.../paul-portfolio"
    //          filePath = "registry/paul/blocks/scrolling-sections/scrolling-sections.tsx"
    //          Result: "/Users/.../paul-portfolio/registry/paul/blocks/scrolling-sections/scrolling-sections.tsx"
    const fullPath = path.join(process.cwd(), filePath);
    
    // Read the file content as UTF-8 text
    const code = await readFile(fullPath, 'utf-8');
    
    // Return an object with the code property (matches the expected format)
    return { code };
}

