#!/usr/bin/env node
/**
 * Registry Builder Script
 * 
 * This script runs at build time to:
 * 1. Discover all registry-item.json files in registry/paul/blocks/
 * 2. Read component files referenced in each registry item
 * 3. Embed file content into the JSON
 * 4. Output static JSON files to public/r/paul/blocks/
 * 
 * Based on ui.phucbm.com architecture
 */

import { promises as fs } from 'fs';
import path from 'path';

interface RegistryFile {
  path?: string;
  type?: string;
  target?: string;
  content?: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFile[];
}

const ROOT_DIR = process.cwd();
const REGISTRY_DIR = path.join(ROOT_DIR, 'registry', 'paul', 'blocks');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public', 'r', 'paul', 'blocks');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof colors = 'reset'): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Find all registry-item.json files recursively
 */
async function findRegistryFiles(dir: string): Promise<string[]> {
  const results: string[] = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        const subResults = await findRegistryFiles(fullPath);
        results.push(...subResults);
      } else if (entry.name === 'registry-item.json') {
        results.push(fullPath);
      }
    }
  } catch (error) {
    // Directory doesn't exist yet, that's ok
  }
  
  return results;
}

/**
 * Process a single registry item: read files and embed content
 */
async function processRegistryItem(registryPath: string): Promise<RegistryItem> {
  const fileContent = await fs.readFile(registryPath, 'utf8');
  const registryItem: RegistryItem = JSON.parse(fileContent);
  
  // Read and inject the actual file contents
  if (registryItem.files && Array.isArray(registryItem.files)) {
    registryItem.files = await Promise.all(
      registryItem.files.map(async (file: RegistryFile) => {
        if (file.path) {
          try {
            const componentPath = path.join(ROOT_DIR, file.path);
            const content = await fs.readFile(componentPath, 'utf8');
            return {
              ...file,
              content: content
            };
          } catch (error) {
            log(`  ⚠️  Warning: Could not read file ${file.path}`, 'yellow');
            return file;
          }
        }
        return file;
      })
    );
  }
  
  return registryItem;
}

/**
 * Write registry item to output directory
 */
async function writeRegistryItem(
  registryItem: RegistryItem,
  outputPath: string
): Promise<void> {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(
    outputPath,
    JSON.stringify(registryItem, null, 2),
    'utf8'
  );
}

/**
 * Main build function
 */
async function buildRegistry(): Promise<void> {
  const startTime = Date.now();
  
  log('\n🔨 Building Registry...', 'cyan');
  log('━'.repeat(50), 'cyan');
  
  // Find all registry files
  log('\n📂 Discovering registry files...', 'blue');
  const registryFiles = await findRegistryFiles(REGISTRY_DIR);
  
  if (registryFiles.length === 0) {
    log('  ⚠️  No registry files found', 'yellow');
    return;
  }
  
  log(`  ✓ Found ${registryFiles.length} registry file(s)`, 'green');
  
  // Process each registry file
  log('\n📦 Processing registry items...', 'blue');
  const results: Array<{ name: string; outputPath: string }> = [];
  
  for (const registryPath of registryFiles) {
    const relativePath = path.relative(ROOT_DIR, registryPath);
    log(`\n  Processing: ${relativePath}`, 'cyan');
    
    try {
      // Process the registry item
      const registryItem = await processRegistryItem(registryPath);
      
      // Determine output path
      const componentName = registryItem.name;
      const outputPath = path.join(OUTPUT_DIR, `${componentName}.json`);
      
      // Write to output
      await writeRegistryItem(registryItem, outputPath);
      
      const relativeOutput = path.relative(ROOT_DIR, outputPath);
      log(`  ✓ Generated: ${relativeOutput}`, 'green');
      
      // Log embedded files
      if (registryItem.files) {
        registryItem.files.forEach((file) => {
          if (file.content) {
            const size = (file.content.length / 1024).toFixed(1);
            log(`    └─ ${file.path} (${size} KB)`, 'green');
          }
        });
      }
      
      results.push({ name: componentName, outputPath });
    } catch (error) {
      log(`  ✗ Error processing ${relativePath}:`, 'red');
      if (error instanceof Error) {
        log(`    ${error.message}`, 'red');
      }
    }
  }
  
  // Summary
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  log('\n━'.repeat(50), 'cyan');
  log(`✅ Registry built successfully!`, 'green');
  log(`   Processed: ${results.length} component(s)`, 'green');
  log(`   Output: ${path.relative(ROOT_DIR, OUTPUT_DIR)}`, 'green');
  log(`   Duration: ${duration}s`, 'green');
  log('━'.repeat(50), 'cyan');
  
  // List all generated files
  if (results.length > 0) {
    log('\n📋 Generated files:', 'blue');
    results.forEach(({ name, outputPath }) => {
      const url = `/r/paul/blocks/${name}.json`;
      log(`   • ${name} → ${url}`, 'cyan');
    });
  }
  
  log('');
}

// Run the script
buildRegistry()
  .then(() => {
    process.exit(0);
  })
  .catch((error: Error) => {
    log('\n❌ Build failed:', 'red');
    log(error.message, 'red');
    if (error.stack) {
      log(error.stack, 'red');
    }
    process.exit(1);
  });

