import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../../config";

export const getMediaByDate = createAsyncThunk(
  "media/getMediaByDate",
  async ({ studentID, date }, { rejectWithValue }) => {
    //console.log(studentID, date);
    //const {query, teacherID} = props;
    try {
      const query = `query {
        getS3ViewURLByDate(studentId: "${studentID}", date: "${date}") 
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
          console.error("Error while getting media by date");
          throw new Error("Invalid date");
        }
      }
      const data = await response.json();
      // console.log("----data-----", data);
      return data;
    } catch (error) {
      console.error("Error while getting media by date", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getAllMedia = createAsyncThunk(
  "media/getAllMedia",
  async (studentID, { rejectWithValue }) => {
    // console.log(studentID);
    try {
      const query = `query {
        getS3ViewURLs(studentId: "${studentID}") 
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
          console.error("Error while getting all media");
          throw new Error("Invalid student ID");
        }
      }
      const data = await response.json();
      // console.log("----data-----", data);
      return data;
    } catch (error) {
      console.error("Error while getting all media", error);
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
      // console.log(query);
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
  pictures: string[];
  fetchImagesLoading: boolean;
  fetchImagesError: boolean;
  allPictures: string[];
  fetchAllImagesLoading: boolean;
  fetchAllImagesError: boolean;
  viewUrl: string;
  viewUrlLoading: boolean;
  viewUrlError: boolean;
}

const initialState: MediaState = {
  pictures: [],
  fetchImagesLoading: false,
  fetchImagesError: false,
  allPictures: [],
  fetchAllImagesLoading: false,
  fetchAllImagesError: false,
  viewUrl: "",
  viewUrlLoading: false,
  viewUrlError: false,
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMediaByDate.pending, (state) => {
        state.fetchImagesLoading = true;
        state.fetchImagesError = false;
      })
      .addCase(getMediaByDate.rejected, (state) => {
        state.fetchImagesLoading = null;
        state.fetchImagesError = true;
      })
      .addCase(getMediaByDate.fulfilled, (state, action) => {
        state.pictures = action.payload.data.getS3ViewURLByDate;
        state.fetchImagesLoading = false;
        state.fetchImagesError = false;
      })
      .addCase(getAllMedia.pending, (state) => {
        state.fetchAllImagesLoading = true;
        state.fetchAllImagesError = false;
      })
      .addCase(getAllMedia.rejected, (state) => {
        state.fetchAllImagesLoading = null;
        state.fetchAllImagesError = true;
      })
      .addCase(getAllMedia.fulfilled, (state, action) => {
        state.allPictures = action.payload.data.getS3ViewURLs;
        state.fetchAllImagesLoading = false;
        state.fetchAllImagesError = false;
      })
      .addCase(getViewUrl.pending, (state) => {
        state.viewUrlLoading = true;
        state.viewUrlError = false;
      })
      .addCase(getViewUrl.rejected, (state) => {
        state.viewUrlLoading = null;
        state.viewUrlError = true;
      })
      .addCase(getViewUrl.fulfilled, (state, action) => {
        state.viewUrl = action.payload.data.getS3ViewUrl;
        state.viewUrlLoading = false;
        state.viewUrlError = false;
      });
  },
});

export default mediaSlice.reducer;
