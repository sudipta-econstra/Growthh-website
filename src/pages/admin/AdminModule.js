import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { checkTokenExpiry } from '../../Redux/slices/adminAuthSlice';
import { getAllModule, deleteModule, editModule, createModule, changeModuleStatus } from '../../services/Admin/api';
import { Button, Dropdown, OverlayTrigger, Tooltip, Popover } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { format } from 'date-fns';

const AdminModule = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.adminAuth);
    const [tableData, setTableData] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [moduleName, setModuleName] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [isEditMode, setIsEditMode] = useState(false); // New state to manage mode

    const statusArray = ['Active', 'Suspend'];

    const [showModuleDetails, setShowModuleDetails] = useState(false);
    const handleCloseModuleDetails = () => setShowModuleDetails(false);
    const handleShowModuleDetails = (module) => {
        setSelectedModule(module);
        setModuleName(module.module_name);
        setModuleDescription(module.description);
        setIsEditMode(true); // Set to edit mode
        setShowModuleDetails(true);
    };

    const handleShowCreateModule = () => {
        setSelectedModule(null);
        setModuleName('');
        setModuleDescription('');
        setIsEditMode(false); // Set to create mode
        setShowModuleDetails(true);
    };

    useEffect(() => {
        dispatch(checkTokenExpiry());

        const fetchData = async () => {
            try {
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await getAllModule(token);
                if (response && response.data) {
                    setTableData(response.data);
                } else {
                    throw new Error('Empty response from server');
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token, dispatch]);

    const handleSaveChanges = async () => {
        try {
            if (isEditMode && !selectedModule) {
                throw new Error('No module selected');
            }

            const updatedData = {
                module_name: moduleName,
                description: moduleDescription
            };

            let response;
            if (isEditMode) {
                response = await editModule(token, selectedModule.id, updatedData);
            } else {
                response = await createModule(token, updatedData);
            }

            if (response) {
                const updatedTableData = isEditMode
                    ? tableData.map(module => {
                        if (module.id === selectedModule.id) {
                            return {
                                ...module,
                                module_name: updatedData.module_name,
                                description: updatedData.description
                            };
                        }
                        return module;
                    })
                    : [...tableData, response.data]; // Assuming response.data contains the new module

                setTableData(updatedTableData);
                setShowModuleDetails(false);
            } else {
                throw new Error('Failed to save module');
            }
        } catch (error) {
            console.error('Error saving module:', error);
        }
    };

    const handleDeleteModule = async (moduleId) => {
        try {
            const response = await deleteModule(token, moduleId);
            if (response) {
                const updatedTableData = tableData.filter(module => module.id !== moduleId);
                setTableData(updatedTableData);
                setSelectedModule(null);
            } else {
                throw new Error('Failed to delete module');
            }
        } catch (error) {
            console.error('Error deleting module:', error);
        }
    };

    const handleStatusChange = async (module, newStatus) => {
        try {
            const response = await changeModuleStatus(token, module.id, newStatus);
            if (response) {
                const updatedTableData = tableData.map((m) => {
                    if (m.id === module.id) {
                        return { ...m, status: newStatus };
                    }
                    return m;
                });
                setTableData(updatedTableData);
                setSelectedModule((prev) => (prev && prev.id === module.id ? { ...prev, status: newStatus } : prev));
            } else {
                throw new Error('Failed to update module status');
            }
        } catch (error) {
            console.error('Error updating module status:', error);
        }
    };

    const priorityChange = (row, handleStatusChange) => (
        <Popover id="plannedDate" className="pariority-wrap">
            <div className="pariority-list">
                {statusArray.map((status) => (
                    <div
                        key={status}
                        className="priority-set priority-list-item"
                        onClick={() => handleStatusChange(row, status)}
                    >
                        <i className={`fi ${status === 'Active' ? 'fi fi-ss-check-circle' : 'fi fi-sr-stop-circle'} mr-2`}></i>
                        <span>{status}</span>
                    </div>
                ))}
            </div>
        </Popover>
    );


    const columns = [
        {
            name: "Module Name",
            selector: (row) => row.module_name,
            sortable: true,
            width: "260px",
        },
        {
            name: "Description",
            selector: (row) => row.description,
            sortable: true,
            width: "260px",
        },
        {
            name: "Logo",
            selector: (row) => row.logo,
            sortable: true,
            width: "180px",
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
            width: "150px",
            cell: (row) => (
                <OverlayTrigger
                    trigger="click"
                    rootClose
                    placement="auto"
                    overlay={priorityChange(row, handleStatusChange)}
                >
                    <button className="table-data-change-btn">
                        <div className={`priority-set ${row.status.toLowerCase()}`}>
                            <i className={`fi ${row.status === 'Active' ? 'fi fi-ss-check-circle' : 'fi fi-sr-stop-circle'} mr-2`}></i>
                            <span>{row.status}</span>
                        </div>
                    </button>
                </OverlayTrigger>
            ),
        },
        {
            name: "Action",
            minWidth: "310px",
            cell: (row) => (
                <div className="d-flex">
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip>
                                Edit
                            </Tooltip>
                        }
                    >
                        <button className="me-1 table-action-btn" onClick={() => handleShowModuleDetails(row)}>
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
                        <button className="me-1 table-action-btn" onClick={() => handleDeleteModule(row.id)}>
                            <i className="fi fi-rr-trash text-exp-red"></i>
                        </button>
                    </OverlayTrigger>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="row align-items-center">
                <div className="col-4">
                    <div className="status-item todo">
                        <i className="fi fi-rr-dot-circle me-2"></i>
                        <button onClick={handleShowCreateModule}>Create New Module</button>
                    </div>
                </div>
            </div>
            {tableData &&
                <div className="card">
                    <div className="card-body p-0">
                        <DataTable
                            columns={columns}
                            data={tableData}
                            pagination={false}
                            theme="solarized"
                            striped
                            className='custom-table-wrap workflow-table-striped'
                        />
                    </div>
                </div>
            }
            <Modal show={showModuleDetails} onHide={handleCloseModuleDetails} backdrop="static" centered size="xl" className="task-details-modal">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="task-title-edit-wrap">
                            <span className="task-name">{isEditMode ? selectedModule.module_name : 'New Module'}</span>
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
                                            <span>Module Name</span>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="profile-wrap">
                                            <div className="ps-2 text-truncate">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={moduleName}
                                                    onChange={(e) => setModuleName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isEditMode && (
                                <>
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
                                                    <span>{selectedModule?.status}</span>
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
                                                    {selectedModule ? format(selectedModule?.created_at, "d MMMM, yyyy") : null}
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
                                                    {selectedModule ? format(selectedModule?.updated_at, "d MMMM, yyyy") : null}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <hr className="my-3" />
                        <div className="description">
                            <h6>Description</h6>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={moduleDescription}
                                onChange={(e) => setModuleDescription(e.target.value)}
                            />
                        </div>
                        <hr className="my-3" />
                        <Button variant="primary" onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AdminModule;
