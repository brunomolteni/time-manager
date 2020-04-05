import fetch from "node-fetch";
import nookies from "nookies";

import { config } from "../../util";

// Try to login, if successful then return user object and save token, otherwise return error
async function loginHandler(req, res) {
  const { API_URL, API_PORT, COOKIES } = config;

  if (req.method === "POST") {
    const options = {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    };

    const response = await fetch(
      `http://${API_URL}:${API_PORT}/auth/local`,
      options
    );

    if (response.ok) {
      let { jwt, user } = await response.json();
      let { id, PreferredWorkingHourPerDay, DarkMode } = user;
      const publicUser = { id, PreferredWorkingHourPerDay, DarkMode };

      nookies.set({ req, res }, "token", jwt, COOKIES);
      nookies.set({ req, res }, "user", JSON.stringify(publicUser), COOKIES);

      return res.status(200).json(publicUser);
    } else {
      return res
        .status(response.status)
        .json({ error: response.statusText, status: response.status });
    }
  } else {
    return res.status(404);
  }
}

export default loginHandler;
