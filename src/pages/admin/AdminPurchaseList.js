import React, { useState, useEffect, useRef } from "react";
import { Modal, Table, Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { getPurchaseList } from "../../services/Admin/api";
import { useSelector, useDispatch } from "react-redux";
import { checkTokenExpiry } from "../../Redux/slices/adminAuthSlice";
import Pagination from "./Pagination"; // Import your Pagination component

const AdminPurchaseList = ({ activeTab }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.adminAuth);
    const [suspendedCompanies, setSuspendedCompanies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');
    const statusFilterRef = useRef('');
    const [searchQuery, setSearchQuery] = useState('');
    const searchQueryRef = useRef('');
    const [startDate, setStartDate] = useState('');
    const startDateRef = useRef('');
    const [endDate, setEndDate] = useState('');
    const endDateRef = useRef('');
    const limit = 10;
    const filterDropDownArray = ['created_at'];

    useEffect(() => {
        if (activeTab === "purchase") {
            dispatch(checkTokenExpiry());
            fetchSuspendedCompanies();
        }
    }, [currentPage, token, dispatch, activeTab]);

    const fetchSuspendedCompanies = async () => {
        try {
            const response = await getPurchaseList(token, currentPage, limit, statusFilter, searchQuery, startDate, endDate);
            console.log(response);
            setSuspendedCompanies(response.data.data);
            setTotalPages(response.data.meta.total_pages);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleFilter = () => {
        setCurrentPage(1); // Reset to first page on filter change
        fetchSuspendedCompanies();
    };

    const clearFilters = () => {
        statusFilterRef.current = ''; // Dropdown state
        searchQueryRef.current = ''; // Search input state
        startDateRef.current = ''; // Start date state
        endDateRef.current = '';
        setStatusFilter('');
        setSearchQuery('');
        setStartDate('');
        setEndDate('');
        setCurrentPage(1); // Reset to first page after clearing filters
        fetchSuspendedCompanies(); // Fetch suspended companies after clearing filters
    };

    const handleViewCompany = (company) => {
        setSelectedCompany(company);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setSelectedCompany(null);
        setShowDetails(false);
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Form className="mb-3">
                <div className="row">
                    <div className="col-md-3">
                        <Form.Group controlId="statusFilter">
                            <Form.Label>Seach Input</Form.Label>
                            <Form.Control as="select" value={statusFilter} onChange={(e) => { statusFilterRef.current = e.target.value; setStatusFilter(e.target.value) }}>
                                {filterDropDownArray.map((val, index) => (
                                    <option key={index} value={val}>{val}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-md-3">
                        <Form.Group controlId="searchQuery">
                            <Form.Label>Search</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Search by company name"
                                value={searchQuery}
                                onChange={(e) => { searchQueryRef.current = e.target.value; setSearchQuery(e.target.value) }}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3">
                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={startDate}
                                onChange={(e) => { startDateRef.current = e.target.value; setStartDate(e.target.value) }}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3">
                        <Form.Group controlId="endDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={endDate}
                                onChange={(e) => { endDateRef.current = e.target.value; setEndDate(e.target.value) }}
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className="mt-3">
                    <Button className="me-2" onClick={handleFilter}>Filter</Button>
                    <Button variant="secondary" onClick={clearFilters}>Clear Filters</Button>
                </div>
            </Form>

            <Table responsive>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Transaction Id</th>
                        <th>Purchased At</th>
                        <th>Plan Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {suspendedCompanies && suspendedCompanies.map((company) => (
                        <tr key={company?.id}>
                            <td>{company?.order?.id}</td>
                            <td>{company?.transaction_id}</td>
                            <td>{company?.created_at}</td>
                            <td>{company?.order?.plan?.plan_name}</td>
                            <td>{company?.order?.plan?.price}</td>
                            <td><span>{company?.status}</span></td>
                            <td className="d-flex">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>View</Tooltip>}
                                >
                                    <button
                                        className="me-1 table-action-btn"
                                        onClick={() => handleViewCompany(company)}
                                    >
                                        <i className="fi fi-rr-stop-circle"></i>
                                    </button>
                                </OverlayTrigger>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={goToPage} // Pass goToPage as setCurrentPage prop
            />

            {selectedCompany && (
                <Modal show={showDetails} onHide={handleCloseDetails} backdrop="static" centered size="xl" className="task-details-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div className="task-title-edit-wrap">
                                <span className="task-name">{selectedCompany.order?.company?.company_name}</span>
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
                                                    <span>{selectedCompany.order?.company?.company_name}</span>
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
                                                <span>Transction ID</span>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <div className="status-item inprogress">
                                                <i className="fi fi-rr-process me-2"></i>
                                                <span>{selectedCompany?.transaction_id}</span>
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
                                                <span>Status</span>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <span className="planned-date-txt">
                                                {selectedCompany.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="row align-items-center">
                                        <div className="col-4">
                                            <div className="status-item todo">
                                                <i className="fi fi-rr-calendar me-2"></i>
                                                <span>Purchased At</span>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <span className="planned-date-txt">
                                                {selectedCompany ? selectedCompany.created_at : null}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-3" />
                            <div className="description">
                                <h6>Plan Details</h6>
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <div className="row align-items-center">
                                            <div className="col-4">
                                                <div className="status-item todo">
                                                    <i className="fi fi-rr-calendar me-2"></i>
                                                    <span>Order ID</span>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <span className="planned-date-txt">
                                                    {selectedCompany?.order?.id}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="row align-items-center">
                                            <div className="col-4">
                                                <div className="status-item todo">
                                                    <i className="fi fi-rr-calendar me-2"></i>
                                                    <span>Plan Name</span>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <span className="planned-date-txt">
                                                    {selectedCompany?.order?.plan?.plan_name}
                                                </span>
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
                                                    <span>Price</span>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <span className="planned-date-txt">
                                                    {selectedCompany?.order?.plan?.price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="row align-items-center">
                                            <div className="col-4">
                                                <div className="status-item todo">
                                                    <i className="fi fi-rr-calendar me-2"></i>
                                                    <span>Price</span>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <span className="planned-date-txt">
                                                    {selectedCompany?.order?.plan?.user_limit}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <hr className="my-3" />
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};

export default AdminPurchaseList;
