import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import envs from "../../config/env";

export const addStudentsToClass = createAsyncThunk(
  "class/addStudentsToClass",
  async ({ classID, studentIDs }, { rejectWithValue }) => {
    const query = `mutation {
      addStudentsToClass(classId: "${classID}", studentIds: [${studentIDs}]) {
        _id
      }
    }
  `;
    // console.log(query);
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
          console.error("Error while adding student to class");
          throw new Error("Network error");
        } else if (response.status === 400) {
          console.error("Error while adding student to class, invalid input");
          throw new Error(
            "Invalid or wrong teacher Info while adding student to class for admin"
          );
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Catch: while adding student to class", error);
      return rejectWithValue(error);
    }
  }
);

export const removeStudentsFromClass = createAsyncThunk(
  "class/removeStudentsFromClass",
  async ({ classID, studentIDs }, { rejectWithValue }) => {
    const query = `mutation {
      removeStudentsFromClass(classId: "${classID}", studentIds: [${studentIDs}]) {
        _id
      }
    }
  `;
    // console.log(query);
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
          console.error("Error while removing student from class");
          //throw new Error("Network error");
        } else if (response.status === 400) {
          console.error("Error while removing student to class, invalid input");
          throw new Error(
            "Invalid or wrong student Info while removing student to class for admin"
          );
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Catch: while removing student from class", error);
      return rejectWithValue(error);
    }
  }
);

export const createClass = createAsyncThunk(
  "class/createClass",
  async ({ teacherID, className, details }, { rejectWithValue }) => {
    const query = `mutation {
        createClass(teacherId: ${teacherID} details: "${details}", className: "${className}") {
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
      return rejectWithValue(error);
    }
  }
);

export const fetchClasses = createAsyncThunk("class/fetchClasses", async () => {
  //const {query, adminID} = props;
  const query = `
    query {
      classes {
        _id
        className
        details
        students {
          _id
          firstName
          lastName
          studentNumber
        }
        teacher {
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
  addStudentsToClassPending: boolean;
  addStudentsToClassError: boolean;
  removeStudentsFromClassPending: boolean;
  removeStudentsFromClassError: boolean;
  teacherID: string;
  fetchClassesError: boolean;
  fetchClassesPending: boolean;
  fetchClassesSuccessful: boolean;
  isNewClassAdded: boolean;
}

const initialState: ClassState = {
  createClassPending: null,
  createClassError: false,
  createClassSuccessful: false,
  addStudentsToClassPending: null,
  addStudentsToClassError: false,
  removeStudentsFromClassPending: null,
  removeStudentsFromClassError: false,
  fetchClassesError: false,
  fetchClassesPending: null,
  fetchClassesSuccessful: false,
  logs: [],
  teacherID: "",
  isNewClassAdded: true,
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
      .addCase(addStudentsToClass.pending, (state) => {
        state.addStudentsToClassPending = true;
        state.addStudentsToClassError = false;
      })
      .addCase(addStudentsToClass.rejected, (state) => {
        state.addStudentsToClassPending = null;
        state.addStudentsToClassError = true;
      })
      .addCase(addStudentsToClass.fulfilled, (state, action) => {
        state.addStudentsToClassPending = false;
        state.addStudentsToClassError = false;
        state.createClassSuccessful = false;
      })
      .addCase(createClass.pending, (state) => {
        state.createClassPending = true;
        state.createClassError = false;
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
        state.createClassSuccessful = true;
      })
      .addCase(fetchClasses.pending, (state) => {
        state.fetchClassesPending = true;
        state.fetchClassesError = false;
        state.fetchClassesSuccessful = false;
        // state.updateLogsSuccessful = false;
      })
      .addCase(fetchClasses.rejected, (state) => {
        state.fetchClassesPending = null;
        state.fetchClassesError = true;
        state.fetchClassesSuccessful = false;
        // state.editogsSuccessful = false;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.fetchClassesPending = false;
        state.fetchClassesError = false;
        state.fetchClassesSuccessful = true;
        //state.fetchClassesSuccessful = true;
      })
      .addCase(removeStudentsFromClass.pending, (state) => {
        state.removeStudentsFromClassPending = true;
        state.removeStudentsFromClassError = false;
      })
      .addCase(removeStudentsFromClass.rejected, (state) => {
        state.removeStudentsFromClassPending = null;
        state.removeStudentsFromClassError = true;
      })
      .addCase(removeStudentsFromClass.fulfilled, (state, action) => {
        state.removeStudentsFromClassPending = false;
        state.removeStudentsFromClassError = false;
      });
  },
});

export const { setIsNewClassAdded } = classSlice.actions;

export const getisNewClassAdded = (state) => state.log.isNewClassAdded;

export default classSlice.reducer;
