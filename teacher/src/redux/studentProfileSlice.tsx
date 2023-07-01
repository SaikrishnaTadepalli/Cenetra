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
      //console.log(query);
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
      //console.log(response);
      const data = await response.json();
      const details = data.data.getLatestProfileInfo.details;
      const cleanedData = details.replace(/\\/g, "");
      //console.log(data);

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

export interface ProfileState {
  studentInfo: object;
  studentID: string;
  lastUpdated: string;
  fetchProfileLoading: boolean;
  fetchProfileError: boolean;
}

const initialState: ProfileState = {
  fetchProfileLoading: null,
  fetchProfileError: false,
  studentInfo: {},
  studentID: "",
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
      });
  },
});

export default studentProfileSlice.reducer;
