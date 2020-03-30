import fetch from "node-fetch";
import nookies from "nookies";

import { post } from "../../util/fetch";

// Try to login, if successful then return user object and save token, otherwise return error

async function loginHandler(req, res) {
  if (req.method === "POST") {
    return post("http://localhost:1337/auth/local", req.body)
      .then(({ jwt, user }) => {
        let cookiesOptions = {
          maxAge: 30 * 24 * 60 * 60,
          path: "/"
        };
        delete user.provider;
        delete user.updated_at;
        delete user.created_at;

        nookies.set({ req, res }, "user", JSON.stringify(user), cookiesOptions);
        nookies.set({ req, res }, "token", jwt, cookiesOptions);

        return res.status(200).json(user);
      })
      .catch(error => res.status(400).json({ error }));
  } else return res.status(404);
}

export default loginHandler;
