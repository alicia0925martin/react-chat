import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, 
    isLoading : true,
    onlineUsers: [],
}
const authSlice = createSlice({
    name: "auth", 
    initialState: initialState, 
    reducers:{
        setUser: (state ,action)=>{
            state.user = action.payload;
        }, 
        removeUser: (state ,action)=>{
            state.user = null;
        }, 
        setLoading: (state , action)=>{
            state.isLoading = action.payload;
        }
    }
})

export const {setUser , removeUser , setLoading} = authSlice.actions;
export default authSlice.reducer;