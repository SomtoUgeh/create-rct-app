module.exports = `
import "focus-visible/dist/focus-visible";
import React from "react";
import { render } from "react-dom";
import App from "./App";
import { Global } from "@emotion/core";
import { GlobalStyles } from "./styles";
import reportWebVitals from './reportWebVitals';
import { UserProvider } from "contexts/UserContext";
import { ReactQueryDevtools } from "react-query-devtools";
import { ThemeProvider, theme, CSSReset } from "@chakra-ui/core";
import { QueryCache, ReactQueryCacheProvider } from "react-query";

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      retry: false,
      throwOnError: false,
      useErrorBoundary: false,
      refetchOnWindowFocus: false
    }
  }
});

render(
  <ReactQueryCacheProvider config={queryCache}>
    <ThemeProvider theme={theme}>
      <CSSReset />

      <Global styles={GlobalStyles} />
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>

    <ReactQueryDevtools />
  </ReactQueryCacheProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
`;
