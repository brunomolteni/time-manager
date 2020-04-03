import { post } from "../util";
import Router from "next/router";

export default (ev) => {
  ev.preventDefault();

  const credentials = {
    identifier: ev.target.user.value,
    password: ev.target.password.value,
  };

  return post("/api/login", credentials).then(() => {
    Router.push("/");
  });
};
