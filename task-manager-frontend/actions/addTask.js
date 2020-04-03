import { post } from "../util";

export default async (ev, user) => {
  ev.preventDefault();

  const date = new Date(ev.target.querySelector(".add-work-date input").value);

  const newTask = {
    Task: ev.target.task.value,
    Date: date.toISOString(),
    Duration: +ev.target.duration.value,
    user: user.id.toString(),
  };

  return post("/api/works", newTask);
};
