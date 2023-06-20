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

export const editProfile = createAsyncThunk(
  "studentProfile/editProfile",
  async ({ studentID, details }, { rejectWithValue }) => {
    // console.log("details", details);
    try {
      const stringifiedDetails = JSON.stringify(details)
        .replace(/\\/g, "\\\\") // Escape backslashes
        .replace(/"/g, '\\"'); // Escape double quotes

      const query = `mutation{
        editProfileInfo(studentId: "${studentID}", details: "${stringifiedDetails}") {
          details
          createdAt
          updatedAt
        }
        }`;
      console.log("------------query--------", query);
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

export const fetchPendingProfile = createAsyncThunk(
  "studentProfile/fetchPendingProfile",
  async (studentID, { rejectWithValue }) => {
    // console.log(studentID);
    const query = `
    {
      getPendingProfileInfo(studentId:"${studentID}") {
          student {
            _id
          }
          createdAt
          details
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
            "Response status 500: Error while fetching pending student profile for parents"
          );
          //return "500";
        } else if (response.status === 400) {
          console.error(
            "Response status 400 while fetching pending student profile for parents"
          );
          throw new Error(
            "Response status 400 while fetching pending student profile for parents"
          );
        }
      }
      const data = await response.json();
      if (data.data.getPendingProfileInfo !== null) {
        return data;
      }
      return null;
    } catch (error) {
      console.error(
        "Catch: Error while fetching pending student profile for parents",
        error
      );
      return rejectWithValue(error.message);
    }
  }
);

export interface ProfileState {
  studentInfo: object;
  lastUpdated: string;
  editProfileLoading: boolean;
  editProfileError: boolean;
  fetchProfileLoading: boolean;
  fetchProfileError: boolean;
  isEditDisabled: boolean;
  fetchPendingProfileLoading: boolean;
  fetchPendingProfileError: boolean;
}

const initialState: ProfileState = {
  editProfileLoading: null,
  editProfileError: false,
  fetchProfileLoading: null,
  fetchProfileError: false,
  studentInfo: {},
  lastUpdated: "",
  isEditDisabled: false,
  fetchPendingProfileLoading: null,
  fetchPendingProfileError: false,
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
      .addCase(editProfile.pending, (state) => {
        state.editProfileLoading = true;
        state.editProfileError = false;
      })
      .addCase(editProfile.rejected, (state) => {
        state.editProfileLoading = null;
        state.editProfileError = true;
      })
      .addCase(editProfile.fulfilled, (state) => {
        // console.log("edit profile fulfilled");
        state.editProfileLoading = false;
        state.editProfileError = false;
        state.isEditDisabled = true;
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
        //console.log("pending profile fulfilled");
        if (action.payload !== null) {
          state.isEditDisabled = true;
        }
        state.fetchPendingProfileLoading = false;
        state.fetchPendingProfileError = false;
      });
  },
});

export default studentProfileSlice.reducer;
