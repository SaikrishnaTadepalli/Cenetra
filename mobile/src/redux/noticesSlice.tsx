import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../../config";

export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async (studentID, { rejectWithValue }) => {
    console.log(envs, process.env);
    const query = `
            query {
                noticesForStudent(studentId:"${studentID}") {
                _id
                details
                createdAt
                updatedAt
                noticeType
                read
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
          console.error("Response status 400 while fetching notices");
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

export const markNoticeAsRead = createAsyncThunk(
  "notices/markNoticeAsRead",
  async ({ studentID, noticeID }, { rejectWithValue }) => {
    const query = `
            mutation {
                markNoticeAsRead(studentId:"${studentID}", noticeId:"${noticeID}") {
                _id
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
            "Response status 500: Error while marking notices as read"
          );
        } else if (response.status === 400) {
          console.error("Response status 400 while marking notices as read");
          throw new Error("Response status 400 while  marking notices as read");
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error while  marking notices as read", error);
      return rejectWithValue(error.message);
    }
  }
);

export interface NoticesState {
  notices: string[];
  loading: boolean;
  error: boolean;
  markAsReadLoading: boolean;
  markAsReadError: boolean;
  markAsReadSuccessful: boolean;
  isNewNoticeAdded: boolean;
}

const initialState: NoticesState = {
  loading: null,
  error: false,
  markAsReadLoading: null,
  markAsReadError: false,
  notices: [],
  isNewNoticeAdded: false,
  markAsReadSuccessful: false,
};

export const noticesSlice = createSlice({
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
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchNotices.rejected, (state) => {
        state.loading = null;
        state.error = true;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.notices = action.payload.data.notices;
        state.loading = false;
        state.error = false;
      })
      .addCase(markNoticeAsRead.pending, (state) => {
        state.markAsReadLoading = true;
        state.markAsReadError = false;
        state.markAsReadSuccessful = false;
      })
      .addCase(markNoticeAsRead.rejected, (state) => {
        state.markAsReadLoading = null;
        state.markAsReadError = true;
        state.markAsReadSuccessful = false;
      })
      .addCase(markNoticeAsRead.fulfilled, (state) => {
        state.markAsReadLoading = false;
        state.markAsReadError = false;
        state.markAsReadSuccessful = true;
      });
  },
});

export const { setIsNewNoticeAdded } = noticesSlice.actions;

export const selectNoticeByID = (state, noticeID) =>
  state.notices.notices[noticeID];

export const setNoticeAsRead = (state, action) => {
  state.markAsReadLoading = false;
};

export default noticesSlice.reducer;
