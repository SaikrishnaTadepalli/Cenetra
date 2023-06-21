import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../../config/env";

export const fetchProfile = createAsyncThunk(
  "studentProfile/fetchProfile",
  async (studentID, { rejectWithValue }) => {
    const query = `
    {
        getLatestProfileInfo(studentId:"${studentID}") {
          student {
            _id
          }
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
            "Response status 500: Error while fetching student profile for teacher"
          );
          //return "500";
        } else if (response.status === 400) {
          console.log(
            "Response status 400 while fetching student profile for teacher"
          );
          throw new Error(
            "Response status 400 while fetching student profile for teacher"
          );
        }
      }
      const data = await response.json();
      //console.log(data.data.getLatestProfileInfo);
      const details = JSON.parse(data.data.getLatestProfileInfo.details);
      const result = {
        lastUpdated: data.data.getLatestProfileInfo.createdAt,
        studentInfo: details,
        id: data.data.getLatestProfileInfo.student._id,
      };
      return result;
    } catch (error) {
      console.error(
        "Catch: Error while fetching student profile for teacher",
        error
      );
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPendingProfile = createAsyncThunk(
  "studentProfile/fetchPendingProfile",
  async (studentID, { rejectWithValue }) => {
    //console.log(studentID);
    const query = `
    query {
      getAllMatchedPendingProfileInfos {
        _id
        details
        updatedAt
      }
    }
            `;
    //console.log(query);
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
            "Response status 500: Error while fetching pending student profile for admin"
          );
          //return "500";
        } else if (response.status === 400) {
          console.error(
            "Response status 400 while fetching pending student profile for admin"
          );
          throw new Error(
            "Response status 400 while fetching pending student profile for admin"
          );
        }
      }
      const data = await response.json();
      //console.log(data.data.getPendingProfileInfo.details);

      return data;
    } catch (error) {
      console.error(
        "Catch: Error while fetching pending student profile for admin",
        error
      );
      return rejectWithValue(error.message);
    }
  }
);

export const approvePendingProfile = createAsyncThunk(
  "studentProfile/approvePendingProfile",
  async ({ adminID, profileID }, { rejectWithValue }) => {
    //console.log(studentID);
    const query = `
    mutation {
      approveProfileInfo(adminId:"${adminID}", profileId:"${profileID}") {
          _id
      }
            `;
    //console.log(query);
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
            "Response status 500: Error while approving pending student profile for admin"
          );
          //return "500";
        } else if (response.status === 400) {
          console.error(
            "Response status 400 while approving pending student profile for admin"
          );
          throw new Error(
            "Response status 400 while approving pending student profile for admin"
          );
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "Catch: Error while approving pending student profile for admin",
        error
      );
      return rejectWithValue(error.message);
    }
  }
);

export interface ProfileState {
  studentInfo: object;
  studentID: string;
  lastUpdated: string;
  fetchProfileLoading: boolean;
  fetchProfileError: boolean;
  pendingStudentInfo: object;
  fetchPendingProfileLoading: boolean;
  fetchPendingProfileError: boolean;
  pendingProfileID: string;
  approvePendingProfileLoading: boolean;
  approvePendingProfileError: boolean;
}

const initialState: ProfileState = {
  fetchProfileLoading: null,
  fetchProfileError: false,
  studentInfo: {},
  studentID: "",
  lastUpdated: "",
  pendingStudentInfo: {},
  fetchPendingProfileLoading: null,
  fetchPendingProfileError: false,
  pendingProfileID: "",
  approvePendingProfileLoading: null,
  approvePendingProfileError: false,
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
        state.studentID = action.payload.id;
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
      .addCase(fetchPendingProfile.pending, (state) => {
        state.fetchPendingProfileLoading = true;
        state.fetchPendingProfileError = false;
      })
      .addCase(fetchPendingProfile.rejected, (state) => {
        state.fetchPendingProfileLoading = null;
        state.fetchPendingProfileError = true;
      })
      .addCase(fetchPendingProfile.fulfilled, (state, action) => {
        state.pendingStudentInfo = action.payload;
        state.fetchPendingProfileLoading = false;
        state.fetchPendingProfileError = false;
      })
      .addCase(approvePendingProfile.pending, (state) => {
        state.approvePendingProfileLoading = true;
        state.approvePendingProfileError = false;
      })
      .addCase(approvePendingProfile.rejected, (state) => {
        state.approvePendingProfileLoading = null;
        state.approvePendingProfileError = true;
      })
      .addCase(approvePendingProfile.fulfilled, (state, action) => {
        state.approvePendingProfileLoading = false;
        state.approvePendingProfileError = false;
      });
  },
});

export default studentProfileSlice.reducer;
