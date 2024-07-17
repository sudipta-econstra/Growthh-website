import React, { useState } from 'react'
import "./cart.min.css"
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import LnModule from '../LandingModule/LnModule';


function CartPage() {
  //
  const [addonRemoveShow, setAddonRemoveShow] = useState(false);

  const hideReoveAddonModal = () => setAddonRemoveShow(false);
  const showReoveAddonModal = () => setAddonRemoveShow(true);
  //
  const [addMoreModuleModalShow, setAddMoreModuleModalShow] = useState(false);

  const hideAddModuleModal = () => setAddMoreModuleModalShow(false);
  const showAddonModuleModal = () => setAddMoreModuleModalShow(true);
  return (
    <React.Fragment>
      <section className="ln-cart-sec position-relative">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h4 className="mb-2">Selected Plan</h4>
              <div className="selected-plan mb-4">
                <div className="select-plan-header">
                  <h1 className="plan-name">Business Growth</h1>
                  <div className="select-plan-price">
                    &#8377; <span>1,999</span>/month
                  </div>
                  <div>
                    Yearly Subscription<br />
                    Renews <span>June 16, 2024</span>
                  </div>
                </div>

                <div className="select-plan-details-wrap">
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
                  <div>
                    <p className="mb-1 notes">
                    <mark className='bg-transparent text-danger'>**</mark> GST charges are included.
                    </p>
                    <p className="mb-1 notes">
                    <mark className='bg-transparent text-danger'>#</mark>Whatsapp API cost charge not included.
                    </p>
                    <p className="notes">
                      <mark className="bg-transparent text-dark">*</mark>
                      Storage is limited with plans. For additional storage contact support at <a href="tel:9831093864" className="gth-text-primary1">98310-93864</a>
                    </p>
                  </div>

                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h4 className="mb-0">Addon Module</h4>
                <label className="mb-0 gth-text-primary1 cursor-pointer" onClick={showAddonModuleModal}><i class="fi fi-br-plus me-2"></i>Add More</label>
              </div>

              <div className="addon-module-wrapper">
                <div className="addon-module-item">
                  <span className="module-icon"><i className="fi fi-sr-crm-computer"></i></span>
                  <div className="ps-3">
                    <span className="module-name">CRM</span>
                    <p className="cart-short-desc">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </p>
                  </div>

                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip>
                        Remove
                      </Tooltip>
                    }
                  >
                    <button className="module-selected" onClick={showReoveAddonModal} ><i class="fi fi-sr-circle-xmark"></i></button>
                  </OverlayTrigger>
                </div>
                <div className="addon-module-item">
                  <span className="module-icon"><i className="fi fi-sr-module"></i></span>
                  <div className="ps-3">
                    <span className="module-name">Inventory Management</span>
                    <p className="cart-short-desc">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </p>
                  </div>
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip>
                        Remove
                      </Tooltip>
                    }
                  >
                    <button className="module-selected" onClick={showReoveAddonModal} ><i class="fi fi-sr-circle-xmark"></i></button>
                  </OverlayTrigger>
                </div>
                <div className="addon-module-item">
                  <span className="module-icon"><i className="fi fi-br-gears"></i></span>

                  <div className="ps-3">
                    <span className="module-name">Production Management</span>
                    <p className="cart-short-desc">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </p>
                  </div>
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip>
                        Remove
                      </Tooltip>
                    }
                  >
                    <button className="module-selected" onClick={showReoveAddonModal} ><i class="fi fi-sr-circle-xmark"></i></button>
                  </OverlayTrigger>
                </div>
                <div className="addon-module-item">
                  <span className="module-icon"><i className="fi fi-sr-diagram-project"></i></span>

                  <div className="ps-3">
                    <span className="module-name">Project Management</span>
                    <p className="cart-short-desc">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </p>
                  </div>
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip>
                        Remove
                      </Tooltip>
                    }
                  >
                    <button className="module-selected" onClick={showReoveAddonModal} ><i class="fi fi-sr-circle-xmark"></i></button>
                  </OverlayTrigger>
                </div>
                <div className="addon-module-item">
                  <span className="module-icon"><i className="fi fi-sr-hr"></i></span>

                  <div className="ps-3">
                    <span className="module-name">HR</span>
                    <p className="cart-short-desc">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </p>
                  </div>
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip>
                        Remove
                      </Tooltip>
                    }
                  >
                    <button className="module-selected" onClick={showReoveAddonModal} ><i class="fi fi-sr-circle-xmark"></i></button>
                  </OverlayTrigger>
                </div>
                <div className="addon-module-item">
                  <span className="module-icon"><i className="fi fi-sr-brand"></i></span>

                  <div className="ps-3">
                    <span className="module-name">Purchase Management</span>
                    <p className="cart-short-desc">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </p>
                  </div>
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip>
                        Remove
                      </Tooltip>
                    }
                  >
                    <button className="module-selected" onClick={showReoveAddonModal} ><i class="fi fi-sr-circle-xmark"></i></button>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="plan-details-wrap">
                <h4 className="mb-2">Plan Details</h4>
                <div className="card plan-details-card">
                  <div className="card-body p-4">
                    <table className="custom-table">
                      <tr>
                        <th>
                          <span className="text-muted"><u>Plan</u></span><br />
                          Business Growth
                        </th>
                        <th>
                          <span className="">&#8377; <span>1,999</span></span>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <span className="text-muted"><u>Addon Module</u></span><br />
                          CRM<br />
                          Inventory Management<br />
                          BMS<br />
                          Production Management<br />
                          Project Management<br />
                          HR<br />
                          Purchase Management<br />
                        </th>
                        <th>
                          <span className="">&#8377; <span>999</span></span>
                        </th>
                      </tr>
                      <tr className="border-bottom tbl-foot">
                        <th>
                          <span className="text-dark total">Total</span>
                        </th>
                        <th>
                          <span className="text-dark total">&#8377; <span>2,998</span></span>
                        </th>
                      </tr>
                    </table>
                    <p className="my-3"><small>Next charge date: 24 June, 2025</small></p>
                    <div className="text-center mt-3">
                      <a href="/login" className="gtn-warning-btn text-uppercase">Confirm</a>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* module remove modal */}
      <Modal show={addonRemoveShow} onHide={hideReoveAddonModal} backdrop="static"
        keyboard={false} centered>
        <Modal.Body className="bg-warning-light rounded-top-left-10 rounded-top-right-10">
          <div className="delete-warning-wrap text-center">
            <div className="delete-warning-icon mb-0 mt-2">
              <i class="fi fi-sr-triangle-warning text-warning"></i>
            </div>
            <h4 className="text-dark mb-2">Are you sure?</h4>
            <p className="text-muted">Do you really want to remove this module? <br />This process cannot be undone.</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <button onClick={hideReoveAddonModal} className="btn btn-secondary">
            Close
          </button>
          <button onClick={hideReoveAddonModal} className="btn btn-exp-red">
            Remove
          </button>
        </Modal.Footer>
      </Modal>
      {/* module remove modal end*/}
      {/* module add modal start*/}
      <Modal show={addMoreModuleModalShow} onHide={hideAddModuleModal} backdrop="static" keyboard={false} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Modules</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <LnModule />

          <div className="text-center mt-3">
            <button className="gtn-success-btn text-uppercase">
              Confirm
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/* module add modal end*/}
    </React.Fragment>
  )
}

export default CartPage