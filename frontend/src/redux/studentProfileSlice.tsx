import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      const response = await fetch("http://localhost:3000/graphql", {
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
      return data;
    } catch (error) {
      console.error("Error while fetching student profile", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "studentProfile/updateProfile",
  async ({ studentID, details }, { rejectWithValue }) => {
    try {
      const query = `mutation{
        addProfileInfo(studentId: "${studentID}", details: "${details}") {
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
      return data;
    } catch (error) {
      console.error("Error while fetching student profile", error);
      return rejectWithValue(error.message);
    }
  }
);

export interface ProfileState {
  notices: string[];
  updateProfileLoading: boolean;
  updateProfileError: boolean;
  fetchProfileLoading: boolean;
  fetchProfileError: boolean;
  isNewNoticeAdded: boolean;
}

const initialState: ProfileState = {
  updateProfileLoading: null,
  updateProfileError: false,
  fetchProfileLoading: null,
  fetchProfileError: false,
  notices: [],
  isNewNoticeAdded: false,
};

export const studentProfileSlice = createSlice({
  name: "studentProfile",
  initialState,
  reducers: {
    setIsNewNoticeAdded: (state, action) => {
      state.isNewNoticeAdded = action.payload;
    },
  },
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
        state.notices = action.payload.data.notices;
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
        state.notices = [action.payload.data.createNotice, ...state.notices];
        state.updateProfileLoading = false;
        state.updateProfileError = false;
      });
  },
});

export default studentProfileSlice.reducer;
