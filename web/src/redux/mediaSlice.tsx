import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../../config/env";

export const getUploadUrl = createAsyncThunk(
  "media/getUploadUrl",
  async ({ teacherID, studentID }, { rejectWithValue }) => {
    // console.log(teacherID, studentID);
    //const {query, teacherID} = props;
    try {
      const query = `query {
        getS3UploadUrl(teacherId: "${teacherID}", studentId: "${studentID}")
      }`;
      const response = await fetch(envs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      if (response.status !== 200) {
        if (response.status === 500) {
          console.error("uploadUrlError while getting s3 upload url");
          throw new Error("Invalid Login ID");
        }
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("uploadUrlError in getUploadUrl in web", error);
      return rejectWithValue(error.message);
    }
  }
);

export const uplaodMedia = createAsyncThunk(
  "media/uploadMedia",
  async ({ teacherID, studentID, fileName }, { rejectWithValue }) => {
    try {
      const query = `mutation {
        registerMedia(teacherId: "${teacherID}", studentId: "${studentID}" fileName: "${fileName}") {
          fileName
        }
    }`;
      const response = await fetch(envs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      if (response.status !== 200) {
        if (response.status === 500) {
          console.error("uploadUrlError while fetching student login details");
          throw new Error("Invalid Login ID");
        }
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("uploadUrlError in getUploadUrl in mobile", error);
      return rejectWithValue(error.message);
    }
  }
);

export interface MediaState {
  uploadUrl: string;
  uploadUrlLoading: boolean;
  uploadUrlError: boolean;
  // SMSLoading: boolean;
  // SMSError: boolean;
  // verificationLoading: boolean;
  // verificationError: boolean;
}

const initialState: MediaState = {
  uploadUrl: "",
  uploadUrlLoading: false,
  uploadUrlError: false,
  // SMSLoading: false,
  // SMSError: false,
  // verificationLoading: false,
  // verificationError: false,
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUploadUrl.pending, (state) => {
        state.uploadUrlLoading = true;
        state.uploadUrlError = false;
      })
      .addCase(getUploadUrl.rejected, (state) => {
        state.uploadUrlLoading = null;
        state.uploadUrlError = true;
      })
      .addCase(getUploadUrl.fulfilled, (state, action) => {
        state.uploadUrl = action.payload.data.getS3UploadUrl;
        state.uploadUrlLoading = false;
        state.uploadUrlError = false;
      });
  },
});

export default mediaSlice.reducer;
