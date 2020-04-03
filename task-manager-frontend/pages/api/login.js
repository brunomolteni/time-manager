import nookies from "nookies";

import { post, config } from "../../util";

// Try to login, if successful then return user object and save token, otherwise return error

async function loginHandler(req, res) {
  const { API_URL, API_PORT, COOKIES } = config;

  if (req.method === "POST") {
    return post(`http://${API_URL}:${API_PORT}/auth/local`, req.body)
      .then(({ jwt, user }) => {
        delete user.provider;
        delete user.updated_at;
        delete user.created_at;

        nookies.set({ req, res }, "user", JSON.stringify(user), COOKIES);
        nookies.set({ req, res }, "token", jwt, COOKIES);

        return res.status(200).json(user);
      })
      .catch((error) => res.status(400).json({ error }));
  } else return res.status(404);
}

export default loginHandler;
