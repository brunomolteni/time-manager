import { post, put, del } from "../util";

export default {
  create: async (work) => {
    const date = new Date(work.Date);

    const newTask = {
      ...work,
      Date: date.toISOString(),
    };

    return post("/api/works", newTask);
  },
  delete: async (work) => del(`/api/works/${work.id}`),
  edit: async (work) => put(`/api/works/${work.id}`, work),
};
