import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async (teacherID) => {
    const query = `
    query {
      noticesByTeacher(teacherId: "${teacherID}") {
        _id
        details
        createdAt
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
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createNotices = createAsyncThunk(
  "notices/createNotices",
  async ({ teacherID, studentIDs, details }) => {
    try {
      const stringifiedDetails = JSON.stringify(details)
        .replace(/\\/g, "\\\\") // Escape backslashes
        .replace(/"/g, '\\"'); // Escape double quotes
      const query = `mutation {
    createNotice(teacherId: "${teacherID}" studentIds: [${studentIDs}] details: "${stringifiedDetails}") {
        _id
        details
        createdAt
    }
}`;
      const response = await fetch("http://localhost:3000/graphql", {
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
  fetchNoticesPending: boolean;
  fetchNoticesError: boolean;
  isNewNoticeAdded: boolean;
}

const initialState: NoticeState = {
  createNoticesPending: null,
  createNoticesError: false,
  fetchNoticesPending: null,
  fetchNoticesError: false,
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
      })
      .addCase(fetchNotices.rejected, (state) => {
        state.fetchNoticesPending = null;
        state.fetchNoticesError = true;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.notices = action.payload.data.noticesByTeacher;
        state.fetchNoticesPending = false;
        state.fetchNoticesError = false;
      })
      .addCase(createNotices.pending, (state) => {
        state.createNoticesPending = true;
        state.createNoticesError = false;
      })
      .addCase(createNotices.rejected, (state) => {
        state.createNoticesPending = null;
        state.createNoticesError = true;
      })
      .addCase(createNotices.fulfilled, (state, action) => {
        state.notices = [action.payload.data.createNotice, ...state.notices];
        state.createNoticesPending = false;
        state.createNoticesError = false;
      });
  },
});

export const { setIsNewNoticeAdded } = noticeSlice.actions;

export const getIsNewNoticeAdded = (state) => state.notices.isNewNoticeAdded;

export default noticeSlice.reducer;
