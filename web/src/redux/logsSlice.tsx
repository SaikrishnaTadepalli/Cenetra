import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLogs = createAsyncThunk("logs/getLogs", async (studentID) => {
  const query = `
  query {
    logs(studentId: "${studentID}") {
        _id
        details
        createdAt
        updatedAt
    }
}
`;
  const response = await fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const data = await response.json();
  return data;
});

export interface LogState {
  logs: string[];
  pending: boolean;
  error: boolean;
}

const initialState: LogState = {
  pending: null,
  error: false,
  logs: [],
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLogs.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchLogs.rejected]: (state) => {
      state.pending = null;
      state.error = true;
    },
    [fetchLogs.fulfilled]: (state, action) => {
      state.logs = action.payload.data.logs;
      state.pending = false;
      state.error = false;
    },
  },
});

export const {} = logSlice.actions;

export default logSlice.reducer;
