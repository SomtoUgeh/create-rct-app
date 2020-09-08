module.exports = `
import config from "config";
import Cookies from "js-cookie";

function getValueFromCookie(value) {
  let result = null;
  const cookieResponse = Cookies.get(value);

  if (cookieResponse) {
    result = cookieResponse;
    result = JSON.parse(result);

    return result;
  }

  return result;
}

function get_token() {
  return getValueFromCookie(config.TOKEN);
}

export { get_token };`;
