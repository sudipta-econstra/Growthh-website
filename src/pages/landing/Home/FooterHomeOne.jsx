import React from 'react';

import logo from '../../../landingAssets/images/logo-navy.png';
import { Link } from 'react-router-dom';

function FooterHomeOne({ className, modalShow }) {
    return (
        <>
            <section  className={`appie-footer-area ${className || ''}`} id="contactus">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-about-widget">
                                <div className="logo">
                                    <Link to="/">
                                        <img src={logo} alt="" />
                                    </Link>
                                </div>
                                <p>
                                    Transforming businesses with streamlined processes and strategic growth solutions.
                                </p>
                                {/* <a href="#">
                                    Read More <i className="fal fa-arrow-right" />
                                </a> */}
                                {/* <div className="social mt-30">
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-twitter" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-pinterest-p" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-linkedin-in" />
                                            </a>
                                        </li>
                                    </ul>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="footer-navigation">
                                <h4 className="title">Quick Links</h4>
                                <ul>
                                    <li>
                                        <a href="/terms-condition">Terms & Conditions</a>
                                    </li>
                                    <li>
                                        <a href="/pricing-policy">Pricing Policy</a>
                                    </li>
                                    <li>
                                        <a href="/refund-policy">Refund Policy</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-navigation">
                                <h4 className="title">Support</h4>
                                <ul>
                                    <li>
                                        <a href="/privacy-policy">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="/cancellation-policy">Cancellation Policy</a>
                                    </li>
                                    <li>
                                        <a href='javascript:void(0);' onClick={modalShow}>Contact Us</a>
                                        {/* <a href="/contact-us">Contact Us</a> */}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget-info">
                                <h4 className="title">Get In Touch</h4>
                                <ul>
                                    <li>
                                        <a href="mailto:support@growthh.in">
                                            <i className="bi bi-envelope"/> support@growthh.in
                                        </a>
                                    </li>
                                    <li>
                                        <a href="tel:9667503347">
                                            <i className="bi bi-telephone" /> +91 96675 03347
                                        </a>
                                    </li>
                                    {/* <li>
                                        <p href="#">
                                            <i className="fal fa-map-marker-alt" /> 442 Belle Terre
                                            St Floor 7, San Francisco, AV 4206
                                        </p>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="footer-copyright d-flex align-items-center justify-content-center pt-35">
                                {/* <div className="apps-download-btn">
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-apple" /> Download for iOS
                                            </a>
                                        </li>
                                        <li>
                                            <a className="item-2" href="#">
                                                <i className="fab fa-google-play" /> Download for
                                                Android
                                            </a>
                                        </li>
                                    </ul>
                                </div> */}
                                <div className="copyright-text">
                                    <p>Copyright © 2024 Growthh.in. All rights reserved.  |  Powered by Gyaanmart Knowledge Technology Pvt. Ltd.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </section>
        </>
    );
}

export default FooterHomeOne;
