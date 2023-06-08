import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import logReducer from "./logsSlice";
import noticeReducer from "./noticeSlice";
// import userReducer from "./userSlice";'
import { persistReducer, persistStore } from "redux-persist";
import studentProfileReducer from "./studentProfileSlice";

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
  },
  //devTools: process.env.NODE_ENV !== 'production',
  //middleware: [thunk],
});

//export const persistor = persistStore(store);
// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
