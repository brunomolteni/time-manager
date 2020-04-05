import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { put, post, del } from "../util";

// create: async (work) => {
//   const date = new Date(work.Date);

//   const newTask = {
//     ...work,
//     Date: date.toISOString(),
//   };

//   return post("/api/works", newTask);
// },
// delete: async (work) => del(`/api/works/${work.id}`),
// edit: async (work) => put(`/api/works/${work.id}`, work),

const asyncActions = {
  create: createAsyncThunk("user/logout", async (work) => {
    const date = new Date(work.Date);

    const newTask = {
      ...work,
      Date: date.toISOString(),
    };

    return post("/api/works", newTask);
  }),
  edit: createAsyncThunk("user/logout", async (work) =>
    put(`/api/works/${work.id}`, work)
  ),
  delete: createAsyncThunk("user/logout", async (work) =>
    del(`/api/works/${work.id}`)
  ),
};

const workSlice = createSlice({
  name: "work",
  initialState: {},
  reducers: {},
});

export const actions = { ...workSlice.actions, ...asyncActions };

export default workSlice.reducer;
