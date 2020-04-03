import { useState } from "react";
import useSWR from "swr";
import nookies from "nookies";
import { Button } from "@blueprintjs/core";

import { HoursForm, HoursTable, Header, SettingsForm } from "../components";
import { work, user as userActions } from "../actions";

export default ({ user }) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const { data, mutate } = useSWR("/api/works");

  const mutateLocalData = () => {
    mutate();
    isFormOpen && toggleForm();
    isEditing && finishEditing();
  };

  const toggleForm = () => setFormOpen(!isFormOpen);
  const finishEditing = () => setEditing(false);
  const openFormToEdit = (item) => setEditing(item);

  const addWork = (item) => work.create(item).then(mutateLocalData);
  const editWork = (item) => work.edit(item).then(mutateLocalData);
  const deleteWork = (item) => work.delete(item).then(mutateLocalData);

  const formValues = isEditing ? isEditing : { user: `${user.id}` };

  return (
    <main className={user.DarkMode ? "bp3-dark" : null}>
      <Header user={user}>
        <Button icon="add" intent="primary" onClick={toggleForm}>
          Log Work
        </Button>
        <Button icon="filter">Filter</Button>
        <Button icon="export">Export</Button>
      </Header>

      <HoursTable
        rows={data}
        toggleForm={toggleForm}
        editWork={openFormToEdit}
        deleteWork={deleteWork}
      />

      <HoursForm
        isOpen={isFormOpen || isEditing}
        onClose={isEditing ? finishEditing : toggleForm}
        onSubmit={isEditing ? editWork : addWork}
        initialValues={formValues}
      />
    </main>
  );
};

// If the user isn't logged redirect to login otherwise pass the user as prop
export async function getServerSideProps(ctx) {
  let props = {};
  let cookies = nookies.get(ctx);
  let redirectToLogin = () =>
    ctx.res.writeHead(302, { Location: "/login" }).end();

  // if the user just logged out clear the cookies
  if (cookies.logout) {
    nookies.destroy(ctx, "user");
    nookies.destroy(ctx, "token");
    nookies.destroy(ctx, "logout");
    redirectToLogin();
  }

  if (!cookies.user) redirectToLogin();
  else props.user = JSON.parse(cookies.user);
  return { props };
}
