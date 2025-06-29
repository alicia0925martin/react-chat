import toast from "react-hot-toast";
import { axiosInstance } from "./apiConnector";
import { removeUser, setLoading, setUser } from "../Redux/Reducers/slices/authSlice";
import validator from "validator";



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

        console.log(formData);

        if(!formData.usernameOrEmail.trim())
             return toast.error("email or username is required!");

        if(!formData.password.trim()) return toast.error("password is required!")
            
        
        return true;

    }


// signup api call and redux updation
export const signup = async (dispatch  , formData)=>{
    try {
                dispatch(setLoading(true));
    
                const validationResult = validateForm(formData);

    
                if (validationResult !== true) {
                    dispatch(setLoading(false));
                    return;
                }
    
                const res = await axiosInstance.post("/auth/signup", formData);
                dispatch(setUser(res?.data?.user));
                dispatch(setLoading(false));
                toast.success("account created successfully!");

        } catch (err) {
                dispatch(setLoading(false));
                toast.error(err?.response?.data?.message || "sign up failed");
        }
        finally{
            dispatch(setLoading(false));
        }
}


export const login = async(dispatch , formData)=>{
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

        } catch (err) {
                dispatch(setLoading(false));
                toast.error(err?.response?.data?.message || "login in failed");
        }
        finally{
            dispatch(setLoading(false));
        }
}

// logout api call with removing user from store: 
export const logout = async(dispatch)=>{
     try {
                dispatch(setLoading(true));
    
                
    
                const res = await axiosInstance.post("/auth/logout");
                dispatch(removeUser());
                dispatch(setLoading(false));
                toast.success("user logged out successfully!");

        } catch (err) {
                dispatch(setLoading(false));
                toast.error(err?.response?.data?.message || "could not logout!");
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

            console.log(res);

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
