const bareReact = require("./react-config");
const app = require("../templates/react-ts/app");
const utils = require("../templates/react-ts/utils");
const appBase = require("../templates/react/app/app");
const baseUtils = require("../templates/react/utils");
const models = require("../templates/react-ts/models");
const appIndex = require("../templates/react/app-index");
const client = require("../templates/react-ts/lib/client");
const loaders = require("../templates/react/components/Loaders");
const userClient = require("../templates/react-ts/lib/api/user");
const userQuery = require("../templates/react-ts/lib/queries/user");
const authUtils = require("../templates/react-ts/lib/utils/auth-utils");
const userContext = require("../templates/react-ts/contexts/UserContext");
const errorBoundary = require("../templates/react/components/ErrorBoundary");

module.exports = {
  name: "template-react-ts",
  dependencies: [...bareReact.dependencies, "@testing-library/react-hooks"],
  devDependencies: [
    ...bareReact.devDependencies,
    "@types/yup",
    "@types/axios",
    "@types/js-cookie",
    "@types/jwt-decode",
    "@types/react-responsive",
    "@types/react-router-dom",
    "eslint-plugin-react-hooks",
    "eslint-config-prettier",
    "eslint-plugin-prettier",
    "eslint-config-typescript",
    "@types/react-loader-spinner"
  ],
  packageEntries: [...bareReact.packageEntries],
  templates: [
    { path: "src/App.tsx", file: app },
    { path: ".env.local", file: utils.env },
    { path: "src/index.tsx", file: appIndex },
    { path: ".eslintrc", file: utils.eslint },
    { path: "src/lib/client.ts", file: client },
    { path: "tsconfig.json", file: utils.tsconfig },
    { path: "src/pages/index.tsx", file: utils.pages },
    { path: "src/store/global.ts", file: utils.store },
    { path: "src/lib/api/user.ts", file: userClient },
    { path: "src/lib/queries/user.ts", file: userQuery },
    { path: "src/models/auth.ts", file: models.auth },
    { path: "src/models/user.ts", file: models.user },
    { path: "src/models/client.ts", file: models.client },
    { path: "src/models/query.ts", file: models.query },
    { path: "src/config/index.ts", file: baseUtils.config },
    { path: "src/lib/utils/auth-utils.ts", file: authUtils },
    { path: "src/__tests__/App.test.tsx", file: utils.test },
    { path: "src/contexts/UserContext.tsx", file: userContext },
    { path: "src/pages/NotFound.tsx", file: baseUtils.NotFound },
    { path: "src/hooks/useLocalStorage.tsx", file: utils.hooks },
    { path: "src/components/Loaders.tsx", file: loaders.TSLoaders },
    { path: "src/routes/routes.config.ts", file: utils.routesConfig },
    {
      path: "src/components/ErrorBoundary.js",
      file: errorBoundary
    },
    {
      path: "src/app/authenticated-app/index.tsx",
      file: appBase.authenticatedApp
    },
    {
      path: "src/app/unauthenticated-app/index.tsx",
      file: appBase.unAuthenticatedApp
    }
  ]
};
