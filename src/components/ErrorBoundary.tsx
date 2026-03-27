import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🐛 ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          fontFamily: 'system-ui',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFF9F0'
        }}>
          <h1 style={{ color: '#FF6B6B', marginBottom: '1rem' }}>😿 Algo salió mal</h1>
          <p style={{ color: '#636E72', marginBottom: '1rem' }}>
            {this.state.error?.message || 'Error desconocido'}
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#FF6B6B',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Recargar
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
