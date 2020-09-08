module.exports = `
import axios from "axios";
import config from "config";
import { get_token } from "./utils/auth-utils";

/** Axios interceptors to transform error message for clientFn */
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.response.data.message);
  }
);

export async function client(
  endpoint,
  { body, headers: customHeaders, ...customConfig } = {}
) {
  const token = get_token();

  const headers = {
    platform: "Web",
    "Content-type": "application/json; charset=UTF-8"
  };

  if (token) headers.Authorization = "Bearer " + token;

  const bodyPayload = { ...body };

  const params = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customHeaders
    }
  };

  if (body) params.data = JSON.stringify(bodyPayload);

  let response;
  const { data } = await axios(config.API_ENDPOINT + "/" + endpoint, params);

  if (data?.data) {
    const { data: resolvedResponse } = data;
    response = resolvedResponse;
  } else {
    response = data;
  }

  return response;
}
`;
