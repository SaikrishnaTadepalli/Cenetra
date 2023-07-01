import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../../config/env";

export const fetchLogs = createAsyncThunk("logs/getLogs", async (studentID) => {
  const query = `
  query {
    logs(studentId: "${studentID}") {
        _id
        details
        createdAt
        updatedAt
        rating
    }
}
`;
  try {
    const response = await fetch(envs, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    if (response.status !== 200) {
      if (response.status === 500) {
        console.error("Error while fetching logs for teacher");
        throw new Error("Network error");
      } else if (response.status === 400) {
        console.error("Invalid teacher details");
        throw new Error("Invalid or wrong teacher Info");
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Catch: while fetching logs for teacher", error);
  }
});

export const updateLogs = createAsyncThunk(
  "logs/updateLogs",
  async ({ teacherID, studentID, details, rating }) => {
    // console.log(details);

    const stringifiedDetails = JSON.stringify(details)
      .replace(/\\/g, "\\\\") // Escape backslashes
      .replace(/"/g, '\\"'); // Escape double quotes

    const query = `mutation {
    createLog(teacherId: "${teacherID}" studentId: "${studentID}" details: "${stringifiedDetails}", rating: ${rating}) {
        _id
        details
        createdAt
        rating
    }
  }`;
    // console.log(query);
    try {
      const response = await fetch(envs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (response.status !== 200) {
        if (response.status === 500) {
          console.error("Error while creating logs");
          throw new Error("Network error");
        } else if (response.status === 400) {
          console.error("Invalid details");
          throw new Error(
            "Invalid or wrong details for teacher while creating logs"
          );
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Catch: Error while creating logs by teacher", error);
    }
  }
);

export const editLogs = createAsyncThunk(
  "logs/editLogs",
  async ({ logID, details, rating }) => {
    // console.log(details);

    const stringifiedDetails = JSON.stringify(details)
      .replace(/\\/g, "\\\\") // Escape backslashes
      .replace(/"/g, '\\"'); // Escape double quotes

    const query = `mutation {
    editLog(logId: "${logID}" details: "${stringifiedDetails}", rating: ${rating}) {
        _id
        details
        createdAt
        rating
    }
  }`;
    // console.log(query);
    try {
      const response = await fetch(envs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      if (response.status !== 200) {
        if (response.status === 500) {
          console.error("Error while editing logs");
          throw new Error("Network error");
        } else if (response.status === 400) {
          console.error("Invalid details");
          throw new Error(
            "Invalid or wrong details for teacher while editing logs"
          );
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Catch: Error while editing logs by teacher", error);
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
  editLogsError: boolean;
  editLogsPending: boolean;
  isNewLogAdded: boolean;
}

const initialState: LogState = {
  updateLogsPending: null,
  updateLogsError: false,
  updateLogsSuccessful: false,
  fetchLogsPending: null,
  fetchLogsError: false,
  editLogsError: false,
  editLogsPending: null,
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
      })
      .addCase(editLogs.pending, (state) => {
        state.editLogsPending = true;
        state.editLogsError = false;
        state.isNewLogAdded = false;
        // state.updateLogsSuccessful = false;
      })
      .addCase(editLogs.rejected, (state) => {
        state.editLogsPending = null;
        state.editLogsError = true;
        // state.editogsSuccessful = false;
      })
      .addCase(editLogs.fulfilled, (state, action) => {
        state.logs = [action.payload.data.editLog, ...state.logs];
        state.editLogsPending = false;
        state.editLogsError = false;
        state.isNewLogAdded = false;
        //state.editLogsSuccessful = true;
      });
  },
});

export const { setIsNewLogAdded } = logSlice.actions;

export const getIsNewLogAdded = (state) => state.isNewLogAdded;

export default logSlice.reducer;
