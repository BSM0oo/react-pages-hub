#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { scanForImports } = require('./check-dependencies.cjs');

/**
 * Automatically installs missing dependencies
 */
function autoInstallDependencies() {
  console.log('🚀 Auto-installing missing dependencies...\n');
  
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
  
  // Filter out built-in modules and known packages that shouldn't be installed
  const builtInModules = ['react', 'react-dom', 'fs', 'path', 'util', 'events'];
  const filteredMissingDeps = missingDeps.filter(dep => 
    !builtInModules.includes(dep) && 
    !dep.startsWith('node:') &&
    !dep.includes('types/node') && // Avoid installing Node.js types automatically
    !dep.startsWith('@/') // Ignore local path aliases like @/components
  );
  
  if (filteredMissingDeps.length === 0) {
    console.log('✅ No missing dependencies to install!');
    return true;
  }
  
  console.log(`📦 Installing ${filteredMissingDeps.length} missing dependencies:`);
  filteredMissingDeps.forEach(dep => console.log(`  - ${dep}`));
  console.log('');
  
  try {
    // Install dependencies
    const installCommand = `npm install ${filteredMissingDeps.join(' ')}`;
    console.log(`Running: ${installCommand}\n`);
    
    execSync(installCommand, { 
      stdio: 'inherit',
      cwd: projectRoot 
    });
    
    console.log('\n✅ Dependencies installed successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    
    // Suggest manual installation
    console.log('\n💡 Try installing manually:');
    console.log(`npm install ${filteredMissingDeps.join(' ')}`);
    
    return false;
  }
}

/**
 * Installs common development dependencies based on project patterns
 */
function installCommonDeps() {
  const commonDeps = {
    'UI Components': ['@headlessui/react', 'clsx'],
    'Data Fetching': ['axios', 'swr'],
    'State Management': ['zustand'],
    'Utilities': ['date-fns', 'lodash'],
    'Development': ['@types/lodash']
  };
  
  console.log('📦 Common dependencies you might want to install:\n');
  
  Object.entries(commonDeps).forEach(([category, deps]) => {
    console.log(`${category}:`);
    deps.forEach(dep => console.log(`  npm install ${dep}`));
    console.log('');
  });
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: node auto-install-deps.js [options]

Options:
  --common, -c     Show common dependencies to install
  --dry-run, -d    Show what would be installed without installing
  --help, -h       Show this help message

Examples:
  node auto-install-deps.js           # Auto-install missing dependencies
  node auto-install-deps.js -c        # Show common dependencies
  node auto-install-deps.js -d        # Dry run (show what would be installed)
`);
    process.exit(0);
  }
  
  if (args.includes('--common') || args.includes('-c')) {
    installCommonDeps();
    process.exit(0);
  }
  
  if (args.includes('--dry-run') || args.includes('-d')) {
    console.log('🔍 Dry run - showing what would be installed...\n');
    // Run check-dependencies to show missing deps
    require('./check-dependencies');
    process.exit(0);
  }
  
  const success = autoInstallDependencies();
  process.exit(success ? 0 : 1);
}

module.exports = { autoInstallDependencies };
