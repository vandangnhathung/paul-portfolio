import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

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
    const registryPath = path.join(process.cwd(), 'registry', `${nameWithoutExt}.json`);
    
    // Read the registry file
    const fileContent = await fs.readFile(registryPath, 'utf8');
    const json = JSON.parse(fileContent);
    
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

