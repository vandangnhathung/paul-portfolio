import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface RegistryFile {
  path?: string;
  type?: string;
  target?: string;
  content?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const filePath = resolvedParams.path.join('/');
    
    // Security: Only allow JSON files from registry directory
    if (!filePath.endsWith('.json') || !filePath.startsWith('paul/blocks/')) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Remove .json extension and construct registry path
    const nameWithoutExt = filePath.replace(/\.json$/, '');
    const registryPath = path.join(process.cwd(), 'registry', nameWithoutExt, 'registry-item.json');
    
    // Read the registry file
    const fileContent = await fs.readFile(registryPath, 'utf8');
    const json = JSON.parse(fileContent);
    
    // Read and inject the actual file contents
    if (json.files && Array.isArray(json.files)) {
      json.files = await Promise.all(
        json.files.map(async (file: RegistryFile) => {
          if (file.path) {
            try {
              const componentPath = path.join(process.cwd(), file.path);
              const content = await fs.readFile(componentPath, 'utf8');
              return {
                ...file,
                content: content
              };
            } catch (error) {
              console.error(`Error reading file ${file.path}:`, error);
              return file; // Return original file object if reading fails
            }
          }
          return file;
        })
      );
    }
    
    return NextResponse.json(json, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error serving registry file:', error);
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 }
    );
  }
}

