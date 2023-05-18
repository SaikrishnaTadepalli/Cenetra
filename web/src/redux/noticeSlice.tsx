import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async (studentID) => {
    const query = `
            query {
                notices(studentId:"${studentID}") {
                _id
                details
                createdAt
                updatedAt
                }
            }
            `;
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const createNotices = createAsyncThunk(
  "notices/createNotices",
  async ({ teacherID, studentID, details }) => {
    try {
      const query = `mutation {
    createNotice(teacherId: "${teacherID}" studentIds: "${studentID}" details: "${details}") {
        _id
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
      const data = await response.json();
      console.log(data);
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
  //   isNewLogAdded: boolean;
}

const initialState: NoticeState = {
  createNoticesPending: null,
  createNoticesError: false,
  fetchNoticesPending: null,
  fetchNoticesError: false,
  notices: [],
  //   isNewLogAdded: false,
};

export const noticeSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    setIsNewLogAdded: (state) => {
      //state.isNewLogAdded = true;
    },
  },
  extraReducers: {
    [fetchNotices.pending]: (state) => {
      state.fetchNoticesPending = true;
      state.fetchNoticesError = false;
      // state.isNewLogAdded = false;
    },
    [fetchNotices.rejected]: (state) => {
      state.fetchNoticesPending = null;
      state.fetchNoticesError = true;
      //state.isNewLogAdded = false;
    },
    [fetchNotices.fulfilled]: (state, action) => {
      state.notices = action.payload.data.notices;
      state.fetchNoticesPending = false;
      state.fetchNoticesError = false;
      //state.isNewLogAdded = false;
    },
    [createNotices.pending]: (state) => {
      state.createNoticesPending = true;
      state.createNoticesError = false;
      // state.isNewLogAdded = false;
    },
    [createNotices.rejected]: (state) => {
      console.log(state.createNotices.pending);
      state.createNoticesPending = null;
      state.createNoticesError = true;
    },
    [createNotices.fulfilled]: (state, action) => {
      console.log("entered");
      state.notices = [action.payload.data.createNotice, ...state.notices];
      state.createNoticesPending = false;
      state.createNoticesError = false;
    },
  },
});

export const { setIsNewLogAdded } = noticeSlice.actions;

export const getIsNewLogAdded = (state) => state.log.isNewLogAdded;

export default noticeSlice.reducer;
