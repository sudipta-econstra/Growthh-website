import React, { useState } from 'react';
import { sendOTPEmail } from '../../services/Admin/api'; // Adjust path as per your file structure
import { Link, useNavigate } from 'react-router-dom';

function ForgotAdminPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Import useNavigate hook from react-router-dom

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await sendOTPEmail(email);
      console.log('OTP Sent Successfully:', response);
      // Navigate to verify OTP page with email as state
      navigate("/admin/verify-otp", { state: { email: email } });
      // Handle success (e.g., show a success message to the user)
    } catch (error) {
      console.error('Failed to send OTP:', error.message);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className='login-auth-wrap'>
      <div className='container'>
        <div className='row justify-content-between align-items-center'>
          <div className='col-lg-5 col-md-6 col-sm-12'>
            <div className='loginBox'>
              <div className="logo-wrap">
                <a href="/"><img src={process.env.PUBLIC_URL + '/assets/images/logo-navy.png'} alt="Growthh" className='img-fluid' /></a>
              </div>
              <h1 className='login-title'>
                Don't worry! <br />
                <span className='position-relative sign-in me-2'>
                  <span>RESET</span>
                  <svg viewBox="0 0 156 59" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-blue login-svg"><path d="M156 41C156 50.9411 147.89 58.735 138.408 55.7499C135.073 54.7001 131.284 53.8018 124.799 53.8018C109.2 53.8018 109.197 59 93.598 59C77.9988 59 77.9987 53.8018 62.3995 53.8018C46.8003 53.8018 46.7977 59 31.1985 59C24.7151 59 20.9263 58.102 17.5923 57.0526C8.1099 54.0677 0 45.7429 0 35.8018V18C0 8.05888 8.1099 0.265901 17.5923 3.2508C20.9263 4.30029 24.7151 5.19824 31.1985 5.19824C46.7977 5.19824 46.7977 0 62.3995 0C78.0013 0 77.9988 5.19824 93.598 5.19824C109.197 5.19824 109.197 0 124.799 0C131.284 0 135.073 0.898168 138.408 1.94782C147.89 4.93288 156 13.2571 156 23.1982V41Z" ></path></svg>
                </span>
                your password.
              </h1>
              <div className='form-wrap'>
                <form className='w-100'>
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <div className="input-group-text"><i className="bi bi-envelope-fill" /></div>
                    </div>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Enter Your Email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <button type="submit" name="submit" className="btn btn-exp-primary-dark w-100 f-s-18" onClick={handleSubmit}>Reset Password</button>
                </form>
                <h6 className='mt-4 mb-0 text-center text-muted f-w-medium'>
                  Don’t want to reset ? <Link to="/login" className='text-exp-blue1'>Sign In</Link>
                </h6>
              </div>
            </div>
          </div>
          <div className='col-lg-5 col-md-6 col-sm-12 login-right-col'>
            <div className='login-right-wrap'>
              <div className='text-end imgBx'>
                <img src={process.env.PUBLIC_URL + '/assets/images/login-right.webp'} alt="login"/>
              </div>
              <div className='textBx'>
                "Before Growthh, my to-do lists were scattered all around! Now, everything is in order and in one place."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotAdminPassword;
