import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../Reducers";

const appStore = configureStore({
    reducer: rootReducer
})

export default appStore;