import { Eye, EyeOff, Loader2, Mail, MessageSquare, MessagesSquare, Lock, User, CrossIcon, X, Check, Loader } from 'lucide-react';

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../AuthImagePatter';
import toast from 'react-hot-toast';
import validator from "validator"
import useCheckUserName from '../../hooks/useCheckUserName';
import { axiosInstance } from '../../services/apiConnector';
import { setLoading, setUser } from '../../Redux/Reducers/slices/authSlice';
import { signup } from '../../services/operations';



const SignupPage = () => {
    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);

    const {isLoading} = useSelector((store)=>store.auth);

    // to check the username only after typed 3 words
    const [showUsernameCheck, setShowUsernameCheck] = useState(false);

    // dispatch: 
    const dispatch = useDispatch();

    const [formData , setFormData] = useState({
        username : "", 
        email: "", 
        password: "",
        confirmPassword: ""
    })

    const isValidUsername = useCheckUserName(formData.username);

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // signup logic is in operations file
        signup(dispatch , formData);

};

// if loading showing loader: 
    if (isLoading) return 
    <div className='flex items-center justify-center h-screen'>
    <Loader className='size-10 animate-spin'/>
    </div>;

  return (
     <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessagesSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6  
          ">
            <div className="form-control flex flex-col gap-1">
              <label className="label">
                <span className="label-text font-medium ">Username</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                  value={formData.username}
                 onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, username: value });
                    setShowUsernameCheck(value.trim().length > 3); // start showing after 3 chars
                }}
                />
                
              </div>
              {showUsernameCheck ?(isValidUsername ? <p className='text-green-500 w-fit px-2 opacity-80 flex gap-2 items-center duration-300  '>username is available <span className='text-sm'><Check/></span></p>: <p className='text-red-500 w-fit px-2 opacity-80 flex items-center gap-2 duration-300'>username not available <X></X></p>): null}
            </div>

            <div className="form-control flex flex-col gap-1">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control flex flex-col gap-1">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>


            <div className="form-control flex flex-col gap-1">
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            


            <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  )
}

export default SignupPage
