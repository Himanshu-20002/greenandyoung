'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside section boundary:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="py-12 px-4 text-center bg-card/25 border border-border/15 rounded-3xl max-w-xl mx-auto my-6 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-[#C9A86A]">Section Unavailable</h3>
          <p className="text-xs text-foreground/50 mt-1">Something went wrong while loading this part of the page.</p>
        </div>
      )
    }

    return this.props.children
  }
}
