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
          console.error(
            "Response status 400 while fetching student profile for teacher"
          );
          throw new Error(
            "Response status 400 while fetching student profile for teacher"
          );
        }
      }
      const data = await response.json();
      const details = data.data.getLatestProfileInfo.details;
      const cleanedData = details.replace(/\\/g, "");

      const result = {
        lastUpdated: data.data.getLatestProfileInfo.createdAt,
        studentInfo: JSON.parse(cleanedData),
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
    //console.log(profileID, adminID);
    const query = `
    mutation {
      approveProfileInfo(adminId:"${adminID}", profileId:"${profileID}") {
          _id
      }
    }`;
    console.log(query, envs);
    try {
      const response = await fetch(envs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      //console.log(response);
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

export const addNewProfile = createAsyncThunk(
  "studentProfile/addNewProfile",
  async ({ studentID, details }, { rejectWithValue }) => {
    //console.log(profileID, adminID);
    const stringifiedDetails = JSON.stringify(details)
      .replace(/\\/g, "\\\\") // Escape backslashes
      .replace(/"/g, '\\"'); // Escape double quotes
    const query = `
    mutation {
      addProfileInfo(studentId:"${studentID}", details:"${stringifiedDetails}") {
          _id
      }
    }`;
    console.log(query, envs);
    try {
      const response = await fetch(envs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      //console.log(response);
      if (response.status !== 200) {
        if (response.status === 500) {
          throw new Error(
            "Response status 500: Error while adding new  student profile for admin"
          );
          //return "500";
        } else if (response.status === 400) {
          console.error(
            "Response status 400 while adding new  student profile for admin"
          );
          throw new Error(
            "Response status 400 while adding new  student profile for admin"
          );
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "Catch: Error while adding new  student profile for admin",
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
  approvePendingProfileSuccessful: boolean;
  addNewProfileLoading: boolean;
  addNewProfileError: boolean;
  addNewProfileSuccessful: boolean;
  isNewProfileAdded: boolean;
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
  approvePendingProfileSuccessful: false,
  addNewProfileLoading: false,
  addNewProfileError: false,
  addNewProfileSuccessful: false,
  isNewProfileAdded: false,
};

export const studentProfileSlice = createSlice({
  name: "studentProfile",
  initialState,
  reducers: {
    setIsNewProfileAdded: (state, action) => {
      state.isNewProfileAdded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.fetchProfileLoading = true;
        state.fetchProfileError = false;
        state.approvePendingProfileSuccessful = false;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.fetchProfileLoading = null;
        state.fetchProfileError = true;
        state.approvePendingProfileSuccessful = false;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        // console.log(action.payload.studentInfo);
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
        state.approvePendingProfileSuccessful = false;
      })
      .addCase(fetchPendingProfile.pending, (state) => {
        state.fetchPendingProfileLoading = true;
        state.fetchPendingProfileError = false;
        state.approvePendingProfileSuccessful = false;
      })
      .addCase(fetchPendingProfile.rejected, (state) => {
        state.fetchPendingProfileLoading = null;
        state.fetchPendingProfileError = true;
        state.approvePendingProfileSuccessful = false;
      })
      .addCase(fetchPendingProfile.fulfilled, (state, action) => {
        state.pendingStudentInfo = action.payload;
        state.fetchPendingProfileLoading = false;
        state.fetchPendingProfileError = false;
        state.approvePendingProfileSuccessful = false;
      })
      .addCase(approvePendingProfile.pending, (state) => {
        state.approvePendingProfileLoading = true;
        state.approvePendingProfileError = false;
        state.approvePendingProfileSuccessful = false;
      })
      .addCase(approvePendingProfile.rejected, (state) => {
        state.approvePendingProfileLoading = null;
        state.approvePendingProfileError = true;
        state.approvePendingProfileSuccessful = false;
      })
      .addCase(approvePendingProfile.fulfilled, (state, action) => {
        state.addNewProfileLoading = false;
        state.addNewProfileError = false;
        state.addNewProfileSuccessful = true;
      })
      .addCase(addNewProfile.pending, (state) => {
        state.addNewProfileLoading = true;
        state.addNewProfileError = false;
        state.addNewProfileSuccessful = false;
      })
      .addCase(addNewProfile.rejected, (state) => {
        state.addNewProfileLoading = null;
        state.addNewProfileError = true;
        state.addNewProfileSuccessful = false;
      })
      .addCase(addNewProfile.fulfilled, (state, action) => {
        state.addNewProfileLoading = false;
        state.addNewProfileError = false;
        state.addNewProfileSuccessful = true;
      });
  },
});

export default studentProfileSlice.reducer;

export const { setIsNewProfileAdded } = studentProfileSlice.actions;
