import { put, post } from "../util";
import Router from "next/router";

export default {
  edit: (id, user) => put(`/api/users/${id}`, user),
  logout: () => post("/api/logout").then(() => Router.push("/login")),
  login: (values) => post("/api/login", values).then(() => Router.push("/")),
};
