import nookies from "nookies";

// Logout by deleting session data
async function logoutHandler(req, res) {
  if (req.method === "POST") {
    let cookiesOptions = {
      maxAge: 30 * 24 * 60 * 60,
      path: "/"
    };
    nookies.set({ req, res }, "logout", true, cookiesOptions);
    nookies.destroy({ req, res }, "user");
    nookies.destroy({ req, res }, "token");
    return res.status(200).json({ sucess: true });
  }
}

export default logoutHandler;
