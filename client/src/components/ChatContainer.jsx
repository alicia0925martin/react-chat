import React, { useEffect, useRef } from 'react'
import { formatMessageTime, getMessages, subscribeToMessages, unsubscribeFromMessages } from '../services/operations'
import { useDispatch, useSelector } from 'react-redux'
import MessageSkeleton from './skeletons/MessageSkeleton';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { FileIcon, FileText, Link } from 'lucide-react';
import { addMessage } from '../Redux/Reducers/slices/chatSlice';

const ChatContainer = () => {
    const dispatch = useDispatch();
    const {messages , selectedUser , isMessagesLoading } = useSelector((store)=>store.chats);

    const {user , socket} = useSelector((store)=>store.auth);
 
    const messageEndRef = useRef();

    useEffect(() => {
      getMessages(dispatch, selectedUser._id);

      const handleNewMessage = (newMessage) => {
        const isRelevant = newMessage.senderId === selectedUser._id || newMessage.recieverId === selectedUser._id;
        if (!isRelevant) return;
        dispatch(addMessage(newMessage));
      };

      if (socket) {
        socket.on("newMessage", handleNewMessage);
      }

      return () => {
        if (socket) {
          socket.off("newMessage", handleNewMessage); // ✅ proper cleanup
        }
      };
    }, [selectedUser._id, socket]);


    const subscribeToMessages =()=>{
      // subscribing messages
        const handleNewMessage = (newMessage) => {
        const isRelevant = newMessage.senderId === selectedUser._id || newMessage.recieverId === selectedUser._id;

        if (!isRelevant) return; // ✅ Important fix: ignore irrelevant messages

        dispatch(addMessage(newMessage));
        };  

        socket.on("newMessage", handleNewMessage);
        socket._messageHandler = handleNewMessage;
    }

     useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

    if(isMessagesLoading){
        return  <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    }
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === user._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === user._id
                      ? user.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.file &&(
                message.file.type === "image" ?(<img
                  src={message.file.url}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
                
            ) : (
                <a
                href={message.file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-start gap-2 p-3 bg-zinc-800 text-sm rounded-lg border border-zinc-700 w-fit max-w-[200px]"
                >
                <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-white" />
                    <span className="break-all max-w-[140px]">{message.file.name}</span>
                </div>
                <span className="text-blue-400 underline text-xs">Open in Browser</span>
                </a>



            )
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        {/* to auto scroll */}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer
