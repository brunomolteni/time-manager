import { useSelector } from "react-redux";
import useSWR from "swr";
import nookies from "nookies";
import { Button, Popover, PopoverInteractionKind } from "@blueprintjs/core";

import { HoursForm, HoursTable, Header, DateFilter } from "../components";
import { useActions } from "../hooks";
import { uiActions } from "../redux";

export default () => {
  const user = useSelector((state) => state.user);
  const { filter } = useSelector((state) => state.ui);

  const { toggleForm, toggleFiltering } = useActions(uiActions);

  const { data } = useSWR("/api/works");

  return (
    <main className={user.darkMode ? "bp3-dark" : null}>
      <Header>
        <Button icon="add" intent="primary" onClick={() => toggleForm()}>
          Log Work
        </Button>
        <Popover content={<DateFilter />} isOpen={filter.selecting}>
          <Button icon="filter" onClick={() => toggleFiltering()}>
            Filter
          </Button>
        </Popover>
        <Button icon="export">Export</Button>
      </Header>

      <HoursTable rows={data} hoursPerDay={user.hoursPerDay} />

      <HoursForm />
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
