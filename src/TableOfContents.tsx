import React from 'react'
import { Link } from 'react-router-dom'

// eager:true so modules have .default immediately
const modules = import.meta.glob('./pages/*.tsx', { eager: true })

export default function TableOfContents() {
  // derive page names from file paths
  const entries = Object.keys(modules).map((path) => {
    const name = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1] || 'unknown'
    return { name, path: `/${name}` }
  })

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Table of Contents</h1>
      <ul>
        {entries.map(({ name, path }) => (
          <li key={name}>
            <Link to={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
