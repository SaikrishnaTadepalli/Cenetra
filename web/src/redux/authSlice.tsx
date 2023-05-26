import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk("auth/login", async (teacherID) => {
  //const {query, teacherID} = props;
  const query = `
  query {
    classes {
        teacher {
          _id
            firstName
        }
        students {
            _id
            firstName
            lastName
        }
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
      console.log(response);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
});

export interface AuthState {
  isLoggedIn: boolean;
  teacherID: string;
  students: string[];
  pending: boolean;
  error: boolean;
}

const initialState: AuthState = {
  isLoggedIn: true,
  teacherID: "",
  pending: null,
  error: false,
  students: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.teacherID = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.teacherID = "";
    },
    permanentlyDeleteUser: (state) => {
      state.isLoggedIn = false;
      state.teacherID = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.pending = true;
        state.error = false;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.pending = null;
        state.error = true;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.teacherID = action.meta.arg;
        state.pending = false;
        state.error = false;
        action.payload.data.classes.forEach((element) => {
          if (element.teacher._id === action.meta.arg) {
            state.students = element.students;
            return;
          }
        });
      });
  },
});

export const { login, logout, permanentlyDeleteUser } = authSlice.actions;

export const fetchStudents = (state) => state.students;

export default authSlice.reducer;
