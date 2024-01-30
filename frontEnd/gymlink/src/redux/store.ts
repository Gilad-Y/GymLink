// configureStore.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { UserReducer } from "./usersReducer";

// Combine all your reducers
const rootReducer = combineReducers({
  users: UserReducer,
});

// Configuration for Redux-persist
// const persistConfig = {
//   key: "root",
//   storage,
//   version: 1,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
