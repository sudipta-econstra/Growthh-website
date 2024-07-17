import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { format } from 'date-fns';

const CompanyDetailsModal = ({ show, handleClose, selectedCompany }) => {
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" centered size="xl" className="task-details-modal">
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className="task-title-edit-wrap">
                        <span className="task-name">{selectedCompany ? selectedCompany.company_name : 'Company Details'}</span>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="task-details-modal-body-wrap">
                <div className="task-details-modal-body">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <div className="status-item todo">
                                        <i className="fi fi-rr-user me-2"></i>
                                        <span>Company Name</span>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="profile-wrap">
                                        <div className="ps-2 text-truncate">{selectedCompany?.company_name}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <div className="status-item todo">
                                        <i className="fi fi-rr-dot-circle me-2"></i>
                                        <span>Status</span>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="status-item inprogress">
                                        <i className="fi fi-rr-process me-2"></i>
                                        <span>{selectedCompany?.status}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <div className="status-item todo">
                                        <i className="fi fi-rr-calendar me-2"></i>
                                        <span>Created At</span>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <span className="planned-date-txt">
                                        {selectedCompany ? format(new Date(selectedCompany?.created_at), "d MMMM, yyyy") : null}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <div className="status-item todo">
                                        <i className="fi fi-rr-calendar me-2"></i>
                                        <span>Updated At</span>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <span className="planned-date-txt">
                                        {selectedCompany ? format(new Date(selectedCompany?.updated_at), "d MMMM, yyyy") : null}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-3" />
                    <div className="description">
                        <h6>Description</h6>
                        <p>{selectedCompany?.description}</p>
                    </div>
                    <hr className="my-3" />
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default CompanyDetailsModal;