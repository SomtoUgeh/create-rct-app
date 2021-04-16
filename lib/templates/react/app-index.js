module.exports = `
import "focus-visible/dist/focus-visible";
import React from "react";
import { render } from "react-dom";
import App from "./App";
import { Global } from "@emotion/core";
import { GlobalStyles } from "./styles";
import reportWebVitals from './reportWebVitals';
import { UserProvider } from "contexts/UserContext";
import { ThemeProvider, theme, CSSReset } from "@chakra-ui/core";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      useErrorBoundary: false,
      refetchOnWindowFocus: false,
    },
  },
});

render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CSSReset />

      <Global styles={GlobalStyles} />
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>

     <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
`;
