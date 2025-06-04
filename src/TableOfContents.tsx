import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, ExternalLink, Smartphone, Monitor, Github, Globe } from 'lucide-react'

// eager:true so modules have .default immediately
const modules = import.meta.glob('./pages/*.tsx', { eager: true })

// Get HTML files manually - these should be in public/pages/ directory
// We'll scan for HTML files in src/pages and assume they're copied to public/pages
const htmlModules = import.meta.glob('./pages/*.html', { eager: false })
const htmlFileNames = Object.keys(htmlModules).map(path => {
  const name = path.match(/\.\/pages\/(.*)\.html$/)?.[1]
  return name
}).filter(Boolean)

export default function TableOfContents() {
  // derive page names from file paths for TSX files
  const tsxEntries = Object.keys(modules).map((path) => {
    const name = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1] || 'unknown'
    // Convert kebab-case and camelCase to readable titles
    const title = name
      .replace(/[-_]/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim()
    
    return { name, path: `/${name}`, title, type: 'tsx' as const }
  })

  // derive page names from file paths for HTML files
  const htmlEntries = htmlFileNames.map((name) => {
    if (!name) return null
    // Convert kebab-case and camelCase to readable titles
    const title = name
      .replace(/[-_]/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim()
    
    // HTML files will be accessible from the public/pages directory
    // We need to use the base URL for proper routing
    const basePath = import.meta.env.BASE_URL || '/'
    return { name, path: `${basePath}pages/${name}.html`, title, type: 'html' as const }
  }).filter(Boolean) as Array<{ name: string; path: string; title: string; type: 'html' }>

  // Combine all entries
  const entries = [...tsxEntries, ...htmlEntries]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">React Pages Hub</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A modern, mobile-friendly dashboard for accessing your React components and HTML pages. 
              Add any .tsx or .html file to the pages folder and it will automatically appear here.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Features Banner */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            ✨ Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Mobile Optimized</h3>
              <p className="text-sm text-gray-600">Perfect for viewing on mobile Safari and all devices</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Monitor className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Auto-Detection</h3>
              <p className="text-sm text-gray-600">New .tsx and .html files automatically appear in real-time</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Github className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">GitHub Pages</h3>
              <p className="text-sm text-gray-600">Automatically deploys when you push to GitHub</p>
            </div>
          </div>
        </div>

        {/* Pages Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Available Pages ({entries.length})
            </h2>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Auto-updated
            </div>
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No pages found</h3>
              <p className="text-gray-500">Add .tsx or .html files to the src/pages/ folder to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entries.map(({ name, path, title, type }) => {
                // For HTML files, use a regular anchor tag to navigate directly to the file
                // For TSX files, use React Router Link
                const isHtml = type === 'html'
                
                const cardContent = (
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 ${
                        isHtml 
                          ? 'bg-gradient-to-br from-green-500 to-teal-600' 
                          : 'bg-gradient-to-br from-blue-500 to-purple-600'
                      }`}>
                        {isHtml ? (
                          <Globe className="w-6 h-6 text-white" />
                        ) : (
                          <FileText className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {title}
                    </h3>
                    
                    <p className="text-sm text-gray-500 mb-4">
                      {isHtml ? 'File:' : 'Component:'} {name}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        isHtml 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {isHtml ? 'HTML Page' : 'React TSX'}
                      </span>
                      <span className="text-xs text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                        Click to view →
                      </span>
                    </div>
                  </div>
                )

                const hoverBar = (
                  <div className={`h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                    isHtml 
                      ? 'bg-gradient-to-r from-green-500 to-teal-600' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600'
                  }`}></div>
                )

                return isHtml ? (
                  <a
                    key={name}
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 overflow-hidden block"
                  >
                    {cardContent}
                    {hoverBar}
                  </a>
                ) : (
                  <Link
                    key={name}
                    to={path}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden"
                  >
                    {cardContent}
                    {hoverBar}
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🚀 How to Add New Pages
          </h2>
          <div className="space-y-6">
            {/* TSX Instructions */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">React Components (.tsx)</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Create a new .tsx file</h4>
                    <p className="text-gray-600 text-sm">Add your React component to the <code className="bg-gray-100 px-2 py-1 rounded text-xs">src/pages/</code> folder</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Export as default</h4>
                    <p className="text-gray-600 text-sm">Make sure your component is exported as the default export</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Automatic routing</h4>
                    <p className="text-gray-600 text-sm">Your page will be accessible via React Router navigation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* HTML Instructions */}
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">HTML Pages (.html)</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Create a new .html file</h4>
                    <p className="text-gray-600 text-sm">Add your HTML page to the <code className="bg-gray-100 px-2 py-1 rounded text-xs">src/pages/</code> folder</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Direct access</h4>
                    <p className="text-gray-600 text-sm">Your HTML page will open directly in a new tab when clicked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Example file structure:</h4>
            <pre className="text-sm text-blue-700 font-mono">
{`src/pages/
├── my-dashboard.tsx     → /my-dashboard (React Router)
├── UserProfile.tsx      → /UserProfile (React Router)
├── data-charts.tsx      → /data-charts (React Router)
├── quiz-game.html       → Direct HTML page
└── landing-page.html    → Direct HTML page`}
            </pre>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-600 text-sm">
            Built with React + TypeScript + Vite • Auto-deploys to GitHub Pages
          </p>
        </div>
      </div>
    </div>
  )
}
