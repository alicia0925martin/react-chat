    import toast from "react-hot-toast";
    import { axiosInstance } from "./apiConnector";
    import { removeSocket, removeUser, setIsEmailVerifying, setLoading, setOnlineUsers, setSignupData, setSocket, setUser } from "../Redux/Reducers/slices/authSlice";
    import validator from "validator";
    import { addMessage, setIsMessagesLoading, setIsSendingMessage, setIsUsersLoading, setMessages, setUsers } from "../Redux/Reducers/slices/chatSlice";
    import {io} from "socket.io-client"
    import { BACKEND_URL } from "../utils/constants";
    

    export const formatMessageTime =(date) =>{
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    }


    const validateForm = (formData)=>{
            toast.dismiss();

            if(!formData.username.trim()) return toast.error("username is required");
            if(!formData.email.trim()) return toast.error("email is required!");
            if(!formData.password.trim()) return toast.error("password is required!")
            if(!formData.confirmPassword.trim()) return toast.error("confirm password is required!")
            if(formData.confirmPassword.trim() !== formData.password.trim()) return toast.error("passwords do not match!")
            if(!validator.isEmail(formData.email.trim()))
                return toast.error("email is not valid!")
            if(!validator.isStrongPassword(formData.password.trim()))
                return toast.error("Password is not strong enough.")
            if(!/^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9._]{1,30}$/.test(formData.username))
                return toast.error("username is not valid.")
            
                
            return true;

        }

    const validateLoginData = (formData)=>{
            toast.dismiss();


            if(!formData.usernameOrEmail.trim())
                return toast.error("email or username is required!");

            if(!formData.password.trim()) return toast.error("password is required!")
                
            
            return true;

        }


    // signup api call and redux updation
    export const signup = async (dispatch ,socket , formData)=>{
        try {
                    dispatch(setLoading(true));
        
                    
        
                    const res = await axiosInstance.post("/auth/signup", formData);
                    dispatch(setUser(res?.data?.user));

                    dispatch(setLoading(false));
                    toast.success("account created successfully!");

                    // connect to socket after signup immediately
                    connectSocket(dispatch ,socket,  res?.data?.user);


            } catch (err) {
                    dispatch(setLoading(false));
                    console.log(err);
                    toast.error(err?.response?.data?.message || "sign up failed");
                    return;
            }
            finally{
                dispatch(setLoading(false));
            }
    }


    export const login = async(dispatch , socket, formData)=>{
        try {
                    dispatch(setLoading(true));
        
                    const validationResult = validateLoginData(formData);
                    
        
                    if (validationResult !== true) {
                        dispatch(setLoading(false));
                        return;
                    }
            
                    const identifier = validator.isEmail(formData.usernameOrEmail)
                    ? { email: formData.usernameOrEmail }
                    : { username: formData.usernameOrEmail };

        
                    const res = await axiosInstance.post("/auth/login", {
                        ...identifier,
                        password: formData?.password
                    });
                    dispatch(setUser(res?.data?.user));
                    dispatch(setLoading(false));
                    toast.success("login successful!");
                    // connect to socket after signup immediately
                    connectSocket(dispatch , socket, res?.data?.user);

            } catch (err) {
                    dispatch(setLoading(false));
                    toast.error(err?.response?.data?.message || "login in failed");
                    return;
            }
            finally{
                dispatch(setLoading(false));
            }
    }

    // logout api call with removing user from store: 
    export const logout = async(dispatch, socket)=>{
        try {
                    dispatch(setLoading(true));
        
                    
        
                    const res = await axiosInstance.post("/auth/logout");
                    dispatch(removeUser());
                    dispatch(setLoading(false));
                    toast.success("user logged out successfully!");
                    disconnectSocket(dispatch, socket);

            } catch (err) {
                    dispatch(setLoading(false));
                    toast.error(err?.response?.data?.message || "could not logout!");
                    return;
            }
            finally{
                dispatch(setLoading(false));
            }
    }


    export const updateProfileData = async(dispatch , formData , user , file)=>{
            try{
                dispatch(setLoading(true));
                
                if(formData.contactNumber && formData.contactNumber.toString().length !== 10){
                    toast.error("Contact number should be exactly 10 digits");
                    dispatch(setLoading(false));
                    return;
                }

                

                // prepare a new form data
                const form = new FormData();

                form.append("contactNumber" , formData.contactNumber);
                form.append("displayName" , formData.displayName);

                
                // Check and append profile pic file if present
                if (file ) {
                form.append("profilePic", file);
                }

                const res = await axiosInstance.post("/user/update-profile" , form , 
                {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                })


                dispatch(setUser(res?.data?.user));

                

                toast.success("profile updated successfully!")
                dispatch(setLoading(false));         
            }
            catch(err){
                toast.error("update profile failed");
                console.log(err);
                dispatch(setLoading(false))
            }
            finally{
                dispatch(setLoading(false));
            }
    }



    export const getUsers = async(dispatch)=>{
        try{
            dispatch(setIsUsersLoading(true));

            const res = await axiosInstance.get("message/users");

            
            dispatch(setUsers(res?.data?.data));

            dispatch(setIsUsersLoading(false));
            
        }
        catch(err){
                toast.error("fetching users failed");
                console.log(err);
                dispatch(setIsUsersLoading(false))
            }
        finally{
                dispatch(setIsUsersLoading(false));
            }
    }

    export const getMessages = async(dispatch , userId)=>{
        try{
            dispatch(setIsMessagesLoading(true));


            if(!userId){
                toast.error("please select a chat")
                dispatch(setIsMessagesLoading(false));
                return;
            }

            const res = await axiosInstance.get("message/getMessages/" + userId);

            
            dispatch(setMessages(res?.data?.data));

            dispatch(setIsMessagesLoading(false));
            
        }
        catch(err){
                toast.error("fetching users failed");
                console.log(err);
                dispatch(setIsUsersLoading(false))
            }
        finally{
                dispatch(setIsUsersLoading(false));
            }
    }

    export const handleSendMessage = async(dispatch , {text , file , toId})=>{
        try{
                dispatch(setIsSendingMessage(true));
                
                

                // prepare a new form data
                const form = new FormData();

                form.append("text" , text);

                
                // Check and append profile pic file if present
                if (file ) {
                form.append("file", file);
                }

                const res = await axiosInstance.post("message/sendMessage/"+toId , form , 
                {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                })


                getMessages(dispatch , toId);

                

                toast.success("message sent successfully!")
                dispatch(setIsSendingMessage(false));         
            }
        catch(err){
                toast.error("could not send message");
                console.log(err);
                dispatch(setIsSendingMessage(false))
            }
        finally{
                dispatch(setIsSendingMessage(false))
            }
    }

    export const connectSocket = (dispatch , socket ,user )=>{
         if (!user) return;

        if (socket && socket.connected) return;
        
        const socketIo = io(BACKEND_URL, {
        withCredentials: true,
        transports: ['polling', 'websocket'], // Add 'polling'
        query: { userId: user._id }
        });
        dispatch(setSocket(socketIo));
        socketIo.connect();

        socketIo.on("getOnlineUsers" , (userIds)=>{
            dispatch(setOnlineUsers(userIds))
        })
    }

   

    export const disconnectSocket = (dispatch, socket) => {
    if (socket && socket.connected) {
        socket.disconnect();  // ✅ actually disconnect the existing socket
        console.log("Socket disconnected successfully");
    } else {
        console.log("No active socket to disconnect");
    }

    dispatch(removeSocket());  // Remove from redux
         
};



    
        export const subscribeToMessages = (dispatch, socket, selectedUser) => {
            if (!socket || !selectedUser?._id) return;

            // Prevent double subscriptions
            socket.on("newMessage" , (newMessage)=>{
                console.log("real time sent")
                dispatch(addMessage(newMessage));
            })

        };




    export const unsubscribeFromMessages = (socket) => {
    if (!socket) return;

    socket.off("newMessage")
};


// email verification feature: 
export const sendOtp = async (dispatch, formData) => {
  try {
    dispatch(setLoading(true));
    
    const validationResult = validateForm(formData);

        
    if (validationResult !== true) {
        dispatch(setLoading(false));
        return;
    }

    const res = await axiosInstance.post("/auth/send-otp", { email: formData.email });

    dispatch(setSignupData(formData)); // optional
    toast.success("OTP sent successfully!");

    return { success: true };
  } catch (err) {
    console.error(err);
    toast.error("Error sending OTP");
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};



export const verifyEmail = async (dispatch, signupData, otp, socket , setIsEmailVerified) => {
  try {
    dispatch(setIsEmailVerifying(true));

    const res = await axiosInstance.post("/auth/verify-email", {
      email: signupData.email,
      otp,
    });

    setIsEmailVerified(true);

    toast.success("Email verified");
    
    // Proceed to signup only if verification passed
    signup(dispatch, socket, signupData);

  } catch (err) {
    console.error(err);

    // ❗ BUG FIX: If backend clears OTP on failure, make sure it's intentional.
    // Some backends invalidate the OTP immediately after a failed attempt for security.
    // Ideally, this behavior should be changed to allow 2-3 retries.
    toast.error("Verification failed");
    setIsEmailVerified(false);
  } finally {
    dispatch(setIsEmailVerifying(false));
    setIsEmailVerified(false);
    dispatch(setLoading(false));
  }
};
