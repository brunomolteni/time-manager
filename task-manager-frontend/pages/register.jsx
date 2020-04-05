import nookies from "nookies";
import { useSelector, useDispatch } from "react-redux";

import { RegisterForm, Header } from "../components";

import { useActions } from "../hooks";
import { userActions } from "../redux";

export default () => {
  const { done, error } = useSelector((state) => state.ui.register);
  const { register } = useActions(userActions);

  return (
    <main>
      <Header />
      <RegisterForm onSubmit={register} error={error} done={done} />
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
