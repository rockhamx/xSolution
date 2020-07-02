import React, { Component, PropsWithChildren } from "react";

interface Props {
  fallback: string;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  PropsWithChildren<Props>,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log(error, info);
  }

  render() {
    const { children, fallback } = this.props;

    if (this.state.hasError) {
      return <h1>{fallback || "Ops, Something went wrong."}</h1>;
    }
    return children;
  }
}
