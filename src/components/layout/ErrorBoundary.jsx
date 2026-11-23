import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Portfolio render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-white">
          <div className="glass-card max-w-md rounded-3xl p-8">
            <h1 className="font-display text-2xl font-bold">Something went off-script.</h1>
            <p className="mt-3 text-sm text-slate-300">
              A section failed to render. Reload the page to try again.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-600 focus-ring"
            >
              Reload portfolio
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
