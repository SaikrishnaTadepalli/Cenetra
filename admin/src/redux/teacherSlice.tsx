import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../../config/env";

export const createTeacher = createAsyncThunk(
  "teacher/createTeacher",
  async (teacherInput, { rejectWithValue }) => {
    const query = `
    mutation CreateTeacher($teacherInput: TeacherInput!) {
      createTeacher(teacherInput: $teacherInput) {
        _id
      }
    }
  `;
    //console.log(query, teacherInput);
    const variables = {
      teacherInput: teacherInput,
    };
    try {
      const response = await fetch(envs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: variables,
        }),
      });

      if (response.status !== 200) {
        if (response.status === 500) {
          //console.log(response);
          console.error("Error while creating teacher", response.statusText);
          throw new Error("Network error");
        } else if (response.status === 400) {
          console.error(
            "Invalid teacher details while creating teacher for admin",
            response.statusText
          );
          throw new Error(
            "Invalid or wrong teacher Info while creating teacher for admin"
          );
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Catch: while creating teacher", error);
      rejectWithValue(error);
    }
  }
);

export const fetchTeachers = createAsyncThunk(
  "teacher/fetchTeachers",
  async () => {
    //const {query, adminID} = props;
    const query = `
    query {
      teachers {
        _id
          firstName
          lastName
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
          console.error("Error while fetching teachers for Admin");
          throw new Error("Network error");
        } else if (response.status === 400) {
          console.error("Invalid access code");
          throw new Error(
            "Error while fetching teachers for Admin, invalid request"
          );
        }
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Catch: Error while fetching teachers for Admin", error);
    }
  }
);

export interface TeacherState {
  logs: string[];
  createTeacherPending: boolean;
  createTeacherError: boolean;
  teacherID: string;
  fetchTeachersError: boolean;
  fetchTeachersPending: boolean;
  isNewTeacherAdded: boolean;
}

const initialState: TeacherState = {
  createTeacherPending: null,
  createTeacherError: false,
  fetchTeachersError: false,
  fetchTeachersPending: null,
  logs: [],
  teacherID: "",
  isNewTeacherAdded: false,
};

export const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setIsNewTeacherAdded: (state, action) => {
      state.isNewTeacherAdded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTeacher.pending, (state) => {
        state.createTeacherPending = true;
        state.createTeacherError = false;
        state.isNewTeacherAdded = false;
      })
      .addCase(createTeacher.rejected, (state) => {
        state.createTeacherPending = null;
        state.createTeacherError = true;
        state.isNewTeacherAdded = false;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.createTeacherPending = false;
        state.createTeacherError = false;
        state.teacherID = action.payload.data.createTeacher._id;
      })
      .addCase(fetchTeachers.pending, (state) => {
        state.fetchTeachersPending = true;
        state.fetchTeachersError = false;
        state.isNewTeacherAdded = false;
        // state.updateLogsSuccessful = false;
      })
      .addCase(fetchTeachers.rejected, (state) => {
        state.fetchTeachersPending = null;
        state.fetchTeachersError = true;
        // state.editogsSuccessful = false;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.logs = [action.payload.data.editLog, ...state.logs];
        state.fetchTeachersPending = false;
        state.fetchTeachersError = false;
        state.isNewTeacherAdded = false;
        //state.fetchTeachersSuccessful = true;
      });
  },
});

export const { setIsNewTeacherAdded } = teacherSlice.actions;

export const getisNewTeacherAdded = (state) => state.log.isNewTeacherAdded;

export default teacherSlice.reducer;
