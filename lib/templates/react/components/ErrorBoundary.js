module.exports = `
import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

const myErrorHandler = (error, componentStack) => {
  // Do something with the error
  // E.g. log to an error logging client here
};

function ErrorFallback({ error, componentStack, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function ErrorBoundary(props) {
  return (
    <ReactErrorBoundary onError={myErrorHandler} FallbackComponent={ErrorFallback}>
      {props.children}
    </ReactErrorBoundary>
  )
}

export { ErrorBoundary };
`;
