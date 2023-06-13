import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../config/env";

export const fetchLogs = createAsyncThunk(
  "logs/fetchLogs",
  async (studentID, { rejectWithValue }) => {
    //console.log(studentID);
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
          throw new Error("Response status 500: Error while fetching logs");
        } else if (response.status === 400) {
          console.log("Response status 400 while fetching logs");
          throw new Error("Response status 400 while fetching logs");
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error while fetching logs", error);
      return rejectWithValue(error.message);
    }
  }
);

export interface DailyLogsState {
  loading: boolean;
  error: boolean;
  logs: string[];
  allPictures: string[];
}

const initialState: DailyLogsState = {
  loading: null,
  error: false,
  logs: [],
  allPictures: [],
};

export const dailyLogsSlice = createSlice({
  name: "dailyLogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchLogs.rejected, (state) => {
        state.loading = null;
        state.error = true;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.logs = action.payload.data.logs;
        state.loading = false;
        state.error = false;
      });
  },
});

export const selectLogByID = (state, logID: string) =>
  state.dailyLogs.logs.find((log) => log._id === logID);

export default dailyLogsSlice.reducer;
