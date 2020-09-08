module.exports = `
import * as React from "react";
import jwt_decode from "jwt-decode";
import { useUser } from "contexts/UserContext";
import { get_token } from "lib/utils/auth-utils";
import { useUserDetails } from "lib/queries/user";
import { FullPageSpinner } from "components/Loaders";

/** Load the authenticated app and un-authenticated app */
const loadAuthenticatedApp = () => import("app/authenticated-app");
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
const UnauthenticatedApp = React.lazy(() => import("app/unauthenticated-app"));

function checkTokenIsValid(actionFn: Function) {
  const token = get_token();

  if (token) {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    const decodedToken = decoded as { exp: number };
    if (decodedToken.exp < currentTime) actionFn();
  }
}

export default function App() {
  const { handleLogout } = useUser();

  React.useLayoutEffect(() => {
    checkTokenIsValid(handleLogout);
  }, [handleLogout]);

  /**
   * A valid user is a user that has been activated; user.activated = true
   * This is used to determine if the user should be shown the authenticated app or not
   */
  const { user } = useUserDetails();

  /** Pre-load the authenticated app in the background while the user fills out the auth form. */
  React.useEffect(() => {
    loadAuthenticatedApp();
  }, []);

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user?.activated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};
`;
