import { Camera, IdCard, Mail, PhoneCall, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfileData } from '../../services/operations';


const ProfilePage = () => {
    const {user , isLoading} = useSelector((store)=>store.auth);
    const [selectedImg, setSelectedImg] = useState(null);

    const dispatch = useDispatch();

    
    const [formData , setFormData] = useState({
        displayName: user?.displayName || "", 
        contactNumber: user?.contactNumber || "", 
        profilePic : null,
    });

    // console.log(selectedImg);

    const [count , setCount] = useState(formData.displayName.length);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        console.log(file);
        if (!file) return;
        setSelectedImg(URL.createObjectURL(file));
        
        setFormData({ ...formData, profilePic: file }); // store file in formData

        updateProfileData(dispatch , formData , user , file);
    };
    


    const handleUpdateProfile =  (e)=>{
         e.preventDefault();

        updateProfileData(dispatch , formData , user);
    }

    
    

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || user.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isLoading ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isLoading}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isLoading ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            {/* updatable fields */}

                <div className="space-y-1.5 relative">
                    <label htmlFor='displayName' className="text-sm text-zinc-400 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Display Name
                    </label>
                    <input className="px-4 py-2.5 bg-base-200 rounded-lg w-full border pr-13" id='displayName' name='displayName' value={formData.displayName} onChange={(e)=>{
                        setFormData({...formData , displayName: e.target.value})
                        setCount(e.target.value.length)
                    }}/>
                    <p className={`absolute text-xs  top-10 right-4 ${count<0 || count>30 ? "text-red-400": "text-zinc-400"}`}>{count}/30</p>
                </div>

                {/* contactNumber */}
                <div className="space-y-1.5">
                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                        <PhoneCall className="w-4 h-4" />
                        Contact Number
                    </div>
                    <input type='number' className="px-4 py-2.5 bg-base-200 rounded-lg w-full border"  value={formData.contactNumber} onChange={(e)=>setFormData({...formData , contactNumber: e.target.value})}/>
                </div>

          {/* non - updatable fields */}

              {/* username */}
            <div className="space-y-1.5 cursor-not-allowed opacity-70 ">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <IdCard className="w-4 h-4" />
                Username
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.username}</p>
            </div>
            {/* email address */}
            
            <div className="space-y-1.5 cursor-not-allowed opacity-70">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.email}</p>
            </div>
          </div>

          <div className='w-full flex justify-end'>
            <button type="click" onClick={(e)=>handleUpdateProfile(e)} className="btn btn-primary  w-32" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="size-5 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            "Update Profile"
                          )}
                        </button>
          </div>


{/* account info section */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{user.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
