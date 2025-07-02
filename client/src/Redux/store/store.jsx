import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../Reducers";

const appStore = configureStore({
    reducer: rootReducer, 
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore socket key in auth slice
        ignoredPaths: ["auth.socket"],
        ignoredActions: ["auth/setSocket"],
      },
    }),
})

export default appStore;