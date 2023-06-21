import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../../config/env";

export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async (teacherID, { rejectWithValue }) => {
    const query = `
    query {
      noticesByTeacher(teacherId: "${teacherID}") {
        _id
        details
        createdAt
        noticeType
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
          throw new Error("Response status 500: Error while fetching notices");
        } else if (response.status === 400) {
          console.log("Response status 400 while fetching notices");
          throw new Error("Response status 400 while fetching notices");
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error while fetching notices", error);
      return rejectWithValue(error.message);
    }
  }
);

export const createNotices = createAsyncThunk(
  "notices/createNotices",
  async ({ teacherID, studentIDs, details, noticeType }) => {
    // console.log(teacherID, studentIDs, details, noticeType);
    try {
      const stringifiedDetails = JSON.stringify(details)
        .replace(/\\/g, "\\\\") // Escape backslashes
        .replace(/"/g, '\\"'); // Escape double quotes

      const query = `mutation {
    createNotice(teacherId: "${teacherID}" studentIds: [${studentIDs}] details: "${stringifiedDetails}", noticeType: "${noticeType}") {
        _id
        noticeType
        details
        createdAt
    }
}`;
      console.log(query);
      const response = await fetch(envs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.log("error");
      throw new Error("An error occurred while fetching data.");
    }
  }
);

export interface NoticeState {
  notices: string[];
  createNoticesPending: boolean;
  createNoticesError: boolean;
  createNoticesSuccessful: boolean;
  fetchNoticesPending: boolean;
  fetchNoticesError: boolean;
  isNewNoticeAdded: boolean;
}

const initialState: NoticeState = {
  createNoticesPending: null,
  createNoticesError: false,
  fetchNoticesPending: null,
  fetchNoticesError: false,
  createNoticesSuccessful: false,
  notices: [],
  isNewNoticeAdded: false,
};

export const noticeSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    setIsNewNoticeAdded: (state, action) => {
      state.isNewNoticeAdded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state) => {
        state.fetchNoticesPending = true;
        state.fetchNoticesError = false;
        state.createNoticesSuccessful = false;
      })
      .addCase(fetchNotices.rejected, (state) => {
        state.fetchNoticesPending = null;
        state.fetchNoticesError = true;
        state.createNoticesSuccessful = false;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.notices = action.payload.data.noticesByTeacher;
        state.fetchNoticesPending = false;
        state.fetchNoticesError = false;
        state.createNoticesSuccessful = false;
      })
      .addCase(createNotices.pending, (state) => {
        state.createNoticesPending = true;
        state.createNoticesError = false;
        state.createNoticesSuccessful = false;
      })
      .addCase(createNotices.rejected, (state) => {
        state.createNoticesPending = null;
        state.createNoticesError = true;
        state.createNoticesSuccessful = false;
      })
      .addCase(createNotices.fulfilled, (state, action) => {
        //state.notices = [action.payload.data.createNotice, ...state.notices];
        const copy = state.notices;
        const newNotice = action.payload.data.createNotice;
        const newNotices = copy.map((innerArray) => {
          // Check if the item ID already exists in the inner array
          const itemExists = innerArray.some(
            (item) => item.createdAt === newNotice.createdAt
          );

          // Append the new item only if the ID doesn't exist
          return itemExists ? innerArray : [...innerArray, newNotice];
        });
        state.notices = newNotices;
        state.createNoticesPending = false;
        state.createNoticesError = false;
        state.createNoticesSuccessful = true;
      });
  },
});

export const { setIsNewNoticeAdded } = noticeSlice.actions;

export const getIsNewNoticeAdded = (state) => state.notices.isNewNoticeAdded;

export default noticeSlice.reducer;
