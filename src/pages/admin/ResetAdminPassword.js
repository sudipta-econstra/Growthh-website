import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Loader from '../landing/loder/Loader';
import { resetPassword } from '../../services/Admin/api'; // Import resetPassword service

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

function ResetPassword() {
    const [loading, setLoading] = useState(true);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Add confirm password state
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const handleResetPassword = async (event) => {
        event.preventDefault();
        const token = getCookie('adminToken'); // Retrieve token from cookie
        if (!token) {
            setError('No token found. Please log in again.');
            return;
        }

        if (newPassword !== confirmPassword) { // Check if passwords match
            setError('Passwords do not match. Please try again.');
            return;
        }

        try {
            const response = await resetPassword(token, oldPassword, newPassword);
            console.log(response);
            navigate('/admin/login'); // Navigate to login or another appropriate page after success
        } catch (error) {
            setError(error.message);
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
                                        Set Password
                                    </h1>
                                    <p className="small-text mb-4">Must be 8 or more characters and contain at least 1 number and 1 special character.</p>
                                    <div className='form-wrap'>
                                        <form className='w-100' onSubmit={handleResetPassword}>
                                            <div className="form-group mb-4">
                                                <label className="form-label">Old Password</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fi fi-ss-key" /></div>
                                                    </div>
                                                    <input type="password" className="form-control" placeholder="Enter Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="form-group mb-4">
                                                <label className="form-label">New Password</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fi fi-ss-key" /></div>
                                                    </div>
                                                    <input type="password" className="form-control" placeholder="Enter Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="form-group mb-4">
                                                <label className="form-label">Confirm Password</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fi fi-ss-key" /></div>
                                                    </div>
                                                    <input type="password" className="form-control" placeholder="Enter Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                                </div>
                                            </div>
                                            {error && <p className="text-danger">{error}</p>}
                                            <Button type="submit" className="btn btn-exp-primary-dark w-100 f-s-18">Confirm</Button>
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

export default ResetPassword;
