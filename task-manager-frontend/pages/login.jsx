import nookies from "nookies";
import { useSelector, useDispatch } from "react-redux";

import { LoginForm, Header } from "../components";

import { userActions } from "../redux";

export default () => {
  const { error } = useSelector((state) => state.ui.login);
  const dispatch = useDispatch();

  const submitLogin = (credentials) => dispatch(userActions.login(credentials));

  return (
    <main>
      <Header />
      <LoginForm onSubmit={submitLogin} error={error} />
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
