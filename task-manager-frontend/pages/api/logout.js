import nookies from "nookies";
import { config } from "../../util";

// Logout by deleting session data
async function logoutHandler(req, res) {
  const { COOKIES } = config;

  nookies.set({ req, res }, "logout", true, COOKIES);
  nookies.destroy({ req, res }, "user");
  nookies.destroy({ req, res }, "token");
  return res.status(200).json({ sucess: true });
}

export default logoutHandler;
