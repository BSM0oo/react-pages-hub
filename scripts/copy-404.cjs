#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const targetPath = path.join(distDir, '404.html');

if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, targetPath);
  console.log('✅ Copied index.html to 404.html');
} else {
  console.error('❌ index.html not found in dist. Run build first.');
  process.exit(1);
}
