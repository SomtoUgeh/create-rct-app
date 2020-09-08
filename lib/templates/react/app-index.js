module.exports = `
import React from "react";
import { render } from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { UserProvider } from "contexts/UserContext";
import { ReactQueryConfigProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

const queryConfig = {
  queries: {
    retry: 0,
    throwOnError: false,
    useErrorBoundary: false,
    refetchAllOnWindowFocus: false
  }
};

render(
  <>
    <ReactQueryConfigProvider config={queryConfig}>
      <UserProvider>
        <App />
      </UserProvider>
    </ReactQueryConfigProvider>

    <ReactQueryDevtools initialIsOpen={false} />
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
`;
