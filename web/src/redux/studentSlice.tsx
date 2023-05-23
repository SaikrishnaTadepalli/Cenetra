import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const loginUser = createAsyncThunk("auth/login", async (teacherID) => {
//   //const {query, teacherID} = props;
//   const query = `
//   query {
//     classes {
//         teacher {
//           _id
//             firstName
//         }
//         students {
//             _id
//             firstName
//             lastName
//         }
//     }
// }
// `;
//   const response = await fetch("http://localhost:3000/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ query }),
//   });
//   const data = await response.json();
//   return data;
// });

export interface StudentState {
  students: string[];
}

const initialState: StudentState = {
  students: [],
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    updateStudents: (state, action) => {
      state.students = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = "";
    },
    permanentlyDeleteUser: (state) => {
      state.isLoggedIn = false;
      state.userId = "";
    },
  },
});

export const { updateStudents, logout, permanentlyDeleteUser } =
  studentSlice.actions;

export const fetchStudents = (state) => state.student.students;

export default studentSlice.reducer;
