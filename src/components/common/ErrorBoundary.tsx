import { Component } from "react";
import type { ReactNode } from "react";
import Button from "../ui/Button";
import ErrorImage from "../../assets/errors/the-void.svg";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FBF8F3] text-center px-4">
          <img src={ErrorImage} alt="Error Image" className="w-40 sm:w-60" />
          <p className="font-mono text-2xl sm:text-[2rem] text-[#232323] mt-2">Something went wrong.</p>
          <p className="text-sm text-gray-500 mb-6 max-w-xs sm:max-w-none">Try refreshing the page. If the issue continues, let us know.</p>
          <Button onClick={() => window.location.reload()}>
            <span className="px-4 py-2 rounded bg-[#232323] text-white text-sm hover:bg-black transition">Reload page</span>
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;