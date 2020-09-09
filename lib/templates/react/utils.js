const env = `
SKIP_PREFLIGHT_CHECK=true
REACT_APP_IDLE_TIME=7200000
REACT_APP_API_URL=
`;

const jsConfig = `
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
`;

const eslint = `
{
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": ["eslint:recommended", "prettier", "eslint-config-prettier", "react-app"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ["react-hooks", "prettier"],
  "rules": {
    "indent": ["error", 2],
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "no-undef": "error",
    "no-empty": "warn",
    "no-console": "error",
    "no-func-assign": 1,
    "no-unreachable": 2,
    "no-invalid-regexp": 1,
    "no-unused-vars": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
`;

const pages = `
import React from "react";

export default function Pages() {
  return (
    <div>
      <div>Pages</div>
    </div>
  );
}
`;

const test = `
import React from "react";
import App from "../App";
import { render } from "@testing-library/react";
import { UserProvider } from "contexts/UserContext";

test("renders learn react link", () => {
  const wrapper = (
    <UserProvider>
      <App />
    </UserProvider>
  );

  const { getByText } = render(wrapper);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
`;

const store = `
import create from "zustand";

/**
 * Check out documentation of zustand - https://github.com/react-spring/zustand
 */

const globalState = create(() => {
  const state = {
    pin: undefined
  };

  return state;
});

export { globalState };
`;

const hooks = `
import React from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      throw Error("Please check your values!");
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      throw Error("Please check your values!");
    }
  };

  return [storedValue, setValue];
}
`;

const config = `
export default {
  TOKEN: "__ACCESS_TOKEN__",
  API_ENDPOINT: process.env.REACT_APP_API_URL,
  TIME_OUT: Number(process.env.REACT_APP_IDLE_TIME),
};
`;

const routesConfig = `
import React from "react";

const Pages = React.lazy(() => import("pages"));

const AppRoutes = [
  {
    path: "/",
    exact: true,
    isPrivate: false,
    component: Pages
  }
]

export { AppRoutes }
`;

const NotFound = `
import React from "react";

export function NotFound() {
  return (
    <div>
      <div>Not found</div>
    </div>
  );
};
`;

const globalStyles = `
import { css } from "@emotion/core";

export const GlobalStyles = css\`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }

  body {
    background: #edf2f7e0;
  }
\`;
`;

module.exports = {
  env,
  jsConfig,
  eslint,
  pages,
  test,
  store,
  hooks,
  config,
  routesConfig,
  NotFound,
  globalStyles
};
