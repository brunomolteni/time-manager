import { useState } from "react";

import { LoginForm, Header } from "../components";

import { user } from "../actions";

export default () => {
  const [error, setError] = useState("");

  const submitLogin = (values) => {
    user.login(values).catch((error) => {
      setError(error.toString());
    });
  };

  return (
    <main>
      <Header />
      <LoginForm onSubmit={submitLogin} error={error} />
    </main>
  );
};
