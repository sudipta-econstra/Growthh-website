import React, { useState, useEffect,useRef } from "react";
import Table from "react-bootstrap/Table";
import {
    getSuspendedCompanies,
    changeCompanyStatus,
    deleteCompany // Import deleteCompany function
} from "../../services/Admin/api";
import { useSelector, useDispatch } from "react-redux";
import { checkTokenExpiry } from "../../Redux/slices/adminAuthSlice";
import { OverlayTrigger, Popover, Tooltip, Form, Button } from "react-bootstrap";
import CompanyDetailsModal from "./CompanyDetailsModal";
import Pagination from "./Pagination"; // Import your Pagination component

const AdminRejectCompany = ({ activeTab }) => {
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
    const statusArray = ["Active", "Suspend"];
    const filterDropDownArray = ['company_name', 'contact_no', 'email', 'location', 'created_at'];

    useEffect(() => {
        if (activeTab === "Suspended") {
            dispatch(checkTokenExpiry());
            fetchSuspendedCompanies();
        }
    }, [currentPage, token, dispatch, activeTab]);

    const fetchSuspendedCompanies = async () => {
        try {
            const response = await getSuspendedCompanies(token, currentPage, limit, statusFilter, searchQuery, startDate, endDate);
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
                // Remove the company from suspendedCompanies if changing status to Active
                if (newStatus === "Active") {
                    setSuspendedCompanies((prevCompanies) =>
                        prevCompanies.filter((c) => c.id !== company.id)
                    );
                } else {
                    // Update status in suspendedCompanies if changing status to Suspend
                    setSuspendedCompanies((prevCompanies) =>
                        prevCompanies.map((c) =>
                            c.id === company.id ? { ...c, status: newStatus } : c
                        )
                    );
                }
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

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const handleDeleteCompany = async (companyId) => {
        try {
            await deleteCompany(token, companyId);
            setSuspendedCompanies((prevCompanies) =>
                prevCompanies.filter((c) => c.id !== companyId)
            );
        } catch (error) {
            console.error("Error deleting company:", error);
        }
    };

    return (
        <>
            <Form className="mb-3">
                <div className="row">
                    <div className="col-md-3">
                        <Form.Group controlId="statusFilter">
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" value={statusFilter} onChange={(e) => { statusFilterRef.current = e.target.value; setStatusFilter(e.target.value)}}>
                                {filterDropDownArray.map((val,index) => (
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
                                onChange={(e) => { searchQueryRef.current = e.target.value; setSearchQuery(e.target.value)}}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3">
                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={startDate}
                                onChange={(e) => { startDateRef.current = e.target.value; setStartDate(e.target.value)}}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3">
                        <Form.Group controlId="endDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={endDate}
                                onChange={(e) => { endDateRef.current = e.target.value; setEndDate(e.target.value)}}
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
                    {suspendedCompanies.map((company) => (
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
                setCurrentPage={goToPage} // Pass goToPage as setCurrentPage prop
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

export default AdminRejectCompany;
