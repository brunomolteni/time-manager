import { useState } from "react";

import { LoginForm, Header } from "../components";

import { login } from "../actions";

export default () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submitLogin = (ev) => {
    setSubmitting(true);
    login(ev).catch((error) => {
      setSubmitting(false);
      setError(error.toString());
    });
  };

  return (
    <main>
      <Header />
      <LoginForm onSubmit={submitLogin} submitting={submitting} error={error} />
    </main>
  );
};
