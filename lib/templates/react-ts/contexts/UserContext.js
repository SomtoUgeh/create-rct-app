module.exports = `
import * as React from "react";;
import * as userClient from "lib/api/user";
import { useQuery, queryCache } from "react-query";
import { FullPageSpinner } from "components/Loaders";

interface UserContextInterface {
  handleLogout: () => Promise<void>;
}

/**
 * BaseFn that fetches an authenticated user on load or refresh.
 * If there is no token, the user obj return null and is shown the un-authenticated app
 */
async function bootstrapAppData() {
  const response = await userClient.getUser();

  if (response !== null) {
    return { user: response };
  }

  return Promise.resolve(null);
}

const UserContext = React.createContext({} as UserContextInterface);

function UserProvider(props: React.PropsWithChildren<{}>) {
  const { Provider } = UserContext;

  /** A decision to show the loading or error state on app initial load */
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);

  const { status } = useQuery({
    queryKey: "user",
    queryFn: bootstrapAppData,
    config: {
      onSettled: () => setFirstAttemptFinished(true),
      onSuccess: async () => await queryCache.invalidateQueries("userDetails")
    }
  });

  if (!firstAttemptFinished) {
    if (status === "loading") return <FullPageSpinner />;

    if (status === "error") {
      return (
        <div style={{ color: "red" }}>
          <p>Uh oh... There's a problem. Try refreshing the app.</p>
        </div>
      );
    }
  }

  async function handleLogout() {
    await userClient.logout();
    await queryCache.clear();
    window.location.href = "/";
  }

  return <Provider value={{ handleLogout }} {...props} />;
}

function useUser() {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

export { UserProvider, useUser };
`;
