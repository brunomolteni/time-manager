import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import useSWR from "swr";
import nookies from "nookies";
import { Button } from "@blueprintjs/core";

import { HoursForm, HoursTable, Header } from "../components";
import { work } from "../actions";
import { uiActions } from "../redux";

export default () => {
  const user = useSelector((state) => state.user);
  const { form } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  const actions = bindActionCreators(uiActions, dispatch);

  const { data, mutate } = useSWR("/api/works");

  const mutateLocalData = () => mutate();

  const addWork = (item) => work.create(item).then(mutateLocalData);
  const editWork = (item) => work.edit(item).then(mutateLocalData);
  const deleteWork = (item) => work.delete(item).then(mutateLocalData);

  return (
    <main className={user.DarkMode ? "bp3-dark" : null}>
      <Header>
        <Button
          icon="add"
          intent="primary"
          onClick={() => actions.toggleForm()}
        >
          Log Work
        </Button>
        <Button icon="filter">Filter</Button>
        <Button icon="export">Export</Button>
      </Header>

      <HoursTable
        rows={data}
        editWork={actions.startEditing}
        deleteWork={deleteWork}
        hoursPerDay={user.PreferredWorkingHourPerDay}
      />

      <HoursForm onSubmit={form.editing ? editWork : addWork} />
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
