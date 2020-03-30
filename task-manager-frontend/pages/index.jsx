import useSWR from "swr";
import { H1, H2, Spinner } from "@blueprintjs/core";
import nookies from "nookies";
import { get } from "../util/fetch";

import HoursTable from "../components/HoursTable";

export default ({ user }) => {
  const { data, error } = useSWR("/api/works", get);
  return (
    <main>
      <H1>Task Manager</H1>
      {data ? <HoursTable rows={data} /> : <Spinner />}
    </main>
  );
};

export async function getServerSideProps(ctx) {
  let props = {};
  let cookies = nookies.get(ctx);

  if (!cookies.user) ctx.res.writeHead(302, { Location: "/login" }).end();
  else props.user = JSON.parse(cookies.user);
  return { props };
}
