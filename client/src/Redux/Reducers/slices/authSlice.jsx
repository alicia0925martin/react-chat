import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, 
    isLoading : true,
    onlineUsers: [],
    socket: null,
    signupData: null,
    isEmailVerifying: null, 
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
        }, 
        setSocket: (state , action)=>{
            state.socket = action.payload
        }, 
        removeSocket: (state , action)=>{
            state.socket = null;
        },
        setOnlineUsers: (state, action)=>{
            state.onlineUsers = action.payload;
        }, 
        setSignupData: (state, action)=>{
            state.signupData = action.payload;
        }, 
        clearSignupData: (state)=>{
            state.signupData = null;
        }, 
        setIsEmailVerifying: (state, action)=>{
            state.isEmailVerifying = action.payload;
        }
    }
})

export const {setUser ,clearSignupData , setIsEmailVerifying, setSignupData, removeUser , setLoading , setSocket, removeSocket , setOnlineUsers} = authSlice.actions;
export default authSlice.reducer;