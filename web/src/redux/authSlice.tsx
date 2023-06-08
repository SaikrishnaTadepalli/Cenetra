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

export const sendSMS = createAsyncThunk(
  "auth/sendSMS",
  async (studentID, { rejectWithValue }) => {
    const query = `mutation {
      sendSMSCode(studentId: "${studentID}")  {
          code
      }
  }`;
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
          console.error("error while sending SMS code");
          throw new Error("Invalid student ID");
        }
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("loginError in sending smsCODE in mobile", error);
      return rejectWithValue(error.message);
    }
  }
);

export const verifyLogin = createAsyncThunk(
  "auth/verify",
  async ({ studentID, code }, { rejectWithValue }) => {
    //console.log(studentID, code);
    const query = `query {
      verifyCode(studentId: "${studentID}" code: "${code}")
  }`;
    try {
      const response = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      //console.log("verifyCode", response);
      if (response.status !== 200) {
        if (response.status === 500) {
          console.error("Error while verifying code");
          throw new Error("Network error");
        } else if (response.status === 400) {
          console.log("Invalid code");
          throw new Error("Invalid or wrong verification code");
        }
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.log("Invalid verification code on mobile", error);
      return rejectWithValue(error.message);
    }
  }
);

export interface AuthState {
  isLoggedIn: boolean;
  teacherID: string;
  students: string[];
  loginLoading: boolean;
  loginError: boolean;
  SMSLoading: boolean;
  SMSError: boolean;
  verificationLoading: boolean;
  verificationError: boolean;
}

const initialState: AuthState = {
  isLoggedIn: true,
  teacherID: "",
  loginLoading: null,
  loginError: false,
  students: [],
  SMSLoading: false,
  SMSError: false,
  verificationLoading: false,
  verificationError: false,
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
      localStorage.setItem("isLoggedIn", "false");
    },
    permanentlyDeleteUser: (state) => {
      state.isLoggedIn = false;
      state.teacherID = "";
    },
    setStudents: (state, action) => {
      state.students = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = false;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginLoading = null;
        state.loginError = true;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.teacherID = action.meta.arg;
        state.loginLoading = false;
        state.loginError = false;
      })
      .addCase(sendSMS.pending, (state) => {
        state.SMSLoading = true;
        state.SMSError = false;
        state.isLoggedIn = false;
      })
      .addCase(sendSMS.rejected, (state) => {
        state.SMSLoading = null;
        state.SMSError = true;
        state.isLoggedIn = false;
      })
      .addCase(sendSMS.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.SMSLoading = false;
        state.SMSError = false;
      })
      .addCase(verifyLogin.pending, (state) => {
        state.verificationLoading = true;
        state.verificationError = false;
        state.isLoggedIn = false;
      })
      .addCase(verifyLogin.rejected, (state) => {
        state.verificationLoading = null;
        state.verificationError = true;
        state.isLoggedIn = false;
      })
      .addCase(verifyLogin.fulfilled, (state) => {
        state.verificationLoading = false;
        state.verificationError = false;
      });
  },
});

export const { login, logout, permanentlyDeleteUser, setStudents } =
  authSlice.actions;

export const fetchStudents = (state) => state.auth.students;

export default authSlice.reducer;
