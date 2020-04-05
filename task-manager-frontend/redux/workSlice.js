import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { put, post, del } from "../util";

const asyncActions = {
  createWork: createAsyncThunk("work/create", async (work) =>
    post("/api/works", { ...work, date: work.date.toISOString() })
  ),
  editWork: createAsyncThunk("work/edit", async (work) =>
    put(`/api/works/${work.id}`, work)
  ),
  deleteWork: createAsyncThunk("work/delete", async (work) =>
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
