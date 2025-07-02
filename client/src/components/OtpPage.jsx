import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import AuthImagePattern from "./AuthImagePatter";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../services/operations";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const routeSignupData = location.state;
  const { socket , isEmailVerifying} = useSelector((store) => store.auth);
  const[isEmailVerified , setIsEmailVerified] = useState(null);

  useEffect(() => {
    // ✅ Redirect to signup if data is missing (e.g., page refresh)
    if (!routeSignupData) {
      toast.error("Session expired. Please sign up again.");
      navigate("/signup");
    }
  }, [routeSignupData]);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Enter complete OTP");
      return;
    }

    verifyEmail(dispatch, routeSignupData, otp, socket , setIsEmailVerified);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 py-5">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <h3 className="text-2xl font-bold text-center text-primary mb-4">
          OTP Verification
        </h3>
        <p className="text-center text-sm text-gray-500 mb-6">
          Enter the OTP sent to your email to continue.
        </p>

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="mx-1">-</span>}
          inputStyle={{
            width: '3rem',
            height: '3rem',
            fontSize: '1.25rem',
            borderRadius: '0.5rem',
            border: !isEmailVerified? '1px solid #ccc': '1px solid green',
            textAlign: 'center',
          }}
          renderInput={(props) => (
            <input
              {...props}
              className='w-10 h-10 text-center border border-gray-300 rounded-lg'
            />
          )}
        />

        <button onClick={handleVerify} className="btn btn-primary mt-4">
          {isEmailVerifying? <div className="animate-spin"><Loader/> </div>: "Verify Otp"}
        </button>
      </div>

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default OtpPage;
