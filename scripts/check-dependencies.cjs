#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Scans for import statements in TypeScript/React files
 * @param {string} dir - Directory to scan
 * @returns {Array<string>} - Array of package names
 */
function scanForImports(dir) {
  const imports = new Set();
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanDirectory(fullPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts') || item.endsWith('.jsx') || item.endsWith('.js')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Match import statements
        const importMatches = content.match(/import.*from\s+['"]([^'"]+)['"]/g);
        
        if (importMatches) {
          importMatches.forEach(match => {
            const pkgMatch = match.match(/from\s+['"]([^'"]+)['"]/);
            if (pkgMatch) {
              const pkg = pkgMatch[1];
              // Only include external packages (not relative imports)
              if (!pkg.startsWith('.') && !pkg.startsWith('/')) {
                // Extract package name (handle scoped packages)
                const packageName = pkg.startsWith('@') 
                  ? pkg.split('/').slice(0, 2).join('/')
                  : pkg.split('/')[0];
                imports.add(packageName);
              }
            }
          });
        }
      }
    });
  }
  
  scanDirectory(dir);
  return Array.from(imports);
}

/**
 * Checks if all required dependencies are installed
 */
function checkDependencies() {
  console.log('🔍 Scanning for dependencies...\n');
  
  const projectRoot = path.join(__dirname, '..');
  const pagesDir = path.join(projectRoot, 'src');
  const packageJsonPath = path.join(projectRoot, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json not found!');
    process.exit(1);
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const installedDeps = {
    ...packageJson.dependencies || {},
    ...packageJson.devDependencies || {}
  };
  
  const requiredDeps = scanForImports(pagesDir);
  const missingDeps = requiredDeps.filter(dep => !installedDeps[dep]);
  
  // Filter out built-in Node.js modules and common globals
  const builtInModules = ['react', 'react-dom', 'fs', 'path', 'util', 'events'];
  const filteredMissingDeps = missingDeps.filter(dep => 
    !builtInModules.includes(dep) && 
    !dep.startsWith('node:') &&
    !dep.startsWith('@/') // Ignore local path aliases like @/components
  );
  
  console.log(`📦 Found ${requiredDeps.length} total dependencies`);
  console.log(`✅ Installed: ${requiredDeps.length - filteredMissingDeps.length}`);
  
  if (filteredMissingDeps.length > 0) {
    console.log(`❌ Missing: ${filteredMissingDeps.length}\n`);
    
    console.log('Missing dependencies:');
    filteredMissingDeps.forEach(dep => {
      console.log(`  - ${dep}`);
    });
    
    console.log('\n💡 To install missing dependencies, run:');
    console.log(`npm install ${filteredMissingDeps.join(' ')}`);
    
    return false;
  }
  
  console.log('✅ All dependencies are satisfied!\n');
  return true;
}

/**
 * Suggests common dependencies based on file patterns
 */
function suggestDependencies() {
  const pagesDir = path.join(__dirname, '..', 'src', 'pages');
  const files = fs.readdirSync(pagesDir, { recursive: true });
  
  const suggestions = [];
  
  // Check for chart-related files
  const hasCharts = files.some(file => 
    file.includes('chart') || 
    file.includes('graph') || 
    file.includes('visualization')
  );
  
  if (hasCharts) {
    suggestions.push({
      category: 'Charts & Visualization',
      packages: ['recharts', 'd3', 'chart.js', 'plotly.js']
    });
  }
  
  // Check for form-related files
  const hasForms = files.some(file => 
    file.includes('form') || 
    file.includes('input') || 
    file.includes('contact')
  );
  
  if (hasForms) {
    suggestions.push({
      category: 'Forms & Validation',
      packages: ['react-hook-form', 'yup', 'formik', 'zod']
    });
  }
  
  // Check for dashboard-related files
  const hasDashboards = files.some(file => 
    file.includes('dashboard') || 
    file.includes('admin') || 
    file.includes('analytics')
  );
  
  if (hasDashboards) {
    suggestions.push({
      category: 'UI Components',
      packages: ['@headlessui/react', '@radix-ui/react-dialog', 'framer-motion']
    });
  }
  
  if (suggestions.length > 0) {
    console.log('💡 Suggested dependencies based on your pages:\n');
    suggestions.forEach(({ category, packages }) => {
      console.log(`${category}:`);
      packages.forEach(pkg => console.log(`  - ${pkg}`));
      console.log('');
    });
  }
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: node check-dependencies.js [options]

Options:
  --suggest, -s    Show suggested dependencies
  --help, -h       Show this help message

Examples:
  node check-dependencies.js          # Check for missing dependencies
  node check-dependencies.js -s       # Check and show suggestions
`);
    process.exit(0);
  }
  
  const success = checkDependencies();
  
  if (args.includes('--suggest') || args.includes('-s')) {
    suggestDependencies();
  }
  
  process.exit(success ? 0 : 1);
}

module.exports = { scanForImports, checkDependencies };
