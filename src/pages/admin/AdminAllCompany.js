import React, { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import { getAllCompanies, changeCompanyStatus, deleteCompany } from "../../services/Admin/api";
import { useSelector, useDispatch } from "react-redux";
import { checkTokenExpiry } from "../../Redux/slices/adminAuthSlice";
import { OverlayTrigger, Popover, Tooltip, Form, Button, Row, Col } from "react-bootstrap";
import CompanyDetailsModal from "./CompanyDetailsModal";
import Pagination from "./Pagination"; // Import Pagination component

const AdminAllCompany = ({ activeTab }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.adminAuth);
    const [companies, setCompanies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const statusFilter = useRef('');
    const [searchFilterVal, setSearchFilter] = useState('');
    const searchQuery = useRef(''); // Search input state
    const [searchQ, setSearchQ] = useState('');
    const startDate = useRef('');
    const [startDateForSearch,setStartDateForSearch] = useState('');
    const endDate = useRef(''); 
    const [endDateForSearch,setEndDateForSearch] = useState('');
    const limit = 10;
    const statusArray = ["Active", "Suspend"];
    const filterDropDownArray = ['company_name', 'contact_no', 'email', 'location', 'created_at'];

    useEffect(() => {
        if (activeTab === "All") {
            dispatch(checkTokenExpiry());
            fetchCompanies();
        }
    }, [currentPage, token, dispatch, activeTab]);

    const fetchCompanies = async () => {
        try {
            const response = await getAllCompanies(token, currentPage, limit, statusFilter.current, searchQuery.current, startDate.current, endDate.current);
            setCompanies(response.data.data);
            setTotalPages(response.data.meta.total_pages);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleFilter = () => {
        setCurrentPage(1); // Reset to first page on filter change
        fetchCompanies();
    };

    const clearFilters = () => {
        statusFilter.current = ''; // Dropdown state
        searchQuery.current = ''; // Search input state
        startDate.current = ''; // Start date state
        endDate.current = '';
        setSearchFilter('');
        setSearchQ('');
        setStartDateForSearch('');
        setEndDateForSearch('');
        setCurrentPage(1);
        console.log("clearing filters");
        fetchCompanies();
    };

    const statusChange = (row, handleStatusChange) => (
        <Popover id="plannedDate" className="pariority-wrap">
            <div className="pariority-list">
                {statusArray.map((status) => (
                    <div
                        key={status}
                        className="priority-set priority-list-item"
                        onClick={() => handleStatusChange(row, status)}
                    >
                        <i
                            className={`fi ${status === "Active"
                                ? "fi fi-ss-check-circle"
                                : "fi fi-sr-stop-circle"
                                } mr-2`}
                        ></i>
                        <span>{status}</span>
                    </div>
                ))}
            </div>
        </Popover>
    );

    const handleStatusChange = async (company, newStatus) => {
        try {
            const response = await changeCompanyStatus(token, company.id, newStatus);
            if (response) {
                setCompanies((prevCompanies) =>
                    prevCompanies.map((c) =>
                        c.id === company.id ? { ...c, status: newStatus } : c
                    )
                );
            } else {
                throw new Error("Failed to update company status");
            }
        } catch (error) {
            console.error("Error updating company status:", error);
        }
    };

    const handleViewCompany = (company) => {
        setSelectedCompany(company);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setSelectedCompany(null);
        setShowDetails(false);
    };

    const handleDeleteCompany = async (companyId) => {
        try {
            await deleteCompany(token, companyId);
            setCompanies((prevCompanies) => prevCompanies.filter((c) => c.id !== companyId));
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Form className="mb-3">
                <Row>
                    <Col md={3}>
                        <Form.Group controlId="statusFilter">
                            <Form.Label>Search Filter</Form.Label>
                            <Form.Control as="select" value={searchFilterVal} onChange={(e) => {statusFilter.current = e.target.value;
                                setSearchFilter(e.target.value);
                            }}>
                                {filterDropDownArray.map((val, index) => (
                                    <option key={index} value={val}>{val}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="searchQuery">
                            <Form.Label>Search</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Search by company name"
                                value={searchQ}
                                onChange={(e) => { searchQuery.current = e.target.value; setSearchQ(e.target.value) }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={startDateForSearch}
                                onChange={(e) => { startDate.current = e.target.value; setStartDateForSearch(e.target.value)}}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="endDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={endDateForSearch}
                                onChange={(e) => { endDate.current = e.target.value; setEndDateForSearch(e.target.value)}}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="mt-3">
                    <Button className="me-2" onClick={handleFilter}>Filter</Button>
                    <Button variant="secondary" onClick={clearFilters}>Clear Filters</Button>
                </div>
            </Form>

            <Table responsive>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Email</th>
                        <th>Total Employees</th>
                        <th>Owner Name</th>
                        <th>Contact Info</th>
                        <th>Location</th>
                        <th>Turnover</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => (
                        <tr key={company.id}>
                            <td>{company.company_name}</td>
                            <td>{company.email}</td>
                            <td>{company.total_employees}</td>
                            <td>{company.owner_name}</td>
                            <td>{company.contact_no}</td>
                            <td>{company.location}</td>
                            <td>{company.turn_over}</td>
                            <td>
                                <OverlayTrigger
                                    trigger="click"
                                    rootClose
                                    placement="auto"
                                    overlay={statusChange(company, handleStatusChange)}
                                >
                                    <button className="table-data-change-btn">
                                        <div
                                            className={`priority-set ${company.status.toLowerCase()}`}
                                        >
                                            <i
                                                className={`fi ${company.status === "Active"
                                                    ? "fi fi-ss-check-circle"
                                                    : "fi fi-sr-stop-circle"
                                                    } mr-2`}
                                            ></i>
                                            <span>{company.status}</span>
                                        </div>
                                    </button>
                                </OverlayTrigger>
                            </td>
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
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Delete</Tooltip>}
                                >
                                    <button
                                        className="me-1 table-action-btn"
                                        onClick={() => handleDeleteCompany(company.id)}
                                    >
                                        <i className="fi fi-rr-trash text-exp-red"></i>
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
                setCurrentPage={setCurrentPage}
            />
            {selectedCompany && (
                <CompanyDetailsModal
                    show={showDetails}
                    handleClose={handleCloseDetails}
                    selectedCompany={selectedCompany}
                />
            )}
        </>
    );
};

export default AdminAllCompany;
