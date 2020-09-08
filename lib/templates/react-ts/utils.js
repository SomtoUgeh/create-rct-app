const env = `
SKIP_PREFLIGHT_CHECK=true
REACT_APP_IDLE_TIME=7200000
REACT_APP_API_URL=
`;

const eslint = `
{
  "extends": [
    "react-app",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "eslint-config-prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module"
  },
  "plugins": ["react-hooks", "@typescript-eslint", "prettier"],
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
    "jsx-a11y/href-no-hash": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/explicit-function-return-type": "off"
  },
  "overrides": [
    {
      "files": ["**/*.test.tsx"],
      "env": {
        "jest": true
      }
    }
  ]
}
`;

const pages = `
import * as React from "react";

export default function Pages() {
  return (
    <div>
      <div>Pages</div>
    </div>
  );
};
`;

const test = `
import * as React from "react";
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

const tsconfig = `
{
  "compilerOptions": {
    "baseUrl": "src",
    "module": "esnext",
    "target": "es5",
    "lib": ["es6", "dom", "esnext.asynciterable", "dom.iterable", "esnext"],
    "jsx": "react",
    "allowJs": true,
    "sourceMap": false,
    "moduleResolution": "node",
    "rootDir": "src",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src", "src/setupTests.ts"],
  "exclude": ["node_modules"]
}
`;

const hooks = `
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      throw Error("Please check your values!");
    }
  });

  const setValue = (value: any): void => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      throw Error("Please check your values!");
    }
  };

  return [storedValue, setValue] as const;
}
`;

const routesConfig = `
import * as React from "react";

const Pages = React.lazy(() => import("pages"));

export interface RoutesInterface {
  path: string;
  exact: boolean;
  isPrivate: boolean;
  component: React.LazyExoticComponent<() => JSX.Element>;
}

const AppRoutes: RoutesInterface[] = [
  {
    path: "/",
    exact: true,
    isPrivate: false,
    component: Pages
  }
]

export { AppRoutes }
`;

const store = `
import create from "zustand";

/**
 * Check out documentation of zustand - https://github.com/react-spring/zustand
 */

type State = {
  pin: string | undefined;
};

const api = create(() => {
  const state: State = {
    pin: undefined
  };

  return state;
});

export { api as globalState };
`;

module.exports = {
  tsconfig,
  hooks,
  env,
  pages,
  test,
  eslint,
  routesConfig,
  store
};
