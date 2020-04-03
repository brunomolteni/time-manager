import { post } from "../util";
import Router from "next/router";

export default () => post("/api/logout").then(() => Router.push("/"));
