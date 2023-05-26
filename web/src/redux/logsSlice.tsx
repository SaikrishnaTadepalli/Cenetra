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
  try {
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updateLogs = createAsyncThunk(
  "logs/updateLogs",
  async ({ teacherID, studentID, details }) => {
    const query = `mutation {
    createLog(teacherId: "${teacherID}" studentId: "${studentID}" details: "${details}") {
        _id
        details
        createdAt
        updatedAt
    }
}`;
    try {
      const response = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
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
  updateLogsError: boolean;
  updateLogsSuccessful: boolean;
  fetchLogsPending: boolean;
  fetchLogsError: boolean;
  isNewLogAdded: boolean;
}

const initialState: LogState = {
  updateLogsPending: null,
  updateLogsError: false,
  updateLogsSuccessful: false,
  fetchLogsPending: null,
  fetchLogsError: false,
  logs: [],
  isNewLogAdded: false,
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    setIsNewLogAdded: (state, action) => {
      state.isNewLogAdded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.fetchLogsPending = true;
        state.fetchLogsError = false;
        state.isNewLogAdded = false;
      })
      .addCase(fetchLogs.rejected, (state) => {
        state.fetchLogsPending = null;
        state.fetchLogsError = true;
        state.isNewLogAdded = false;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.logs = action.payload.data.logs;
        state.fetchLogsPending = false;
        state.fetchLogsError = false;
        state.isNewLogAdded = false;
        state.updateLogsSuccessful = false;
      })
      .addCase(updateLogs.pending, (state) => {
        state.updateLogsPending = true;
        state.updateLogsError = false;
        state.isNewLogAdded = false;
        state.updateLogsSuccessful = false;
      })
      .addCase(updateLogs.rejected, (state) => {
        state.updateLogsPending = null;
        state.updateLogsError = true;
        state.updateLogsSuccessful = false;
      })
      .addCase(updateLogs.fulfilled, (state, action) => {
        state.logs = [action.payload.data.createLog, ...state.logs];
        state.updateLogsPending = false;
        state.updateLogsError = false;
        state.isNewLogAdded = false;
        state.updateLogsSuccessful = true;
      });
  },
});

export const { setIsNewLogAdded } = logSlice.actions;

export const getIsNewLogAdded = (state) => state.log.isNewLogAdded;

export default logSlice.reducer;
