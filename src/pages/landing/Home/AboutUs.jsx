import React, { useEffect } from 'react';
import ReactPlayer from 'react-player'
import { Link, useLocation } from 'react-router-dom';
import aboutVideo from '../../../landingAssets/images/about-growthh.mp4';
import aboutPoster from '../../../landingAssets/images/about-video.gif';

function AboutUs({ className, modalShow }) {


    return (
        <section className={`pt-90 pb-90 about-sec-wrap ${className}`} id="aboutUs">
            <div className="container">
                <div className="row align-items-center flex-row-reverse">
                    <div className="col-lg-5">
                        <div className="appie-features-content" >
                            <span>Why Choose Growthh</span>
                            <h2 className="title">Efficiency, User-Friendly Business System</h2>
                            <p>Its offers everything you need—project management, accounting, CRM, and more—in one intuitive interface. Ideal for small to medium-sized businesses</p>
                            <a className="main-btn" href="javascript:void(0);" onClick={modalShow}>Sign Up Now!</a>
                            {/* <a className="main-btn" href="/register">Sign Up Now!</a> */}
                        </div>

                    </div>
                    <div className="col-lg-7">
                        <div className="video-wrap">
                            <div className="video-wrap-inner">
                                <ReactPlayer url={aboutVideo}
                                    controls={false}
                                    playing={true}
                                    loop={true}
                                    playsinline={true}
                                    muted={true}
                                    previewTabIndex={0}
                                    width="100%"
                                    height="auto"
                                    pip={false}
                                    stopOnUnmount={false}
                                    className="hero-video-wrap"
                                />
                                {/* <video className="c6-vdo" autoplay="autoplay" loop="true" muted playsinline webkit-playsinline x5-playsinline disablePictureInPicture poster={aboutPoster}>
                                    <source src={aboutVideo} type="video/mp4" />
                                </video>
                                <div className="vdoc6-gif">
                                    <img src={aboutPoster} alt="" className="img-fluid w-100" />
                                </div> */}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
