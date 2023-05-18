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

export const updateLogs = createAsyncThunk(
  "logs/updateLogs",
  async ({ teacherID, studentID, details }) => {
    try {
      const query = `mutation {
    createLog(teacherId: "${teacherID}" studentId: "${studentID}" details: "${details}") {
        _id
        details
        createdAt
        updatedAt
    }
}`;
      const response = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log("error");
      throw new Error("An error occurred while fetching data.");
    }
  }
);

export interface LogState {
  logs: string[];
  updateLogsPending: boolean;
  updateLogserror: boolean;
  fetchLogsPending: boolean;
  fetchLogserror: boolean;
  isNewLogAdded: boolean;
}

const initialState: LogState = {
  updateLogsPending: null,
  updateLogserror: false,
  fetchLogsPending: null,
  fetchLogserror: false,
  logs: [],
  isNewLogAdded: false,
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    setIsNewLogAdded: (state) => {
      state.isNewLogAdded = true;
    },
  },
  extraReducers: {
    [fetchLogs.pending]: (state) => {
      console.log(state.pending);
      state.fetchLogsPending = true;
      state.fetchLogsError = false;
      state.isNewLogAdded = false;
    },
    [fetchLogs.rejected]: (state) => {
      state.fetchLogsPending = null;
      state.fetchLogsError = true;
      state.isNewLogAdded = false;
    },
    [fetchLogs.fulfilled]: (state, action) => {
      state.logs = action.payload.data.logs;
      state.fetchLogsPending = false;
      state.fetchLogsError = false;
      state.isNewLogAdded = false;
    },
    [updateLogs.pending]: (state) => {
      state.updateLogsPending = true;
      state.updateLogsError = false;
      state.isNewLogAdded = false;
    },
    [updateLogs.rejected]: (state) => {
      console.log(state.updateLogs.pending);
      state.updateLogsPending = null;
      state.updateLogsError = true;
    },
    [updateLogs.fulfilled]: (state, action) => {
      console.log("entered");
      state.logs = [action.payload.data.createLog, ...state.logs];
      state.updateLogsPending = false;
      state.updateLogsError = false;
    },
  },
});

export const { setIsNewLogAdded } = logSlice.actions;

export const getIsNewLogAdded = (state) => state.log.isNewLogAdded;

export default logSlice.reducer;
