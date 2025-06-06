# React Pages Hub - Architecture & Dependency Management

## 🏗️ System Architecture

### Core Components

```
React Pages Hub
├── Auto-Detection Engine (TableOfContents.tsx)
├── Dynamic Router (App.tsx)
├── Page Registry (Vite glob imports)
└── Dependency Management System
```

### Auto-Detection Flow

```mermaid
graph TD
    A[Add .tsx or .jsx file to src/pages/] --> B[Vite glob() detects file]
    B --> C[TableOfContents.tsx processes]
    C --> D[Generate route & title]
    D --> E[Update UI automatically]
    E --> F[Page accessible via URL]
```

## 📦 Dependency Management Strategy

### Current Dependencies

**Core Framework:**
- `react` + `react-dom` - Core React framework
- `react-router-dom` - Client-side routing
- `vite` - Build tool and dev server

**UI & Styling:**
- `tailwindcss` (via CDN) - Utility-first CSS framework
- `lucide-react` - Icon library

**Charts & Data Visualization:**
- `recharts` - React charting library

### Handling Missing Dependencies

When you add a new page that requires dependencies not yet installed, here's what happens and how to handle it:

#### 1. **Development Error Detection**
```bash
# Error example when missing dependency
Module not found: Can't resolve 'some-library'
```

#### 2. **Automated Dependency Detection Script**

Create a dependency scanner that can automatically detect and install missing packages:

```javascript
// scripts/check-dependencies.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function scanForImports(dir) {
  const imports = new Set();
  const files = fs.readdirSync(dir, { recursive: true });
  
  files.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      const content = fs.readFileSync(path.join(dir, file), 'utf8');
      const importMatches = content.match(/import.*from ['"]([^'"]+)['"]/g);
      
      if (importMatches) {
        importMatches.forEach(match => {
          const pkg = match.match(/from ['"]([^'"]+)['"]/)[1];
          if (!pkg.startsWith('.') && !pkg.startsWith('/')) {
            imports.add(pkg.split('/')[0]);
          }
        });
      }
    }
  });
  
  return Array.from(imports);
}
```

#### 3. **Dependency Installation Strategies**

**Option A: Manual Installation (Current)**
```bash
# When you get an error, install manually
npm install package-name
```

**Option B: Auto-Install Script**
```bash
# Add to package.json scripts
"check-deps": "node scripts/check-dependencies.js",
"auto-install": "node scripts/auto-install-deps.js"
```

**Option C: Development Middleware**
```javascript
// Vite plugin to auto-install missing deps
function autoInstallPlugin() {
  return {
    name: 'auto-install',
    buildStart() {
      // Scan for missing dependencies and install
    }
  }
}
```

### 4. **Recommended Dependency Categories**

**Pre-installed Common Libraries:**
```json
{
  "dependencies": {
    // Charts & Visualization
    "recharts": "^2.15.3",
    "d3": "^7.8.5",
    "chart.js": "^4.4.0",
    
    // UI Components
    "lucide-react": "^0.511.0",
    "@headlessui/react": "^1.7.17",
    
    // Data & State
    "axios": "^1.6.0",
    "swr": "^2.2.4",
    "zustand": "^4.4.7",
    
    // Utilities
    "date-fns": "^2.30.0",
    "lodash": "^4.17.21",
    "clsx": "^2.0.0"
  }
}
```

## 🔄 Automated Workflows

### 1. **GitHub Actions for Dependency Management**

```yaml
# .github/workflows/dependency-check.yml
name: Auto-Install Dependencies

on:
  push:
    paths: ['src/pages/**']

jobs:
  check-deps:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Check for new dependencies
        run: |
          node scripts/check-dependencies.js
          if [ $? -eq 1 ]; then
            npm install
            git add package.json package-lock.json
            git commit -m "Auto-install missing dependencies"
            git push
          fi
```

### 2. **Pre-commit Hooks**

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run check-deps && npm run build"
    }
  }
}
```

### 3. **Development Server Integration**

```javascript
// vite.config.ts enhancement
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dependency-checker',
      configureServer(server) {
        server.middlewares.use('/api/check-deps', (req, res, next) => {
          // Check for missing dependencies
          // Auto-install if needed
          // Return status
        });
      }
    }
  ]
});
```

## 📁 File Structure & Organization

### Current Structure
```
tableofcontentsreactapp/
├── public/                          # Static assets
│   └── vite.svg
├── src/
│   ├── assets/                      # App assets
│   │   └── react.svg
│   ├── pages/                       # 🎯 AUTO-DETECTED PAGES
│   │   ├── AboutPage.tsx           # Simple info page
│   │   ├── ContactPage.tsx         # Contact form
│   │   ├── ExamplePage.tsx         # Basic example
│   │   └── market-relationships-charts.tsx  # Complex dashboard
│   ├── App.tsx                      # Main app component
│   ├── TableOfContents.tsx          # 🔍 AUTO-DETECTION ENGINE
│   ├── main.tsx                     # App entry point
│   └── index.css                    # Global styles
├── .github/workflows/
│   └── deploy.yml                   # 🚀 GitHub Pages deployment
├── dist/                            # Build output (generated)
├── package.json                     # Dependencies & scripts
├── vite.config.ts                   # Build configuration
├── README.md                        # User documentation
├── ARCHITECTURE.md                  # This file
└── index.html                       # HTML template
```

### Recommended Enhanced Structure
```
tableofcontentsreactapp/
├── src/
│   ├── pages/                       # 🎯 AUTO-DETECTED PAGES
│   │   ├── dashboards/             # Dashboard pages
│   │   ├── forms/                  # Form pages
│   │   ├── charts/                 # Chart pages
│   │   └── utilities/              # Utility pages
│   ├── components/                  # Shared components
│   │   ├── ui/                     # Basic UI components
│   │   ├── charts/                 # Chart components
│   │   └── forms/                  # Form components
│   ├── hooks/                       # Custom React hooks
│   ├── utils/                       # Utility functions
│   ├── types/                       # TypeScript types
│   └── constants/                   # App constants
├── scripts/                         # Build & utility scripts
│   ├── check-dependencies.js       # Dependency scanner
│   ├── auto-install-deps.js        # Auto-installer
│   └── generate-page-template.js   # Page generator
└── docs/                           # Documentation
    ├── CONTRIBUTING.md
    ├── DEPLOYMENT.md
    └── TROUBLESHOOTING.md
```

## 🛠️ Development Workflow

### Adding a New Page

1. **Create the page file:**
   ```bash
   # Create in src/pages/
   touch src/pages/my-new-dashboard.tsx # or my-new-dashboard.jsx
   ```

2. **Basic template:**
   ```tsx
   import React from 'react';
   
   export default function MyNewDashboard() {
     return (
       <div className="min-h-screen bg-gray-50 p-8">
         <h1 className="text-3xl font-bold">My New Dashboard</h1>
         {/* Your content here */}
       </div>
     );
   }
   ```

3. **Auto-detection happens:**
   - File appears in table of contents immediately
   - Route `/my-new-dashboard` becomes available
   - Title becomes "My New Dashboard"

### Handling Complex Dependencies

**Example: Adding a 3D visualization page**

1. **Create the page:**
   ```tsx
   // src/pages/3d-visualization.tsx (or .jsx)
   import React from 'react';
   import { Canvas } from '@react-three/fiber';  // ❌ Not installed
   import { OrbitControls } from '@react-three/drei';  // ❌ Not installed
   
   export default function ThreeDVisualization() {
     return (
       <div className="h-screen">
         <Canvas>
           <OrbitControls />
           {/* 3D content */}
         </Canvas>
       </div>
     );
   }
   ```

2. **Development server shows error:**
   ```
   Module not found: Can't resolve '@react-three/fiber'
   ```

3. **Install dependencies:**
   ```bash
   npm install @react-three/fiber @react-three/drei three
   npm install -D @types/three
   ```

4. **Page works automatically!**

## 🚀 Deployment & CI/CD

### Current GitHub Pages Setup

1. **Automatic deployment on push to main**
2. **Build process:**
   - Install dependencies
   - Build with Vite
   - Deploy to GitHub Pages

### Enhanced CI/CD Pipeline

```yaml
# .github/workflows/enhanced-deploy.yml
name: Enhanced Deploy

on:
  push:
    branches: [ main ]

jobs:
  dependency-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check dependencies
        run: node scripts/check-dependencies.js
      
  build-and-deploy:
    needs: dependency-check
    runs-on: ubuntu-latest
    steps:
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: actions/deploy-pages@v4
```

## 🔧 Automation Scripts

### 1. **Dependency Scanner**
```javascript
// scripts/check-dependencies.js
const fs = require('fs');
const path = require('path');

function checkDependencies() {
  const pagesDir = path.join(__dirname, '../src/pages');
  const packageJson = require('../package.json');
  const installedDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };
  
  const requiredDeps = scanForImports(pagesDir);
  const missingDeps = requiredDeps.filter(dep => !installedDeps[dep]);
  
  if (missingDeps.length > 0) {
    console.log('Missing dependencies:', missingDeps);
    return false;
  }
  
  console.log('All dependencies satisfied!');
  return true;
}
```

### 2. **Page Template Generator**
```javascript
// scripts/generate-page.js
const fs = require('fs');
const path = require('path');

function generatePage(pageName, template = 'basic') {
  const templates = {
    basic: `import React from 'react';

export default function ${toPascalCase(pageName)}() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold">${toTitleCase(pageName)}</h1>
      <p className="mt-4 text-gray-600">
        This page was auto-generated. Add your content here!
      </p>
    </div>
  );
}`,
    
    dashboard: `import React from 'react';

export default function ${toPascalCase(pageName)}() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          ${toTitleCase(pageName)}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add your dashboard widgets here */}
        </div>
      </div>
    </div>
  );
}`
  };
  
  const content = templates[template] || templates.basic;
  const fileName = `${pageName}.tsx`; // or .jsx
  const filePath = path.join(__dirname, '../src/pages', fileName);
  
  fs.writeFileSync(filePath, content);
  console.log(`Generated page: ${fileName}`);
}
```

## 🎯 Best Practices

### 1. **Page Development**
- Use descriptive file names (kebab-case)
- Export as default function
- Include proper TypeScript types
- Use Tailwind CSS for styling
- Follow React best practices

### 2. **Dependency Management**
- Install dependencies as needed
- Use specific versions in package.json
- Document any special requirements
- Test builds before committing

### 3. **Performance**
- Use dynamic imports for large dependencies
- Optimize bundle size
- Lazy load heavy components
- Monitor build output size

### 4. **Error Handling**
- Graceful fallbacks for missing dependencies
- Error boundaries for page crashes
- Clear error messages for developers

## 🔮 Future Enhancements

1. **Smart Dependency Detection**
   - AI-powered dependency suggestions
   - Automatic installation during development
   - Version conflict resolution

2. **Enhanced Page Templates**
   - Interactive page generator
   - Template marketplace
   - Custom template creation

3. **Advanced Routing**
   - Nested routes support
   - Dynamic route parameters
   - Route-based code splitting

4. **Developer Experience**
   - Hot reload for new pages
   - Built-in component library
   - Visual page builder

---

This architecture provides a solid foundation for automatic page detection while handling the complexity of modern React development dependencies.
