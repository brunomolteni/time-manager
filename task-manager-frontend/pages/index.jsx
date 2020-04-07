import { useSelector } from "react-redux";
import useSWR from "swr";
import nookies from "nookies";
import { H2 } from "@blueprintjs/core";

import { WorkForm, WorkTable, Header, HomeActions } from "../components";

export default () => {
  const { darkMode } = useSelector((state) => state.user);
  const { filter } = useSelector((state) => state.ui);

  const endpoint = () =>
    `/api/works?date_gte=${filter.range.start}&date_lte=${filter.range.end}`;

  const { data: { log, totalHours } = {}, mutate } = useSWR(endpoint);

  return (
    <main className={darkMode ? "bp3-dark" : null}>
      <Header>
        <HomeActions totalHours={totalHours} log={log} />
      </Header>

      <H2>Work Log</H2>
      <WorkTable rows={log} totalHours={totalHours} />

      <WorkForm refresh={mutate} />
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
