import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Form, Link } from 'react-router-dom'
import Loader from '../landing/loder/Loader';


function SetPassword() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    });

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
                                        Set Password
                                    </h1>
                                    <p className="small-text mb-4">Must be 8 or more characters and contain at least 1 number and 1 special character.</p>
                                    <div className='form-wrap'>
                                        <form className='w-100'>
                                            <div className="form-group mb-4">
                                                <label className="form-label">Password</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fi fi-ss-key" /></div>
                                                    </div>
                                                    <input type="password" className="form-control" placeholder="Enter Password" />
                                                </div>
                                            </div>
                                            <div className="form-group mb-4">
                                                <label className="form-label">Confirm Password</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fi fi-ss-key" /></div>
                                                    </div>
                                                    <input type="password" className="form-control" placeholder="Enter Password" />
                                                </div>
                                            </div>

                                            <a href="/register" name="submit" className="btn btn-exp-primary-dark w-100 f-s-18">Confirm</a>
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

export default SetPassword