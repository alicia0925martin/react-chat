import React, { useRef, useState } from 'react'
import { handleSendMessage } from '../services/operations'; 
import { Image, Loader, Send, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

const MessageInput = () => {
    const [text ,setText] = useState("");
    const [filePreview , setFilePreview] = useState(null);

    const [file ,setFile] = useState(null);

    const dispatch = useDispatch();


    const fileInputRef = useRef();

    const {selectedUser , isSendingMessage} = useSelector((store)=>store.chats);   


    const handleFileChange = (e)=>{
        const selectedFile = e.target.files[0];

        console.log(selectedFile);
        if (!selectedFile) return;

        setFile(selectedFile);

        if(selectedFile.type.startsWith("image/"))
            setFilePreview(URL.createObjectURL(selectedFile));
        else{
            setFilePreview(null);
        }

    }

    const removeFile = ()=>{
        setFile(null);
        setFilePreview(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !file) return;

    await handleSendMessage(dispatch , { text, file , toId: selectedUser._id});

    setText('');
    removeFile();
  };




  return (
    <div className="p-4 w-full">
      {file && (
        <div className="mb-3  flex items-center gap-3">
            <div className="relative">
            {filePreview ? (
                <img
                src={filePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                />
            ) : (
                <div className="w-20 h-20 flex items-center justify-center bg-zinc-800 text-sm rounded-lg border border-zinc-700">
                <span className="text-center break-all px-1">{file?.name}</span>
                </div>
            )}

            <button
                onClick={removeFile}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                type="button"
            >
                <X className="size-3" />
            </button>
            </div>
        </div>
        )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${file ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
            >
            <Image size={20} />
            </button>

        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !file}
        >
          {isSendingMessage ? <div className='flex gap-2 items-center animate-spin text-red-500'><Loader/></div>:  <Send size={22} />}
        </button>
      </form>
    </div>
  )
}

export default MessageInput
