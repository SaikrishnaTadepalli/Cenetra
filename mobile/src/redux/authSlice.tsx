import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../config/env";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (studentNum, { rejectWithValue }) => {
    //console.log("!!!!!", envs);
    const query = `query{
    studentByStudentNumber(studentNumber: "${studentNum}") {
        _id
        firstName
        lastName
        studentNumber
        primaryContactNumber
    }
  }`;
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
          console.error("loginError while fetching student login details");
          throw new Error("Invalid Login ID");
        }
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("loginError in loginUser in mobile", error);
      return rejectWithValue(error.message);
    }
  }
);

export const sendSMS = createAsyncThunk(
  "auth/sendSMS",
  async (studentID, { rejectWithValue }) => {
    //console.log(studentID);
    const query = `mutation {
        sendSMSCodeStudent(studentId: "${studentID}")  {
            code
        }
    }`;
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
      verifyCode(userId: "${studentID}" code: "${code}") 
  }`;
    try {
      const response = await fetch(envs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      //console.log("verifyCode", envs, query);
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
  curStudentDetails: string;
  loginLoading: boolean;
  loginError: boolean;
  SMSLoading: boolean;
  SMSError: boolean;
  verificationLoading: boolean;
  verificationError: boolean;
}

const initialState: AuthState = {
  isLoggedIn: true,
  curStudentDetails: "",
  loginLoading: false,
  loginError: false,
  SMSLoading: false,
  SMSError: false,
  verificationLoading: false,
  verificationError: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.curStudentDetails = "";
    },
    permanentlyDeleteUser: (state) => {
      state.isLoggedIn = false;
      state.curStudentDetails = "";
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
        state.isLoggedIn = false;
        state.curStudentDetails = action.payload.data.studentByStudentNumber;
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

export const { login, logout, permanentlyDeleteUser } = authSlice.actions;

export const fetchStudent = (state) =>
  console.log("authslice", state, state.auth.curStudentDetails);

export const fetchStudentID = (state) =>
  console.log("authslice", state.auth.curStudentDetails);

export default authSlice.reducer;
