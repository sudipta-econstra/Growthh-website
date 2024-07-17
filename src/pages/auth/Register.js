import React, { useEffect, useRef, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import { Link } from 'react-router-dom';
import Loader from '../landing/loder/Loader';

function Register() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });
  //
  const [openTime, setOpenTime] = useState(new Date());
  const [closeTime, setCloseTime] = useState(new Date());

  const handleComplete = () => {
    console.log("Form completed!");
    // Handle form completion logic here
  };
  const handleSkip = () => {
    console.log("Skip!");
    // Handle form completion logic here
  };

  const backTemplate = (handlePrevious) => {
    return (
      <button className="action-btn back-button" onClick={handlePrevious}>
        Back
      </button>
    );
  };
  //file upload
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
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
                  <h1 className='login-title'>
                    Join our community and unlock a world of possibilities -
                    <span className='position-relative sign-in me-2'>
                      <span>SIGN UP!</span>
                      <svg viewBox="0 0 156 59" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-blue login-svg"><path d="M156 41C156 50.9411 147.89 58.735 138.408 55.7499C135.073 54.7001 131.284 53.8018 124.799 53.8018C109.2 53.8018 109.197 59 93.598 59C77.9988 59 77.9987 53.8018 62.3995 53.8018C46.8003 53.8018 46.7977 59 31.1985 59C24.7151 59 20.9263 58.102 17.5923 57.0526C8.1099 54.0677 0 45.7429 0 35.8018V18C0 8.05888 8.1099 0.265901 17.5923 3.2508C20.9263 4.30029 24.7151 5.19824 31.1985 5.19824C46.7977 5.19824 46.7977 0 62.3995 0C78.0013 0 77.9988 5.19824 93.598 5.19824C109.197 5.19824 109.197 0 124.799 0C131.284 0 135.073 0.898168 138.408 1.94782C147.89 4.93288 156 13.2571 156 23.1982V41Z" ></path></svg>
                    </span>
                  </h1>
                  <div className="multi-step-form shadow">
                    <FormWizard
                      onComplete={handleComplete}
                      onSkip={handleSkip}
                      //onTabChange={tabChanged}
                      color="#00c875"
                      backButtonTemplate={backTemplate}

                      nextButtonTemplate={(handleNext) => (
                        <button className="action-btn continue-btn" onClick={handleNext}>
                          Continue
                        </button>
                      )}
                      finishButtonTemplate={(handleComplete) => (
                        <a href="/user-dashboard" className="action-btn finish-button" onClick={handleComplete}>
                          Finish
                        </a>
                      )}
                    >
                      <FormWizard.TabContent title="Company Info" icon="fi fi-rs-city">
                        <div className='row'>
                          <div className='col-12'>
                            <div className="form-group">
                              <label className="form-label">Company Name <span className="text-danger">*</span></label>
                              <input type="text" className="form-control" placeholder="Company Name" />
                            </div>
                          </div>
                          <div className='col-12'>
                            <div className="form-group">
                              <label className="form-label">Company Phone No <span className="text-danger">*</span></label>
                              <input type="tel" className="form-control" placeholder="Company Phone No" />
                            </div>
                          </div>
                          <div className='col-12'>
                            <div className="form-group">
                              <label className="form-label">Company WhatsApp No <span className="text-danger">*</span></label>
                              <input type="tel" class="form-control" placeholder="Company WhatsApp No" />
                            </div>
                          </div>
                          <div className='col-12'>
                            <div className="form-group">
                              <label className="form-label">Company Length</label>
                              <input type="text" className="form-control" placeholder="Company Length" />
                            </div>
                          </div>
                          <div className='col-12'>
                            <div className="form-group">
                              <label className="form-label">Company Turnover</label>
                              <input type="text" className="form-control" placeholder="Company Turnover" />
                            </div>
                          </div>
                          <div className='col-12'>
                            <div className="form-group">
                              <label className="form-label">Company Logo</label>
                              <div className="custom-file-input">
                                <button type="button" onClick={handleButtonClick} className="text-nowrap">
                                  Select File
                                </button>
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  style={{ display: 'none' }}
                                  onChange={handleFileChange}
                                />
                                {selectedFile && (
                                  <div className="file-info text-truncate">
                                    {selectedFile.name}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </FormWizard.TabContent>

                      <FormWizard.TabContent title="Personal Details" icon="fi fi-rr-user">
                        <div className='row'>
                          <div className='col-12'>
                            <div className="form-group">
                              <label className="form-label">Contact Person Name <span className="text-danger">*</span></label>
                              <input type="text" className="form-control" placeholder="Contact Person Name" />
                            </div>
                          </div>
                          <div className='col-12'>
                            <div className="form-group">
                              <label className="form-label">Contact Person Email <span className="text-danger">*</span></label>
                              <input type="email" className="form-control" placeholder="Contact Person Email" />
                            </div>
                          </div>
                          <div className='col-12'>
                            <div className="form-group">
                              <label className="form-label">Contact Person Phone No <span className="text-danger">*</span></label>
                              <input type="tel" class="form-control" placeholder="Contact Person Phone No" />
                            </div>
                          </div>
                          <div className='col-12'>
                            <div className="form-group">
                              <label className="form-label">Contact Person WhatsApp No <span className="text-danger">*</span></label>
                              <input type="tel" class="form-control" placeholder="Contact Person WhatsApp No" />
                            </div>
                          </div>

                        </div>
                      </FormWizard.TabContent>
                    </FormWizard>

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

    </>
  )
}

export default Register