import nookies from "nookies";
import { useSelector } from "react-redux";

import { LoginForm, Header } from "../components";

import { useActions } from "../hooks";
import { userActions } from "../redux";

export default () => {
  const { error } = useSelector((state) => state.ui.login);
  const { login } = useActions(userActions);

  return (
    <main>
      <Header />
      <LoginForm onSubmit={login} error={error} />
    </main>
  );
};

// If the user is already logged redirect to home
export async function getServerSideProps(ctx) {
  let props = {};
  let cookies = nookies.get(ctx);

  if (cookies.user) ctx.res.writeHead(302, { Location: "/" }).end();
  return { props };
}
