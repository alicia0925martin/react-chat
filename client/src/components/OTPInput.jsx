import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
const OTPInput = () => {

  const [otp, setOtp] = useState('');
  
  return (
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
  );
}

export default OTPInput;

