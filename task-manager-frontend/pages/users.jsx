import { useSelector } from "react-redux";
import useSWR from "swr";
import nookies from "nookies";
import { Button, H2 } from "@blueprintjs/core";
import { useRouter } from "next/router";

import { Header, UsersTable, UsersForm } from "../components";

export default () => {
  const router = useRouter();
  const { darkMode, role } = useSelector((state) => state.user);
  const isManager = role !== "authenticated";
  React.useEffect(() => {
    if (!isManager) {
      router.replace("/");
    }
  }, [role]);

  const { data, mutate } = useSWR(() => isManager && "/api/users");

  return (
    <main className={darkMode ? "bp3-dark" : null}>
      <Header>
        <Button
          icon="list-columns"
          className="u-ml-1"
          onClick={() => router.push("/")}
        >
          Work Log
        </Button>
      </Header>

      <H2>Users</H2>
      <UsersTable users={data} />

      <UsersForm refresh={mutate} />
    </main>
  );
};

// If the user isn't logged redirect to login, if the user just logged out destroy the session cookies
export async function getServerSideProps(ctx) {
  let props = {};
  let cookies = nookies.get(ctx);
  let redirectToLogin = () =>
    ctx.res.writeHead(302, { Location: "/login" }).end();

  if (cookies.logout) {
    nookies.destroy(ctx, "user");
    nookies.destroy(ctx, "token");
    nookies.destroy(ctx, "logout");
    redirectToLogin();
  }

  if (!cookies.user) redirectToLogin();
  return { props };
}
