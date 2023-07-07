import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../../config/env";

export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async (adminID, { rejectWithValue }) => {
    const query = `
    {
      noticesForAdmin(adminId: "${adminID}") {
        teacher {
          _id
          firstName
          lastName
        }
        data {
          _id
          details
          createdAt
          noticeType
          students {
            _id
            firstName
            lastName
          }
        }
      }
    }
      `;
    //console.log(query);
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

export const createNotices = createAsyncThunk(
  "notices/createNotices",
  async ({ adminID, studentIDs, details, noticeType }) => {
    //console.log(studentIDs);
    try {
      const stringifiedDetails = JSON.stringify(details)
        .replace(/\\/g, "\\\\") // Escape backslashes
        .replace(/"/g, '\\"'); // Escape double quotes

      const query = `mutation {
    createNotice(adminId: "${adminID}" studentIds: [${studentIDs}] details: "${stringifiedDetails}", noticeType: "${noticeType}") {
        _id
        noticeType
        details
        createdAt
    }
}`;
      // console.log(query);
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
      console.error("error");
      throw new Error("An error occurred while fetching data.");
    }
  }
);

export const editNotices = createAsyncThunk(
  "notices/editNotices",
  async ({ noticeID, studentIDs, details, noticeType, adminName }) => {
    // console.log(details);

    const stringifiedDetails = JSON.stringify(details)
      .replace(/\\/g, "\\\\") // Escape backslashes
      .replace(/"/g, '\\"'); // Escape double quotes

    const query = `mutation {
    editNotice(noticeId: "${noticeID}", studentIds: [${studentIDs}], 
                details: "${stringifiedDetails}", noticeType: "${noticeType}", editorName: "${adminName}") {
        _id
        details
        createdAt
        noticeType
        students {
          _id
          firstName
          lastName
        }
    }
  }`;
    // console.log(query);
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
          console.error("Error while editing notices");
          throw new Error("Network error");
        } else if (response.status === 400) {
          console.error("Invalid details");
          throw new Error(
            "Invalid or wrong details for admin while editing notices"
          );
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Catch: Error while editing notices by admin", error);
    }
  }
);

export interface NoticeState {
  notices: object[];
  createNoticesPending: boolean;
  createNoticesError: boolean;
  createNoticesSuccessful: boolean;
  fetchNoticesPending: boolean;
  fetchNoticesError: boolean;
  isNewNoticeAdded: boolean;
  editNoticesError: boolean;
  editNoticesPending: boolean;
  editNoticesSuccessful: boolean;
}

const initialState: NoticeState = {
  createNoticesPending: null,
  createNoticesError: false,
  fetchNoticesPending: null,
  fetchNoticesError: false,
  createNoticesSuccessful: false,
  notices: [],
  isNewNoticeAdded: false,
  editNoticesError: false,
  editNoticesPending: null,
  editNoticesSuccessful: false,
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
        state.editNoticesSuccessful = false;
      })
      .addCase(fetchNotices.rejected, (state) => {
        state.fetchNoticesPending = null;
        state.fetchNoticesError = true;
        state.createNoticesSuccessful = false;
        state.editNoticesSuccessful = false;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.notices = action.payload.data.noticesForAdmin;
        state.fetchNoticesPending = false;
        state.fetchNoticesError = false;
        state.createNoticesSuccessful = false;
        state.editNoticesSuccessful = false;
      })
      .addCase(createNotices.pending, (state) => {
        state.createNoticesPending = true;
        state.createNoticesError = false;
        state.createNoticesSuccessful = false;
        state.editNoticesSuccessful = false;
      })
      .addCase(createNotices.rejected, (state) => {
        state.createNoticesPending = null;
        state.createNoticesError = true;
        state.createNoticesSuccessful = false;
        state.editNoticesSuccessful = false;
      })
      .addCase(createNotices.fulfilled, (state, action) => {
        state.editNoticesSuccessful = false;
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
      })
      .addCase(editNotices.pending, (state) => {
        state.editNoticesPending = true;
        state.editNoticesError = false;
        state.editNoticesSuccessful = false;
      })
      .addCase(editNotices.rejected, (state) => {
        state.editNoticesPending = null;
        state.editNoticesError = true;
        state.editNoticesSuccessful = false;
      })
      .addCase(editNotices.fulfilled, (state, action) => {
        //state.notices = [action.payload.data.editNotice, ...state.notices];
        state.editNoticesPending = false;
        state.editNoticesError = false;
        state.editNoticesSuccessful = true;
      });
  },
});

export const { setIsNewNoticeAdded } = noticeSlice.actions;

export const getIsNewNoticeAdded = (state) => state.isNewNoticeAdded;

export const getNoticeByID = (state, noticeID) =>
  state.notices.data.find((notice) => notice._id === noticeID);

export default noticeSlice.reducer;
