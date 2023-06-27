import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../../config/env";

export const addStudentToClass = createAsyncThunk(
  "class/addStudentToClass",
  async ({ classID, studentID }) => {
    const query = `mutation {
      addStudentToClass(classId: "${classID}", studentId: ${studentID}) {
        _id
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
          // console.log(response);
          console.error(
            "Error while adding student to class",
            response.statusText
          );
          throw new Error("Network error");
        } else if (response.status === 400) {
          console.error(
            "Error while adding student to class, invalid input",
            response.statusText
          );
          throw new Error(
            "Invalid or wrong teacher Info while adding student to class for admin"
          );
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Catch: while adding student to class", error);
    }
  }
);

export const createClass = createAsyncThunk(
  "class/createClass",
  async ({ teacherID, className, details }) => {
    const query = `mutation {
        createClass(teacherId: ${teacherID} details: "${details}") {
        _id
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
          console.error("Error while creating class");
          throw new Error("Network error");
        } else if (response.status === 400) {
          console.error("Invalid details");
          throw new Error("Invalid or wrong details while creating class");
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Catch: Error while creating class by admin", error);
    }
  }
);

export const fetchClasses = createAsyncThunk("class/fetchClasses", async () => {
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
        console.error("Error while fetching classes for Admin");
        throw new Error("Network error");
      } else if (response.status === 400) {
        console.error("Invalid access code");
        throw new Error(
          "Error while fetching classes for Admin, invalid request"
        );
      }
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Catch: Error while fetching classes for Admin", error);
  }
});

export interface ClassState {
  logs: string[];
  createClassPending: boolean;
  createClassError: boolean;
  createClassSuccessful: boolean;
  addStudentToClassPending: boolean;
  addStudentToClassError: boolean;
  teacherID: string;
  fetchClassesError: boolean;
  fetchClassesPending: boolean;
  isNewClassAdded: boolean;
}

const initialState: ClassState = {
  createClassPending: null,
  createClassError: false,
  createClassSuccessful: false,
  addStudentToClassPending: null,
  addStudentToClassError: false,
  fetchClassesError: false,
  fetchClassesPending: null,
  logs: [],
  teacherID: "",
  isNewClassAdded: false,
};

export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    setIsNewClassAdded: (state, action) => {
      state.isNewClassAdded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStudentToClass.pending, (state) => {
        state.addStudentToClassPending = true;
        state.addStudentToClassError = false;
        state.isNewClassAdded = false;
      })
      .addCase(addStudentToClass.rejected, (state) => {
        state.addStudentToClassPending = null;
        state.addStudentToClassError = true;
        state.isNewClassAdded = false;
      })
      .addCase(addStudentToClass.fulfilled, (state, action) => {
        state.addStudentToClassPending = false;
        state.addStudentToClassError = false;
        state.isNewClassAdded = false;
        state.createClassSuccessful = false;
      })
      .addCase(createClass.pending, (state) => {
        state.createClassPending = true;
        state.createClassError = false;
        state.isNewClassAdded = false;
        state.createClassSuccessful = false;
      })
      .addCase(createClass.rejected, (state) => {
        state.createClassPending = null;
        state.createClassError = true;
        state.createClassSuccessful = false;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.createClassPending = false;
        state.createClassError = false;
        state.isNewClassAdded = false;
        state.createClassSuccessful = true;
      })
      .addCase(fetchClasses.pending, (state) => {
        state.fetchClassesPending = true;
        state.fetchClassesError = false;
        state.isNewClassAdded = false;
        // state.updateLogsSuccessful = false;
      })
      .addCase(fetchClasses.rejected, (state) => {
        state.fetchClassesPending = null;
        state.fetchClassesError = true;
        // state.editogsSuccessful = false;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.fetchClassesPending = false;
        state.fetchClassesError = false;
        state.isNewClassAdded = false;
        //state.fetchClassesSuccessful = true;
      });
  },
});

export const { setIsNewClassAdded } = classSlice.actions;

export const getisNewClassAdded = (state) => state.log.isNewClassAdded;

export default classSlice.reducer;
