import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../config/env";

export const fetchProfile = createAsyncThunk(
  "studentProfile/fetchProfile",
  async (studentID, { rejectWithValue }) => {
    const query = `
    {
        getLatestProfileInfo(studentId:"${studentID}") {
          createdAt
          details
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
          throw new Error(
            "Response status 500: Error while fetching student profile"
          );
        } else if (response.status === 400) {
          console.log("Response status 400 while fetching student profile");
          throw new Error("Response status 400 while fetching student profile");
        }
      }
      const data = await response.json();
      //console.log(data.data.getLatestProfileInfo);
      const details = JSON.parse(data.data.getLatestProfileInfo.details);
      const result = {
        lastUpdated: data.data.getLatestProfileInfo.createdAt,
        studentInfo: details,
      };
      return result;
    } catch (error) {
      console.error("Error while fetching student profile", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "studentProfile/updateProfile",
  async ({ studentID, details }, { rejectWithValue }) => {
    // console.log("details", details);
    try {
      const jsonString = JSON.stringify(details)
        .replace(/\\/g, "\\\\") // Escape backslashes
        .replace(/"/g, '\\"'); // Escape double quotes
      const query = `mutation{
        addProfileInfo(studentId: "${studentID}", details: "${jsonString}") {
          details
          createdAt
          updatedAt
        }
        }`;
      // console.log("------------query--------", query);
      const response = await fetch(envs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      if (response.status !== 200) {
        if (response.status === 500) {
          throw new Error(
            "Response status 500: Error while updating student profile"
          );
        } else if (response.status === 400) {
          throw new Error("Response status 400");
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error while updating student profile", error);
      return rejectWithValue(error.message);
    }
  }
);

export interface ProfileState {
  studentInfo: object;
  lastUpdated: string;
  updateProfileLoading: boolean;
  updateProfileError: boolean;
  fetchProfileLoading: boolean;
  fetchProfileError: boolean;
}

const initialState: ProfileState = {
  updateProfileLoading: null,
  updateProfileError: false,
  fetchProfileLoading: null,
  fetchProfileError: false,
  studentInfo: {},
  lastUpdated: "",
};

export const studentProfileSlice = createSlice({
  name: "studentProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.fetchProfileLoading = true;
        state.fetchProfileError = false;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.fetchProfileLoading = null;
        state.fetchProfileError = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.studentInfo = action.payload.studentInfo;
        const date = new Date(action.payload.lastUpdated);
        state.lastUpdated = date.toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        state.fetchProfileLoading = false;
        state.fetchProfileError = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.updateProfileLoading = true;
        state.updateProfileError = false;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.updateProfileLoading = null;
        state.updateProfileError = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateProfileLoading = false;
        state.updateProfileError = false;
      });
  },
});

export default studentProfileSlice.reducer;
