import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async (studentID, { rejectWithValue }) => {
    //console.log(studentID);
    const query = `
            query {
                noticesForStudent(studentId:"${studentID}") {
                _id
                details
                createdAt
                updatedAt
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

export interface NoticesState {
  notices: string[];
  loading: boolean;
  error: boolean;
  isNewNoticeAdded: boolean;
}

const initialState: NoticesState = {
  loading: null,
  error: false,
  notices: [],
  isNewNoticeAdded: false,
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
      });
  },
});

export const { setIsNewNoticeAdded } = noticesSlice.actions;

export const selectNoticeByID = (state, noticeID) =>
  state.notices.notices[noticeID];

export default noticesSlice.reducer;
