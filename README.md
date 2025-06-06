# React Pages Hub

A modern, mobile-friendly React application that serves as a dynamic hub for accessing rendered React pages (.tsx or .jsx files). Perfect for mobile Safari and all devices.

## 🚀 Features

- **Auto-Detection**: Automatically detects and displays new .tsx or .jsx files added to the `src/pages/` folder
- **Real-Time Updates**: Changes appear instantly when running the development server
- **Mobile Optimized**: Perfect viewing experience on mobile Safari and all devices
- **GitHub Pages Ready**: Automatic deployment when pushing to GitHub
- **Modern Design**: Clean, responsive interface with Tailwind CSS
- **Searchable**: Quickly filter pages with built-in search

## 📁 Project Structure

```
tableofcontentsreactapp/
├── src/
│   ├── pages/                    # Add your .tsx or .jsx files here
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── ExamplePage.tsx
│   │   ├── market-relationships-charts.tsx
│   │   └── economic-indicators-dashboard/
│   │       └── index.html
│   ├── App.tsx                   # Main app component
│   ├── TableOfContents.tsx       # Auto-detection logic
│   ├── main.tsx                  # App entry point
│   └── index.css                 # Tailwind CSS imports
├── .github/workflows/
│   └── deploy.yml                # GitHub Pages deployment
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts
```

## 🛠️ How It Works

### Auto-Detection System
The app uses Vite's `import.meta.glob()` to automatically scan the `src/pages/` directory for `.tsx` and `.jsx` files:

```typescript
const modules = import.meta.glob('./pages/*.{tsx,jsx}', { eager: true })
```

### File Naming Convention
- File names are automatically converted to readable titles
- `kebab-case` and `camelCase` are converted to "Title Case"
- Examples:
  - `my-dashboard.tsx` → "My Dashboard"
  - `example-page.jsx` → "Example Page"
  - `UserProfile.tsx` → "User Profile"
  - `market-relationships-charts.tsx` → "Market Relationships Charts"

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open http://localhost:5173 in your browser
3. Add new `.tsx` or `.jsx` files to `src/pages/` and watch them appear automatically!

> **Note**: Files that use TypeScript features (like type annotations) must use a `.tsx` extension.

### Adding New Pages
1. Create a new `.tsx` or `.jsx` file in the `src/pages/` directory
> **Tip**: Rename the file to `.tsx` if you use TypeScript syntax inside the component.
2. Export your React component as the default export:
   ```tsx
   import React from 'react';
   
   export default function MyNewPage() {
     return (
       <div>
         <h1>My New Page</h1>
         <p>This page will automatically appear in the hub!</p>
       </div>
     );
   }
   ```
3. The page will automatically appear in the table of contents

You can also add standalone HTML pages. Place an `index.html` (along with any
scripts or styles) inside a folder under `src/pages/`. The entire folder will be
copied to `public/pages/` during the build and the page will show up in the
table of contents.

## 🌐 GitHub Pages Deployment

### Automatic Deployment
The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the main branch.

### Setup Instructions
1. Push your project to a GitHub repository
2. Go to your repository settings
3. Navigate to "Pages" in the sidebar
4. Set source to "GitHub Actions"
5. Push any changes to trigger automatic deployment

### Manual Deployment
```bash
npm run build
npm run preview  # Test the build locally
```

## 📱 Mobile Safari Optimization

The app is specifically optimized for mobile Safari with:
- Responsive design that works on all screen sizes
- Touch-friendly interface elements
- Fast loading and smooth animations
- Proper viewport configuration

## 🎨 Styling

The project uses Tailwind CSS for styling:
- Modern gradient backgrounds
- Responsive grid layouts
- Hover effects and animations
- Mobile-first design approach

## 🔧 Configuration

### Tailwind CSS
Configured in `tailwind.config.js` to scan all relevant files:
```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

### Vite Configuration
Standard React + TypeScript setup with hot module replacement for instant updates.

## 📝 Example Pages

The project includes several example pages:
- **About Page**: Simple informational page
- **Contact Page**: Contact form example
- **Example Page**: Basic component structure
- **Market Relationships Charts**: Complex dashboard with interactive charts

## 🤝 Contributing

1. Add your `.tsx` or `.jsx` files to the `src/pages/` directory
2. Follow React best practices
3. Use TypeScript for type safety
4. Test on mobile devices

## 📄 License

This project is open source and available under the MIT License.

## 🔎 Roadmap

- **Simplified Page Creation**: Provide CLI tools and templates so new pages can be added with minimal setup.
- **Flexible Page Types**: Allow additional formats such as Markdown/MDX and plain HTML so a wider variety of content can be plugged in easily.
- **CSV to Quiz Workflow**: Support uploading a CSV file of questions and answers that automatically generates an interactive quiz page.
- **Extensible Plugin System**: Create hooks for future page types or data sources to be added without touching the core code base.
- **Improved Docs**: Expand documentation with tutorials for new page types and data-driven features.

## 🆘 Troubleshooting

### Page Not Appearing
- Ensure your file is in `src/pages/` directory
- Check that it has a `.tsx` or `.jsx` extension
- If you use TypeScript in a `.jsx` file, rename it to `.tsx` to avoid build errors
- Verify the component is exported as default
- Restart the development server if needed

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Check that `index.css` contains Tailwind directives
- Verify PostCSS configuration

### Build Issues
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors in your components
- Verify all imports are correct

---

Built with ❤️ using React, TypeScript, Vite, and Tailwind CSS
