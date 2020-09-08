module.exports = `
import { User } from "models/user";
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

async function fetchUserDetails(): Promise<User | undefined> {
  return await queryCache.getQueryData<User>("user");
}

function useUserDetails() {
  const { data, status } = useQuery<User>({
    queryKey: "userDetails",
    queryFn: fetchUserDetails
  });

  let user: User["user"];

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
