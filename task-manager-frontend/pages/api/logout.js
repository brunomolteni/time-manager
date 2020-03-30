// Try to login, if successful then return user object and save token, otherwise return error
import { removeNookie } from "next-nookies-persist";

async function logoutHandler(req, res) {
  removeNookie("user");
  removeNookie("token");
  return res.json({ sucess: true });
}

export default logoutHandler;
