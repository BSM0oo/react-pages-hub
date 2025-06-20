import React, { Component, ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
          <pre className="text-left whitespace-pre-wrap text-red-600 bg-red-50 p-4 rounded">
            {this.state.error?.message}
          </pre>
        </div>
      )
    }

    return this.props.children
  }
}
