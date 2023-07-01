import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../../config/env";

export const createStudent = createAsyncThunk(
  "student/createStudent",
  async (studentInput, { rejectWithValue }) => {
    const query = `
    mutation CreateStudent($studentInput: StudentInput!) {
      createStudent(studentInput: $studentInput) {
        _id
        studentNumber
      }
    }
  `;
    console.log(query, studentInput);
    try {
      const response = await fetch(envs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: {
            studentInput,
          },
        }),
      });

      if (response.status !== 200) {
        if (response.status === 500) {
          //console.log(response);
          console.error("Error while creating Student", response.statusText);
          throw new Error("Network error");
        } else if (response.status === 400) {
          console.error(
            "Invalid Student details while creating Student for admin",
            response.statusText
          );
          throw new Error(
            "Invalid or wrong Student Info while creating Student for admin"
          );
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Catch: while creating Student", error);
      rejectWithValue(error);
    }
  }
);

export const fetchStudents = createAsyncThunk(
  "student/fetchStudents",
  async () => {
    //const {query, adminID} = props;
    const query = `
    query {
      students {
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
          console.error("Error while fetching students for Admin");
          throw new Error("Network error");
        } else if (response.status === 400) {
          console.error("Error while fetching students for Admin");
          throw new Error(
            "Error while fetching students for Admin, invalid request"
          );
        }
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Catch: Error while fetching students for Admin", error);
    }
  }
);

export interface StudentState {
  logs: string[];
  createStudentPending: boolean;
  createStudentError: boolean;
  studentID: string;
  studentNumber: string;
  fetchStudentsError: boolean;
  fetchStudentsPending: boolean;
  isNewStudentAdded: boolean;
}

const initialState: StudentState = {
  createStudentPending: null,
  createStudentError: false,
  fetchStudentsError: false,
  fetchStudentsPending: null,
  logs: [],
  studentID: "",
  studentNumber: "",
  isNewStudentAdded: false,
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setIsNewStudentAdded: (state, action) => {
      state.isNewStudentAdded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStudent.pending, (state) => {
        state.createStudentPending = true;
        state.createStudentError = false;
      })
      .addCase(createStudent.rejected, (state) => {
        state.createStudentPending = null;
        state.createStudentError = true;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.createStudentPending = false;
        state.createStudentError = false;
        state.studentID = action.payload.data.createStudent._id;
        state.studentNumber = action.payload.data.createStudent.studentNumber;
      })
      .addCase(fetchStudents.pending, (state) => {
        state.fetchStudentsPending = true;
        state.fetchStudentsError = false;
        // state.updateLogsSuccessful = false;
      })
      .addCase(fetchStudents.rejected, (state) => {
        state.fetchStudentsPending = null;
        state.fetchStudentsError = true;
        // state.editogsSuccessful = false;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.fetchStudentsPending = false;
        state.fetchStudentsError = false;
        //state.fetchStudentsSuccessful = true;
      });
  },
});

export const { setIsNewStudentAdded } = studentSlice.actions;

export const getisNewStudentAdded = (state) => state.log.isNewStudentAdded;

export default studentSlice.reducer;
