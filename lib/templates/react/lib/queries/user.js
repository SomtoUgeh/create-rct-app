module.exports = `
import * as userClient from "lib/api/user";
import { useQuery, useMutation, useQueryCache } from "react-query";

function useLogin() {
  const queryCache = useQueryCache();

  return useMutation(userClient.login, {
    onSuccess: async () => await queryCache.invalidateQueries("user")
  });
}

function useRegister() {
  const queryCache = useQueryCache();

  return useMutation(userClient.register, {
    onSuccess: async () => await queryCache.invalidateQueries("user")
  });
}

function useForgotPassword() {
  return useMutation(userClient.forgotPassword);
}

function useResetPassword() {
  return useMutation(userClient.resetPassword);
}

async function fetchUserDetails() {
  return await queryCache.getQueryData("user");
}

function useUserDetails() {
  const { data, status } = useQuery({
    queryKey: "userDetails",
    queryFn: fetchUserDetails
  });

  let user;

  if (data) user = data?.user;
  else user = null;

  return { user: user, status };
}

export {
  useLogin,
  useRegister,
  useForgotPassword,
  useResetPassword,
  useUserDetails
};
`;
