import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { checkTokenExpiry } from "../../Redux/slices/adminAuthSlice";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { format } from "date-fns";
import { getOrderHistory } from "../../services/Admin/api";

const AdminOrderHistory = ({ activeTab }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.adminAuth);
    const [orders, setOrders] = useState([]);
    const [showPlanDetails, setShowPlanDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (activeTab === "order") {
            dispatch(checkTokenExpiry());
            fetchOrders();
        }
    }, [token, dispatch, activeTab]);

    const fetchOrders = async () => {
        try {
            const response = await getOrderHistory(token);
            console.log(response.data.data);
            setOrders(response.data.data); // Assuming response.data is an array of orders
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleViewPlanDetails = (order) => {
        setSelectedOrder(order);
        setShowPlanDetails(true);
    };
    console.log("selected order",selectedOrder?.plan);
    const handleClosePlanDetails = () => {
        setShowPlanDetails(false);
        setSelectedOrder(null);
    };

    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Email</th>
                        <th>Owner Name</th>
                        <th>Contact Info</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.company.company_name}</td>
                            <td>{order.company.email}</td>
                            <td>{order.company.owner_name}</td>
                            <td>{order.company.contact_no}</td>
                            <td>{order.company.location}</td>
                            <td className="d-flex">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>View</Tooltip>}
                                >
                                    <button
                                        className="me-1 table-action-btn"
                                        onClick={() => handleViewPlanDetails(order)}
                                    >
                                        <i className="fi fi-rr-stop-circle"></i>
                                    </button>
                                </OverlayTrigger>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showPlanDetails} onHide={handleClosePlanDetails} backdrop="static" centered size="xl" className="task-details-modal">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="task-title-edit-wrap">
                            <span className="task-name">{selectedOrder ? selectedOrder.plan.plan_name : ''}</span>
                            <span className="task-edit"><i className="fi fi-rr-pencil"></i></span>
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
                                            <div className="ps-2 text-truncate">
                                                {selectedOrder && (
                                                    <span>{selectedOrder.company.company_name}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row align-items-center">
                                    <div className="col-4">
                                        <div className="status-item todo">
                                            <i className="fi fi-rr-dot-circle me-2"></i>
                                            <span>Contact No</span>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="status-item inprogress">
                                            <i className="fi fi-rr-process me-2"></i>
                                            <span>{selectedOrder?.company.contact_no}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="row align-items-center">
                                    <div className="col-4">
                                        <div className="status-item todo">
                                            <i className="fi fi-rr-calendar me-2"></i>
                                            <span>Owner Name</span>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <span className="planned-date-txt">
                                            {selectedOrder?.company.owner_name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row align-items-center">
                                    <div className="col-4">
                                        <div className="status-item todo">
                                            <i className="fi fi-rr-calendar me-2"></i>
                                            <span>Email</span>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <span className="planned-date-txt">
                                            {selectedOrder?.company.email}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-3" />
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="row align-items-center">
                                    <div className="col-4">
                                        <div className="status-item todo">
                                            <i className="fi fi-rr-calendar me-2"></i>
                                            <span>Location</span>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <span className="planned-date-txt">
                                            {selectedOrder?.company.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row align-items-center">
                                    <div className="col-4">
                                        <div className="status-item todo">
                                            <i className="fi fi-rr-calendar me-2"></i>
                                            <span>User Limit</span>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <span className="planned-date-txt">
                                            {selectedOrder ? selectedOrder.plan.user_limit : null}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-3" />

                        {/* Additional Table for Modules */}
                        <div className="row align-items-center">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body p-0">
                                       
                                            <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Plan Name</th>
                                                    <th>Price</th>
                                                    <th>User Limit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                    <tr >
                                                    <td>{selectedOrder?.plan?.plan_name}</td>
                                                    <td>{selectedOrder?.plan?.price}</td>
                                                    <td>{selectedOrder?.plan?.user_limit}</td>

                                                    </tr>
                                            </tbody>
                                            </Table>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AdminOrderHistory;
