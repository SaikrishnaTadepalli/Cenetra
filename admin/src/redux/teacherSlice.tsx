import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../../config/env";

export const createTeacher = createAsyncThunk(
  "teacher/createTeacher",
  async (teacherInput, { rejectWithValue }) => {
    const query = `
    mutation CreateTeacher($teacherInput: TeacherInput!) {
      createTeacher(teacherInput: $teacherInput) {
        _id
        teacherNumber
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
          throw new Error("Teacher already exists");
        } else if (response.status === 400) {
          console.error(
            "Invalid teacher details while creating teacher for admin",
            response.statusText
          );
          throw new Error("Teacher already exists");
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Catch: while creating teacher", error);
      return rejectWithValue(error);
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
        teacherNumber
        email
        phoneNumber
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

export const changeTeacher = createAsyncThunk(
  "teacher/changeTeacher",
  async ({ teacherID, classID }, { rejectWithValue }) => {
    //const {query, adminID} = props;
    const query = `
    mutation {
      changeClassTeacher(teacherId: "${teacherID}", classId: "${classID}") {
        _id
      }
    }
  `;
    console.log(query);
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
          console.error("Error while changing teachers for Admin");
          throw new Error("Network error");
        } else if (response.status === 400) {
          console.error("Wrong details");
          throw new Error(
            "Error while changing teachers for Admin, invalid request"
          );
        }
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Catch: Error while changing teachers for Admin", error);
      rejectWithValue(error);
    }
  }
);

export interface TeacherState {
  logs: string[];
  createTeacherPending: boolean;
  createTeacherError: boolean;
  changeTeacherPending: boolean;
  changeTeacherError: boolean;
  teacherID: string;
  fetchTeachersError: boolean;
  fetchTeachersPending: boolean;
  isNewTeacherAdded: boolean;
}

const initialState: TeacherState = {
  createTeacherPending: null,
  createTeacherError: false,
  changeTeacherPending: null,
  changeTeacherError: false,
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
      })
      .addCase(createTeacher.rejected, (state) => {
        state.createTeacherPending = null;
        state.createTeacherError = true;
      })
      .addCase(createTeacher.fulfilled, (state) => {
        state.createTeacherPending = false;
        state.createTeacherError = false;
      })
      .addCase(fetchTeachers.pending, (state) => {
        state.fetchTeachersPending = true;
        state.fetchTeachersError = false;
        // state.updateLogsSuccessful = false;
      })
      .addCase(fetchTeachers.rejected, (state) => {
        state.fetchTeachersPending = null;
        state.fetchTeachersError = true;
        // state.editogsSuccessful = false;
      })
      .addCase(fetchTeachers.fulfilled, (state) => {
        state.fetchTeachersPending = false;
        state.fetchTeachersError = false;
        //state.fetchTeachersSuccessful = true;
      })
      .addCase(changeTeacher.pending, (state) => {
        state.changeTeacherPending = true;
        state.changeTeacherError = false;
        // state.updateLogsSuccessful = false;
      })
      .addCase(changeTeacher.rejected, (state) => {
        state.changeTeacherPending = null;
        state.changeTeacherError = true;
        // state.editogsSuccessful = false;
      })
      .addCase(changeTeacher.fulfilled, (state) => {
        state.changeTeacherPending = false;
        state.changeTeacherError = false;
        //state.fetchTeachersSuccessful = true;
      });
  },
});

export const { setIsNewTeacherAdded } = teacherSlice.actions;

export const getisNewTeacherAdded = (state) => state.log.isNewTeacherAdded;

export default teacherSlice.reducer;
