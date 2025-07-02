import React, { useState } from 'react'
import OtpInput from "react-otp-input"

const OtpPage = ({ otp, setOtp }) => {
  return (
    <div className='flex flex-col items-center'>
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
          border: '1px solid #ccc',
          textAlign: 'center',
        }}
        renderInput={(props) => (
          <input
          {...props}
            className='w-10 h-10 text-center border border-gray-300 rounded-lg'
          />
        )}
      />
    </div>
  );
}

const OtpModal = ({ otp, setOtp, handleVerifyOtp }) => {
  return (
    <div className="flex justify-center items-center">
      <dialog id="otp_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 shadow-xl rounded-lg">
          <h3 className="text-2xl font-bold text-center text-primary mb-4">
            OTP Verification
          </h3>
          <p className="text-center text-sm text-gray-500 mb-6">
            Enter the OTP sent to your email to continue.
          </p>

          <OtpPage otp={otp} setOtp={setOtp} />

          <div className="modal-action justify-center flex-col items-center gap-4 mt-6">
            <button onClick={handleVerifyOtp} className="btn btn-primary w-full">
              Verify Email
            </button>
            <form method="dialog">
              <button className="btn btn-outline btn-error w-full">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default OtpModal;
