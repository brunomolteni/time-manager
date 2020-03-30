import { useState } from "react";
import { H1, H2, Spinner, Button } from "@blueprintjs/core";
import useSWR, { mutate } from "swr";
import nookies from "nookies";
import { get, post } from "../util/fetch";

import HoursForm from "../components/HoursForm";
import HoursTable from "../components/HoursTable";

export default ({ user }) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const { data, error } = useSWR("/api/works", get, {
    dedupingInterval: 10000
  });
  const toggleForm = () => setFormOpen(!isFormOpen);
  const addWork = async ev => {
    ev.preventDefault();

    const date = new Date(
      ev.target.querySelector(".add-work-date input").value
    );

    const body = {
      Task: ev.target.task.value,
      Date: date.toISOString(),
      Duration: +ev.target.duration.value,
      user: user.id.toString()
    };

    post("/api/works", body);

    mutate("api/works", data.push(body));
    toggleForm();
  };

  return (
    <main>
      <H1>Task Manager</H1>
      <div className="flex-row">
        <Button onClick={toggleForm}>Add Work</Button>
        <Button>Filter</Button>
      </div>
      <HoursForm isOpen={isFormOpen} onClose={toggleForm} onSubmit={addWork} />
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
