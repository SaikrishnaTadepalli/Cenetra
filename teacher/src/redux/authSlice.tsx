import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../../config/env";

export const getTeacherID = createAsyncThunk(
  "auth/getTeacherID",
  async (teacherNum, { rejectWithValue }) => {
    const query = `query{
    teacherByTeacherNumber(teacherNumber: "${teacherNum}") {
        _id
        firstName
        lastName
        teacherNumber
        phoneNumber
    }
  }`;
    console.log(query, envs);
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
          console.error("Error while getting teacher ID");
          throw new Error("Invalid Access code");
        } else if (response.status === 400) {
          console.log("Invalid teacher number");
          throw new Error("Invalid or wrong teacher number");
        }
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Catch: error getting teacher info", error);
      return rejectWithValue(error.message);
    }
  }
);

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
    const response = await fetch(envs, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    if (response.status !== 200) {
      if (response.status === 500) {
        console.error("Error while logging in teacher");
        throw new Error("Network error");
      } else if (response.status === 400) {
        console.log("Invalid access code");
        throw new Error("Invalid or wrong access code for teacher");
      }
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Catch: Error while logging in teacher", error);
  }
});

export const sendSMS = createAsyncThunk(
  "auth/sendSMS",
  async (teacherID, { rejectWithValue }) => {
    const query = `mutation {
      sendSMSCodeTeacher(teacherId: "${teacherID}")  {
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
          console.error("error while sending SMS code to teacher");
          throw new Error("Invalid teacher ID");
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Catch: error while sending SMS code to teacher", error);
      return rejectWithValue(error.message);
    }
  }
);

export const verifyLogin = createAsyncThunk(
  "auth/verify",
  async ({ teacherID, code }, { rejectWithValue }) => {
    // console.log(teacherID, code);
    const query = `query {
      verifyCode(userId: "${teacherID}" code: "${code}")
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
      // console.log("verifyCode", response);
      if (response.status !== 200) {
        if (response.status === 500) {
          console.error("Error while verifying code for teacher");
          throw new Error("Network error");
        } else if (response.status === 400) {
          console.log("Invalid code");
          throw new Error("Invalid or wrong verification code for teacher");
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Catch: Invalid verification code on web", error);
      return rejectWithValue(error.message);
    }
  }
);

export interface AuthState {
  isLoggedIn: boolean;
  teacherInfo: string;
  students: string[];
  loginLoading: boolean;
  loginError: boolean;
  SMSLoading: boolean;
  SMSError: boolean;
  verificationLoading: boolean;
  verificationError: boolean;
  teacherInfoLoading: boolean;
  teacherInfoError: boolean;
}

const initialState: AuthState = {
  isLoggedIn: true,
  teacherInfo: "",
  loginLoading: null,
  loginError: false,
  students: [],
  SMSLoading: false,
  SMSError: false,
  verificationLoading: false,
  verificationError: false,
  teacherInfoLoading: false,
  teacherInfoError: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.teacherInfo = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.teacherInfo = "";
      localStorage.setItem("isLoggedIn", "false");
    },
    permanentlyDeleteUser: (state) => {
      state.isLoggedIn = false;
      state.teacherInfo = "";
    },
    setStudents: (state, action) => {
      state.students = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeacherID.pending, (state) => {
        state.teacherInfoLoading = true;
        state.teacherInfoError = false;
      })
      .addCase(getTeacherID.rejected, (state) => {
        state.teacherInfoLoading = null;
        state.teacherInfoError = true;
      })
      .addCase(getTeacherID.fulfilled, (state, action) => {
        state.teacherInfoLoading = false;
        state.teacherInfoError = false;
        state.teacherInfo = action.payload.data.teacherByTeacherNumber;
      })
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
        state.loginLoading = false;
        state.loginError = false;
        state.isLoggedIn = true;
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
