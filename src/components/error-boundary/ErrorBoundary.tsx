import React, { Component, ErrorInfo } from 'react';

interface Props {
  children?: React.ReactNode;
}

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });

    // You can also log error messages to an error reporting service here
  }

  render(): JSX.Element {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // Normally, just render children
    return <>{this.props.children}</>;
  }

}

export class BuggyCounter extends React.Component {

  state: Readonly<{ counter: number }>;

  constructor(props: Props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(): void {
    this.setState(({ counter }: Readonly<{ counter: number }>) => ({
      counter: counter + 1,
    }));
  }

  render(): JSX.Element {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }

    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }

}
