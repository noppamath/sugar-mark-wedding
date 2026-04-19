'use client';

import { Component, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary Component
 * 
 * Catches errors in the component tree and displays a user-friendly error message.
 * Helps prevent entire app crashes by isolating component errors.
 * 
 * @example
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <AlertCircle className="w-16 h-16 text-red-500" aria-hidden="true" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Something Went Wrong
              </h1>
              <p className="text-gray-600 mb-6">
                We encountered an unexpected error. Please try refreshing the page or
                contact us if the problem persists.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Refresh Page
              </button>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-800">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto text-red-600">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
