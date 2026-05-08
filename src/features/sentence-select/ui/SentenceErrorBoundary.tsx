"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

import { HomeRedirect } from "./HomeRedirect";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SentenceErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, info: ErrorInfo): void {
    console.error("[SentenceErrorBoundary] componentStack:", info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) return <HomeRedirect error={this.state.error} />;
    return this.props.children;
  }
}
