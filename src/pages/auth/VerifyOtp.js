import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Form, Link } from 'react-router-dom'
import Loader from '../landing/loder/Loader';


function VerifyOtp() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    });
    //
    const [otp, setOtp] = useState(new Array(6).fill(''));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

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
            const previousElement = event.target.previousSibling;
            previousElement.focus();
            setOtp([...otp.map((d, idx) => (idx === index - 1 ? '' : d))]);
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
                                        <a href="/"><img src={process.env.PUBLIC_URL + 'assets/images/logo-navy.png'} alt="Growthh" className='img-fluid' /></a>
                                    </div>
                                    <h1 className='login-title mb-2'>
                                        Enter Code
                                    </h1>
                                    <p className="small-text mb-4">A 6-digit verification code has been sent to your email. Please enter this code to proceed or <button className="gth-link-btn">Request a New Code</button>.</p>
                                    <div className='form-wrap'>
                                        <form className='w-100'>
                                            <div className="otp-input mb-4">
                                                {otp.map((data, index) => {
                                                    return (
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
                                                        />
                                                    );
                                                })}
                                            </div>
                                            <a href="/set-password" name="submit" className="btn btn-exp-primary-dark w-100 f-s-18">Submit</a>
                                        </form>

                                    </div>

                                </div>
                            </div>
                            <div className='col-lg-5 col-md-6 col-sm-12 login-right-col'>
                                <div className='login-right-wrap'>
                                    <div className='text-end imgBx'>
                                        <img src={process.env.PUBLIC_URL + 'assets/images/login-right.webp'} alt="login" />
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


        </ >

    )
}

export default VerifyOtp