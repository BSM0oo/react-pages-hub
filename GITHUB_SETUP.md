# GitHub Pages Setup Guide for React Pages Hub

This document details the complete process of setting up the React Pages Hub with GitHub Pages deployment, including all the critical configuration tweaks needed for proper functionality.

## 🎯 Project Overview

The React Pages Hub is a modern React application that automatically discovers `.tsx` files in the `src/pages/` directory and displays them in a beautiful table of contents interface. It features automatic deployment to GitHub Pages with real-time updates.

## 📋 Prerequisites

- Node.js and npm installed
- Git installed
- GitHub CLI (`gh`) installed and authenticated
- GitHub account

## 🚀 Step-by-Step Setup Process

### 1. Initial Project Setup

The project was built using Vite + React + TypeScript:

```bash
npm create vite@latest react-pages-hub -- --template react-ts
cd react-pages-hub
npm install
```

### 2. Core Dependencies

Key dependencies installed:
```bash
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npm install -D @tailwindcss/postcss  # Critical for production builds
```

### 3. Critical Configuration Files

#### 3.1 Vite Configuration (`vite.config.ts`)

**🔧 CRITICAL FIX**: The `base` path must match your GitHub repository name:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react-pages-hub/',  // Must match GitHub repo name!
})
```

**❌ Common Error**: Using wrong base path (e.g., `/tableofcontentsreactapp/` when repo is named `react-pages-hub`) causes 404 errors for all assets.

#### 3.2 React Router Configuration (`src/main.tsx`)

**🔧 CRITICAL FIX**: The `basename` must match the Vite `base` path:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/react-pages-hub">  {/* Must match Vite base! */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

**❌ Common Error**: Mismatched basename causes React Router to not render anything, resulting in blank pages.

#### 3.3 Tailwind CSS Configuration

**PostCSS Config (`postcss.config.js`)**:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // Use new separate package
    autoprefixer: {},
  },
}
```

**Tailwind Config (`tailwind.config.js`)**:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**CSS (`src/index.css`)**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. GitHub Repository Setup

#### 4.1 Create Repository Using GitHub CLI

```bash
# Initialize git (if not already done)
git init

# Create GitHub repository
gh repo create react-pages-hub --public --description "A modern React-based web page that serves as a hub for accessing rendered React pages (.tsx files) with automatic discovery and GitHub Pages deployment"

# Set correct remote URL
git remote set-url origin https://github.com/YOUR_USERNAME/react-pages-hub.git

# Initial commit and push
git add .
git commit -m "Initial commit - React Pages Hub with automatic page discovery"
git push -u origin main
```

#### 4.2 Enable GitHub Pages

```bash
# Enable GitHub Pages with GitHub Actions source
gh api repos/YOUR_USERNAME/react-pages-hub/pages -X POST --input - <<< '{"source":{"branch":"gh-pages","path":"/"},"build_type":"workflow"}'
```

### 5. GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    permissions:
      contents: read
      pages: write
      id-token: write

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Setup Pages
      uses: actions/configure-pages@v4

    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: './dist'

    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

## 🔧 Critical Fixes and Troubleshooting

### Issue 1: 404 Errors for Assets

**Problem**: Assets (JS, CSS files) return 404 errors on GitHub Pages.

**Root Cause**: Mismatch between Vite `base` path and actual GitHub repository name.

**Solution**: 
1. Ensure `vite.config.ts` `base` matches your GitHub repo name exactly
2. Ensure React Router `basename` matches the Vite `base`

### Issue 2: Blank Page on GitHub Pages

**Problem**: GitHub Pages shows blank page, React Router warnings in console.

**Root Cause**: React Router `basename` doesn't match the URL path.

**Solution**: Update `src/main.tsx` to use correct basename.

### Issue 3: Tailwind CSS PostCSS Errors

**Problem**: Build fails with PostCSS plugin errors.

**Root Cause**: Tailwind CSS v4+ moved PostCSS plugin to separate package.

**Solution**: 
1. Install `@tailwindcss/postcss`
2. Update `postcss.config.js` to use `'@tailwindcss/postcss'`

### Issue 4: Development vs Production Path Differences

**Problem**: Works locally but not on GitHub Pages.

**Root Cause**: Local dev server uses different base path than production.

**Solution**: Ensure consistent configuration across all files.

## 📁 File Structure

```
react-pages-hub/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── pages/                  # Auto-discovered pages go here
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── ExamplePage.tsx
│   │   ├── TestPage.tsx
│   │   └── market-relationships-charts.tsx
│   ├── App.tsx                 # Main app with routing
│   ├── main.tsx               # Entry point with Router config
│   ├── TableOfContents.tsx    # Auto-discovery component
│   └── index.css              # Tailwind CSS imports
├── vite.config.ts             # Vite config with base path
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
└── package.json
```

## 🎯 Testing the Setup

### Local Testing
1. Run `npm run dev`
2. Navigate to `http://localhost:5173/react-pages-hub/`
3. Verify all pages appear in table of contents
4. Test navigation to individual pages

### Production Testing
1. Push changes to GitHub
2. Wait for GitHub Actions to complete (1-2 minutes)
3. Visit `https://YOUR_USERNAME.github.io/react-pages-hub/`
4. Verify site loads and all functionality works

## 🔄 Adding New Pages

To add a new page:

1. Create a new `.tsx` file in `src/pages/`:
```typescript
// src/pages/MyNewPage.tsx
export default function MyNewPage() {
  return (
    <div>
      <h1>My New Page</h1>
      <p>This page was automatically discovered!</p>
    </div>
  );
}
```

2. Commit and push:
```bash
git add src/pages/MyNewPage.tsx
git commit -m "Add MyNewPage"
git push
```

3. The page automatically appears in the table of contents within 1-2 minutes!

## 🏆 Final Verification

Your setup is complete when:
- ✅ Local development server shows all pages
- ✅ GitHub Actions workflows complete successfully
- ✅ GitHub Pages site loads without errors
- ✅ All pages are clickable and load correctly
- ✅ New pages automatically appear when added

## 📞 Support

If you encounter issues:
1. Check the GitHub Actions logs for build errors
2. Verify all configuration files match the examples above
3. Ensure repository name matches the `base` and `basename` paths
4. Clear browser cache if seeing old versions

---

**Repository**: https://github.com/BSM0oo/react-pages-hub  
**Live Site**: https://bsm0oo.github.io/react-pages-hub/  
**Created**: December 2024
