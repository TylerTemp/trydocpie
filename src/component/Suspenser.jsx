import React, { Fragment, Component, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';


const Suspenser = ({onError, fallback, children}) => (
  <ErrorBoundary onError={onError}>
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  </ErrorBoundary>
);


export default Suspenser;
