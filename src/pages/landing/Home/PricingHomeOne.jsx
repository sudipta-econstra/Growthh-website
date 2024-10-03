import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PricingHomeOne({ className, modalShow }) {
    const [toggleSwitch, setSwitchValue] = useState(true);
    return (
        <>
            <section className={`appie-pricing-area pt-90 ${className || ''}`}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="appie-features-content text-center">
                                <span>Pricing</span>
                                <h2 className="appie-title">Automate Business Process On The Go</h2>
                            </div>
                            {/* <ul
                                className="list-inline text-center switch-toggler-list"
                                role="tablist"
                                id="switch-toggle-tab"
                            >
                                <li className={`month ${toggleSwitch ? 'active' : ''}`}>
                                    <a href="#">Monthly</a>
                                </li>
                                <li>
                                    <label
                                        onClick={() => setSwitchValue(!toggleSwitch)}
                                        className={`switch ${toggleSwitch ? 'on' : 'off'}`}
                                    >
                                        <span className="slider round" />
                                    </label>
                                </li>
                                <li className={`year ${toggleSwitch === false ? 'active' : ''}`}>
                                    <a href="#">Annualy</a>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                    <div className="tabed-content mt-60">
                        {toggleSwitch ? (
                            <div id="month">
                                <div className="row justify-content-center">
                                    
                                    <div className="col-lg-3 col-md-6">
                                        <div className="pricing-one__single">
                                            <div className="pricig-heading ">
                                                <h6>Business Plus</h6>
                                                <h5 className='one'>For Small Business</h5>
                                                <div className="price-range">
                                                    <sup>&#8377;</sup> <span>9,999</span>
                                                    <p>/month <mark className='bg-transparent text-danger'>**</mark></p>
                                                </div>
                                                <p>( Charged every 30 days )</p>
                                            </div>
                                            
                                            <div className="pricig-body">
                                                <ul>
                                                    <li>
                                                        <i className="fal fa-check" /> Doer Management System
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Repeated Work Management
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Task Tracker
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Bottleneck Management
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Workflows (FMS) <br />(Upto 5 FMS)
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Admin & Doer Dashboard
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Weekly Productivity Report
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Doer Performance Report
                                                    </li>
                                                    {/* <li>
                                                        <i className="fal fa-check" /> Organisation Privilege's
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Auto Productivity Score
                                                    </li> */}
                                                    <li>
                                                        <i className="fal fa-check" /> Auto Notification Feature
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Employee Comparision Score
                                                    </li>
                                                    {/* <li>
                                                        <i className="fal fa-check" /> Automated Reminder
                                                    </li> */}
                                                    {/* <li>
                                                        <i className="fal fa-check" /> Whatsapp Reminder (API#)
                                                    </li> */}
                                                    <li>
                                                        <i className="fal fa-check" /> Upto 15 Users
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> <b>Storage Space <br />(Upto 5 GB)*</b>
                                                    </li>
                                                </ul>
                                                <div className="pricing-btn mt-35">
                                                    <a className="main-btn" href='javascript:void(0);' onClick={modalShow}>
                                                        Book A Demo
                                                    </a>
                                                    {/* <a className="main-btn orange-btn" href="/modules">
                                                        Buy Now!
                                                    </a> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="pricing-one__single">
                                            <div className="pricig-heading express">
                                                <h6>Business Growth</h6>
                                                <h5 className='two'>With Dedicated Support</h5>
                                                <div className="price-range">
                                                    <sup>&#8377;</sup> <span>19,999</span>
                                                    <p>/month <mark className='bg-transparent text-danger'>**</mark></p>
                                                </div>
                                                <p>( Charged every 30 days )</p>
                                            </div>
                                            
                                            <div className="pricig-body">
                                                <ul>
                                                    <li>
                                                        <i className="fal fa-check" /> Doer Management System
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Repeated Work Management
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Task Tracker
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Bottleneck Management
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Workflows (FMS) <br />(Upto 10 FMS)
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Admin & Doer Dashboard
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Weekly Productivity Report
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Doer Performance Report
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Organisation Privilege's
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Auto Productivity Score
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Auto Notification Feature
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Employee Comparision Score
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Automated Reminder
                                                    </li>
                                                    {/* <li>
                                                        <i className="fal fa-check" /> Whatsapp Reminder (API#)
                                                    </li> */}
                                                    <li>
                                                        <i className="fal fa-check" /> Upto 25 Users
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> <b>Storage Space <br />(Upto 10 GB)*</b>
                                                    </li>
                                                </ul>
                                                
                                                <div className="pricing-btn mt-35">
                                                    <a className="main-btn " href='javascript:void(0);' onClick={modalShow}>
                                                        Book A Demo
                                                    </a>
                                                    {/* <a className="main-btn" href="/modules">
                                                        Buy Now!
                                                    </a> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="pricing-one__single">
                                            <div className="pricig-heading business-growth">
                                                <h6>Business Express</h6>
                                                <h5 className='three'>With Dedicated Support &amp; Account Manager</h5>
                                                <div className="price-range">
                                                    <sup>&#8377;</sup> <span>29,999</span>
                                                    <p>/month <mark className='bg-transparent text-danger'>**</mark></p>
                                                </div>
                                                <p>( Charged every 30 days )</p>
                                            </div>
                                            <div className="pricing-rebon">
                                                <span>Most Popular</span>
                                            </div>
                                            <div className="pricig-body">
                                                <ul>
                                                    <li>
                                                        <i className="fal fa-check" /> Doer Management System
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Repeated Work Management
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Task Tracker
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Bottleneck Management
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Workflows (FMS) <br />(Free upto 15 FMS)
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Admin & Doer Dashboard
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Weekly Productivity Report
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Doer Performance Report
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Organisation Privilege's
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Auto Productivity Score
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Auto Notification Feature
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Employee Comparision Score
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Automated Reminder
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> 35 Users
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> <b>Storage Space <br />(Upto 15 GB)*</b>
                                                    </li>
                                                </ul>
                                                <div className="pricing-btn mt-35">
                                                    <a className="main-btn orange-btn" href='javascript:void(0);' onClick={modalShow}>
                                                        Book A Demo
                                                    </a>
                                                    {/*  <a className="main-btn" href="/modules">
                                                    Sign Up!
                                                    </a>  */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="pricing-one__single">
                                            <div className="pricig-heading enterprise"> 
                                                <h6>Enterprise</h6>
                                                <h5 className='exterprise'>With Dedicated Support, Account Manager &amp; Onsite Consultant</h5>
                                                <div className="price-range">
                                                    <div className='requirement'>As per Requirement</div>
                                                </div>
                                                <p>( Charged every 30 days )</p>
                                            </div>
                                            <div className="pricig-body">
                                                <ul>
                                                    <li>
                                                        <i className="fal fa-check" /> Doer Management System
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Repeated Work Management
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Task Tracker
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Bottleneck Management
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Workflows (FMS) <br />(As per requirement)
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Admin & Doer Dashboard
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Weekly Productivity Report
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Doer Performance Report
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Organisation Privilege's
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Auto Productivity Score
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Auto Notification Feature
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Employee Comparision Score
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Automated Reminder
                                                    </li>
                                                    {/* <li>
                                                        <i className="fal fa-check" /> Whatsapp Reminder (API#)
                                                    </li> */}
                                                    <li>
                                                        <i className="fal fa-check" /> Users (As per requirement)*
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> <b>Storage Space <br />(As per requirement)*</b>
                                                    </li>
                                                </ul>
                                                <div className="pricing-btn mt-35">
                                                    <a className="main-btn" href='javascript:void(0);' onClick={modalShow}>
                                                        Book A Demo
                                                    </a>
                                                    {/* <a className="main-btn" href="/modules">
                                                        Enquire Now!
                                                    </a> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <p className='mb-2 mt-50'>
                                            Safe & Secure Data Encryption for Advanced Security. All transmissions to and from Growthh.in, including sign-on, are encrypted at 256-bit and sent through TLS 1.2, adhering to the FIPS 140-2 certification standard.
                                        </p>
                                        <p className='mb-2'>
                                            <mark className='bg-transparent text-danger'>**</mark> GST charges are excluded.
                                        </p>
                                        {/* <p className='mb-2'>
                                            <mark className='bg-transparent text-danger'>#</mark>Whatsapp API cost charge not included.
                                        </p> */}
                                        <p>
                                            <mark className='bg-transparent text-dark'>*</mark> Storage is limited with plans. For additional storage contact support at <a href="tel:9831093864">98310-93864</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div id="year">
                                <div className="row justify-content-center">
                                    <div className="col-lg-3 col-md-6">
                                        <div className="pricing-one__single">
                                            <div className="pricig-heading">
                                                <h6>Free Trial</h6>
                                                <div className="price-range">
                                                    <sup></sup> <span>FREE</span>
                                                </div>
                                                <p>Get your 14 day free trial</p>
                                            </div>
                                            <div className="pricig-body">
                                                <ul>
                                                    <li>
                                                        <i className="fal fa-check" /> Doer Management System
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Repeated Work Management
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Task Tracker
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Bottleneck Management
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Workflows (FMS) <br />(Free upto 1 FMS)
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Admin & Doer Dashboard
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Weekly Productivity Report
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Doer Performance Report
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Organisation Privilege's
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Auto Productivity Score
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Auto Notification Feature
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Employee Comparision Score
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Automated Reminder
                                                    </li>
                                                    {/* <li>
                                                        <i className="fal fa-check" /> Whatsapp Reminder (API#)
                                                    </li> */}
                                                    <li>
                                                        <i className="fal fa-check" /> Storage Space <br />(Upto 50 MB)*
                                                    </li>
                                                </ul>
                                                <div className="pricing-btn mt-35">
                                                    <a className="main-btn" href="javascript:void(0);" onClick={modalShow}>
                                                        Sign Up!
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="pricing-one__single">
                                            <div className="pricig-heading business-growth">
                                                <h6>Business Growth</h6>
                                                <div className="price-range">
                                                    <sup>&#8377;</sup> <span>1,999</span>
                                                    <p>/month <mark className='bg-transparent text-danger'>**</mark></p>
                                                </div>
                                                <p>( Billed Yearly )</p>
                                            </div>
                                            <div className="pricing-rebon">
                                                <span>Most Popular</span>
                                            </div>
                                            <div className="pricig-body">
                                                <ul>
                                                    <li>
                                                        <i className="fal fa-check" /> Doer Management System
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Repeated Work Management
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Task Tracker
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Bottleneck Management
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Workflows (FMS) <br />(Free upto 5 FMS)
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Admin & Doer Dashboard
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Weekly Productivity Report
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Doer Performance Report
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Organisation Privilege's
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Auto Productivity Score
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Auto Notification Feature
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Employee Comparision Score
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Automated Reminder
                                                    </li>
                                                    {/* <li>
                                                        <i className="fal fa-check" /> Whatsapp Reminder (API#)
                                                    </li> */}
                                                    <li>
                                                        <i className="fal fa-check" /> Storage Space <br />(Upto 5 GB)*
                                                    </li>
                                                </ul>
                                                <div className="pricing-btn mt-35">
                                                    <a className="main-btn orange-btn" href="javascript:void(0);" onClick={modalShow}>
                                                        Sign Up!
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="pricing-one__single">
                                            <div className="pricig-heading express">
                                                <h6>Business Express</h6>
                                                <div className="price-range">
                                                    <sup>&#8377;</sup> <span>4,999</span>
                                                    <p>/month <mark className='bg-transparent text-danger'>**</mark></p>
                                                </div>
                                                <p>( Billed Yearly )</p>
                                            </div>
                                            <div className="pricig-body">
                                                <ul>
                                                    <li>
                                                        <i className="fal fa-check" /> Doer Management System
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Repeated Work Management
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Task Tracker
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Bottleneck Management
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Workflows (FMS) <br />(Free upto 10 FMS)
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Admin & Doer Dashboard
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Weekly Productivity Report
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Doer Performance Report
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Organisation Privilege's
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Auto Productivity Score
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Auto Notification Feature
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Employee Comparision Score
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Automated Reminder
                                                    </li>
                                                    {/* <li>
                                                        <i className="fal fa-check" /> Whatsapp Reminder (API#)
                                                    </li> */}
                                                    <li>
                                                        <i className="fal fa-check" /> Storage Space <br />(Upto 10 GB)*
                                                    </li>
                                                </ul>
                                                <div className="pricing-btn mt-35">
                                                    <a className="main-btn" href="javascript:void(0);" onClick={modalShow}>
                                                        Sign Up!
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="pricing-one__single">
                                            <div className="pricig-heading enterprise">
                                                <h6>Enterprise</h6>
                                                <div className="price-range">
                                                    <div className='requirement'>As per Requirement</div>
                                                </div>
                                                <p>( Billed Yearly )</p>
                                            </div>
                                            <div className="pricig-body">
                                                <ul>
                                                    <li>
                                                        <i className="fal fa-check" /> Doer Management System
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Repeated Work Management
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Task Tracker
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Bottleneck Management
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Workflows (FMS) <br />(As per requirement)
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Admin & Doer Dashboard
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Weekly Productivity Report
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Doer Performance Report
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Organisation Privilege's
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Auto Productivity Score
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Auto Notification Feature
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Employee Comparision Score
                                                    </li>
                                                    <li>
                                                        <i className="fal fa-check" /> Automated Reminder
                                                    </li>
                                                    {/* <li>
                                                        <i className="fal fa-check" /> Whatsapp Reminder (API#)
                                                    </li> */}
                                                    <li>
                                                        <i className="fal fa-check" /> Storage Space <br />(As per requirement)*
                                                    </li>
                                                </ul>
                                                <div className="pricing-btn mt-35">
                                                    <a className="main-btn" href="javascript:void(0);" onClick={modalShow}>
                                                        Enquire Now!
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <p className='mb-2 mt-50'>
                                            Safe & Secure Data Encryption for Advanced Security. All transmissions to and from Growthh.in, including sign-on, are encrypted at 256-bit and sent through TLS 1.2, adhering to the FIPS 140-2 certification standard.
                                        </p>
                                        <p className='mb-2'>
                                            <mark className='bg-transparent text-danger'>**</mark> GST charges are included.
                                        </p>
                                        <p>
                                            <mark className='bg-transparent text-dark'>*</mark> Storage is limited with plans. For additional storage contact support at <a href="tel:9831093864">98310-93864</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default PricingHomeOne;
