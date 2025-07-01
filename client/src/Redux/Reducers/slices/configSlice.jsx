import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: "config", 
    initialState:{
        theme: localStorage.getItem("chatty-theme")? localStorage.getItem("chatty-theme") : "dark"
    }, 
    reducers: {
        setTheme: (state , action) => {
            localStorage.setItem("chatty-theme" , action.payload);
            state.theme = action.payload
        }
    }
})

export const{setTheme}  = configSlice.actions;

export default configSlice.reducer;