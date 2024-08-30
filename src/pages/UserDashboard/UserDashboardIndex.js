import React, { useEffect, useRef, useState } from 'react'
import '../../landingAssets/css/custom-animated.css';
import '../../landingAssets/css/default.css';
import '../../landingAssets/css/font-awesome.min.css';
import '../../landingAssets/css/magnific-popup.css';
import '../../landingAssets/css/magnific.dark.css';
import '../../landingAssets/css/magnific.rtl.css';
import '../../landingAssets/css/main.css';
import '../../landingAssets/css/style.css';
import "./user-dashboard.min.css"
import Loader from '../landing/loder/Loader.jsx';
import FooterHomeOne from '../landing/Home/FooterHomeOne.jsx';
import { Modal, OverlayTrigger, ProgressBar, Tooltip } from 'react-bootstrap';
import Select from 'react-select'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import AvatarEditor from 'react-avatar-editor'





function UserDashboardIndex() {
  //tab active
  const [activeTab, setActiveTab] = useState('accountinformation');

  const handleUsersGoClick = () => {
    setActiveTab('users');
  };

  const handlePaymentHistoryGoClick = () => {
    setActiveTab('paymentHistory');
  };

  const handlePlanDetailsGoClick = () => {
    setActiveTab('plan');
  };

  useEffect(() => {
    const tabContent = document.getElementById(activeTab);
    if (tabContent) {
      tabContent.scrollTop = 0;
    }
  }, [activeTab]);
  //profile image
  const [image, setImage] = useState('');
  const [scale, setScale] = useState(1.0);
  const editorRef = useRef(null);

  const handleScaleChange = (event) => {
    const scale = parseFloat(event.target.value);
    setScale(scale);
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      const imgData = canvas.toDataURL();
      console.log('Cropped Image Data URL:', imgData);
    }
  };
  //profile image end
  //role
  const permissionFor = [
    { value: 'crm', label: 'CRM' },
    { value: 'ims', label: 'Inventory Management' },
    { value: 'bms', label: 'BMS' },
    { value: 'prdms', label: 'Production Management' },
    { value: 'prjms', label: 'Project Management' },
    { value: 'hr', label: 'HR' },
    { value: 'purms', label: 'Purchase Management' }
  ]
  //role
  const roleType = [
    { value: 'select', label: '-Select-' },
    { value: 'owner', label: 'Owner' },
    { value: 'member', label: 'Member' }
  ]
  //profile image modal
  const [profileImageModalShow, setProfileImageModalShow] = useState(false);
  const handleProfileImageModalClose = () => setProfileImageModalShow(false);
  const handleProfileImageModalShow = () => setProfileImageModalShow(true);
  //edit user modal
  const [editUserShow, setEditUserShow] = useState(false);
  const editUserModalClose = () => setEditUserShow(false);
  const editUserModalShow = () => setEditUserShow(true);
  //view user modal
  const [viewUserShow, setViewUserShow] = useState(false);
  const viewUserModalClose = () => setViewUserShow(false);
  const viewUserModalShow = () => setViewUserShow(true);
  //Create user modal
  const [createUserShow, setCreateUserShow] = useState(false);
  const createUserModalClose = () => setCreateUserShow(false);
  const createUserModalShow = () => setCreateUserShow(true);
  //delete modal
  const [deleteShow, setDeleteShow] = useState(false);
  const deleteModalClose = () => setDeleteShow(false);
  const deleteModalShow = () => setDeleteShow(true);
  // Storage modal
  const [showStorageModal, setShowStorageModal] = useState(false);
  const handleStorageModalClose = () => setShowStorageModal(false);
  const handleStorageModalShow = () => setShowStorageModal(true);

  // Plan Modal
  const [showPlanModal, setShowPlanModal] = useState(false);
  const handlePlanModalClose = () => setShowPlanModal(false);
  const handlePlanModalShow = () => setShowPlanModal(true);
  //Loader
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
        <div className='user-account-page'>
          <div>
            <header className="user-account-header-wrap">
              <div className="container">
                <div className="user-account-header-cont">
                  <div className="logo-wrap">
                    <a href='/'><img src={process.env.PUBLIC_URL + 'assets/images/logo-navy.png'} alt="Logo" className="img-fluid brand-name" /></a>
                  </div>
                  <a href="#" className="gth-btn-outline d-flex align-items-center">
                    Sign Out <i className="fi fi-br-sign-out-alt mt-1 ms-2"></i>
                  </a>
                </div>
              </div>
            </header>
            <div className="user-account-content-wrapper">
              <div className="container-fluid px-0">
                <div>
                  <ul className="nav nav-tabs gth-tabs user-account-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'accountinformation' ? 'active' : ''}`}
                        data-bs-toggle="tab"
                        data-bs-target="#accountinformation"
                        type="button"
                        role="tab"
                        aria-selected={activeTab === 'accountinformation'}
                        onClick={() => setActiveTab('accountinformation')}
                      >
                        <i className="fi fi-sr-user"></i> Profile Information
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                        data-bs-toggle="tab"
                        data-bs-target="#users"
                        type="button"
                        role="tab"
                        aria-selected={activeTab === 'users'}
                        onClick={() => setActiveTab('users')}
                      >
                        <i className="fi fi-sr-users"></i> Users List
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'plan' ? 'active' : ''}`}
                        data-bs-toggle="tab"
                        data-bs-target="#plan"
                        type="button"
                        role="tab"
                        aria-selected={activeTab === 'plan'}
                        onClick={() => setActiveTab('plan')}
                      >
                        <i className="fi fi-sr-credit-card"></i> Plan Details
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'paymentHistory' ? 'active' : ''}`}
                        data-bs-toggle="tab"
                        data-bs-target="#paymentHistory"
                        type="button"
                        role="tab"
                        aria-selected={activeTab === 'paymentHistory'}
                        onClick={() => setActiveTab('paymentHistory')}
                      >
                        <i className="fi fi-ss-receipt"></i> Payment History
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content user-dashboard-tab-content">
                    <div className={`tab-pane ${activeTab === 'accountinformation' ? 'active' : ''}`} id="accountinformation" role="tabpanel">
                      <div className="container pt-5 pb-4">
                        <div className="row justify-content-center">
                          <div className="col-lg-9 col-md-12 mb-4">
                            <div className="card ghostwhite">
                              <div className="card-body">
                                <div className='user-profile-wrap'>
                                  <div className="profile-image-outer">
                                    <img className="profile-image" src={image || process.env.PUBLIC_URL + 'assets/images/user-profile-pictures/profile-user.png'} alt="user" />
                                    <div className="profile-image-overlay" onClick={handleProfileImageModalShow}>
                                      <i class="fi fi-sr-user"></i>
                                      <p>Change Profile Picture</p>
                                    </div>
                                  </div>
                                  <div className="profile-desc">
                                    <div className='form-group'>
                                      <label className='form-label'>Name</label>
                                      <div className="editable-field d-flex align-items-center flex-wrap">
                                        <div className="position-relative editable-area">
                                          <button className="profile-edit-btn">
                                            <i className="fi fi-rr-pencil"></i>
                                          </button>
                                          <input type="text" value="Subhadeep Chowdhury" className="input-field" />
                                        </div>
                                        <span className='badge rounded-pill exp-badge-primary-light'>OWNER</span>
                                      </div>
                                    </div>
                                    <div className='form-group'>
                                      <label className='form-label'>Email</label>
                                      <div className="editable-field">
                                        <div className="position-relative editable-area">
                                          <button className="profile-edit-btn">
                                            <i className="fi fi-rr-pencil"></i>
                                          </button>
                                          <input type="text" value="subhadeepchowdhury@example.com" className="input-field" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className='form-group'>
                                      <label className='form-label'>Phone</label>
                                      <div className="editable-field">
                                        <div className="position-relative editable-area">
                                          <button className="profile-edit-btn">
                                            <i className="fi fi-rr-pencil"></i>
                                          </button>
                                          <input type="text" value="+91 00000 00000" className="input-field" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className='form-group'>
                                      <label className='form-label'>WhatsApp</label>
                                      <div className="editable-field">
                                        <div className="position-relative editable-area">
                                          <button className="profile-edit-btn">
                                            <i className="fi fi-rr-pencil"></i>
                                          </button>
                                          <input type="text" value="+91 00000 00000" className="input-field" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className='form-group mb-0'>
                                      <label className='form-label'>Location</label>
                                      <div className="editable-field">
                                        <div className="position-relative editable-area">
                                          <button className="profile-edit-btn">
                                            <i className="fi fi-rr-pencil"></i>
                                          </button>
                                          <input type="text" value="USA" className="input-field" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <h4 className="mt-4 text-center">Go to you workspace</h4>
                            <div className="mt-3 mb-4">
                              <div className="module-list-wrap">
                                <a href="#" className="module-checkbox-list-item">
                                  <span className="module-icon"><i className="fi fi-ss-department"></i></span>
                                  <span className="module-name">BMS</span>
                                </a>
                                <a href="#" className="module-checkbox-list-item">
                                  <span className="module-icon"><i className="fi fi-sr-crm-computer"></i></span>
                                  <span className="module-name">CRM</span>
                                </a>
                                <a href="#" className="module-checkbox-list-item">
                                  <span className="module-icon"><i className="fi fi-sr-module"></i></span>
                                  <span className="module-name">Inventory Management</span>
                                </a>
                                <a href="#" className="module-checkbox-list-item">
                                  <span className="module-icon"><i className="fi fi-br-gears"></i></span>
                                  <span className="module-name">Production Management</span>
                                </a>
                                <a href="#" className="module-checkbox-list-item">
                                  <span className="module-icon"><i className="fi fi-sr-diagram-project"></i></span>
                                  <span className="module-name">Project Management</span>
                                </a>
                                <a href="#" className="module-checkbox-list-item">
                                  <span className="module-icon"><i className="fi fi-sr-hr"></i></span>
                                  <span className="module-name">HR</span>
                                </a>
                                <a href="#" className="module-checkbox-list-item">
                                  <span className="module-icon"><i className="fi fi-sr-brand"></i></span>
                                  <span className="module-name">Purchase Management</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row gx-4 justify-content-center">
                          <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                            <div className="card current-plan-card h-100">
                              <div className="card-body">
                                <div className="current-plan-card-wrap">
                                  <span className="badge rounded-pill gth-bg-info">Active Plan</span>
                                  <h6 className="current-plan-name">Business Growth</h6>
                                  <p className="expire-text pe-3">Your plan will expire within <span>30 days</span></p>
                                  <div className="d-flex justify-content-between mt-3">
                                    <button className="btn btn-dark btn-sm rounded-4" onClick={handlePlanDetailsGoClick}>View</button>
                                    <button className="btn btn-success btn-sm rounded-4" onClick={handlePlanModalShow}>Upgrade</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                            <div className="card user-card h-100">
                              <div className="card-body">
                                <div className="user-card-wrap">
                                  <h6>Total Number of Users</h6>
                                  <div className="d-flex align-items-center mt-2">
                                    <span className="users-icon">
                                      <i className="fi fi-rr-users-alt"></i>
                                    </span>
                                    <p className="user-number ps-3">3</p>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center mt-3">
                                    <p className="left-number">Left: <span className="gth-text-danger">1</span></p>
                                    <button id="users-go" className="btn btn-dark btn-sm rounded-4 view-details" onClick={handleUsersGoClick}>View</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row gx-4 justify-content-center">
                          <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                            <div className="card storage-card h-100">
                              <div className="card-body">
                                <div className="storage-card-wrap">
                                  <div className="d-flex justify-content-between">
                                    <h6>Your Storage</h6>
                                    <div className="f-w-medium text-primary">25% Left</div>
                                  </div>
                                  <p className="mt-2">1.2 GB of 5 GB are used</p>
                                  <div className="mb-3">
                                    <ProgressBar animated variant="warning" now={75} />
                                  </div>
                                  <div className="text-end">
                                    <button className="btn btn-success btn-sm rounded-4 view-details" onClick={handleStorageModalShow}>Upgrade</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
                            <div className="card payment-history h-100">
                              <div className="card-body">
                                <div className="payment-card-wrap">
                                  <h6>Total Payment</h6>
                                  <div className="d-flex align-items-center mt-3 amount mb-3">
                                    <i className="fi fi-br-indian-rupee-sign"></i>
                                    <p className="amount-number ps-2">25,000.00</p>
                                  </div>
                                  <div className="text-right">
                                    <button className="btn btn-dark btn-sm rounded-4 view-details" onClick={handlePaymentHistoryGoClick}>View History</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`tab-pane ${activeTab === 'users' ? 'active' : ''}`} id="users" role="tabpanel">
                      <div className="container pt-5 pb-4">
                        <div className="card">
                          <div className="card-header gth-blue-light-bg d-flex justify-content-between align-items-center">
                            <h5 className="gth-modal-title">Users List</h5>
                            <button className="btn btn-exp-green me-0 ms-auto" onClick={createUserModalShow}>Create User</button>
                          </div>
                          <div className="card-body">
                            <div className="fixed-table-wrapper">
                              <table className="table mb-0 table-striped fixedTable-head">
                                <thead>
                                  <tr>
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className="profile-wrap">
                                        <div className="exp-avtar bg-exp-green">
                                          <span>JP</span>
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                          <h5 className="profile-name text-nowrap text-truncate">Jhon Parker</h5>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <span>Owner</span>
                                    </td>
                                    <td>
                                      <span>jhonparker@example.com</span>
                                    </td>
                                    <td>
                                      <span>0000000000</span>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              View
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={viewUserModalShow}>
                                            <i className="fi fi-rs-eye"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Edit
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={editUserModalShow}>
                                            <i className="fi fi-rr-pencil"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Delete
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={deleteModalShow}>
                                            <i className="fi fi-rr-trash text-exp-red"></i>
                                          </button>
                                        </OverlayTrigger>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="profile-wrap">
                                        <div className="exp-avtar">
                                          <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671741_1517351722263.jpg'} alt="user" />
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                          <h5 className="profile-name text-truncate">Subhadeep Chowdhury</h5>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <span>Owner</span>
                                    </td>
                                    <td>
                                      <span>subhadeepchowdhury@example.com</span>
                                    </td>
                                    <td>
                                      <span>0000000000</span>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              View
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={viewUserModalShow}>
                                            <i className="fi fi-rs-eye"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Edit
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={editUserModalShow}>
                                            <i className="fi fi-rr-pencil"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Delete
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={deleteModalShow}>
                                            <i className="fi fi-rr-trash text-exp-red"></i>
                                          </button>
                                        </OverlayTrigger>
                                      </div>

                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="profile-wrap bg-light">
                                        <div className="exp-avtar">
                                          <i class="fi fi-rr-user user-icon"></i>
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                          <h5 className="profile-name text-nowrap text-truncate">Sujit Paul</h5>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <span>Member</span>
                                    </td>
                                    <td>
                                      <span>sujitpaul@example.com</span>
                                    </td>
                                    <td>
                                      <span>0000000000</span>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              View
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={viewUserModalShow}>
                                            <i className="fi fi-rs-eye"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Edit
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={editUserModalShow}>
                                            <i className="fi fi-rr-pencil"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Delete
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={deleteModalShow}>
                                            <i className="fi fi-rr-trash text-exp-red"></i>
                                          </button>
                                        </OverlayTrigger>
                                      </div>

                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="profile-wrap">
                                        <div className="exp-avtar bg-exp-blue">
                                          <span>MS</span>
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                          <h5 className="profile-name text-nowrap text-truncate">Moumita Shome</h5>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <span>Member</span>
                                    </td>
                                    <td>
                                      <span>moumitashome@example.com</span>
                                    </td>
                                    <td>
                                      <span>0000000000</span>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              View
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={viewUserModalShow}>
                                            <i className="fi fi-rs-eye"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Edit
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={editUserModalShow}>
                                            <i className="fi fi-rr-pencil"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Delete
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={deleteModalShow}>
                                            <i className="fi fi-rr-trash text-exp-red"></i>
                                          </button>
                                        </OverlayTrigger>
                                      </div>

                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="profile-wrap">
                                        <div className="exp-avtar">
                                          <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                          <h5 className="profile-name text-truncate text-nowrap">Gopal Mukherjee</h5>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <span>Member</span>
                                    </td>
                                    <td>
                                      <span>gopalmukherjee@example.com</span>
                                    </td>
                                    <td>
                                      <span>0000000000</span>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              View
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={viewUserModalShow}>
                                            <i className="fi fi-rs-eye"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Edit
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={editUserModalShow}>
                                            <i className="fi fi-rr-pencil"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Delete
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={deleteModalShow}>
                                            <i className="fi fi-rr-trash text-exp-red"></i>
                                          </button>
                                        </OverlayTrigger>
                                      </div>

                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="profile-wrap">
                                        <div className="exp-avtar">
                                          <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671741_1517351722263.jpg'} alt="user" />
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                          <h5 className="profile-name text-truncate">Subhadeep Chowdhury</h5>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <span>Owner</span>
                                    </td>
                                    <td>
                                      <span>subhadeepchowdhury@example.com</span>
                                    </td>
                                    <td>
                                      <span>0000000000</span>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              View
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={viewUserModalShow}>
                                            <i className="fi fi-rs-eye"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Edit
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={editUserModalShow}>
                                            <i className="fi fi-rr-pencil"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Delete
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={deleteModalShow}>
                                            <i className="fi fi-rr-trash text-exp-red"></i>
                                          </button>
                                        </OverlayTrigger>
                                      </div>

                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="profile-wrap bg-light">
                                        <div className="exp-avtar">
                                          <i class="fi fi-rr-user user-icon"></i>
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                          <h5 className="profile-name text-nowrap text-truncate">Sujit Paul</h5>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <span>Member</span>
                                    </td>
                                    <td>
                                      <span>sujitpaul@example.com</span>
                                    </td>
                                    <td>
                                      <span>0000000000</span>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              View
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={viewUserModalShow}>
                                            <i className="fi fi-rs-eye"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Edit
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={editUserModalShow}>
                                            <i className="fi fi-rr-pencil"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Delete
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={deleteModalShow}>
                                            <i className="fi fi-rr-trash text-exp-red"></i>
                                          </button>
                                        </OverlayTrigger>
                                      </div>

                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="profile-wrap">
                                        <div className="exp-avtar bg-exp-blue">
                                          <span>MS</span>
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                          <h5 className="profile-name text-nowrap text-truncate">Moumita Shome</h5>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <span>Member</span>
                                    </td>
                                    <td>
                                      <span>moumitashome@example.com</span>
                                    </td>
                                    <td>
                                      <span>0000000000</span>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              View
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={viewUserModalShow}>
                                            <i className="fi fi-rs-eye"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Edit
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={editUserModalShow}>
                                            <i className="fi fi-rr-pencil"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Delete
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={deleteModalShow}>
                                            <i className="fi fi-rr-trash text-exp-red"></i>
                                          </button>
                                        </OverlayTrigger>
                                      </div>

                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="profile-wrap">
                                        <div className="exp-avtar">
                                          <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                          <h5 className="profile-name text-truncate text-nowrap">Gopal Mukherjee</h5>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <span>Member</span>
                                    </td>
                                    <td>
                                      <span>gopalmukherjee@example.com</span>
                                    </td>
                                    <td>
                                      <span>0000000000</span>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              View
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={viewUserModalShow}>
                                            <i className="fi fi-rs-eye"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Edit
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={editUserModalShow}>
                                            <i className="fi fi-rr-pencil"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Delete
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={deleteModalShow}>
                                            <i className="fi fi-rr-trash text-exp-red"></i>
                                          </button>
                                        </OverlayTrigger>
                                      </div>

                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="profile-wrap">
                                        <div className="exp-avtar">
                                          <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                          <h5 className="profile-name text-truncate text-nowrap">Gopal Mukherjee</h5>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <span>Member</span>
                                    </td>
                                    <td>
                                      <span>gopalmukherjee@example.com</span>
                                    </td>
                                    <td>
                                      <span>0000000000</span>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              View
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={viewUserModalShow}>
                                            <i className="fi fi-rs-eye"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Edit
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={editUserModalShow}>
                                            <i className="fi fi-rr-pencil"></i>
                                          </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip>
                                              Delete
                                            </Tooltip>
                                          }
                                        >
                                          <button className="me-1 table-action-btn" onClick={deleteModalShow}>
                                            <i className="fi fi-rr-trash text-exp-red"></i>
                                          </button>
                                        </OverlayTrigger>
                                      </div>

                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`tab-pane ${activeTab === 'plan' ? 'active' : ''}`} id="plan" role="tabpanel">
                      <div className="container pt-5 pb-4">
                        <div className="card">
                          <div className="card-header gth-blue-light-bg d-flex justify-content-between align-items-center">
                            <h5 className="gth-modal-title">Plan Details</h5>
                          </div>
                          <div className="card-body">
                            <div className="fixed-table-wrapper">
                              <table className="table mb-0 table-striped fixedTable-head">
                                <thead>
                                  <tr>
                                    <th><span className="text-nowrap">Plan Name</span></th>
                                    <th><span className="text-nowrap">Start Date</span></th>
                                    <th><span className="text-nowrap">Date of Expiration</span></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <h6 className="me-2 text-nowrap">Business Growth</h6> <span class="badge rounded-pill gth-bg-info">Active Plan</span>
                                      </div>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2023</span>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2024</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <h6 className="me-2 text-nowrap">Business Growth</h6>
                                      </div>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2023</span>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2024</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <h6 className="me-2 text-nowrap">Business Growth</h6>
                                      </div>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2023</span>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2024</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <h6 className="me-2 text-nowrap">Business Growth</h6>
                                      </div>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2023</span>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2024</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <h6 className="me-2 text-nowrap">Business Growth</h6>
                                      </div>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2023</span>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2024</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <h6 className="me-2 text-nowrap">Business Growth</h6>
                                      </div>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2023</span>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2024</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <h6 className="me-2 text-nowrap">Business Growth</h6>
                                      </div>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2023</span>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2024</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <h6 className="me-2 text-nowrap">Business Growth</h6>
                                      </div>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2023</span>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2024</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <h6 className="me-2 text-nowrap">Business Growth</h6>
                                      </div>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2023</span>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2024</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`tab-pane ${activeTab === 'paymentHistory' ? 'active' : ''}`} id="paymentHistory" role="tabpanel">
                      <div className="container pt-5 pb-4">
                        <div className="card">
                          <div className="card-header gth-blue-light-bg d-flex justify-content-between align-items-center">
                            <h5 className="gth-modal-title">Payment History</h5>
                          </div>
                          <div className="card-body">
                            <div className="fixed-table-wrapper">
                              <table className="table mb-0 table-striped fixedTable-head">
                                <thead>
                                  <tr>
                                    <th><span className="text-nowrap">Purchase Plan</span></th>
                                    <th><span className="text-nowrap">Purchase Date</span></th>
                                    <th><span className="text-nowrap">Transaction ID</span></th>
                                    <th><span className="text-nowrap">Amount</span></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <h6 className="me-2 text-nowrap">Business Growth</h6> <span class="badge rounded-pill gth-bg-info">Active Plan</span>
                                      </div>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2023</span>
                                    </td>
                                    <td>
                                      <span>#GTHTRNSID00000000</span>
                                    </td>
                                    <td>
                                      <span className="text-nowrap">&#8377; 1,999.00</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <h6 className="me-2 text-nowrap">Business Growth</h6>
                                      </div>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2023</span>
                                    </td>
                                    <td>
                                      <span>#GTHTRNSID00000000</span>
                                    </td>
                                    <td>
                                      <span className="text-nowrap">&#8377; 1,999.00</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <h6 className="me-2 text-nowrap">Business Growth</h6>
                                      </div>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2023</span>
                                    </td>
                                    <td>
                                      <span>#GTHTRNSID00000000</span>
                                    </td>
                                    <td>
                                      <span className="text-nowrap">&#8377; 1,999.00</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="d-flex">
                                        <h6 className="me-2 text-nowrap">Cloud 20GB</h6>
                                      </div>
                                    </td>
                                    <td>
                                      <span>01 Jan, 2023</span>
                                    </td>
                                    <td>
                                      <span>#GTHTRNSID00000000</span>
                                    </td>
                                    <td>
                                      <span className="text-nowrap">&#8377; 1,000.00</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div>
            <FooterHomeOne />
          </div>
        </div>

      </div>

      {/* Plan Modal */}
      <Modal show={showPlanModal} onHide={handlePlanModalClose} animation={false} centered backdrop="static" className="fullscreen">
        <Modal.Header closeButton className="gth-blue-light-bg">
          <Modal.Title className="gth-modal-title">Our plans</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <div className="row justify-content-center">
            <div className="col-12 mb-5 text-center">
              <h2>Choose the right plan for your team</h2>
              <h4>Thank you for choosing Growthh.in!</h4>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="pricing-one__single">
                <div className="card-active-plan"><span className="badge rounded-pill gth-bg-info">Active Plan</span></div>
                <label className="custom-radio">
                  <input type="radio" name="selectPlan" />
                  <span className="checkmark" />
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
                      <li>
                        <i className="fal fa-check" /> Whatsapp Reminder (API#)
                      </li>
                      <li>
                        <i className="fal fa-check" /> 3 Users
                      </li>
                      <li>
                        <i className="fal fa-check" /> Storage Space <br />(Upto 50 MB)*
                      </li>
                    </ul>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="pricing-one__single">
                <div className="card-active-plan"><span className="badge rounded-pill gth-bg-success">Upgrade Plan</span></div>
                <label className="custom-radio">
                  <input type="radio" name="selectPlan" />
                  <span className="checkmark" />
                  <div className="pricig-heading business-growth">
                    <h6>Business Growth</h6>
                    <div className="price-range">
                      <sup>&#8377;</sup> <span>1,999</span>
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
                        <i className="fal fa-check" /> Workflows (FMS) <br />(Upto 3 FMS)
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
                        <i className="fal fa-check" /> Whatsapp Reminder (API#)
                      </li>
                      <li>
                        <i className="fal fa-check" /> 10 Users
                      </li>
                      <li>
                        <i className="fal fa-check" /> Storage Space <br />(Upto 2 GB)*
                      </li>
                    </ul>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="pricing-one__single">
                <div className="card-active-plan"><span className="badge rounded-pill gth-bg-success">Upgrade Plan</span></div>
                <label className="custom-radio">
                  <input type="radio" name="selectPlan" />
                  <span className="checkmark" />
                  <div className="pricig-heading express">
                    <h6>Business Express</h6>
                    <div className="price-range">
                      <sup>&#8377;</sup> <span>4,999</span>
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
                        <i className="fal fa-check" /> Whatsapp Reminder (API#)
                      </li>
                      <li>
                        <i className="fal fa-check" /> 30 Users
                      </li>
                      <li>
                        <i className="fal fa-check" /> Storage Space <br />(Upto 5 GB)*
                      </li>
                    </ul>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="pricing-one__single">
                <div className="card-active-plan"><span className="badge rounded-pill gth-bg-success">Upgrade Plan</span></div>
                <label className="custom-radio">
                  <input type="radio" name="selectPlan" />
                  <span className="checkmark" />
                  <div className="pricig-heading enterprise">
                    <h6>Enterprise</h6>
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
                      <li>
                        <i className="fal fa-check" /> Whatsapp Reminder (API#)
                      </li>
                      <li>
                        <i className="fal fa-check" /> Users (As per requirement)*
                      </li>
                      <li>
                        <i className="fal fa-check" /> Storage Space <br />(As per requirement)*
                      </li>
                    </ul>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-12">
              <p className='mb-2 mt-50'>
                Safe & Secure Data Encryption for Advanced Security. All transmissions to and from Growthh.in, including sign-on, are encrypted at 256-bit and sent through TLS 1.2, adhering to the FIPS 140-2 certification standard.
              </p>
              <p className='mb-2'>
                <mark className='bg-transparent text-danger'>**</mark> GST charges are included.
              </p>
              <p className='mb-2'>
                <mark className='bg-transparent text-danger'>#</mark>Whatsapp API cost charge not included.
              </p>
              <p>
                <mark className='bg-transparent text-dark'>*</mark> Storage is limited with plans. For additional storage contact support at <a href="tel:9831093864">98310-93864</a>
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="gth-btn-primary" onClick={handlePlanModalClose}>
            Continue
          </button>
        </Modal.Footer>
      </Modal>
      {/* Plan Modal End*/}
      {/* Storage Modal*/}
      <Modal show={showStorageModal} onHide={handleStorageModalClose} animation={false} centered backdrop="static" size="xl">
        <Modal.Header closeButton className="gth-blue-light-bg">
          <Modal.Title className="gth-modal-title">Upgrade Storage Plans</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <div className="row justify-content-center">
            <div className="col-12 mb-5 text-center">
              <h2>Choose the right storage plan for your team</h2>
              <h4 className="text-muted">Thank you for choosing Growthh.in!</h4>
              <p className="mt-3">
                Storage upgrades are charged with base plans. The validity of the storage remains as long as there is a base plan subscription. Without a base plan you can not use this storage.
              </p>
            </div>
            <div className="col-12">
              <div className="storage-plan-wrap">
                <div className="storage-plan-item">
                  <label className="custom-radio">
                    <input type="radio" name="selectStoragePlan" />
                    <span className="checkmark" />
                    <div className="storage-heading">
                      <h6>Cloud 2GB</h6>
                      <div className="storage-unit">
                        <i class="fi fi-rr-cloud-back-up me-2"></i><span>2 GB</span>
                      </div>
                      <div className="storage-price">
                        <>&#8377;</> <span>999</span>
                        <p>/month</p>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="storage-plan-item">
                  <label className="custom-radio">
                    <input type="radio" name="selectStoragePlan" />
                    <span className="checkmark" />
                    <div className="storage-heading">
                      <h6>Cloud 5GB</h6>
                      <div className="storage-unit">
                        <i class="fi fi-rr-cloud-back-up me-2"></i><span>5 GB</span>
                      </div>
                      <div className="storage-price">
                        <>&#8377;</> <span>1,999</span>
                        <p>/month</p>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="storage-plan-item">
                  <label className="custom-radio">
                    <input type="radio" name="selectStoragePlan" />
                    <span className="checkmark" />
                    <div className="storage-heading">
                      <h6>Cloud 10GB</h6>
                      <div className="storage-unit">
                        <i class="fi fi-rr-cloud-back-up me-2"></i><span>10 GB</span>
                      </div>
                      <div className="storage-price">
                        <>&#8377;</> <span>3,499</span>
                        <p>/month</p>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="storage-plan-item">
                  <label className="custom-radio">
                    <input type="radio" name="selectStoragePlan" />
                    <span className="checkmark" />
                    <div className="storage-heading">
                      <h6>Cloud 20GB</h6>
                      <div className="storage-unit">
                        <i class="fi fi-rr-cloud-back-up me-2"></i><span>20 GB</span>
                      </div>
                      <div className="storage-price">
                        <>&#8377;</> <span>7,999</span>
                        <p>/month</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12">
              <p className='mb-0 mt-40 text-center'>
                Once storage plans are upgraded, it can not be downgraded. For more information kindly contact <a href="mailto:support@growthh.in">support@growthh.in</a>
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="gth-btn-primary" onClick={handleStorageModalClose}>
            Continue
          </button>
        </Modal.Footer>
      </Modal>
      {/* Storage Modal End*/}
      {/* Delete modal start */}
      <Modal
        show={deleteShow}
        onHide={deleteModalClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton className="gth-light-red-bg">
          <Modal.Title className="gth-text-danger">Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="delete-confirm-wrap text-center">
            <div className="delete-confirm-icon mb-3 mt-2">
              <img src={process.env.PUBLIC_URL + 'assets/images/delete-warning.svg'} alt="Warning" className="img-fluid" />
            </div>
            <h4 className="text-muted">Are you sure?</h4>
            <p className="text-muted">
              Do you really want to delete these record? This process cannot be undone.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <button className='btn btn-secondary' onClick={deleteModalClose}>
            Cancel
          </button>
          <button className='btn btn-exp-red'>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
      {/* Delete modal end */}
      {/* Create User modal start */}
      <Modal
        show={createUserShow}
        onHide={createUserModalClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="gth-blue-light-bg">
          <Modal.Title className="gth-modal-title">Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body className='pb-1'>
          <div className='row'>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">User name</label>
                <input type="text" className="form-control" placeholder="Enter user name" />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">Role</label>
                <Select
                  name='roleType'
                  options={roleType}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: '#ddddff',
                      primary: '#6161ff',
                    },
                  })}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="Enter user email" />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <PhoneInput
                  country={'us'}
                //value={this.state.phone}
                //onChange={phone => this.setState({ phone })}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">WhatsApp</label>
                <PhoneInput
                  country={'us'}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">Permission for</label>
                <Select
                  name='permissionFor'
                  options={permissionFor}
                  isMulti="true"
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: '#ddddff',
                      primary: '#6161ff',
                    },
                  })}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-exp-green'>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
      {/* Create User modal end */}
      {/* View User modal start */}
      <Modal
        show={viewUserShow}
        onHide={viewUserModalClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="gth-blue-light-bg">
          <Modal.Title className="gth-modal-title">Subhadeep Chowdhury</Modal.Title>
        </Modal.Header>
        <Modal.Body className='pb-1'>
          <div className='row'>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">User name</label>
                <p>Subhadeep Chowdhury</p>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">Role</label>
                <p>Owner</p>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">Email</label>
                <p>subhadeepchowdhury@example.com</p>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <p>+91 00000 00000</p>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">WhatsApp</label>
                <p>+91 00000 00000</p>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">Permission for</label>
                <p>
                  <span className="badge rounded-pill exp-badge-primary-light me-2 mb-1">CRM</span>
                  <span className="badge rounded-pill exp-badge-primary-light me-2 mb-1">Inventory Management</span>
                  <span className="badge rounded-pill exp-badge-primary-light me-2 mb-1">BMS</span>
                  <span className="badge rounded-pill exp-badge-primary-light me-2 mb-1">Production Management</span>
                  <span className="badge rounded-pill exp-badge-primary-light me-2 mb-1">Project Management</span>
                  <span className="badge rounded-pill exp-badge-primary-light me-2 mb-1">HR</span>
                  <span className="badge rounded-pill exp-badge-primary-light me-2 mb-1">Purchase Management</span>

                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* View User modal end */}
      {/* Edit User modal start */}
      <Modal
        show={editUserShow}
        onHide={editUserModalClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="gth-blue-light-bg">
          <Modal.Title className="gth-modal-title">Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body className='pb-1'>
          <div className='row'>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">User name</label>
                <input type="text" className="form-control" placeholder="Enter user name" />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">Role</label>
                <Select
                  name='roleType'
                  options={roleType}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: '#ddddff',
                      primary: '#6161ff',
                    },
                  })}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="Enter user email" />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <PhoneInput
                  country={'us'}
                //value={this.state.phone}
                //onChange={phone => this.setState({ phone })}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">WhatsApp</label>
                <PhoneInput
                  country={'us'}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className="form-group">
                <label className="form-label">Permission for</label>
                <Select
                  name='permissionFor'
                  options={permissionFor}
                  isMulti="true"
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: '#ddddff',
                      primary: '#6161ff',
                    },
                  })}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-exp-green'>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
      {/* Edit User modal end */}
      {/* Profile image modal start */}
      <Modal
        show={profileImageModalShow}
        onHide={handleProfileImageModalClose}
        backdrop="static"
        keyboard={false}
        centered
        size="md"
      >
        <Modal.Header closeButton className="gth-blue-light-bg">
          <Modal.Title className="gth-modal-title">Profile Image </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-12'>
              <AvatarEditor
                ref={editorRef}
                image={image}
                width={200}
                height={200}
                border={40}
                borderRadius={150}
                color={[0, 0, 0, 0.72]}
                scale={scale}
                className="avtar-editor-wrap"
              />
              <div className="form-group mt-3">
                <label htmlFor="upload" className="form-label">Upload Image:</label>
                <input
                  type="file"
                  className="form-control"
                  id="upload"
                  onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="scale" className="form-label">Scale:</label>
                <input
                  type="range"
                  className="form-control-range"
                  id="scale"
                  value={scale}
                  min="1"
                  max="2"
                  step="0.01"
                  onChange={handleScaleChange}
                />
              </div>
              <div className="mt-3 d-flex justify-content-end">
                <button className="btn btn-exp-green" onClick={handleSave}>Crop and Save</button>
              </div>

            </div>

          </div>
        </Modal.Body>

      </Modal>
      {/* Profile image modal end */}
    </>
  )
}

export default UserDashboardIndex


