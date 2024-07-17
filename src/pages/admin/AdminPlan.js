import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { checkTokenExpiry } from '../../Redux/slices/adminAuthSlice';
import { deletepPlan, changePlanStatus, getAllPlan, editPlan, getAllModule, createPlan } from '../../services/Admin/api';
import { Button, OverlayTrigger, Tooltip, Popover } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { format } from 'date-fns';

const AdminPlan = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.adminAuth);
    const [tableData, setTableData] = useState([]);
    const [moduleTableData, setModuleTableData] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [planName, setPlanName] = useState('');
    const [price, setPrice] = useState('');
    const [display, setDisplay] = useState(false);
    const [discount, setDiscount] = useState('');
    const [allModule, setAllModuleData] = useState([]);
    const [userLimit, setUserLimit] = useState('');
    const [buttonModules, setButtonModules] = useState([]);
    const [extractedIdOfModule, setExtractedIdOfModule] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [moduleIdsForNewCreate,setModuleIdsForNewCreate] = useState([]);
    const statusArray = ['Active', 'Suspend'];

    const [showPlanDetails, setShowPlanDetails] = useState(false);
    const handleClosePlanDetails = () => setShowPlanDetails(false);
    const handleShowplanDetails = (plan) => {
        console.log("Plan modules", plan);
        // const planModuleNames = plan.modules.map(plan => plan.module.module_name);
        setButtonModules(allModule);

        setExtractedIdOfModule(plan.modules.map((data) => data.module.id));
        console.log(plan);
        setSelectedPlan(plan);
        setPlanName(plan.plan_name);
        setPrice(plan.price);
        setDiscount(plan.discount);
        setUserLimit(plan.user_limit);
        setModuleTableData(plan.modules);
        setShowPlanDetails(true);
        console.log(typeof plan.display, plan.display);
        setDisplay(plan.display);
        setEditMode(true);
    };
    const handleCreateNewPlan =()=>{
        setSelectedPlan(null);
        setPlanName('');
        setPrice(null);
        setDiscount(null);
        setUserLimit(null);
        setModuleTableData([]);
        setShowPlanDetails(true);
        setDisplay(null);
        setEditMode(false);
    }
    
    console.log("moduleTableData",moduleTableData);

    const handleAddNewModuleForNewPlan = (module) => {
        const newModule = {
            "id": module.id,
            "plan_id": module.id,
            "module": {
                "id": module.id,
                "module_name": module.module_name,
                "description": module.description,
                "logo": module.logo
            },
            "created_at": module.created_at,
            "updated_at": module.updated_at,
        };
        setModuleTableData(prevModuleData => [...prevModuleData, newModule]);
        console.log(newModule);
        if (!moduleIdsForNewCreate.includes(module.id)) {
            setModuleIdsForNewCreate(prevModuleIdsForCreation => [...prevModuleIdsForCreation, newModule.module.id]);
        } else {
            console.log("Module with the same ID already exists");
        }
    };
    useEffect(() => {
        dispatch(checkTokenExpiry());

        const fetchData = async () => {
            try {
                if (!token) {
                    throw new Error('No token found');
                }

                // Fetch data from getAllPlan
                const planResponse = await getAllPlan(token);
                if (planResponse && planResponse.data) {
                    setTableData(planResponse.data);
                } else {
                    throw new Error('Empty response from server for plans');
                }

                // Fetch data from getAllModule
                const moduleResponse = await getAllModule(token);
                if (moduleResponse && moduleResponse.data) {
                    console.log(moduleResponse.data);
                    setAllModuleData(moduleResponse.data);
                } else {
                    throw new Error('Empty response from server for modules');
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };


        if (token) {
            fetchData();
        }
    }, [token, dispatch]);
    
    const handleDisplayPlan = (e) => {
        setDisplay(e.target.checked);
    };
    const handleSaveChanges = async () => {
        try {
            // if (!selectedPlan) {
            //     throw new Error('No plan selected');
            // }
            console.log(moduleIdsForNewCreate);
            const newPlanData = {
                plan_name: planName,
                price: price,
                discount: discount,
                user_limit: userLimit,
                display: display,
                module_id: moduleIdsForNewCreate
            }
            const updatedDataPayload = {
                plan_name: planName,
                price: price,
                discount: discount,
                user_limit: userLimit,
                display: display,
                module_id: extractedIdOfModule
            };
            let response;
            if (editMode) {
                if (!selectedPlan) {
                    throw new Error('No plan selected');
                }
                response = await editPlan(token, selectedPlan.id, updatedDataPayload);
                getAllPlan(token)
                    .then((res) => {
                        if (res && res.data) {
                            setTableData(res.data);
                        } else {
                            throw new Error('Empty response from server for plans');
                        }
                    })
                    .catch((error) => {
                        console.error('Failed to fetch data:', error);
                    });  // Call editPlan API
            } else {
                response = await createPlan(token, newPlanData); 
                getAllPlan(token)
                    .then((res) => {
                        if (res && res.data) {
                            setTableData(res.data);
                        } else {
                            throw new Error('Empty response from server for plans');
                        }
                    })
                    .catch((error) => {
                        console.error('Failed to fetch data:', error);
                    }); // Call createPlan API
            }

            // const response = await editPlan(token, selectedPlan.id, updatedData);
            if (response) {
                // Update tableData if needed
                if(editMode)
                {
                const updatedTableData = tableData.map(plan => {
                    if (plan.id === selectedPlan.id) {
                        return {
                            ...plan,
                            plan_name: updatedDataPayload.plan_name,
                            price: updatedDataPayload.price,
                            discount: updatedDataPayload.discount,
                            user_limit: updatedDataPayload.user_limit,
                            display: updatedDataPayload.display,
                            module_id: updatedDataPayload.module_id
                        };
                    }
                    return plan;
                });
                setTableData(updatedTableData);
                }
                

                // Update moduleTableData directly
                setModuleTableData(prevModuleTableData => {
                    // Update existing modules
                    const updatedModules = prevModuleTableData.map(module => {
                        const found = extractedIdOfModule.includes(module.module.id);
                        return found ? module : null;
                    }).filter(module => module !== null);

                    // Add new modules if any
                    const newModules = allModule.filter(module => extractedIdOfModule.includes(module.id));
                    return [...updatedModules, ...newModules];
                });

                setShowPlanDetails(false);
            } else {
                throw new Error('Failed to update plan');
            }
        } catch (error) {
            console.error('Error updating plan:', error);
        }
    };



    const handleDeleteModule = async (planId) => {
        try {
            const response = await deletepPlan(token, planId);
            if (response) {
                const updatedTableData = tableData.filter(plan => plan.id !== planId);
                setTableData(updatedTableData);
                setSelectedPlan(null);
            } else {
                throw new Error('Failed to delete plan');
            }
        } catch (error) {
            console.error('Error deleting plan:', error);
        }
    };

    const handleNewModuleAdd = (module) => {
        const newModule = {
            "id": module.id,
            "plan_id": module.id,
            "module": {
                "id": module.id,
                "module_name": module.module_name,
                "description": module.description,
                "logo": module.logo
            },
            "created_at": module.created_at,
            "updated_at": module.updated_at,
        };

        const moduleExists = moduleTableData.some(existingModule =>
            existingModule.module.id === newModule.module.id
        );

        if (!moduleExists) {
            setModuleTableData((prevModuleTableData) => [...prevModuleTableData, newModule]);
            setExtractedIdOfModule((prev) => {
                const newModuleIds = [...prev];
                console.log(newModuleIds, 'newModuleIds');
                if (newModuleIds.indexOf(module.id) === -1) {
                    newModuleIds.push(module.id);
                    console.log(newModuleIds);
                } else {
                    alert("Module Already exists");
                }
                return newModuleIds;
            });
            console.log("New Module added:", newModule);
        } else {
            console.log("Module with the same ID already exists");
        }

        console.log("moduleTableData", moduleTableData);
    };


    const handleStatusChange = async (plan, newStatus) => {
        try {
            const response = await changePlanStatus(token, plan.id, newStatus);
            console.log(response);
            if (response) {
                const updatedTableData = tableData.map((p) => {
                    if (p.id === plan.id) {
                        return { ...p, status: newStatus };
                    }
                    return p;
                });
                setTableData(updatedTableData);
                setSelectedPlan((prev) => (prev && prev.id === plan.id ? { ...prev, status: newStatus } : prev));
            } else {
                throw new Error('Failed to update plan status');
            }
        } catch (error) {
            console.error('Error updating plan status:', error);
        }
    };

    const priorityChange = (row, handleStatusChange) => (
        <Popover id="statusChangePopover" className="priority-wrap">
            <div className="priority-list">
                {statusArray.map((status) => (
                    <div
                        key={status}
                        className="priority-set priority-list-item"
                        onClick={() => handleStatusChange(row, status)}
                    >
                        <i className="fi fi-sr-flag-alt mr-2"></i>
                        <span>{status}</span>
                    </div>
                ))}
            </div>
        </Popover>
    );

    const handleDeleteModuleFromPlan = (id, moduleTableData) => {
        console.log(moduleTableData, id);
        // Filter out the module with the specified id
        const updatedModuleTableData = moduleTableData.filter((moduleData) =>
            moduleData.id !== id
        );
        console.log("updatedModuleTableData", updatedModuleTableData);
        setModuleTableData(updatedModuleTableData);

        // Extract the module IDs for the remaining modules
        const moduleIds = updatedModuleTableData.map(moduleData => moduleData.module.id);
        console.log(updatedModuleTableData, "Module Ids");
        setExtractedIdOfModule(moduleIds);
    };
    console.log(extractedIdOfModule, 'extractedIdOfModule');
    const columns = [
        {
            name: "Plan Name",
            selector: (row) => row?.plan_name,
            sortable: true,
            width: "260px",
        },
        {
            name: "Price",
            selector: (row) => row?.price,
            sortable: true,
            width: "260px",
        },
        {
            name: "Status",
            selector: (row) => row?.status,
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
                        <div className={`priority-set ${row?.status.toLowerCase()}`}>
                            <i className="fi fi-sr-flag-alt mr-2"></i>
                            <span>{row?.status}</span>
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
                        <button className="me-1 table-action-btn" onClick={() => handleShowplanDetails(row)}>
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

    const modulesColumn = [
        {
            name: "Module Name",
            selector: (row) => row.module?.module_name,
            sortable: true,
            width: "260px",
        },
        {
            name: "Description",
            selector: (row) => row.module?.description,
            sortable: true,
            width: "260px",
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
                                Delete
                            </Tooltip>
                        }
                    >
                        <button className="me-1 table-action-btn" onClick={() => handleDeleteModuleFromPlan(row.id, moduleTableData)}>
                            <i className="fi fi-rr-trash text-exp-red"></i>
                        </button>
                    </OverlayTrigger>
                </div>
            ),
        },
    ];

    return (
        <>
            <button onClick={handleCreateNewPlan}>Create New Plan </button>
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
            <Modal show={showPlanDetails} onHide={handleClosePlanDetails} backdrop="static" centered size="xl" className="task-details-modal">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="task-title-edit-wrap">
                            <span className="task-name">{selectedPlan ? selectedPlan.plan_name : ''}</span>
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
                                            <span>Plan Name</span>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="profile-wrap">
                                            <div className="ps-2 text-truncate">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={planName}
                                                    onChange={(e) => setPlanName(e.target.value)}
                                                />
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
                                            <span>Status</span>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="status-item inprogress">
                                            <i className="fi fi-rr-process me-2"></i>
                                            <span>{selectedPlan?.status}</span>
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
                                            <span>Created At</span>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <span className="planned-date-txt">
                                            {selectedPlan ? format(selectedPlan?.created_at, "d MMMM, yyyy") : null}
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
                                            {selectedPlan ? format(selectedPlan?.updated_at, "d MMMM, yyyy") : null}
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
                                            <span>User Limit</span>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <span className="planned-date-txt">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={userLimit}
                                                onChange={(e) => setUserLimit(e.target.value)}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row align-items-center">
                                    <div className="col-4">
                                        <div className="status-item todo">
                                            <i className="fi fi-rr-calendar me-2"></i>
                                            <span>Discount</span>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <span className="planned-date-txt">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={discount}
                                                onChange={(e) => setDiscount(e.target.value)}
                                            />
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
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <span>Display</span>
                                <input type='checkbox' checked={display} onChange={handleDisplayPlan} />
                            </div>

                        </div>
                        <hr className="my-3" />
                        <div className="d-flex" aria-label="Module Buttons">
                            {editMode ? (
                                buttonModules && buttonModules.map(module => (
                                    <button
                                        key={module.id}
                                        type="button"
                                        className="btn btn-info mx-2"
                                        onClick={() => {
                                            if (editMode) {
                                                handleNewModuleAdd(module);
                                            } else {
                                                handleAddNewModuleForNewPlan(allModule);
                                            }
                                        }}
                                    >
                                        {module.module_name}
                                    </button>
                                ))
                            ) : (
                                    allModule && allModule.map(module => (
                                    <button
                                        key={module.id}
                                        type="button"
                                        className="btn btn-info mx-2"
                                            onClick={() => handleAddNewModuleForNewPlan(module)}
                                    >
                                        {module.module_name}
                                    </button>
                                ))
                            )}
                        </div>

                        <hr className='my-3' />
                        <div className="row align-items-center">
                            <div className="col-lg-12">
                                <div className="card">
                                    {moduleTableData &&
                                        <div className="card-body p-0">
                                            <DataTable
                                                columns={modulesColumn}
                                                data={moduleTableData}
                                                pagination={false}
                                                theme="solarized"
                                                striped
                                                className='custom-table-wrap workflow-table-striped'
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
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

export default AdminPlan;
