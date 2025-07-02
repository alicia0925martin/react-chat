import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../services/apiConnector";
import { setLoading, removeUser, setUser } from "../Redux/Reducers/slices/authSlice";
import { connectSocket } from "../services/operations";

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading , socket , onlineUsers} = useSelector((store) => store.auth);
  console.log(onlineUsers);

  const checkAuth = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      console.log("login")

      // <-- Update state with user data
      dispatch(setUser(res.data)); 

      // connect to socket after signup immediately
      connectSocket(dispatch , socket, res.data);
      
    } catch (err) {
      console.log("Auth check failed:", err);
      dispatch(removeUser());
      console.log(err); // <-- Clear user data on error
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Automatically run on mount
  useEffect(() => {
    checkAuth();
  }, []);

  

  return { user, isLoading };
};

export default useAuth;
