module.exports = `
import "focus-visible/dist/focus-visible";
import React from "react";
import { render } from "react-dom";
import App from "./App";
import { Global } from "@emotion/core";
import { GlobalStyles } from "./styles";
import reportWebVitals from './reportWebVitals';
import { UserProvider } from "contexts/UserContext";
import { ReactQueryConfigProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { ThemeProvider, theme, CSSReset } from "@chakra-ui/core";

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
      <ThemeProvider theme={theme}>
        <CSSReset />

        <Global styles={GlobalStyles} />
        <UserProvider>
          <App />
        </UserProvider>
      </ThemeProvider>
    </ReactQueryConfigProvider>

    <ReactQueryDevtools initialIsOpen={false} />
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
`;
