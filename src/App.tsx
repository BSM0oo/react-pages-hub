import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TableOfContents from './TableOfContents'
import ErrorBoundary from './ErrorBoundary'

// import all page modules eagerly
const modules = import.meta.glob<{
  default: React.ComponentType<unknown>
}>('./pages/*.{tsx,jsx}', { eager: true })

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<TableOfContents />} />
        {Object.keys(modules).map((path) => {
          const nameMatch = path.match(/\.\/pages\/(.*)\.(?:tsx|jsx)$/)
          const name = nameMatch ? nameMatch[1] : ''
          const Component = modules[path].default
          return <Route key={name} path={`/${name}`} element={<Component />} />
        })}
      </Routes>
    </ErrorBoundary>
  )
}

export default App
