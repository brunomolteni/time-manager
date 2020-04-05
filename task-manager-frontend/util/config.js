export default {
  API_URL: process.env.API_URL || "localhost",
  API_PORT: process.env.API_PORT || "1337",
  COOKIES: {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
    SameSite: "Lax",
  },
};
