const app = require("../templates/react/app");
const utils = require("../templates/react/utils");
const appBase = require("../templates/react/app/app");
const client = require("../templates/react/lib/client");
const appIndex = require("../templates/react/app-index");
const userClient = require("../templates/react/lib/api/user");
const userQuery = require("../templates/react/lib/queries/user");
const loaders = require("../templates/react/components/Loaders");
const authUtils = require("../templates/react/lib/utils/auth-utils");
const userContext = require("../templates/react/contexts/UserContext");
const errorBoundary = require("../templates/react/components/ErrorBoundary");

module.exports = {
  name: "template-react",
  dependencies: [],
  devDependencies: [
    "formik",
    "prettier",
    "js-cookie",
    "jwt-decode",
    "husky",
    "lint-staged",
    "react-idle-timer",
    "react-responsive",
    "react-router-dom",
    "yup",
    "axios",
    "react-query",
    "focus-visible",
    "zustand",
    "react-icons",
    "react-query-devtools",
    "eslint-plugin-react-hooks",
    "eslint-config-prettier",
    "eslint-plugin-prettier",
    "react-error-boundary",
    "react-loader-spinner",
    "@chakra-ui/core@0.8.0",
    "@emotion/core@10.0.28",
    "@emotion/styled@10.0.27",
    "emotion-theming@10.0.27"
  ],
  packageEntries: [
    {
      key: "scripts.lint",
      value: "eslint --ignore-path .gitignore ."
    },
    {
      key: "scripts.format",
      value:
        "prettier --ignore-path .gitignore --write '**/*.+(js|ts|tsx|json|css|html|md)'"
    },
    {
      key: "scripts.build",
      value: "rm -rf build && GENERATE_SOURCEMAP=false react-scripts build"
    },
    {
      key: "scripts.dev",
      value: "yarn start"
    },
    {
      key: "husky",
      value: {
        hooks: {
          "pre-commit": "lint-staged"
        }
      }
    },
    {
      key: "lint-staged",
      value: {
        "**/*.+(js|ts|graphql|yml|yaml|vue|tsx)": [
          "eslint --fix",
          "prettier --write"
        ],
        "*/*.+(css|sass|less|scss|json|html)": ["prettier --write"]
      }
    },
    {
      key: "eslintIgnore",
      value: [
        "node_modules",
        "coverage",
        "dist",
        "build",
        "docs",
        ".vscode",
        ".github"
      ]
    },
    {
      key: "prettier",
      value: {
        tabWidth: 2,
        useTabs: false,
        printWidth: 80,
        singleQuote: false,
        proseWrap: "always",
        trailingComma: "none",
        bracketSpacing: true,
        jsxSingleQuote: false,
        quoteProps: "as-needed",
        jsxBracketSameLine: false,
        htmlWhitespaceSensitivity: "css",
        arrowParens: "avoid"
      }
    }
  ],
  templates: [
    { path: ".env.local", file: utils.env },
    { path: "jsconfig.json", file: utils.jsConfig },
    { path: ".eslintrc", file: utils.eslint },
    { path: "src/lib/client.js", file: client },
    { path: "src/config/index.js", file: utils.config },
    { path: "src/store/global.js", file: utils.store },
    { path: "src/lib/utils/auth-utils.js", file: authUtils },
    { path: "src/lib/api/user.js", file: userClient },
    { path: "src/lib/queries/user.js", file: userQuery },
    { path: "src/contexts/UserContext.js", file: userContext },
    { path: "src/index.js", file: appIndex },
    { path: "src/App.js", file: app },
    { path: "src/__tests__/App.test.js", file: utils.test },
    { path: "src/pages/index.js", file: utils.pages },
    { path: "src/styles/index.js", file: utils.globalStyles },
    { path: "src/hooks/useLocalStorage.js", file: utils.hooks },
    { path: "src/components/ErrorBoundary.js", file: errorBoundary },
    { path: "src/components/Loaders.js", file: loaders.JSLoaders },
    { path: "src/routes/routes.config.js", file: utils.routesConfig },
    { path: "src/pages/NotFound.js", file: utils.NotFound },
    {
      path: "src/app/authenticated-app/index.js",
      file: appBase.authenticatedApp
    },
    {
      path: "src/app/unauthenticated-app/index.js",
      file: appBase.unAuthenticatedApp
    }
  ]
};
