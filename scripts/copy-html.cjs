#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Script to copy HTML files (and their directories) from src/pages to public/pages
// This allows HTML pages with their own assets (js, css, etc.) to live in
// subfolders under src/pages. Any directory containing an HTML file will be
// replicated under public/pages so it can be served statically.

const srcPagesDir = path.join(__dirname, '..', 'src', 'pages');
const publicPagesDir = path.join(__dirname, '..', 'public', 'pages');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function copyDirectory(src, dest) {
    ensureDir(dest);
    fs.cpSync(src, dest, { recursive: true });
}

function scanAndCopy(dir, relative = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let containsHtml = false;

    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        const rel = path.join(relative, entry.name);
        if (entry.isDirectory()) {
            const subHas = scanAndCopy(full, rel);
            containsHtml = containsHtml || subHas;
        } else if (entry.isFile() && entry.name.endsWith('.html')) {
            containsHtml = true;
        }
    }

    if (containsHtml && relative) {
        const destPath = path.join(publicPagesDir, relative);
        copyDirectory(dir, destPath);
        console.log(`✅ Copied ${relative}`);
    }

    return containsHtml;
}

function copyHtmlFiles() {
    console.log('🔄 Copying HTML files from src/pages to public/pages...');

    ensureDir(publicPagesDir);

    if (!fs.existsSync(srcPagesDir)) {
        console.log('⚠️  src/pages directory does not exist');
        return;
    }

    const entries = fs.readdirSync(srcPagesDir, { withFileTypes: true });
    let copied = 0;

    // Copy root-level HTML files
    for (const entry of entries) {
        const srcPath = path.join(srcPagesDir, entry.name);
        if (entry.isFile() && entry.name.endsWith('.html')) {
            const destPath = path.join(publicPagesDir, entry.name);
            fs.copyFileSync(srcPath, destPath);
            console.log(`✅ Copied ${entry.name}`);
            copied++;
        }
    }

    // Scan subdirectories for HTML files and copy
    for (const entry of entries) {
        if (entry.isDirectory()) {
            const hasHtml = scanAndCopy(path.join(srcPagesDir, entry.name), entry.name);
            if (hasHtml) copied++;
        }
    }

    console.log(`🎉 Successfully copied ${copied} HTML file(s)/directories`);
}

// Run the script
copyHtmlFiles();
