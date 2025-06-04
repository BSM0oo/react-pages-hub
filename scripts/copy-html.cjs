#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Script to copy HTML files from src/pages to public/pages
// This ensures HTML files are available as static assets

const srcPagesDir = path.join(__dirname, '..', 'src', 'pages');
const publicPagesDir = path.join(__dirname, '..', 'public', 'pages');

function copyHtmlFiles() {
  console.log('🔄 Copying HTML files from src/pages to public/pages...');
  
  // Ensure public/pages directory exists
  if (!fs.existsSync(publicPagesDir)) {
    fs.mkdirSync(publicPagesDir, { recursive: true });
    console.log('📁 Created public/pages directory');
  }

  // Check if src/pages exists
  if (!fs.existsSync(srcPagesDir)) {
    console.log('⚠️  src/pages directory does not exist');
    return;
  }

  // Get all HTML files from src/pages
  const files = fs.readdirSync(srcPagesDir);
  const htmlFiles = files.filter(file => file.endsWith('.html'));

  if (htmlFiles.length === 0) {
    console.log('ℹ️  No HTML files found in src/pages');
    return;
  }

  // Copy each HTML file
  let copiedCount = 0;
  htmlFiles.forEach(file => {
    const srcPath = path.join(srcPagesDir, file);
    const destPath = path.join(publicPagesDir, file);
    
    try {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✅ Copied ${file}`);
      copiedCount++;
    } catch (error) {
      console.error(`❌ Failed to copy ${file}:`, error.message);
    }
  });

  console.log(`🎉 Successfully copied ${copiedCount} HTML file(s)`);
}

// Run the script
copyHtmlFiles();
