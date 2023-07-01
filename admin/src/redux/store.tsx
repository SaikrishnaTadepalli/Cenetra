import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import logReducer from "./logsSlice";
import noticeReducer from "./noticeSlice";
import classReducer from "./classSlice";
// import userReducer from "./userSlice";'
import { persistReducer, persistStore } from "redux-persist";
import studentProfileReducer from "./studentProfileSlice";
import studentReducer from "./studentSlice";
import teacherReducer from "./teacherSlice";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const rootReducer = combineReducers({
//   auth: authReducer,
//   log: logReducer,
//   notices: noticeReducer,
//   studentProfile: studentProfileReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    log: logReducer,
    notices: noticeReducer,
    studentProfile: studentProfileReducer,
    class: classReducer,
    teacher: teacherReducer,
    student: studentReducer,
  },
  //devTools: process.env.NODE_ENV !== 'production',
  //middleware: [thunk],
});

//export const persistor = persistStore(store);
// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
