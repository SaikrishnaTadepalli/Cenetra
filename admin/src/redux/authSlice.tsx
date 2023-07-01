import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../../config/env";

export const getAdminID = createAsyncThunk(
  "auth/getAdminID",
  async (adminNum, { rejectWithValue }) => {
    const query = `query{
    adminByAdminNumber(adminNumber: "${adminNum}") {
        _id
        firstName
        lastName
        adminNumber
        phoneNumber
    }
  }`;
    //console.log(query, envs === "test");
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
          console.error("Error while getting Admin ID");
          throw new Error("Invalid code");
        } else if (response.status === 400) {
          console.error("Invalid Admin number");
          throw new Error("Invalid or wrong Admin number");
        }
      }
      const data = await response.json();
      //console.log(envs);
      return data;
    } catch (error) {
      console.error("Catch: error getting Admin info", error);
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        return rejectWithValue("Network error");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk("auth/login", async (adminID) => {
  //const {query, adminID} = props;
  const query = `
  query {
    classes {
      _id
      details
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
        console.error("Error while logging in Admin");
        throw new Error("Network error");
      } else if (response.status === 400) {
        console.error("Invalid access code");
        throw new Error("Invalid or wrong access code for Admin");
      }
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Catch: Error while logging in Admin", error);
  }
});

export const sendSMS = createAsyncThunk(
  "auth/sendSMS",
  async (adminID, { rejectWithValue }) => {
    const query = `mutation {
      sendSMSCodeAdmin(adminId: "${adminID}")  {
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
      //console.log(query, envs);
      if (response.status !== 200) {
        if (response.status === 500) {
          console.error("error while sending SMS code to Admin");
          throw new Error("Network error");
        } else if (response.status === 400) {
          console.error("error while sending SMS code to Admin");
          throw new Error("Invalid Admin ID");
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Catch: error while sending SMS code to Admin", error);
      return rejectWithValue(error.message);
    }
  }
);

export const verifyLogin = createAsyncThunk(
  "auth/verify",
  async ({ adminID, code }, { rejectWithValue }) => {
    // console.log(adminID, code);
    const query = `query {
      verifyCode(userId: "${adminID}" code: "${code}")
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
      // console.log("verifyCode", response);
      if (response.status !== 200) {
        if (response.status === 500) {
          console.error("Error while verifying code for Admin");
          throw new Error("Network error");
        } else if (response.status === 400) {
          console.error("Invalid code");
          throw new Error("Invalid or wrong verification code for Admin");
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Catch: Invalid verification code on web", error);
      return rejectWithValue(error.message);
    }
  }
);

export interface AuthState {
  isLoggedIn: boolean;
  adminInfo: string;
  students: string[];
  loginLoading: boolean;
  loginError: boolean;
  SMSLoading: boolean;
  SMSError: boolean;
  verificationLoading: boolean;
  verificationError: boolean;
  adminInfoLoading: boolean;
  adminInfoError: boolean;
  classes: string[];
}

const initialState: AuthState = {
  isLoggedIn: true,
  adminInfo: "",
  loginLoading: null,
  loginError: false,
  students: [],
  SMSLoading: false,
  SMSError: false,
  verificationLoading: false,
  verificationError: false,
  adminInfoLoading: false,
  adminInfoError: false,
  classes: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.adminInfo = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.adminInfo = "";
      localStorage.setItem("isLoggedIn", "false");
    },
    permanentlyDeleteUser: (state) => {
      state.isLoggedIn = false;
      state.adminInfo = "";
    },
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminID.pending, (state) => {
        state.adminInfoLoading = true;
        state.adminInfoError = false;
      })
      .addCase(getAdminID.rejected, (state) => {
        state.adminInfoLoading = null;
        state.adminInfoError = true;
      })
      .addCase(getAdminID.fulfilled, (state, action) => {
        state.adminInfoLoading = false;
        state.adminInfoError = false;
        state.adminInfo = action.payload.data.adminByAdminNumber;
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

export const { login, logout, permanentlyDeleteUser, setClasses } =
  authSlice.actions;

export const fetchStudents = (state) => state.auth.students;

export default authSlice.reducer;
