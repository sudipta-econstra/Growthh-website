import React, { useContext, useEffect, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import Select from 'react-select'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button, Dropdown, DropdownButton, OverlayTrigger, Popover, Tab, Tabs, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import DataTable from 'react-data-table-component';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { setHours, setMinutes } from 'date-fns';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-bootstrap/Modal';
import Loader from './landing/loder/Loader';
import { SlideshowLightbox } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'
ChartJS.register(ArcElement, Legend);


function Dashboardv2() {    
    // for assign to me start 
    const [selectedValue, setSelectedValue] = useState('Assign to Me');

    const handleSelect = (eventKey) => {
        setSelectedValue(eventKey);
    };
    // for assign to me end

    // for task details modal
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const handleCloseTaskDetails = () => setShowTaskDetails(false);
    const handleShowTaskDetails = () => setShowTaskDetails(true);
    // for task details modal end

    // for link modal start
    const [showLinkModal, setShowLinkModal] = useState(false);
    const handleCloseLinkModal = () => setShowLinkModal(false);
    const handleShowLinkModal = () => setShowLinkModal(true);
    // for link modal end

    // for new task tracker modal start
    const [showTaskTrackerModal, setShowTaskTrackerModal] = useState(false);
    const handleCloseTaskTrackerModal = () => setShowTaskTrackerModal(false);
    const handleShowTaskTrackerModal = () => setShowTaskTrackerModal(true);
    // for new task tracker modal end

    // for Checksheet modal start
    const [showChecksheetModal, setShowChecksheetModal] = useState(false);
    const handleCloseChecksheetModal = () => setShowChecksheetModal(false);
    const handleShowChecksheetModal = () => setShowChecksheetModal(true);
    // for Checksheet modal end

    //Task Done modal
    const [taskDoneShow, setTaskDoneShow] = useState(false);
    const taskDoneModalClose = () => setTaskDoneShow(false);
    const taskDoneModalShow = () => setTaskDoneShow(true);

    //task Stop modal
    const [stopShow, setStopModalShow] = useState(false);
    const stopModalClose = () => setStopModalShow(false);
    const stopModalShow = () => setStopModalShow(true);

    //delete modal
    const [deleteShow, setDeleteShow] = useState(false);
    const deleteModalClose = () => setDeleteShow(false);
    const deleteModalShow = () => setDeleteShow(true);

    //Task Reopen modal
    const [taskReOpenShow, setTaskReOpenShow] = useState(false);
    const taskReOpenModalClose = () => setTaskReOpenShow(false);
    const taskReOpenModalShow = () => setTaskReOpenShow(true);

    // chat cnavas
    const [showChatWrap, setShowChatWrap] = useState(false);

    const handleCloseChatWrap = () => setShowChatWrap(false);
    const handleShowChatWrap = () => setShowChatWrap(true);

    //for checksheet modal
    // Set reminder
    const [isCheckedReminder, setIsCheckedReminder] = useState(false);

    const handleSetReminder = (e) => {
        setIsCheckedReminder(e.target.checked);
    };

    //for datepicker
    const [issueDate, setIssueDate] = useState({
        startData: "",
        endDate: ""
        //depertment: ""
    })

    const [taskPlannedDate, setTaskPlannedDate] = useState({
        startData: "",
        endDate: ""
        //depertment: ""
    })

    const [taskRePlannedDate, setTaskRePlannedDate] = useState({
        startData: "",
        endDate: ""
        //depertment: ""
    })

    const selectReminderMode = [
        { value: 'select', label: '-Select-' },
        { value: 'Daily', label: 'Daily' },
        { value: 'Hourly', label: 'Hourly' }
    ]
    // textarea description
    const [taskDescription, settaskDescription] = useState('');
    const taskDescriptionRef = useRef(null);

    useEffect(() => {
        const textarea = taskDescriptionRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset the height
            textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content
        }
    }, [taskDescription]);

    const handleChangeTaskDescription = (event) => {
        settaskDescription(event.target.value);
    };

    const [checksheetDescription, setChecksheetDescription] = useState('');
    const checksheetDescriptionRef = useRef(null);

    useEffect(() => {
        const textarea = checksheetDescriptionRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset the height
            textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content
        }
    }, [checksheetDescription]);

    const handleChecksheetDescription = (event) => {
        setChecksheetDescription(event.target.value);
    };
    // textarea description end

    const selectTaskPriority = [
        { value: 'select', label: '-Select-' },
        { value: 'VeryHigh', label: 'Very High' },
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' }
    ]
    const newTaskPriority = [
        { value: 'select', label: '-Select-' },
        { value: 'VeryHigh', label: 'Very High' },
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' }
    ]

    const selectMode = [
        { value: 'select', label: '-Select-' },
        { value: 'Yearly', label: 'Yearly' },
        { value: 'Quarterly', label: 'Quarterly' },
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Daily', label: 'Daily' },
        { value: 'Hourly', label: 'Hourly' }
    ]
    //for checksheet modal end

    // for assignee selection 
    const selectAssignee = (
        <Popover id="selectAssignee" className="assignee-wrapper">
            <div className="search-assignee">
                <span className="search-assignee-icon"><i class="fi fi-rr-search"></i></span><input type="text" className="form-control" placeholder="Search or enter email.." />
            </div>
            <div className="user-list-wrap">
                <div className="user-item">
                    <div className="profile-wrap bg-light">
                        <div className="exp-avtar">
                            <i class="fi fi-rr-user user-icon"></i>
                        </div>
                        <div className="ps-2 profile-name-wrap text-truncate">
                            <h5 className="profile-name text-nowrap text-truncate">Sujit Paul</h5>
                        </div>
                    </div>
                </div>
                <div className="user-item">
                    <div className="profile-wrap">
                        <div className="exp-avtar bg-exp-green">
                            <span>JP</span>
                        </div>
                        <div className="ps-2 profile-name-wrap text-truncate">
                            <h5 className="profile-name text-nowrap text-truncate">Jhon Parker</h5>
                        </div>
                    </div>
                </div>
                <div className="user-item">
                    <div className="profile-wrap">
                        <div className="exp-avtar">
                            <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671741_1517351722263.jpg'} alt="user" />
                        </div>
                        <div className="ps-2 profile-name-wrap text-truncate">
                            <h5 className="profile-name text-nowrap text-truncate">Subhadeep Chowdhury</h5>
                        </div>
                    </div>
                </div>
                <div className="user-item">
                    <div className="profile-wrap">
                        <div className="exp-avtar  bg-light">
                            <i class="fi fi-rr-user user-icon"></i>
                        </div>
                        <div className="ps-2 profile-name-wrap text-truncate">
                            <h5 className="profile-name text-nowrap text-truncate">Sujit Paul</h5>
                        </div>
                    </div>
                </div>
                <div className="user-item">
                    <div className="profile-wrap">
                        <div className="exp-avtar bg-exp-blue">
                            <span>MS</span>
                        </div>
                        <div className="ps-2 profile-name-wrap text-truncate">
                            <h5 className="profile-name text-nowrap text-truncate">Moumita Shome</h5>
                        </div>
                    </div>
                </div>
                <div className="user-item">
                    <div className="profile-wrap">
                        <div className="exp-avtar">
                            <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                        </div>
                        <div className="ps-2 profile-name-wrap text-truncate">
                            <h5 className="profile-name text-truncate text-nowrap">Gopal Mukherjee</h5>
                        </div>
                    </div>
                </div>
            </div>
        </Popover>
    );
    const [showAssignee, setShowAssignee] = useState(false);

    const handleCloseAssignee = () => setShowAssignee(false);
    const handleShowAssignee = () => setShowAssignee(true);
    // for assignee selection end

    // for Doer selection 
    const selectDoer = (
        <Popover id="selectAssignee" className="assignee-wrapper">
            <div className="search-assignee">
                <span className="search-assignee-icon"><i class="fi fi-rr-search"></i></span><input type="text" className="form-control" placeholder="Search or enter email.." />
            </div>
            <div className="user-list-wrap">
                <div className="user-item">
                    <div className="profile-wrap">
                        <div className="exp-avtar bg-light">
                            <i class="fi fi-rr-user user-icon"></i>
                        </div>
                        <div className="ps-2 profile-name-wrap text-truncate">
                            <h5 className="profile-name text-nowrap text-truncate">Sujit Paul</h5>
                        </div>
                    </div>
                </div>
                <div className="user-item">
                    <div className="profile-wrap">
                        <div className="exp-avtar bg-exp-green">
                            <span>JP</span>
                        </div>
                        <div className="ps-2 profile-name-wrap text-truncate">
                            <h5 className="profile-name text-nowrap text-truncate">Jhon Parker</h5>
                        </div>
                    </div>
                </div>
                <div className="user-item">
                    <div className="profile-wrap">
                        <div className="exp-avtar">
                            <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671741_1517351722263.jpg'} alt="user" />
                        </div>
                        <div className="ps-2 profile-name-wrap text-truncate">
                            <h5 className="profile-name text-nowrap text-truncate">Subhadeep Chowdhury</h5>
                        </div>
                    </div>
                </div>
                <div className="user-item">
                    <div className="profile-wrap">
                        <div className="exp-avtar bg-light">
                            <i class="fi fi-rr-user user-icon"></i>
                        </div>
                        <div className="ps-2 profile-name-wrap text-truncate">
                            <h5 className="profile-name text-nowrap text-truncate">Sujit Paul</h5>
                        </div>
                    </div>
                </div>
                <div className="user-item">
                    <div className="profile-wrap">
                        <div className="exp-avtar bg-exp-blue">
                            <span>MS</span>
                        </div>
                        <div className="ps-2 profile-name-wrap text-truncate">
                            <h5 className="profile-name text-nowrap text-truncate">Moumita Shome</h5>
                        </div>
                    </div>
                </div>
                <div className="user-item">
                    <div className="profile-wrap">
                        <div className="exp-avtar">
                            <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                        </div>
                        <div className="ps-2 profile-name-wrap text-truncate">
                            <h5 className="profile-name text-nowrap text-truncate">Gopal Mukherjee</h5>
                        </div>
                    </div>
                </div>
            </div>
        </Popover>
    );
    const [showDoer, setShowDoer] = useState(false);

    const handleCloseDoer = () => setShowDoer(false);
    const handleShowDoer = () => setShowDoer(true);
    // for doer selection end
    //for planned date
    const [planDate, setPlanDate] = useState(new Date());

    const onDateChange = (newDate) => {
        setPlanDate(newDate);
    };
    //    
    const [startDate, setStartDate] = useState(new Date());
    const handleDateChange = (date) => {
        setStartDate(date);
    };
    // 
    const plannedDate = (
        <Popover id="plannedDate" className="calendar-popup">
            <div className="calendar-wrap">
                {/* <Calendar
                    onChange={onDateChange}
                    value={planDate}
                /> */}
                <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    //showTimeSelect
                    inline
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
            </div>
        </Popover>
    );
    //for planned date end
    //for pariority change
    const priorityChange = (
        <Popover id="plannedDate" className="pariority-wrap">
            <div className="pariority-list">
                <div className="priority-set urgent priority-list-item">
                    <i class="fi fi-sr-flag-alt mr-2"></i>
                    <span>Urgent</span>
                </div>
                <div className="priority-set high priority-list-item">
                    <i class="fi fi-sr-flag-alt mr-2"></i>
                    <span>High</span>
                </div>
                <div className="priority-set normal priority-list-item">
                    <i class="fi fi-sr-flag-alt mr-2"></i>
                    <span>Normal</span>
                </div>
                <div className="priority-set low priority-list-item">
                    <i class="fi fi-sr-flag-alt mr-2"></i>
                    <span>Low</span>
                </div>
            </div>
        </Popover>
    );
    //for pariority change end
    //for status change


    const statusChange = (
        <Popover id="statusChange" className="status-wrap">
            <div className="status-list">
                <div className="status-item todo status-list-item">
                    <i className="fi fi-rr-dot-circle me-2"></i>
                    <span>To Do</span>
                </div>
                <div className="status-item inprogress status-list-item" >
                    <i className="fi fi-rr-process me-2"></i>
                    <span>In Progress</span>
                </div>
                <div className="status-item completed status-list-item" onClick={() => { taskDoneModalShow(); }}>
                    <i className="fi fi-rs-check-circle me-2"></i>
                    <span>Completed</span>
                </div>
            </div>
        </Popover>
    );
    //for status change end

    // for attachment list action
    const attachmentListAction = (
        <Popover id="statusChange" className="action-wrap">
            <div className="action-list">
                <div className="action-list-item">
                    <i class="fi fi-sr-download me-2"></i>
                    <span>Download</span>
                </div>
                <div className="action-list-item">
                    <i class="fi fi-rr-trash text-exp-red me-2"></i>
                    <span>Delete</span>
                </div>
            </div>
        </Popover>
    );
    // for attachment list action end


    const [selectedColumns, setSelectedColumns] = useState([

        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            width: "260px",
            cell: (row) => (
                <button className="table-data-change-btn" onClick={handleShowTaskDetails}>
                    <div className="project-name text-truncate">
                        <h6 className="text-truncate">Project 1 Sample View Task 2 Project 1 Sample View Task 2 Project 1 Sample View Task 2</h6>
                    </div>
                </button>
            ),
        },
        {
            name: "Assignee",
            selector: (row) => row.assignee,
            sortable: true,
            width: "260px",
            cell: (row) => (
                // <OverlayTrigger
                //     trigger="click"
                //     rootClose
                //     placement="auto"
                //     overlay={selectAssignee}
                // >
                //     <button className="table-data-change-btn">
                //         <div className="profile-wrap">
                //             <div className="exp-avtar bg-exp-green">
                //                 {/* <i class="fi fi-rr-user user-icon"></i> */}
                //                 <span>JP</span>
                //             </div>
                //             <div className="ps-2 profile-name-wrap text-truncate">
                //                 <h5 className="profile-name text-nowrap text-truncate">Jhon Parker</h5>
                //             </div>
                //         </div>
                //     </button>
                // </OverlayTrigger>   

                <button className="table-data-change-btn" onClick={handleShowAssignee}>
                    <div className="profile-wrap">
                        <div className="exp-avtar bg-exp-green">
                            {/* <i class="fi fi-rr-user user-icon"></i> */}
                            <span>JP</span>
                        </div>
                        <div className="ps-2 profile-name-wrap text-truncate">
                            <h5 className="profile-name text-nowrap text-truncate">Jhon Parker</h5>
                        </div>
                    </div>
                </button>

            ),
        },
        {
            name: "Doer",
            selector: (row) => row.doer,
            sortable: true,
            width: "260px",
            cell: (row) => (
                // <OverlayTrigger
                //     trigger="click"
                //     rootClose
                //     placement="auto"
                //     overlay={selectDoer}
                // >
                //     <button className="table-data-change-btn">
                //         <div className="profile-wrap">
                //             <div className="exp-avtar bg-exp-yellow">
                //                 {/* <i class="fi fi-rr-user user-icon"></i> */}
                //                 <span>SP</span>
                //             </div>
                //             <div className="ps-2 profile-name-wrap text-truncate">
                //                 <h5 className="profile-name text-nowrap text-truncate">Sujit Paul</h5>
                //             </div>
                //         </div>
                //     </button>
                // </OverlayTrigger>
                <button className="table-data-change-btn" onClick={handleShowDoer}>
                    <div className="profile-wrap">
                        <div className="exp-avtar bg-exp-yellow">
                            {/* <i class="fi fi-rr-user user-icon"></i> */}
                            <span>SP</span>
                        </div>
                        <div className="ps-2 profile-name-wrap text-truncate">
                            <h5 className="profile-name text-nowrap text-truncate">Sujit Paul</h5>
                        </div>
                    </div>
                </button>
            ),
        },
        {
            name: "Date",
            selector: (row) => row.date,
            sortable: true,
            width: "180px",
            cell: (row) => (
                <OverlayTrigger
                    trigger="click"
                    rootClose
                    placement="auto"
                    overlay={plannedDate}
                >
                    <button className="table-data-change-btn">
                        <div className="show-date">
                            {/* {planDate.toDateString()} */}
                            {format(startDate, "d MMMM, yyyy")}
                        </div>
                    </button>
                </OverlayTrigger>

            ),
        },
        {
            name: "Priority",
            selector: (row) => row.priority,
            sortable: true,
            width: "150px",
            cell: (row) => (
                <OverlayTrigger
                    trigger="click"
                    rootClose
                    placement="auto"
                    overlay={priorityChange}
                >
                    <button className="table-data-change-btn">
                        <div className="priority-set urgent">
                            <i class="fi fi-sr-flag-alt mr-2"></i>
                            <span>Urgent</span>
                        </div>
                    </button>
                </OverlayTrigger>
            ),
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
                    overlay={statusChange}
                >
                    <button className="table-data-change-btn">
                        <div className="status-item todo">
                            <i className="fi fi-rr-dot-circle me-2"></i>
                            <span>To Do</span>
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
                                Done
                            </Tooltip>
                        }
                    >
                        <button className="me-1 table-action-btn" onClick={taskDoneModalShow}>
                            <i class="fi fi-rr-check"></i>
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip>
                                Chat
                            </Tooltip>
                        }
                    >
                        <button className="me-1 table-action-btn" onClick={handleShowChatWrap}>
                            <i class="fi fi-rr-comment"></i>
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip>
                                Close/Stop
                            </Tooltip>
                        }
                    >
                        <button className="me-1 table-action-btn" onClick={stopModalShow}>
                            <i class="fi fi-rr-stop-circle"></i>
                        </button>
                    </OverlayTrigger>
                    {/* <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip>
                                High Alert
                            </Tooltip>
                        }
                    >
                        <button className="me-1 table-action-btn">
                            <i class="fi fi-rr-light-emergency-on"></i>
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip>
                                Switch Doer
                            </Tooltip>
                        }
                    >
                        <button className="me-1 table-action-btn">
                            <i class="fi fi-rr-shuffle"></i>
                        </button>
                    </OverlayTrigger> */}
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip>
                                Re-Open
                            </Tooltip>
                        }
                    >
                        <button className="me-1 table-action-btn" onClick={taskReOpenModalShow}>
                            <i class="fi fi-rr-restock"></i>
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
                        <button className="me-1 table-action-btn" onClick={handleShowTaskDetails}>
                            <i class="fi fi-rr-pencil"></i>
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
                            <i class="fi fi-rr-trash text-exp-red"></i>
                        </button>
                    </OverlayTrigger>
                </div>
            ),
        },
    ]);
    const [tableData, setTableData] = useState([
        {

        },
        {

        },
        {

        },
        {

        },
    ]);

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
        <React.Fragment>
            <div className="gthh-controller-bar">
                <ul className="gth-controller-view-block">
                    <li>
                        <Link to="/dashboard-task" className="gth-controller-view-item active"><i class="fi fi-rr-to-do"></i>Task</Link>
                    </li>
                    <li>
                        <Link to="/dashboard-flow" className="gth-controller-view-item"><i class="fi fi-rr-workflow"></i>Flow</Link>
                    </li>
                    <li>
                        <Link to="/dashboard-calendar" className="gth-controller-view-item"><i class="fi fi-rr-calendar"></i>Calendar</Link>
                    </li>
                    <li>
                        <Link to="#" className="gth-controller-view-item"><i class="fi fi-rr-chart-histogram"></i>Chart</Link>
                    </li>
                </ul>
                <div className="gth-assign-dropdown">
                    <Dropdown onSelect={handleSelect} align="end">
                        <Dropdown.Toggle className="btn-exp-primary assignSelect" id="dropdown-assign">
                            <span className="text-truncate">{selectedValue}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Assign to Me" href="#">
                                <span className="fw-bold">Assign <span className="text-exp-red">to</span> Me</span>
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Assign by Me" href="#">
                                <span className="fw-bold">Assign <span className="text-exp-red">by</span> Me</span>
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Assign to All" href="#">
                                <span className="fw-bold">Assign <span className="text-exp-red">to</span> All</span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="gth-dashboard-v2-process-wrap">
                <div className="create-task mb-3 d-flex justify-content-end">
                    <Dropdown align="end">
                        <Dropdown.Toggle className="btn-exp-info gth-toggle-btn" id="dropdown-assign">
                            <span className="text-truncate">Create</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleShowTaskTrackerModal}>
                                <i class="fi fi-rr-to-do me-2"></i>New Task Tracker
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleShowChecksheetModal}>
                                <i class="fi fi-rr-to-do-alt me-2"></i>New Checksheet
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <Tabs
                    defaultActiveKey="todo"
                    id="process-tab"
                    className="gth-rounded-tab"
                >
                    <Tab eventKey="todo"
                        title={<span className="btn-todo"><i class="fi fi-rr-dot-circle me-1"></i>To Do</span>}
                    >
                        <div className="card">
                            <div className="card-body p-0">
                                <DataTable
                                    columns={selectedColumns}
                                    data={tableData}
                                    //pagination={[5, 10, 25, 50]}
                                    pagination={false}
                                    theme="solarized"
                                    striped
                                    className='custom-table-wrap workflow-table-striped'
                                />
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="inProgress"
                        title={<span className="btn-inprogress"><i class="fi fi-rr-process me-1"></i>In Progress</span>}
                    >
                        <div className="card">
                            <div className="card-body p-0">
                                <DataTable
                                    columns={selectedColumns}
                                    data={tableData}
                                    //pagination={[5, 10, 25, 50]}
                                    pagination={false}
                                    theme="solarized"
                                    striped
                                    className='custom-table-wrap workflow-table-striped'
                                />
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="completed"
                        title={<span className="btn-completed"><i class="fi fi-rs-check-circle me-1"></i>Completed</span>}
                    >
                        <div className="card">
                            <div className="card-body p-0">
                                <DataTable
                                    columns={selectedColumns}
                                    data={tableData}
                                    //pagination={[5, 10, 25, 50]}
                                    pagination={false}
                                    theme="solarized"
                                    striped
                                    className='custom-table-wrap workflow-table-striped'
                                />
                            </div>
                        </div>
                    </Tab>

                </Tabs>
            </div>
            <>
                {/* for assignee */}
                <Offcanvas className="assignee-canvas" show={showAssignee} onHide={handleCloseAssignee} placement="end">
                    <Offcanvas.Header closeButton className="d-block">
                        <Offcanvas.Title>Change Assignee</Offcanvas.Title>
                        <div className="search-assignee">
                            <span className="search-assignee-icon">
                                <i class="fi fi-rr-search"></i>
                            </span>
                            <input type="text" className="form-control" placeholder="Search or enter email.." />
                        </div>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div id="selectAssignee" className="assignee-wrapper assignee-wrapper-body">
                            <div className="user-list-wrap">
                                <div className="user-item">
                                    <div className="profile-wrap">
                                        <div className="exp-avtar bg-light">
                                            <i class="fi fi-rr-user user-icon"></i>
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                            <h5 className="profile-name text-nowrap text-truncate">Sujit Paul</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-item">
                                    <div className="profile-wrap">
                                        <div className="exp-avtar bg-exp-green">
                                            <span>JP</span>
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                            <h5 className="profile-name text-nowrap text-truncate">Jhon Parker</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-item">
                                    <div className="profile-wrap">
                                        <div className="exp-avtar">
                                            <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671741_1517351722263.jpg'} alt="user" />
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                            <h5 className="profile-name text-nowrap text-truncate">Subhadeep Chowdhury</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-item">
                                    <div className="profile-wrap">
                                        <div className="exp-avtar bg-light">
                                            <i class="fi fi-rr-user user-icon"></i>
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                            <h5 className="profile-name text-nowrap text-truncate">Sujit Paul</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-item">
                                    <div className="profile-wrap">
                                        <div className="exp-avtar bg-exp-blue">
                                            <span>MS</span>
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                            <h5 className="profile-name text-nowrap text-truncate">Moumita Shome</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-item">
                                    <div className="profile-wrap">
                                        <div className="exp-avtar">
                                            <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                            <h5 className="profile-name text-nowrap text-truncate">Gopal Mukherjee</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
                {/* for assignee end */}
                {/* for doer */}
                <Offcanvas className="assignee-canvas" show={showDoer} onHide={handleCloseDoer} placement="end">
                    <Offcanvas.Header closeButton className="d-block">
                        <Offcanvas.Title>Change Doer</Offcanvas.Title>
                        <div className="search-assignee">
                            <span className="search-assignee-icon">
                                <i class="fi fi-rr-search"></i>
                            </span>
                            <input type="text" className="form-control" placeholder="Search or enter email.." />
                        </div>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div id="selectAssignee" className="assignee-wrapper assignee-wrapper-body">
                            <div className="user-list-wrap">
                                <div className="user-item">
                                    <div className="profile-wrap">
                                        <div className="exp-avtar bg-light">
                                            <i class="fi fi-rr-user user-icon"></i>
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                            <h5 className="profile-name text-nowrap text-truncate">Sujit Paul</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-item">
                                    <div className="profile-wrap">
                                        <div className="exp-avtar bg-exp-green">
                                            <span>JP</span>
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                            <h5 className="profile-name text-nowrap text-truncate">Jhon Parker</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-item">
                                    <div className="profile-wrap">
                                        <div className="exp-avtar">
                                            <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671741_1517351722263.jpg'} alt="user" />
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                            <h5 className="profile-name text-nowrap text-truncate">Subhadeep Chowdhury</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-item">
                                    <div className="profile-wrap">
                                        <div className="exp-avtar bg-light">
                                            <i class="fi fi-rr-user user-icon"></i>
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                            <h5 className="profile-name text-nowrap text-truncate">Sujit Paul</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-item">
                                    <div className="profile-wrap">
                                        <div className="exp-avtar bg-exp-blue">
                                            <span>MS</span>
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                            <h5 className="profile-name text-nowrap text-truncate">Moumita Shome</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-item">
                                    <div className="profile-wrap">
                                        <div className="exp-avtar">
                                            <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                        </div>
                                        <div className="ps-2 profile-name-wrap text-truncate">
                                            <h5 className="profile-name text-nowrap text-truncate">Gopal Mukherjee</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
                {/* for doer end */}
                <Modal show={showTaskDetails} onHide={handleCloseTaskDetails} backdrop="static" centered size="xl" className="task-details-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div className="task-title-edit-wrap">
                                <input value="Project 1 Sample View Task 2" className="task-name" />
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
                                                <i class="fi fi-rr-user me-2"></i>
                                                <span>Assignee</span>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <Dropdown className="gth-modal-dropdown">
                                                <Dropdown.Toggle id="status" className="gth-transparent-btn">
                                                    <div className="profile-wrap">
                                                        <div className="exp-avtar bg-exp-green">
                                                            <span>JP</span>
                                                        </div>
                                                        <div className="ps-2 profile-name-wrap text-truncate">
                                                            <h5 className="profile-name text-nowrap">Jhon Parker</h5>
                                                        </div>
                                                    </div>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <div className="assignee-wrapper">
                                                        <div className="search-assignee">
                                                            <span className="search-assignee-icon"><i class="fi fi-rr-search"></i></span><input type="text" className="form-control" placeholder="Search or enter email.." />
                                                        </div>
                                                        <div className="user-list-wrap">
                                                            <div className="user-item">
                                                                <div className="profile-wrap">
                                                                    <div className="exp-avtar bg-light">
                                                                        <i class="fi fi-rr-user user-icon"></i>
                                                                    </div>
                                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                                        <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="user-item">
                                                                <div className="profile-wrap">
                                                                    <div className="exp-avtar bg-exp-green">
                                                                        <span>JP</span>
                                                                    </div>
                                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                                        <h5 className="profile-name text-nowrap">Jhon Parker</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="user-item">
                                                                <div className="profile-wrap">
                                                                    <div className="exp-avtar">
                                                                        <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671741_1517351722263.jpg'} alt="user" />
                                                                    </div>
                                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                                        <h5 className="profile-name text-truncate">Subhadeep Chowdhury</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="user-item">
                                                                <div className="profile-wrap">
                                                                    <div className="exp-avtar bg-light">
                                                                        <i class="fi fi-rr-user user-icon"></i>
                                                                    </div>
                                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                                        <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="user-item">
                                                                <div className="profile-wrap">
                                                                    <div className="exp-avtar bg-exp-blue">
                                                                        <span>MS</span>
                                                                    </div>
                                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                                        <h5 className="profile-name text-nowrap">Moumita Shome</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="user-item">
                                                                <div className="profile-wrap">
                                                                    <div className="exp-avtar">
                                                                        <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                                                    </div>
                                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                                        <h5 className="profile-name text-truncate">Gopal Mukherjee</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="row align-items-center">
                                        <div className="col-4">
                                            <div className="status-item todo">
                                                <i class="fi fi-rr-user me-2"></i>
                                                <span>Doer</span>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <Dropdown className="gth-modal-dropdown">
                                                <Dropdown.Toggle id="status" className="gth-transparent-btn">
                                                    <div className="profile-wrap">
                                                        <div className="exp-avtar bg-exp-yellow">
                                                            <span>SP</span>
                                                        </div>
                                                        <div className="ps-2 profile-name-wrap text-truncate">
                                                            <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                        </div>
                                                    </div>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <div className="assignee-wrapper">
                                                        <div className="search-assignee">
                                                            <span className="search-assignee-icon"><i class="fi fi-rr-search"></i></span><input type="text" className="form-control" placeholder="Search or enter email.." />
                                                        </div>
                                                        <div className="user-list-wrap">
                                                            <div className="user-item">
                                                                <div className="profile-wrap">
                                                                    <div className="exp-avtar bg-light">
                                                                        <i class="fi fi-rr-user user-icon"></i>
                                                                    </div>
                                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                                        <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="user-item">
                                                                <div className="profile-wrap">
                                                                    <div className="exp-avtar bg-exp-green">
                                                                        <span>JP</span>
                                                                    </div>
                                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                                        <h5 className="profile-name text-nowrap">Jhon Parker</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="user-item">
                                                                <div className="profile-wrap">
                                                                    <div className="exp-avtar">
                                                                        <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671741_1517351722263.jpg'} alt="user" />
                                                                    </div>
                                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                                        <h5 className="profile-name text-truncate">Subhadeep Chowdhury</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="user-item">
                                                                <div className="profile-wrap">
                                                                    <div className="exp-avtar bg-light">
                                                                        <i class="fi fi-rr-user user-icon"></i>
                                                                    </div>
                                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                                        <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="user-item">
                                                                <div className="profile-wrap">
                                                                    <div className="exp-avtar bg-exp-blue">
                                                                        <span>MS</span>
                                                                    </div>
                                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                                        <h5 className="profile-name text-nowrap">Moumita Shome</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="user-item">
                                                                <div className="profile-wrap">
                                                                    <div className="exp-avtar">
                                                                        <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                                                    </div>
                                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                                        <h5 className="profile-name text-truncate">Gopal Mukherjee</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Dropdown.Menu>
                                            </Dropdown>
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
                                                <span>Planned Date</span>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <Dropdown className="gth-modal-dropdown">
                                                <Dropdown.Toggle id="status" className="gth-transparent-btn">
                                                    <span className="planned-date-txt">
                                                        {/* {planDate.toDateString()} */}
                                                        {format(startDate, "d MMMM, yyyy")}
                                                    </span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <div className="calendar-popup">
                                                        <div className="calendar-wrap">
                                                            {/* <Calendar
                                                                onChange={onDateChange}
                                                                value={planDate}
                                                            /> */}
                                                            <DatePicker
                                                                selected={startDate}
                                                                onChange={handleDateChange}
                                                                //showTimeSelect
                                                                inline
                                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                            />
                                                        </div>
                                                    </div>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="row align-items-center">
                                        <div className="col-4">
                                            <div className="status-item todo">
                                                <i class="fi fi-rr-flag-alt me-2"></i>
                                                <span>Priority</span>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <Dropdown className="gth-modal-dropdown">
                                                <Dropdown.Toggle id="status" className="gth-transparent-btn">
                                                    <div className="priority-set urgent">
                                                        <i class="fi fi-sr-flag-alt mr-2"></i>
                                                        <span>Urgent</span>
                                                    </div>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <div className="pariority-wrap">
                                                        <div className="pariority-list">
                                                            <div className="priority-set urgent priority-list-item">
                                                                <i class="fi fi-sr-flag-alt mr-2"></i>
                                                                <span>Urgent</span>
                                                            </div>
                                                            <div className="priority-set high priority-list-item">
                                                                <i class="fi fi-sr-flag-alt mr-2"></i>
                                                                <span>High</span>
                                                            </div>
                                                            <div className="priority-set normal priority-list-item">
                                                                <i class="fi fi-sr-flag-alt mr-2"></i>
                                                                <span>Normal</span>
                                                            </div>
                                                            <div className="priority-set low priority-list-item">
                                                                <i class="fi fi-sr-flag-alt mr-2"></i>
                                                                <span>Low</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="row align-items-center">
                                        <div className="col-4">
                                            <div className="status-item todo">
                                                <i className="fi fi-rr-dot-circle me-2"></i>
                                                <span>Status</span>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <Dropdown className="gth-modal-dropdown">
                                                <Dropdown.Toggle id="status" className="gth-transparent-btn">
                                                    <div className="status-item inprogress">
                                                        <i className="fi fi-rr-process me-2"></i>
                                                        <span>In Progress</span>
                                                    </div>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <div className="status-wrap">
                                                        <div className="status-list">
                                                            <div className="status-item todo status-list-item">
                                                                <i className="fi fi-rr-dot-circle me-2"></i>
                                                                <span>To Do</span>
                                                            </div>
                                                            <div className="status-item inprogress status-list-item">
                                                                <i className="fi fi-rr-process me-2"></i>
                                                                <span>In Progress</span>
                                                            </div>
                                                            <div className="status-item completed status-list-item">
                                                                <i className="fi fi-rs-check-circle me-2"></i>
                                                                <span>Completed</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-3" />
                            <div className="row">
                                <div className="col-12">
                                    <div className="attachment-header">
                                        <h6>Attachments</h6>
                                        <div className="attachment-buttons">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip>
                                                        Download All
                                                    </Tooltip>
                                                }
                                            >
                                                <button className="gth-action-button ms-2">
                                                    <i class="fi fi-sr-download"></i>
                                                </button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip>
                                                        Grid
                                                    </Tooltip>
                                                }
                                            >
                                                <button className="gth-action-button ms-2">
                                                    <i class="fi fi-rr-apps"></i>
                                                </button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip>
                                                        List
                                                    </Tooltip>
                                                }
                                            >
                                                <button className="gth-action-button ms-2">
                                                    <i class="fi fi-rr-list"></i>
                                                </button>
                                            </OverlayTrigger>
                                            <Dropdown className="gth-modal-attachment-drpdown" align="end">
                                                <Dropdown.Toggle id="status" className="gth-action-button ms-2 ">
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip>
                                                                Add Attachments
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <i class="fi fi-br-plus"></i>
                                                    </OverlayTrigger>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="attachment-wrap">
                                                    <div className="attachment-list">
                                                        <div className="attachment-list-item custom-file-upload">
                                                            <i class="fi fi-rr-clip me-2"></i>
                                                            <button class="upload-btn">Upload File</button>
                                                            <input type="file" name="myfile" className="input-upload" />
                                                        </div>
                                                        <div className="attachment-list-item" onClick={handleShowLinkModal}>
                                                            <i class="fi fi-rr-link-alt me-2 text-exp-blue"></i>
                                                            <span>Add Link</span>
                                                        </div>
                                                    </div>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    {/* for grid view */}
                                    <div className="card shadow-none border grid-files mt-2 mb-0">
                                        <div className="card-header bg-exp-primary-grey-light-1">
                                            <h6>Files</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="gth-attachment-body">
                                                <figure className="gth-attachment-tile-item">
                                                    <div className="grid-action-btn">
                                                        <OverlayTrigger
                                                            trigger="click"
                                                            rootClose
                                                            placement="auto"
                                                            overlay={attachmentListAction}
                                                        >
                                                            <button className="action-btn">
                                                                <i class="fi fi-br-menu-dots-vertical"></i>
                                                            </button>
                                                        </OverlayTrigger>
                                                    </div>
                                                    <div className="attachment-image">
                                                        <SlideshowLightbox className="image-expand">
                                                            <img className="figure-img" src={process.env.PUBLIC_URL + 'assets/images/login-bg-bk.jpg'} alt="attachment" />
                                                        </SlideshowLightbox>
                                                        <span className="image-expand-arrow"><i class="fi fi-rr-expand-arrows"></i></span>
                                                    </div>
                                                    <figcaption className="figure-caption">
                                                        <h6 className="file-name">sample-image.jpg</h6>
                                                        <p className="file-upload-time">9:45 am</p>
                                                    </figcaption>
                                                </figure>
                                                <figure className="gth-attachment-tile-item">
                                                    <div className="grid-action-btn">
                                                        <OverlayTrigger
                                                            trigger="click"
                                                            rootClose
                                                            placement="auto"
                                                            overlay={attachmentListAction}
                                                        >
                                                            <button className="gth-action-button">
                                                                <i class="fi fi-br-menu-dots-vertical"></i>
                                                            </button>
                                                        </OverlayTrigger>
                                                    </div>

                                                    <div className="attachment-image">
                                                        <SlideshowLightbox className="image-expand">
                                                            <img className="figure-img" src={process.env.PUBLIC_URL + 'assets/images/visitor.jpg'} alt="attachment" />
                                                        </SlideshowLightbox>
                                                        <span className="image-expand-arrow"><i class="fi fi-rr-expand-arrows"></i></span>
                                                    </div>
                                                    <figcaption className="figure-caption">
                                                        <h6 className="file-name">sample-image.jpg</h6>
                                                        <p className="file-upload-time">9:45 am</p>
                                                    </figcaption>
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                    {/* for grid view end*/}
                                    {/* for list view */}
                                    <div className="card shadow-none border grid-files mt-2 mb-0">
                                        <div className="card-header bg-exp-primary-grey-light-1">
                                            <h6>Files</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="gth-attachment-List-body">
                                                <div className="">
                                                    <table className="table mb-0 border attachment-list-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Size</th>
                                                                <th>Modified</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="list-image-wrap">
                                                                        <div className="list-image">
                                                                            <img className="img-fit" src={process.env.PUBLIC_URL + 'assets/images/login-bg-bk.jpg'} alt="attachment" />
                                                                        </div>
                                                                        <span className="list-image-name">sample-image.jpg</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    100kb
                                                                </td>
                                                                <td>
                                                                    9:45 am
                                                                </td>
                                                                <td>
                                                                    <OverlayTrigger
                                                                        trigger="click"
                                                                        rootClose
                                                                        placement="auto"
                                                                        overlay={attachmentListAction}
                                                                    >
                                                                        <button className="gth-action-button">
                                                                            <i class="fi fi-br-menu-dots-vertical"></i>
                                                                        </button>
                                                                    </OverlayTrigger>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="list-image-wrap">
                                                                        <div className="list-image">
                                                                            <img className="img-fit" src={process.env.PUBLIC_URL + 'assets/images/visitor.jpg'} alt="attachment" />
                                                                        </div>
                                                                        <span className="list-image-name">sample-image.jpg</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    100kb
                                                                </td>
                                                                <td>
                                                                    9:45 am
                                                                </td>
                                                                <td>
                                                                    <OverlayTrigger
                                                                        trigger="click"
                                                                        rootClose
                                                                        placement="auto"
                                                                        overlay={attachmentListAction}
                                                                    >
                                                                        <button className="gth-action-button">
                                                                            <i class="fi fi-br-menu-dots-vertical"></i>
                                                                        </button>
                                                                    </OverlayTrigger>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* for list view end*/}
                                    {/* for Link view */}
                                    <div className="card shadow-none border link-files mt-2 mb-0">
                                        <div className="card-header bg-exp-primary-grey-light-1">
                                            <h6>Links</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="gth-attachment-link-body">
                                                <div className="links-items">
                                                    <h6>Growthh.in</h6>
                                                    <p>http://growthh.in/</p>
                                                    <a href="http://growthh.in/" target="_blank" className="link-open action-btn">
                                                        <i class="fi fi-rr-arrow-up-right-from-square"></i>
                                                    </a>
                                                </div>

                                                <div className="links-items">
                                                    <h6>Facebook</h6>
                                                    <p>https://www.facebook.com/</p>
                                                    <a href="https://www.facebook.com/" target="_blank" className="link-open action-btn">
                                                        <i class="fi fi-rr-arrow-up-right-from-square"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* for Link view end*/}
                                </div>
                            </div>
                            <hr className="my-3" />
                            <div className="description">
                                <h6>Description</h6>
                                <p className="mb-0 text-muted">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                            </div>
                            <hr className="my-3" />
                            <div className="remarks">
                                <h6>Remarks</h6>
                                <p className="mb-0 text-muted">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                                <div className="remarks-attachment-wrap">
                                    <div className="remarks-attachment-item">
                                        <div className="icon">
                                            <i class="fi fi-rr-file-pdf"></i>
                                        </div>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Sample.pdf
                                                </Tooltip>
                                            }
                                        >
                                            <p className="text-truncate filename">
                                                Sample.pdf
                                            </p>
                                        </OverlayTrigger>
                                        <button className="attachment-download action-btn">
                                            <i className="fi fi-sr-download"></i>
                                        </button>
                                    </div>
                                    <div className="remarks-attachment-item">
                                        <div className="icon">
                                            <i class="fi fi-rr-file-word"></i>
                                        </div>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Lorem Ipsum has been the industry's standard.docx
                                                </Tooltip>
                                            }
                                        >
                                            <p className="text-truncate filename">
                                                Lorem Ipsum has been the industry's standard.docx
                                            </p>
                                        </OverlayTrigger>
                                        <button className="attachment-download action-btn">
                                            <i className="fi fi-sr-download"></i>
                                        </button>
                                    </div>
                                    <div className="remarks-attachment-item">
                                        <div className="icon">
                                            <i class="fi fi-rr-file-excel"></i>
                                        </div>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Lorem Ipsum has been the industry's standard.xlsx
                                                </Tooltip>
                                            }
                                        >
                                            <p className="text-truncate filename">
                                                Lorem Ipsum has been the industry's standard.xlsx
                                            </p>
                                        </OverlayTrigger>
                                        <button className="attachment-download action-btn">
                                            <i className="fi fi-sr-download"></i>
                                        </button>
                                    </div>
                                    <div className="remarks-attachment-item">
                                        <div className="icon">
                                            <i class="fi fi-rr-picture"></i>
                                        </div>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Lorem Ipsum has been the industry's standard.png
                                                </Tooltip>
                                            }
                                        >
                                            <p className="text-truncate filename">
                                                Lorem Ipsum has been the industry's standard.png
                                            </p>
                                        </OverlayTrigger>
                                        <button className="attachment-download action-btn">
                                            <i className="fi fi-sr-download"></i>
                                        </button>
                                    </div>
                                    <div className="remarks-attachment-item">
                                        <div className="icon">
                                            <i class="fi fi-rr-document"></i>
                                        </div>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Lorem Ipsum has been the industry's standard.txt
                                                </Tooltip>
                                            }
                                        >
                                            <p className="text-truncate filename">
                                                Lorem Ipsum has been the industry's standard.txt
                                            </p>
                                        </OverlayTrigger>
                                        <button className="attachment-download action-btn">
                                            <i className="fi fi-sr-download"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* Link Modal */}
                <Modal show={showLinkModal} onHide={handleCloseLinkModal} backdrop="static" centered size="md">
                    <Modal.Header closeButton className="gth-blue-light-bg">
                        <Modal.Title className="gth-modal-title">Add Links</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pb-0">
                        <div className="card shadow-none border position-relative">
                            <button className="link-btn text-exp-blue url-add-more-btn">
                                <u><i className="fi fi-br-plus"></i> Add more</u>
                            </button>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="form-label">Link Name</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="form-group mb-0">
                                            <label className="form-label">Link Url</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card shadow-none border position-relative">
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip>
                                        Remove
                                    </Tooltip>
                                }
                            >
                                <button className="link-btn text-exp-red url-add-more-btn">
                                    <i class="fi fi-rr-cross-circle"></i>
                                </button>
                            </OverlayTrigger>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="form-label">Link Name</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="form-group mb-0">
                                            <label className="form-label">Link Url</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-exp-green" onClick={handleCloseLinkModal}>
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>
                {/* Link Modal End*/}
                {/* New task tracker Modal */}
                <Modal show={showTaskTrackerModal} onHide={handleCloseTaskTrackerModal} backdrop="static" centered size="xl">
                    <Modal.Header closeButton className="gth-blue-light-bg">
                        <Modal.Title className="gth-modal-title">Create New Task Tracker</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pb-0">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Task Name <span className="gth-text-danger">*</span></label>
                                    <input type="text" className="form-control" placeholder="Enter Task Name" />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Assign By <span className="gth-text-danger">*</span></label>
                                    <Dropdown className="gth-modal-dropdown">
                                        <Dropdown.Toggle id="status" className="gth-transparent-btn w-100 p-0 text-start">
                                            <div className="form-select">
                                                {/* <div className="profile-wrap small-profile-wrap">
                                                    <div className="exp-avtar bg-exp-yellow">
                                                        <span>SP</span>
                                                    </div>
                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                        <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                    </div>
                                                </div> */}
                                                <span className="text-muted">Select</span>
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <div className="assignee-wrapper">
                                                <div className="search-assignee">
                                                    <span className="search-assignee-icon"><i class="fi fi-rr-search"></i></span><input type="text" className="form-control" placeholder="Search or enter email.." />
                                                </div>
                                                <div className="user-list-wrap">
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <i class="fi fi-rr-user user-icon"></i>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar bg-exp-green">
                                                                <span>JP</span>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Jhon Parker</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671741_1517351722263.jpg'} alt="user" />
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-truncate">Subhadeep Chowdhury</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <i class="fi fi-rr-user user-icon"></i>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar bg-exp-blue">
                                                                <span>MS</span>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Moumita Shome</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-truncate">Gopal Mukherjee</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Assign To <span className="gth-text-danger">*</span></label>
                                    <Dropdown className="gth-modal-dropdown">
                                        <Dropdown.Toggle id="status" className="gth-transparent-btn w-100 p-0 text-start">
                                            <div className="form-select">
                                                {/* <div className="profile-wrap small-profile-wrap">
                                                    <div className="exp-avtar bg-exp-yellow">
                                                        <span>SP</span>
                                                    </div>
                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                        <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                    </div>
                                                </div> */}
                                                <span className="text-muted">Select</span>
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <div className="assignee-wrapper">
                                                <div className="search-assignee">
                                                    <span className="search-assignee-icon"><i class="fi fi-rr-search"></i></span><input type="text" className="form-control" placeholder="Search or enter email.." />
                                                </div>
                                                <div className="user-list-wrap">
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <i class="fi fi-rr-user user-icon"></i>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar bg-exp-green">
                                                                <span>JP</span>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Jhon Parker</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671741_1517351722263.jpg'} alt="user" />
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-truncate">Subhadeep Chowdhury</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <i class="fi fi-rr-user user-icon"></i>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar bg-exp-blue">
                                                                <span>MS</span>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Moumita Shome</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-truncate">Gopal Mukherjee</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                <div className='form-group'>
                                    <label className='form-label'>Planned Date <span className='text-exp-red'>*</span></label>
                                    <div className="exp-datepicker-cont">
                                        <span className="cal-icon"><i class="fi fi-rr-calendar" /></span>
                                        <DatePicker
                                            selected={taskPlannedDate.startData} onChange={(date) => setTaskPlannedDate({ ...issueDate, startData: date })}
                                            dateFormat="dd/MM/YYYY"
                                            placeholderText='Select Date'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                <div className='form-group'>
                                    <label className='form-label'>Task Priority <span className='text-exp-red'>*</span></label>
                                    <div className='custom-select-wrap'>
                                        <Select
                                            name='newTaskPriority'
                                            options={newTaskPriority}
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
                            <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                <div className='form-group'>
                                    <label className='form-label'>Upload File (if any)</label>
                                    <input type='file' className='form-control' placeholder='Enter Task Name' />
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='form-group'>
                                    <label className='form-label'>Description</label>
                                    <textarea className='form-control' placeholder='Enter Description' rows={3}
                                        ref={taskDescriptionRef}
                                        value={taskDescription}
                                        onChange={handleChangeTaskDescription}></textarea>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                <div className="form-group">
                                    <label className="form-label">Notify To (if not done)</label>
                                    <Dropdown className="gth-modal-dropdown">
                                        <Dropdown.Toggle id="status" className="gth-transparent-btn w-100 p-0 text-start">
                                            <div className="form-select">
                                                {/* <div className="profile-wrap small-profile-wrap">
                                                    <div className="exp-avtar bg-exp-yellow">
                                                        <span>SP</span>
                                                    </div>
                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                        <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                    </div>
                                                </div> */}
                                                <span className="text-muted">Select</span>
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <div className="assignee-wrapper">
                                                <div className="search-assignee">
                                                    <span className="search-assignee-icon"><i class="fi fi-rr-search"></i></span><input type="text" className="form-control" placeholder="Search or enter email.." />
                                                </div>
                                                <div className="user-list-wrap">
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <i class="fi fi-rr-user user-icon"></i>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar bg-exp-green">
                                                                <span>JP</span>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Jhon Parker</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671741_1517351722263.jpg'} alt="user" />
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-truncate">Subhadeep Chowdhury</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <i class="fi fi-rr-user user-icon"></i>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar bg-exp-blue">
                                                                <span>MS</span>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Moumita Shome</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-truncate">Gopal Mukherjee</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                <div className="form-group">
                                    <label className="form-label">Auditor</label>
                                    <Dropdown className="gth-modal-dropdown">
                                        <Dropdown.Toggle id="status" className="gth-transparent-btn w-100 p-0 text-start">
                                            <div className="form-select">
                                                {/* <div className="profile-wrap small-profile-wrap">
                                                    <div className="exp-avtar bg-exp-yellow">
                                                        <span>SP</span>
                                                    </div>
                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                        <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                    </div>
                                                </div> */}
                                                <span className="text-muted">Select</span>
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <div className="assignee-wrapper">
                                                <div className="search-assignee">
                                                    <span className="search-assignee-icon"><i class="fi fi-rr-search"></i></span><input type="text" className="form-control" placeholder="Search or enter email.." />
                                                </div>
                                                <div className="user-list-wrap">
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <i class="fi fi-rr-user user-icon"></i>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar bg-exp-green">
                                                                <span>JP</span>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Jhon Parker</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671741_1517351722263.jpg'} alt="user" />
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-truncate">Subhadeep Chowdhury</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <i class="fi fi-rr-user user-icon"></i>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar bg-exp-blue">
                                                                <span>MS</span>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Moumita Shome</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-truncate">Gopal Mukherjee</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='form-group'>
                                    <label className="custom-switch" >
                                        <span className='switch-name'>Set Reminder</span>
                                        <input type="checkbox" onChange={handleSetReminder} />
                                        <div className="switch-slider switch-round" />
                                    </label>
                                </div>
                            </div>
                            {isCheckedReminder && (
                                <div className='col-12 reminder-wrap'>
                                    <div className='row'>
                                        <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                            <div className='form-group'>
                                                <label className='form-label'>Reminder Mode</label>
                                                <div className='custom-select-wrap'>
                                                    <Select
                                                        name='selectReminderMode'
                                                        options={selectReminderMode}
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
                                        <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                            <div className='form-group'>
                                                <label className='form-label'>Reminder Before Time </label>
                                                <input type='number' className='form-control' placeholder='Reminder Before Time' />
                                            </div>
                                        </div>
                                        <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                            <div className='form-group'>
                                                <label className='form-label'>Reminder Frequency</label>
                                                <input type='number' className='form-control' placeholder='Reminder Frequency' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="col-12">
                                <div className="form-group">
                                    <label class="custom-checkbox">
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                        Attachment is require for this task
                                    </label>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-exp-green" onClick={handleCloseTaskTrackerModal}>
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>
                {/* New task tracker Modal End*/}
                {/* New checksheet Modal */}
                <Modal show={showChecksheetModal} onHide={handleCloseChecksheetModal} backdrop="static" centered size="xl">
                    <Modal.Header closeButton className="gth-blue-light-bg">
                        <Modal.Title className="gth-modal-title">Create New Checksheet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pb-0">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Task Name <span className="gth-text-danger">*</span></label>
                                    <input type="text" className="form-control" placeholder="Enter Task Name" />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Assign By <span className="gth-text-danger">*</span></label>
                                    <Dropdown className="gth-modal-dropdown">
                                        <Dropdown.Toggle id="status" className="gth-transparent-btn w-100 p-0 text-start">
                                            <div className="form-select">
                                                {/* <div className="profile-wrap small-profile-wrap">
                                                    <div className="exp-avtar bg-exp-yellow">
                                                        <span>SP</span>
                                                    </div>
                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                        <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                    </div>
                                                </div> */}
                                                <span className="text-muted">Select</span>
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <div className="assignee-wrapper">
                                                <div className="search-assignee">
                                                    <span className="search-assignee-icon"><i class="fi fi-rr-search"></i></span><input type="text" className="form-control" placeholder="Search or enter email.." />
                                                </div>
                                                <div className="user-list-wrap">
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <i class="fi fi-rr-user user-icon"></i>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar bg-exp-green">
                                                                <span>JP</span>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Jhon Parker</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671741_1517351722263.jpg'} alt="user" />
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-truncate">Subhadeep Chowdhury</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <i class="fi fi-rr-user user-icon"></i>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar bg-exp-blue">
                                                                <span>MS</span>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Moumita Shome</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-truncate">Gopal Mukherjee</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="form-label">Assign To <span className="gth-text-danger">*</span></label>
                                    <Dropdown className="gth-modal-dropdown">
                                        <Dropdown.Toggle id="status" className="gth-transparent-btn w-100 p-0 text-start">
                                            <div className="form-select">
                                                {/* <div className="profile-wrap small-profile-wrap">
                                                    <div className="exp-avtar bg-exp-yellow">
                                                        <span>SP</span>
                                                    </div>
                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                        <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                    </div>
                                                </div> */}
                                                <span className="text-muted">Select</span>
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <div className="assignee-wrapper">
                                                <div className="search-assignee">
                                                    <span className="search-assignee-icon"><i class="fi fi-rr-search"></i></span><input type="text" className="form-control" placeholder="Search or enter email.." />
                                                </div>
                                                <div className="user-list-wrap">
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <i class="fi fi-rr-user user-icon"></i>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar bg-exp-green">
                                                                <span>JP</span>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Jhon Parker</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671741_1517351722263.jpg'} alt="user" />
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-truncate">Subhadeep Chowdhury</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <i class="fi fi-rr-user user-icon"></i>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar bg-exp-blue">
                                                                <span>MS</span>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Moumita Shome</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-truncate">Gopal Mukherjee</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                <div className='form-group'>
                                    <label className='form-label'>Issue Date <span className='text-exp-red'>*</span></label>
                                    <div className="exp-datepicker-cont">
                                        <span className="cal-icon"><i class="fi fi-rr-calendar" /></span>
                                        <DatePicker
                                            selected={issueDate.startData} onChange={(date) => setIssueDate({ ...issueDate, startData: date })}
                                            dateFormat="dd/MM/YYYY"
                                            placeholderText='Select Date'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                <div className='form-group'>
                                    <label className='form-label'>Mode <span className='text-exp-red'>*</span></label>
                                    <div className='custom-select-wrap'>
                                        <Select
                                            name='selectMode'
                                            options={selectMode}
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
                            <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                <div className='form-group'>
                                    <label className='form-label'>Frequency <span className='text-exp-red'>*</span></label>
                                    <input type='number' className='form-control' placeholder='Enter Task Name' />
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='form-group'>
                                    <label className='form-label'>Description</label>
                                    <textarea className='form-control' placeholder='Enter Description' rows={3}
                                        ref={checksheetDescriptionRef}
                                        value={checksheetDescription}
                                        onChange={handleChecksheetDescription}></textarea>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                <div className='form-group'>
                                    <label className='form-label'>Task Priority <span className='text-exp-red'>*</span></label>
                                    <div className='custom-select-wrap'>
                                        <Select
                                            name='selectTaskPriority'
                                            options={selectTaskPriority}
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
                            <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                <div className="form-group">
                                    <label className="form-label">Notify To (if not done)</label>
                                    <Dropdown className="gth-modal-dropdown">
                                        <Dropdown.Toggle id="status" className="gth-transparent-btn w-100 p-0 text-start">
                                            <div className="form-select">
                                                {/* <div className="profile-wrap small-profile-wrap">
                                                    <div className="exp-avtar bg-exp-yellow">
                                                        <span>SP</span>
                                                    </div>
                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                        <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                    </div>
                                                </div> */}
                                                <span className="text-muted">Select</span>
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <div className="assignee-wrapper">
                                                <div className="search-assignee">
                                                    <span className="search-assignee-icon"><i class="fi fi-rr-search"></i></span><input type="text" className="form-control" placeholder="Search or enter email.." />
                                                </div>
                                                <div className="user-list-wrap">
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <i class="fi fi-rr-user user-icon"></i>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar bg-exp-green">
                                                                <span>JP</span>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Jhon Parker</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671741_1517351722263.jpg'} alt="user" />
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-truncate">Subhadeep Chowdhury</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <i class="fi fi-rr-user user-icon"></i>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar bg-exp-blue">
                                                                <span>MS</span>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Moumita Shome</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-truncate">Gopal Mukherjee</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                <div className="form-group">
                                    <label className="form-label">Auditor</label>
                                    <Dropdown className="gth-modal-dropdown">
                                        <Dropdown.Toggle id="status" className="gth-transparent-btn w-100 p-0 text-start">
                                            <div className="form-select">
                                                {/* <div className="profile-wrap small-profile-wrap">
                                                    <div className="exp-avtar bg-exp-yellow">
                                                        <span>SP</span>
                                                    </div>
                                                    <div className="ps-2 profile-name-wrap text-truncate">
                                                        <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                    </div>
                                                </div> */}
                                                <span className="text-muted">Select</span>
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <div className="assignee-wrapper">
                                                <div className="search-assignee">
                                                    <span className="search-assignee-icon"><i class="fi fi-rr-search"></i></span><input type="text" className="form-control" placeholder="Search or enter email.." />
                                                </div>
                                                <div className="user-list-wrap">
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <i class="fi fi-rr-user user-icon"></i>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar bg-exp-green">
                                                                <span>JP</span>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Jhon Parker</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671741_1517351722263.jpg'} alt="user" />
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-truncate">Subhadeep Chowdhury</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <i class="fi fi-rr-user user-icon"></i>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Sujit Paul</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar bg-exp-blue">
                                                                <span>MS</span>
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-nowrap">Moumita Shome</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-item">
                                                        <div className="profile-wrap">
                                                            <div className="exp-avtar">
                                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                                            </div>
                                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                                <h5 className="profile-name text-truncate">Gopal Mukherjee</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='form-group'>
                                    <label className="custom-switch" >
                                        <span className='switch-name'>Set Reminder</span>
                                        <input type="checkbox" onChange={handleSetReminder} />
                                        <div className="switch-slider switch-round" />
                                    </label>
                                </div>
                            </div>
                            {isCheckedReminder && (
                                <div className='col-12 reminder-wrap'>
                                    <div className='row'>
                                        <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                            <div className='form-group'>
                                                <label className='form-label'>Reminder Mode</label>
                                                <div className='custom-select-wrap'>
                                                    <Select
                                                        name='selectReminderMode'
                                                        options={selectReminderMode}
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
                                        <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                            <div className='form-group'>
                                                <label className='form-label'>Reminder Before Time </label>
                                                <input type='number' className='form-control' placeholder='Reminder Before Time' />
                                            </div>
                                        </div>
                                        <div className='col-lg-4 col-md-4 col-sm-6 col-12'>
                                            <div className='form-group'>
                                                <label className='form-label'>Reminder Frequency</label>
                                                <input type='number' className='form-control' placeholder='Reminder Frequency' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="col-12">
                                <div className="form-group">
                                    <label class="custom-checkbox">
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                        Attachment is require for this task
                                    </label>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-exp-green" onClick={handleCloseChecksheetModal}>
                            Create
                        </button>
                    </Modal.Footer>
                </Modal>
                {/* New checksheet Modal End*/}
                {/* Task Done modal start */}
                <Modal
                    show={taskDoneShow}
                    onHide={taskDoneModalClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton className="gth-blue-light-bg">
                        <Modal.Title className="gth-modal-title">Complete Task of <span>Undefined</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='pb-1'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label className="form-label">Assigned By : </label>
                                    <p className='mb-0'>Undefined</p>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label className="form-label">Planned Date : </label>
                                    <p className='mb-0'>Undefined</p>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className="form-group">
                                    <label className="form-label">Remarks : </label>
                                    <textarea className="form-control" name="remarks" rows="3"></textarea>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className="form-group">
                                    <label className="form-label">File : </label>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-exp-green'>
                            Confirm
                        </button>
                    </Modal.Footer>
                </Modal>
                {/* Task Done modal end */}
                {/* Stop / Close modal start */}
                <Modal
                    show={stopShow}
                    onHide={stopModalClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton className="gth-blue-light-bg">
                        <Modal.Title className="gth-modal-title">Close This Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='pb-1'>
                        <div className='row'>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="remarks" className="form-label">Remarks</label>
                                    <textarea className="form-control" name="remarks" rows={3} defaultValue={""} />
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
                {/* Stop / Close modal end */}
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
                {/* Task ReOpen modal start */}
                <Modal
                    show={taskReOpenShow}
                    onHide={taskReOpenModalClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton className="gth-blue-light-bg">
                        <Modal.Title className="gth-modal-title">Re-open <span>Undefined</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='pb-1'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label className="form-label">Assign By : </label>
                                    <p className='mb-0'>Undefined</p>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label className="form-label">Assign To : </label>
                                    <p className='mb-0'>Undefined</p>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label className="form-label">Planned Date : </label>
                                    <p className='mb-0'>Undefined</p>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="form-group">
                                    <label className="form-label">Completed Date : </label>
                                    <p className='mb-0'>Undefined</p>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='form-group'>
                                    <label className='form-label'>Re-Planned Date <span className='text-exp-red'>*</span></label>
                                    <div className="exp-datepicker-cont">
                                        <span className="cal-icon"><i class="fi fi-rr-calendar" /></span>
                                        <DatePicker
                                            selected={taskRePlannedDate.startData} onChange={(date) => setTaskRePlannedDate({ ...issueDate, startData: date })}
                                            dateFormat="dd/MM/YYYY"
                                            placeholderText='Select Date'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-exp-green'>
                            Re-Open
                        </button>
                    </Modal.Footer>
                </Modal>
                {/* Task ReOpen modal end */}
                {/* chat box */}
                <Offcanvas className="chat-canvas" show={showChatWrap} onHide={handleCloseChatWrap} placement="end">
                    <Offcanvas.Header closeButton className="d-block gth-blue-light-bg">
                        <Offcanvas.Title className="gth-modal-title">Task Name</Offcanvas.Title>
                        <div className="short-details-wrap mt-2">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <label className="form-label">Assignee</label>
                                        <div className="profile-wrap">
                                            <div className="exp-avtar bg-exp-green">
                                                {/* <i class="fi fi-rr-user user-icon"></i> */}
                                                <span>JP</span>
                                            </div>
                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                <h5 className="profile-name text-nowrap text-truncate">Jhon Parker</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <label className="form-label">Doer</label>
                                        <div className="profile-wrap">
                                            <div className="exp-avtar bg-exp-yellow">
                                                {/* <i class="fi fi-rr-user user-icon"></i> */}
                                                <span>SP</span>
                                            </div>
                                            <div className="ps-2 profile-name-wrap text-truncate">
                                                <h5 className="profile-name text-nowrap text-truncate">Sujit Paul</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <label className="form-label">Date</label>
                                        <p className="mb-0 f-s-14">{format(startDate, "d MMMM, yyyy")}</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <label className="form-label">Priority</label>
                                        <div class="priority-set urgent">
                                            <i class="fi fi-sr-flag-alt mr-2"></i><span>Urgent</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <label className="form-label">Status</label>
                                        <div class="status-item todo">
                                            <i class="fi fi-rr-dot-circle me-2"></i>
                                            <span>To Do</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="chat-wrapper">
                            <div className="chat-conversation-wrap">
                                <div className="chat-msg">
                                    <div className="chat-msg-profile-image">
                                        <div class="profile-wrap">
                                            <div class="exp-avtar bg-exp-yellow">
                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                                {/* <span>SP</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-msg-content">
                                        <div className="chat-profile-name text-truncate">
                                            Jhon Parker
                                        </div>
                                        <div className="chat-msg-text">
                                            Neque gravida in fermentum et sollicitudin ac orci phasellus egestas. Pretium lectus quam id leo.
                                        </div>
                                        <div className="chat-msg-date">
                                            12/06/2024
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-msg">
                                    <div className="chat-msg-profile-image">
                                        <div class="profile-wrap">
                                            <div class="exp-avtar bg-exp-yellow">
                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                                {/* <span>SP</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-msg-content">
                                        <div className="chat-profile-name text-truncate">
                                            Jhon Parker
                                        </div>
                                        <div className="chat-msg-text">
                                            <div class="chat-attachment-item">
                                                <div class="icon">
                                                    <i class="fi fi-rr-file-word"></i>
                                                </div>
                                                <p class="text-truncate filename">Lorem Ipsum has been the industry's standard.docx</p>
                                                <button class="attachment-download action-btn">
                                                    <i class="fi fi-sr-download"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="chat-msg-date">
                                            12/06/2024
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-msg owner">
                                    <div className="chat-msg-profile-image">
                                        <div class="profile-wrap">
                                            <div class="exp-avtar bg-exp-yellow">
                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                                {/* <span>SP</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-msg-content">
                                        <div className="chat-profile-name text-truncate">
                                            Jhon Parker
                                        </div>
                                        <div className="chat-msg-text">
                                            Neque gravida in fermentum et sollicitudin ac orci phasellus egestas. Pretium lectus quam id leo.
                                        </div>
                                        <div className="chat-msg-date">
                                            12/06/2024
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-msg owner">
                                    <div className="chat-msg-profile-image">
                                        <div class="profile-wrap">
                                            <div class="exp-avtar bg-exp-yellow">
                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                                {/* <span>SP</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-msg-content">
                                        <div className="chat-profile-name text-truncate">
                                            Jhon Parker
                                        </div>
                                        <div className="chat-msg-text">
                                            <div class="chat-attachment-item">
                                                <div class="icon">
                                                    <i class="fi fi-rr-file-word"></i>
                                                </div>
                                                <p class="text-truncate filename">Lorem Ipsum has been the industry's standard.docx</p>
                                                <button class="attachment-download action-btn">
                                                    <i class="fi fi-sr-download"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="chat-msg-date">
                                            12/06/2024
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-msg">
                                    <div className="chat-msg-profile-image">
                                        <div className="profile-wrap">
                                            <div className="exp-avtar bg-exp-yellow">
                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                                {/* <span>SP</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-msg-content">
                                        <div className="chat-profile-name text-truncate">
                                            Jhon Parker
                                        </div>
                                        <div className="chat-msg-text">
                                            Neque gravida in fermentum et sollicitudin ac orci phasellus egestas. Pretium lectus quam id leo.
                                        </div>
                                        <div className="chat-msg-date">
                                            12/06/2024
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-msg">
                                    <div className="chat-msg-profile-image">
                                        <div className="profile-wrap">
                                            <div className="exp-avtar bg-exp-yellow">
                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/users/1694671598_002.png'} alt="user" />
                                                {/* <span>SP</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-msg-content">
                                        <div className="chat-profile-name text-truncate">
                                            Jhon Parker
                                        </div>
                                        <div className="chat-msg-text">
                                            <div className="chat-attachment-item">
                                                <div className="icon">
                                                    <i className="fi fi-rr-file-word" />
                                                </div>
                                                <p className="text-truncate filename">Lorem Ipsum has been the industry's standard.docx</p>
                                                <button className="attachment-download action-btn">
                                                    <i className="fi fi-sr-download" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="chat-msg-date">
                                            12/06/2024
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat-area-footer">
                                <div className="chat-file-upload custom-file-upload">
                                    <i class="fi fi-rr-clip"></i>
                                    <input type="file" name="myfile" className="input-upload" />
                                </div>
                                <input type="text" placeholder="Type something here..." className="chat-input" />
                                <button className="send-btn">
                                    <i class="fi fi-sr-paper-plane"></i>
                                </button>
                            </div>
                        </div>

                    </Offcanvas.Body>
                </Offcanvas>
                {/* chat box end */}
            </>
        </React.Fragment>
    )
}

export default Dashboardv2