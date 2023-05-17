import React from "react";

interface ErrorBoundaryProps {
    onRetry: () => void,
    message?: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
}

interface ErrorBoundaryStates {
    error?: Error | null;
    info?: {
        componentStack?: string;
    };
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryStates> {
    state = {
        error: undefined,
        info: {
            componentStack: '',
        },
    };
    // {onRetry}: {onRetry: ()=> void}

    componentDidCatch(error: Error | null, info: object) {
      this.setState({ error, info });
    }

    render() {
      const { message, description, children, onRetry } = this.props;
      const { error, info } = this.state;
      const componentStack = info && info.componentStack ? info.componentStack : null;
      const errorMessage = typeof message === 'undefined' ? (error || '').toString() : message;
      const errorDescription = typeof description === 'undefined' ? componentStack : description;
      if (error) {
        return <>
            <h2>{errorMessage}</h2>
            <button onClick={()=> {
                this.setState({
                    error: undefined,
                    info: {
                        componentStack: '',
                    }
                });
                onRetry();
            }}>Retry</button>
            <hr />
            <pre style={{ fontSize: '0.9em', overflowX: 'auto' }}>{errorDescription}</pre>
        </>;
      }
      return children;
    }
}

export default ErrorBoundary;
