import { useSelector } from "react-redux";
import useSWR from "swr";
import nookies from "nookies";
import { Button, Popover, PopoverInteractionKind } from "@blueprintjs/core";

import { HoursForm, HoursTable, Header, DateFilter } from "../components";
import { useActions } from "../hooks";
import { uiActions } from "../redux";
import { exportData } from "../util";

export default () => {
  const { darkMode } = useSelector((state) => state.user);
  const { filter } = useSelector((state) => state.ui);

  const { toggleForm, toggleFiltering } = useActions(uiActions);

  const endpoint = () =>
    `/api/works?date_gte=${filter.range.start}&date_lte=${filter.range.end}`;

  const { data: { log, totalHours } = {}, mutate } = useSWR(endpoint);

  return (
    <main className={darkMode ? "bp3-dark" : null}>
      <Header>
        <Button icon="add" intent="primary" onClick={() => toggleForm()}>
          Log Work
        </Button>
        <Popover
          content={<DateFilter totalHours={totalHours} />}
          onInteraction={(shouldOpen) =>
            filter.selecting && !shouldOpen && toggleFiltering()
          }
          isOpen={filter.selecting}
        >
          <Button
            icon="filter"
            onClick={() => toggleFiltering()}
            className="u-ml-1"
          >
            Filter
          </Button>
        </Popover>
        <Button
          icon="export"
          onClick={() => exportData(log)}
          className="u-ml-1"
        >
          Export
        </Button>
      </Header>

      <HoursTable rows={log} totalHours={totalHours} />

      <HoursForm refresh={mutate} />
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
