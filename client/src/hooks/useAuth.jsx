import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../services/apiConnector";
import { setLoading, removeUser, setUser } from "../Redux/Reducers/slices/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((store) => store.auth);

  const checkAuth = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      console.log("login")
      dispatch(setUser(res.data)); 
      
      // <-- Update state with user data
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
