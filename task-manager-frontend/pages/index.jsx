import { useState } from "react";
import useSWR from "swr";
import nookies from "nookies";
import { Button } from "@blueprintjs/core";

import { HoursForm, HoursTable, Header } from "../components";
import { addTask, logout } from "../actions";

export default ({ user }) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const { data, mutate } = useSWR("/api/works");

  const toggleForm = () => setFormOpen(!isFormOpen);

  const add = (ev) =>
    addTask(ev, user).then((newTask) => {
      mutate(data.concat([newTask]));
      toggleForm();
    });

  return (
    <main>
      <Header isLoggedIn>
        <Button icon="add" intent="primary" onClick={toggleForm}>
          Log Work
        </Button>
        <Button icon="filter">Filter</Button>
      </Header>

      <HoursTable rows={data} />

      <HoursForm isOpen={isFormOpen} onClose={toggleForm} onSubmit={add} />
    </main>
  );
};

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
    return;
  }

  if (!cookies.user) redirectToLogin();
  else props.user = JSON.parse(cookies.user);
  return { props };
}
