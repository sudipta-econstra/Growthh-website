import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../landing/loder/Loader';
import { verifyOTP } from '../../services/Admin/api'; // Adjust path as per your file structure

function VerifyAdminOtp() {
  const location = useLocation();
  const email = location.state?.email;
  const [loading, setLoading] = useState(true);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  useEffect(() => {
    setLoading(false); // Remove timeout for actual implementation
  }, []); // Ensure correct dependency array

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true); // Set loading to true before starting async operation

      const otpValue = otp.join('');
      const response = await verifyOTP(email, otpValue, newPassword);

      if (response.success) { // Assuming the response has a success property
        console.log('OTP Verified Successfully:', response);
        setIsOtpVerified(true);
      } else {
        throw new Error('Failed to verify OTP');
      }

      setLoading(false); // Set loading to false after successful operation
    } catch (error) {
      console.error('Failed to verify OTP:', error.message);
      setVerificationError('Failed to verify OTP');
      setIsOtpVerified(false);

      setLoading(false); // Set loading to false after error
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const updatedOtp = [...otp];
    updatedOtp[index] = element.value;
    setOtp(updatedOtp);

    // Focus on the next input field
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    if (paste.length !== 6 || isNaN(paste)) return;

    setOtp(paste.split(''));

    // Focus on the last input field
    e.target.blur();
  };

  const handleKeyDown = (event, index) => {
    if (event.keyCode === 8 && !otp[index] && index !== 0) {
      event.preventDefault();
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = '';
      setOtp(updatedOtp);
      if (index > 0) {
        const previousElement = event.target.previousSibling;
        previousElement.focus();
      }
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true); // Set loading to true before starting async operation

      // Add your password reset logic here
      // ...

      setLoading(false); // Set loading to false after successful operation
    } catch (error) {
      console.error('Failed to reset password:', error.message);
      setVerificationError('Failed to reset password');

      setLoading(false); // Set loading to false after error
    }
  };

  return (
    <>
      {loading && (
        <div className={`appie-loader ${loading ? 'active' : ''}`}>
          <Loader />
        </div>
      )}
      <div className={`appie-visible ${loading === false ? 'active' : ''}`}>
        <div className='login-auth-wrap'>
          <div className='container'>
            <div className='row justify-content-between align-items-center'>
              <div className='col-lg-5 col-md-6 col-sm-12'>
                <div className='loginBox'>
                  <div className="logo-wrap">
                    <a href="/"><img src={process.env.PUBLIC_URL + '/assets/images/logo-navy.png'} alt="Growthh" className='img-fluid' /></a>
                  </div>
                  <h1 className='login-title mb-2'>
                    Enter Code
                  </h1>
                  <p className="small-text mb-4">A 6-digit verification code has been sent to your email ({email}). Please enter this code to proceed or <button className="gth-link-btn">Request a New Code</button>.</p>
                  <div className='form-wrap'>
                    <form className='w-100' onSubmit={isOtpVerified ? handlePasswordSubmit : handleSubmit}>
                      <div className="otp-input mb-4">
                        {otp.map((data, index) => (
                          <input
                            className="otp-field"
                            type="text"
                            name="otp"
                            maxLength="1"
                            key={index}
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            autoFocus={index === 0}
                          />
                        ))}
                      </div>
                      {isOtpVerified && (
                        <>
                          <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="newPassword"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                            />
                          </div>
                          <button type="submit" className="btn btn-exp-primary-dark w-100 f-s-18">Submit</button>
                        </>
                      )}
                      {verificationError && <p className="text-danger mt-3">{verificationError}</p>}
                    </form>
                  </div>
                </div>
              </div>
              <div className='col-lg-5 col-md-6 col-sm-12 login-right-col'>
                <div className='login-right-wrap'>
                  <div className='text-end imgBx'>
                    <img src={process.env.PUBLIC_URL + '/assets/images/login-right.webp'} alt="login" />
                  </div>
                  <div className='textBx'>
                    "Before Growthh, my to-do lists were scattered all around! Now, everything is in order and in one place."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyAdminOtp;
