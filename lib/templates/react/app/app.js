const authenticatedApp = `
import React from "react";
import config from "config";
import IdleTimer from "react-idle-timer";
import { NotFound } from "pages/NotFound";
import { useUser } from "contexts/UserContext";
import { AppRoutes } from "routes/routes.config";
import { FullPageSpinner } from "components/Loaders";
import { ErrorBoundary } from "components/ErrorBoundary";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";

function AuthenticatedApp() {
  const { handleLogout } = useUser();
  const idleTimer = React.useRef(null);

  return (
    <>
      <IdleTimer
        ref={idleTimer}
        element={document}
        onIdle={handleLogout}
        timeout={config.TIME_OUT}
      />

      <Router>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </Router>
    </>
  );
}

function Routes() {
  const privateRoutes = AppRoutes.filter((route) => route.isPrivate)

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <Switch>
        <Redirect from="/home" to="/" />

        {privateRoutes.map(({ path, component: Component }, index) => (
          <Route
            exact
            path={path}
            children={<Component />}
            key={"dashbord-route-" + index}
          />
        ))}

        {/** 404 not found route when no page matches */}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </React.Suspense>
  );
}

export default AuthenticatedApp
`;

const unAuthenticatedApp = `
import React from "react";
import { AppRoutes } from "routes/routes.config";
import { FullPageSpinner } from "components/Loaders";
import { ErrorBoundary } from "components/ErrorBoundary";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function UnAuthenticatedApp() {
  const publicRoutes = AppRoutes.filter((route) => !route.isPrivate);

  return (
    <Router>
      <ErrorBoundary>
        <React.Suspense fallback={<FullPageSpinner />}>
          <Switch>
            {publicRoutes.map(({ component: Component, path }, index) => (
              <Route
                exact
                path={path}
                children={<Component />}
                key={"auth-route-" + index}
              />
            ))}
          </Switch>
        </React.Suspense>
      </ErrorBoundary>
    </Router>
  );
}`;

module.exports = {
  authenticatedApp,
  unAuthenticatedApp
};
