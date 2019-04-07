import React, { Fragment, Component } from 'react';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: null};
    this.defaultErrorHandler = this.defaultErrorHandler.bind(this);
  }

  componentDidCatch(error, info) {
    console.log(`ErrorBoundary.error:`, error);
    console.log(`ErrorBoundary.info:`, info);
    this.setState({error: error});
  }

  defaultErrorHandler(error) {
    const {message='Unknown error'} = error;
    return <span className='errorboundary-error'>{message}</span>;
  }

  render() {
    const {children, onError=this.defaultErrorHandler} = this.props;
    const {error} = this.state;
    if (error) {
      return onError(error);
    }
    return children;
  }
}


export default ErrorBoundary;
