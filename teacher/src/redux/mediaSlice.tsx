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

export const getViewUrl = createAsyncThunk(
  "media/viewUrl",
  async (fileName, { rejectWithValue }) => {
    try {
      const query = `query {
      getS3ViewUrl(fileName: "${fileName}") 
    }`;
      //  console.log(query);
      const response = await fetch(envs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      if (response.status !== 200) {
        if (response.status === 500) {
          console.error("viewURL error while fetching student profile pic");
          throw new Error("Network error");
        } else if (response.status === 400) {
          console.error("viewURL error while fetching student profile pic");
          throw new Error("Invalid fileName");
        }
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("viewUrl error in getviewurl for admin", error);
      return rejectWithValue(error.message);
    }
  }
);

export interface MediaState {
  viewUrl: string;
  viewUrlLoading: boolean;
  viewUrlError: boolean;
  // SMSLoading: boolean;
  // SMSError: boolean;
  // verificationLoading: boolean;
  // verificationError: boolean;
}

const initialState: MediaState = {
  viewUrl: "",
  viewUrlLoading: false,
  viewUrlError: false,
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
      .addCase(getViewUrl.pending, (state) => {
        state.viewUrlLoading = true;
        state.viewUrlError = false;
      })
      .addCase(getViewUrl.rejected, (state) => {
        state.viewUrlLoading = null;
        state.viewUrlError = true;
      })
      .addCase(getViewUrl.fulfilled, (state, action) => {
        state.viewUrl = action.payload.data.getS3viewUrl;
        state.viewUrlLoading = false;
        state.viewUrlError = false;
      });
  },
});

export default mediaSlice.reducer;
