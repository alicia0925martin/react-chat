import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chats", 
    initialState:{
        users: [], 
        messages:[], 
        isUsersLoading: false, 
        isMessagesLoading: false, 
        isSendingMessage: false, 
        selectedUser: null
    }, 
    reducers: {
        setMessages: (state ,action)=>{
            state.messages= action.payload;
        },
        addMessage: (state, action) => {
        state.messages.push(action.payload); // Append new message
        },
        setUsers: (state ,action)=>{
            state.users= action.payload;
        },
        setIsUsersLoading: (state , action)=>{
            state.isUsersLoading = action.payload;
        },
        setIsMessagesLoading: (state , action)=>{
            state.isMessagesLoading = action.payload;
        }, 
        setIsSendingMessage: (state , action)=>{
            state.isSendingMessage = action.payload;
        }, 
        setSelectedUser: (state , action)=>{
            state.selectedUser = action.payload;
        }
    }
})

export const {setMessages , addMessage, setUsers, setIsSendingMessage, setSelectedUser , setIsMessagesLoading , setIsUsersLoading} = chatSlice.actions;
export default chatSlice.reducer;