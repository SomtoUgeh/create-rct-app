module.exports = `
import * as userClient from "lib/api/user";
import { queryCache, useQuery, useMutation } from "react-query";

function useLogin() {
  return useMutation(userClient.login);
}

function useRegister() {
  return useMutation(userClient.register);
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
