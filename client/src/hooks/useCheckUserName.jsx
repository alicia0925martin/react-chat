import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../services/apiConnector'
import toast from 'react-hot-toast';

const useCheckUserName = (username) => {
    const[isValidUsername , setIsValidUsername] = useState(false); 
    

    useEffect(()=>{
        const timer = setTimeout(()=>{
            fetchValidUserName();
        },300);

        return ()=>{
            clearTimeout(timer);
        }
    },[username]);

    const fetchValidUserName = async()=>{
        
        try{
            
            const res = await axiosInstance.post("/auth/checkUsername" , {username: username})

            console.log(res)

            setIsValidUsername(res?.data?.success);
        }
        catch(err){
            setIsValidUsername(false);
        }
    }

    return isValidUsername;
}

export default useCheckUserName
