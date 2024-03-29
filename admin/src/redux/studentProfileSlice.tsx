import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../../config/env";
import moment from "moment-timezone";

export const fetchProfile = createAsyncThunk(
  "studentProfile/fetchProfile",
  async (studentID, { rejectWithValue }) => {
    const query = `
    {
        getLatestProfileInfo(studentId:"${studentID}") {
          student {
            _id
          }
          profilePic
          createdAt
          details
        }
      }
            `;
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
        profilePic: data.data.getLatestProfileInfo.profilePic,
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
    // console.log(query, envs);
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

export const denyPendingProfile = createAsyncThunk(
  "studentProfile/denyPendingProfile",
  async ({ adminID, profileID }, { rejectWithValue }) => {
    //console.log(profileID, adminID);
    const query = `
    mutation {
      denyProfileInfoEdit(adminId:"${adminID}", profileId:"${profileID}") {
          _id
      }
    }`;
    // console.log(query, envs);
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
            "Response status 500: Error while denying pending student profile for admin"
          );
          //return "500";
        } else if (response.status === 400) {
          console.error(
            "Response status 400 while denying pending student profile for admin"
          );
          throw new Error(
            "Response status 400 while denying pending student profile for admin"
          );
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "Catch: Error while denying pending student profile for admin",
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

export const editProfile = createAsyncThunk(
  "studentProfile/editProfile",
  async ({ studentID, details, adminID }, { rejectWithValue }) => {
    //console.log(profileID, adminID);
    const stringifiedDetails = JSON.stringify(details)
      .replace(/\\/g, "\\\\") // Escape backslashes
      .replace(/"/g, '\\"'); // Escape double quotes
    const query = `
    mutation {
      adminEditProfileInfo(studentId:"${studentID}", details:"${stringifiedDetails}", adminId: "${adminID}") {
          _id
      }
    }`;
    // console.log(query, envs);
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
            "Response status 500: Error while editing student profile for admin"
          );
          //return "500";
        } else if (response.status === 400) {
          console.error(
            "Response status 400 while editing student profile for admin"
          );
          throw new Error(
            "Response status 400 while editing student profile for admin"
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
  denyPendingProfileLoading: boolean;
  denyPendingProfileError: boolean;
  denyPendingProfileSuccessful: boolean;
  addNewProfileLoading: boolean;
  addNewProfileError: boolean;
  addNewProfileSuccessful: boolean;
  editProfileLoading: boolean;
  editProfileError: boolean;
  editProfileSuccessful: boolean;
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
  denyPendingProfileLoading: null,
  denyPendingProfileError: false,
  denyPendingProfileSuccessful: false,
  addNewProfileLoading: false,
  addNewProfileError: false,
  addNewProfileSuccessful: false,
  editProfileLoading: false,
  editProfileError: false,
  editProfileSuccessful: false,
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
        state.lastUpdated = moment(action.payload.lastUpdated).format(
          "DD MMMM YYYY, h:mm a"
        );
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
        state.approvePendingProfileLoading = false;
        state.approvePendingProfileError = false;
        state.approvePendingProfileSuccessful = true;
      })
      .addCase(denyPendingProfile.pending, (state) => {
        state.denyPendingProfileLoading = true;
        state.denyPendingProfileError = false;
        state.denyPendingProfileSuccessful = false;
      })
      .addCase(denyPendingProfile.rejected, (state) => {
        state.denyPendingProfileLoading = null;
        state.denyPendingProfileError = true;
        state.denyPendingProfileSuccessful = false;
      })
      .addCase(denyPendingProfile.fulfilled, (state) => {
        state.denyPendingProfileLoading = false;
        state.denyPendingProfileError = false;
        state.denyPendingProfileSuccessful = true;
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
      })
      .addCase(editProfile.pending, (state) => {
        state.editProfileLoading = true;
        state.editProfileError = false;
        state.editProfileSuccessful = false;
      })
      .addCase(editProfile.rejected, (state) => {
        state.editProfileLoading = null;
        state.editProfileError = true;
        state.editProfileSuccessful = false;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.editProfileLoading = false;
        state.editProfileError = false;
        state.editProfileSuccessful = true;
      });
  },
});

export default studentProfileSlice.reducer;

export const { setIsNewProfileAdded } = studentProfileSlice.actions;
