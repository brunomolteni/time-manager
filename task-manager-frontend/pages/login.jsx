import { useState } from "react";
import { H2, Intent, Callout } from "@blueprintjs/core";
import Router from "next/router";

import { post } from "../util/fetch";
import LoginForm from "../components/LoginForm";

export default () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const login = ev => {
    ev.preventDefault();
    setSubmitting(true);

    const credentials = {
      identifier: ev.target.user.value,
      password: ev.target.password.value
    };

    post("/api/login", credentials)
      .then(() => {
        Router.push("/");
      })
      .catch(error => {
        setSubmitting(false);
        setError(error.toString());
      });
  };

  return (
    <main>
      <H2>Login</H2>
      {error && (
        <Callout title="There was an error" intent={Intent.DANGER}>
          {error}
        </Callout>
      )}
      <LoginForm onSubmit={login} submitting={submitting} />
    </main>
  );
};
