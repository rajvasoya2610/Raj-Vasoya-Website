import React, { Component, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Caught application error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#08090E] text-slate-100 flex items-center justify-center p-6 font-sans">
          <div className="max-w-xl w-full bg-[#0e111d] border border-purple-500/40 rounded-3xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400 text-2xl font-mono">
              ⚠️
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">Something went wrong during load</h1>
              <p className="text-slate-400 text-xs sm:text-sm">
                An error occurred while mounting the portfolio interface.
              </p>
            </div>
            {this.state.error && (
              <div className="p-4 rounded-xl bg-black/60 border border-slate-800 text-left font-mono text-xs text-red-400 overflow-x-auto max-h-48">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm transition-colors shadow-lg shadow-purple-600/30"
            >
              Reload Website
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
