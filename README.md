# React Pages Hub

A modern, mobile-friendly React application that serves as a dynamic hub for accessing rendered React pages (.tsx files). Perfect for mobile Safari and all devices.

## 🚀 Features

- **Auto-Detection**: Automatically detects and displays new .tsx files added to the `src/pages/` folder
- **Real-Time Updates**: Changes appear instantly when running the development server
- **Mobile Optimized**: Perfect viewing experience on mobile Safari and all devices
- **GitHub Pages Ready**: Automatic deployment when pushing to GitHub
- **Modern Design**: Clean, responsive interface with Tailwind CSS

## 📁 Project Structure

```
tableofcontentsreactapp/
├── src/
│   ├── pages/                    # Add your .tsx files here
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── ExamplePage.tsx
│   │   └── market-relationships-charts.tsx
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
The app uses Vite's `import.meta.glob()` to automatically scan the `src/pages/` directory for `.tsx` files:

```typescript
const modules = import.meta.glob('./pages/*.tsx', { eager: true })
```

### File Naming Convention
- File names are automatically converted to readable titles
- `kebab-case` and `camelCase` are converted to "Title Case"
- Examples:
  - `my-dashboard.tsx` → "My Dashboard"
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
3. Add new `.tsx` files to `src/pages/` and watch them appear automatically!

### Adding New Pages
1. Create a new `.tsx` file in the `src/pages/` directory
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

1. Add your `.tsx` files to the `src/pages/` directory
2. Follow React best practices
3. Use TypeScript for type safety
4. Test on mobile devices

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

### Page Not Appearing
- Ensure your file is in `src/pages/` directory
- Check that it has a `.tsx` extension
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
