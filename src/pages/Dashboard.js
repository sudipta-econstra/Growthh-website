import React, { useContext } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { OverlayTrigger, Popover, Tab, Tabs, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
// import { UserContext } from '../routes/ProtectedRoute';
ChartJS.register(ArcElement, Legend);
//data workflow
export const data = {
    labels: ['Done', 'Delay', 'Pending'],
    datasets: [
        {
            label: 'Done',
            data: [12, 6, 10],
            backgroundColor: [
                'rgb(0, 200, 117)',
                'rgb(255, 193, 7)',
                'rgb(223, 47, 74)',
            ],
        },
    ],
};
const optionsWorkflow = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
        },
        title: {
            display: true,
            fontSize: 18,
            text: 'Workflow'
        }
    }
}
//data Task Tracker
export const dataTasktracker = {
    labels: ['Done', 'Delay', 'Pending'],
    datasets: [
        {
            label: 'Done',
            data: [20, 10, 12],
            backgroundColor: [
                'rgb(0, 200, 117)',
                'rgb(255, 193, 7)',
                'rgb(223, 47, 74)',
            ],
        },
    ],
};
const optionsTasktracker = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
        },
        title: {
            display: true,
            fontSize: 18,
            text: 'Task Tracker'
        }
    }
}
//data Checklist
export const dataChecklist = {
    labels: ['Done', 'Delay', 'Pending'],
    datasets: [
        {
            label: 'Done',
            data: [30, 20, 50],
            backgroundColor: [
                'rgb(0, 200, 117)',
                'rgb(255, 193, 7)',
                'rgb(223, 47, 74)',
            ],
        },
    ],
};
const optionsChecklist = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
        },
        title: {
            display: true,
            fontSize: 18,
            text: 'Checklist'
        }
    }
}
const events = [
    {
        title: 'Workflow',
        start: '2024-04-18',
        backgroundColor: 'rgb(255, 252, 218)',
        borderColor: 'rgb(255, 193, 7)',
    },
    {
        title: 'Task Tracker',
        start: '2024-04-18',
        backgroundColor: 'rgb(243, 229, 251)',
        borderColor: 'rgb(131, 42, 204)'
    },
    {
        title: 'Checksheet',
        start: '2024-04-19',
        end: '2024-04-20',
        backgroundColor: 'rgb(227, 255, 254)',
        borderColor: 'rgb(0, 133, 126)'
    }
    //{ title: 'Meeting' }
]


function Dashboard() {
    // const user = useContext(UserContext);

    const popover = (
        <Popover>
            <Popover.Header as="h3">Task Details</Popover.Header>
            <Popover.Body>
                <div className='exp-popover-wrap'>
                    <p className='exp-task-details-item'>
                        <span className='exp-task-details-name'>PO Number:</span>
                        100/100
                    </p>
                    <p className='exp-task-details-item'>
                        <span className='exp-task-details-name'>PO Number:</span>
                        100/100
                    </p>
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <React.Fragment>
            <div className="p-4">

            
            <div className='row'>
                <div className='col-md-8 admin-left-section'>
                    <div className='row align-items-stretch'>
                        <div className='col-lg-3 col-md-6 col-sm-6 col-12 top-card'>
                            <div className='card mb-4 graph-card'>
                                <div className='card-body'>
                                    <div id='preview'>
                                        <div className='overall-performance-wrap text-center'>
                                            <img src={process.env.PUBLIC_URL + 'assets/images/overall-performance.jpg'} alt="graph" className="img-fluid" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-6 col-12 top-card' id='fms_chart_div'>
                            <div className='card text-center graph-card mb-4'>
                                <div className='card-body'>
                                    <Doughnut options={optionsWorkflow} data={data} />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-6 col-12 top-card' id='delegation_chart_div'>
                            <div className='card text-center graph-card mb-4'>
                                <div className='card-body'>
                                    <Doughnut options={optionsTasktracker} data={dataTasktracker} />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-6 col-12 top-card' id='checklist_chart_div'>
                            <div className='card text-center graph-card mb-4'>
                                <div className='card-body'>
                                    <Doughnut options={optionsChecklist} data={dataChecklist} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='calender-wrap'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <FullCalendar
                                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                            initialView="dayGridMonth"
                                            events={events}
                                            headerToolbar={{
                                                left: 'prev,next today',
                                                center: 'title',
                                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                            }}
                                        //eventContent={renderEventContent}
                                        />
                                    </div>
                                </div>
                                <div className="w-100 d-flex flex-wrap p-3 rounded-10 bg-light pb-0">
                                    <div className="d-flex mb-3 me-4">
                                        <div className="fms-color-box" />
                                        <div className="ms-2">Work Flow</div>
                                    </div>
                                    <div className="d-flex mb-3 me-4">
                                        <div className="d-color-box" />
                                        <div className="ms-2">Task Tracker</div>
                                    </div>
                                    <div className="d-flex mb-3 me-4">
                                        <div className="ch-color-box" />
                                        <div className="ms-2">Checksheet</div>
                                    </div>
                                    {/* <div class="d-flex mb-3">
                                        <div class="done-color-box"></div>
                                        <div class="ms-2">Done</div>
                                    </div> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 admin-right-section'>
                    <div className="mb-4 exp-sticky-notes2 card">
                        <div className="sticky-pin">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" height="100%" x={0} y={0} viewBox="0 0 512.019 512.019" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve" className>
                                <g>
                                    <path d="M178.229 376.467 135.562 333.8a10.455 10.455 0 0 0-8.363-3.115 10.665 10.665 0 0 0-7.787 4.267l-117.269 160c-3.535 4.713-2.58 11.399 2.133 14.933a10.668 10.668 0 0 0 12.8 0l160-117.333c4.752-3.481 5.783-10.156 2.302-14.908a10.75 10.75 0 0 0-1.064-1.241l-.085.064z" style={{}} fill="#cfd8dc" data-original="#cfd8dc" />
                                    <path d="M316.895 301.8 210.229 195.134a95.09 95.09 0 0 0-63.019-19.947A110.06 110.06 0 0 0 67.125 205.8c-17.323 17.323-15.531 44.096 5.333 79.595a467.078 467.078 0 0 0 69.333 84.821c42.432 42.411 96 86.485 135.04 86.485a39.916 39.916 0 0 0 29.376-11.819c44.416-44.394 33.344-120.404 10.688-143.082z" style={{}} fill="#d32f2f" data-original="#d32f2f" />
                                    <path d="M402.229 216.467 295.562 109.8c-4.165-4.164-10.917-4.164-15.083 0l-85.333 85.333c-13.952 13.952-12.8 44.8 32 89.749 29.248 29.248 52.565 39.893 69.12 39.893a28.306 28.306 0 0 0 20.629-7.893l85.333-85.333c4.165-4.165 4.165-10.917.001-15.082z" style={{}} fill="#f44336" data-original="#f44336" />
                                    <path d="M511.199 187.944a10.668 10.668 0 0 0-9.856-6.592c-23.125 0-73.899-25.003-109.781-60.885s-60.885-86.635-60.885-109.781a10.667 10.667 0 0 0-18.219-7.552c-43.563 43.584-57.173 117.909 10.667 185.749a142.632 142.632 0 0 0 100.693 47.125 120.68 120.68 0 0 0 85.056-36.459 10.666 10.666 0 0 0 2.325-11.605z" style={{}} fill="#d32f2f" data-original="#d32f2f" />
                                    <path d="M444.895 67.134C399.711 21.971 358.858.019 320.01.019c-5.891 0-10.667 4.776-10.667 10.667 0 31.851 30.123 87.872 67.115 124.885s93.056 67.115 124.885 67.115c5.891 0 10.667-4.776 10.667-10.667 0-38.869-21.952-79.723-67.115-124.885z" style={{}} fill="#f44336" data-original="#f44336" />
                                </g>
                            </svg>
                        </div>
                        <h5 className="note-title2 px-3 py-2 mb-0 border-bottom">Notes</h5>
                        <div className="exp-sticky-notes-wrap2 card-body overflow-x-hidden overflow-y-auto">
                            <div className="panel bg-success-light border-success rounded-10 border mb-3">
                                <div className="panel-body d-flex align-items-start p-3">
                                    <div className="pe-3">
                                        <div className="profile-wrap">
                                            <div className="exp-avtar">
                                                <img className="prof-img" src={process.env.PUBLIC_URL + 'assets/images/user.png'} alt="user" />
                                            </div>
                                            <div className="ps-2">
                                                <h5 className="profile-name">Sujit Paul</h5>
                                            </div>
                                        </div>
                                        <div className="task-details mt-2">
                                            <p>
                                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
                                                accusamus non praesentium voluptates! Voluptatem culpa earum consectetur
                                                quod quae odit delectus, sapiente corrupti, sunt quam itaque alias. Fugiat,
                                                voluptate nesciunt?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel bg-warning-light border-warning rounded-10 border mb-3">
                                <div className="panel-body d-flex align-items-start p-3">
                                    <div className="pe-3">
                                        <div className="profile-wrap">
                                            <div className="exp-avtar bg-exp-blue">
                                                MS
                                            </div>
                                            <div className="ps-2">
                                                <h5 className="profile-name">Moumita Shome</h5>
                                            </div>
                                        </div>
                                        <div className="task-details mt-2">
                                            <p>
                                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
                                                accusamus non praesentium voluptates!
                                            </p>
                                        </div>
                                    </div>
                                    <div className="action-wrap">
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip >
                                                    Done
                                                </Tooltip>
                                            }
                                        >
                                            <button className="btn btn-outline-success btn-squre" >
                                                <i className="bi bi-check2" />
                                            </button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </div>
                            <div className="panel bg-warning-light border-warning rounded-10 border mb-3">
                                <div className="panel-body d-flex align-items-start p-3">
                                    <div className="pe-3">
                                        <div className="profile-wrap">
                                            <div className="exp-avtar bg-exp-green">
                                                JP
                                            </div>
                                            <div className="ps-2">
                                                <h5 className="profile-name">Jhon Parker</h5>
                                            </div>
                                        </div>
                                        <div className="task-details mt-2">
                                            <p>
                                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
                                                accusamus non praesentium voluptates!
                                            </p>
                                        </div>
                                    </div>
                                    <div className="action-wrap">
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip >
                                                    Done
                                                </Tooltip>
                                            }
                                        >
                                            <button className="btn btn-outline-success btn-squre" >
                                                <i className="bi bi-check2" />
                                            </button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </div>
                            <div className="panel bg-warning-light border-warning rounded-10 border">
                                <div className="panel-body d-flex align-items-start p-3">
                                    <div className="pe-3">
                                        <div className="profile-wrap">
                                            <div className="exp-avtar bg-exp-green">
                                                JP
                                            </div>
                                            <div className="ps-2">
                                                <h5 className="profile-name">Jhon Parker</h5>
                                            </div>
                                        </div>
                                        <div className="task-details mt-2">
                                            <p>
                                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
                                                accusamus non praesentium voluptates!
                                            </p>
                                        </div>
                                    </div>
                                    <div className="action-wrap">
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip >
                                                    Done
                                                </Tooltip>
                                            }
                                        >
                                            <button className="btn btn-outline-success btn-squre" >
                                                <i className="bi bi-check2" />
                                            </button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </div>
                            {/* no task */}
                            <div className="text-center mt-3">
                                <div className="exp-no-data-found text-exp-red">
                                    <img className="task-img mb-3" src={process.env.PUBLIC_URL + 'assets/images/empty-notes.webp'} alt="No task" />
                                    <h6 className="mb-3">No Record Found</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='card mb-0'>
                        <Tabs
                            defaultActiveKey="all"
                            id="uncontrolled-tab-example"
                            className="exp-tabs"
                        >
                            <Tab eventKey="all" title="All">
                                <div className='card-body scroll-card-body'>
                                    <div className="tab-max-height">
                                        <div className="rounded-10 fms-items p-3 exp-fms-bg mb-3 each-items">
                                            <div className="position-relative pe-4 w-100">
                                                <span className="exp-fms-title text-dark">
                                                    Task name : <span>Check Inventory, Is It Available?</span>
                                                </span>
                                                <span className="exp-fms-date d-flex text-dark">
                                                    Due Date : <span>2024-04-16 12:00:00</span>
                                                    <div>
                                                        <OverlayTrigger trigger="focus" placement="auto" overlay={popover}>
                                                            <span>
                                                                <OverlayTrigger
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip >
                                                                            Click to view Task Details
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <button className='link-btn ms-2'>
                                                                        <i className="bi bi-info-circle-fill" />
                                                                    </button>
                                                                </OverlayTrigger>
                                                            </span>
                                                        </OverlayTrigger>
                                                    </div>
                                                </span>

                                                <OverlayTrigger
                                                    placement="auto"
                                                    overlay={
                                                        <Tooltip >
                                                            Edit
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link to="#" className="exp-fms-edit text-dark">
                                                        <i className="bi bi-pencil-fill" />
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                        <div className="rounded-10 fms-items p-3 exp-fms-bg mb-3 each-items">
                                            <div className="position-relative pe-4 w-100">
                                                <span className="exp-fms-title text-dark">
                                                    Task name : <span>Check Inventory, Is It Available?</span>
                                                </span>
                                                <span className="exp-fms-date d-flex text-dark">
                                                    Due Date : <span>2024-04-16 12:00:00</span>
                                                    <div>
                                                        <OverlayTrigger trigger="focus" placement="auto" overlay={popover}>
                                                            <span>
                                                                <OverlayTrigger
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip >
                                                                            Click to view Task Details
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <button className='link-btn ms-2'>
                                                                        <i className="bi bi-info-circle-fill" />
                                                                    </button>
                                                                </OverlayTrigger>
                                                            </span>
                                                        </OverlayTrigger>
                                                    </div>
                                                </span>
                                                <OverlayTrigger
                                                    placement="auto"
                                                    overlay={
                                                        <Tooltip >
                                                            Edit
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link to="#" className="exp-fms-edit text-dark">
                                                        <i className="bi bi-pencil-fill" />
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                        <div className="rounded-10 delegation-items p-3 exp-delegation-bg each-items">
                                            <div className="position-relative pe-4 w-100">
                                                <span className="exp-fms-title text-dark">Demo Task Tracker 1</span>
                                                <span className="exp-fms-date d-flex text-dark">
                                                    Due Date : 2024-03-08
                                                </span>
                                                <OverlayTrigger
                                                    placement="auto"
                                                    overlay={
                                                        <Tooltip >
                                                            Edit
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link to="#" className="exp-fms-edit text-dark">
                                                        <i className="bi bi-pencil-fill" />
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                        <div className="rounded-10 delegation-items p-3 exp-delegation-bg each-items">
                                            <div className="position-relative pe-4 w-100">
                                                <span className="exp-fms-title text-dark">Demo Task Tracker 1</span>
                                                <span className="exp-fms-date d-flex text-dark">
                                                    Due Date : 2024-03-08
                                                </span>
                                                <OverlayTrigger
                                                    placement="auto"
                                                    overlay={
                                                        <Tooltip >
                                                            Edit
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link to="#" className="exp-fms-edit text-dark">
                                                        <i className="bi bi-pencil-fill" />
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                        <div className="rounded-10 checklist-items p-3 exp-checklist-bg each-items">
                                            <div className="position-relative pe-4 w-100">
                                                <span className="exp-fms-title text-dark">
                                                    Task name test
                                                </span>
                                                <span className="exp-fms-date d-flex text-dark">
                                                    Due Date : 2024-04-12 11:00:00
                                                </span>
                                                <OverlayTrigger
                                                    placement="auto"
                                                    overlay={
                                                        <Tooltip >
                                                            Edit
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link to="#" className="exp-fms-edit text-dark">
                                                        <i className="bi bi-pencil-fill" />
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                        <div className="rounded-10 checklist-items p-3 exp-checklist-bg each-items">
                                            <div className="position-relative pe-4 w-100">
                                                <span className="exp-fms-title text-dark">
                                                    Task name test
                                                </span>
                                                <span className="exp-fms-date d-flex text-dark">
                                                    Due Date : 2024-04-12 11:00:00
                                                </span>
                                                <OverlayTrigger
                                                    placement="auto"
                                                    overlay={
                                                        <Tooltip >
                                                            Edit
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link to="#" className="exp-fms-edit text-dark">
                                                        <i className="bi bi-pencil-fill" />
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="workflow" title="Work Flow">
                                <div className='card-body scroll-card-body'>
                                    <div className="tab-max-height">
                                        <div className="rounded-10 fms-items p-3 exp-fms-bg">
                                            <div className="position-relative pe-4 w-100">
                                                <span className="exp-fms-title text-dark">
                                                    Task name : <span>Check Inventory, Is It Available?</span>
                                                </span>
                                                <span className="exp-fms-date d-flex text-dark">
                                                    Due Date : <span>2024-04-16 12:00:00</span>
                                                    <div>
                                                        <OverlayTrigger trigger="focus" placement="auto" overlay={popover}>
                                                            <span>
                                                                <OverlayTrigger
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip >
                                                                            Click to view Task Details
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <button className='link-btn ms-2'>
                                                                        <i className="bi bi-info-circle-fill" />
                                                                    </button>
                                                                </OverlayTrigger>
                                                            </span>
                                                        </OverlayTrigger>
                                                    </div>
                                                </span>
                                                <OverlayTrigger
                                                    placement="auto"
                                                    overlay={
                                                        <Tooltip >
                                                            Edit
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link to="#" className="exp-fms-edit text-dark">
                                                        <i className="bi bi-pencil-fill" />
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                        <div className="rounded-10 fms-items p-3 exp-fms-bg">
                                            <div className="position-relative pe-4 w-100">
                                                <span className="exp-fms-title text-dark">
                                                    Task name : <span>Check Inventory, Is It Available?</span>
                                                </span>
                                                <span className="exp-fms-date d-flex text-dark">
                                                    Due Date : <span>2024-04-16 12:00:00</span>
                                                    <div>
                                                        <OverlayTrigger trigger="focus" placement="auto" overlay={popover}>
                                                            <span>
                                                                <OverlayTrigger
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip >
                                                                            Click to view Task Details
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <button className='link-btn ms-2'>
                                                                        <i className="bi bi-info-circle-fill" />
                                                                    </button>
                                                                </OverlayTrigger>
                                                            </span>
                                                        </OverlayTrigger>
                                                    </div>
                                                </span>
                                                <OverlayTrigger
                                                    placement="auto"
                                                    overlay={
                                                        <Tooltip >
                                                            Edit
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link to="#" className="exp-fms-edit text-dark">
                                                        <i className="bi bi-pencil-fill" />
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                        <div className="rounded-10 fms-items p-3 exp-fms-bg">
                                            <div className="position-relative pe-4 w-100">
                                                <span className="exp-fms-title text-dark">
                                                    Task name : <span>Check Inventory, Is It Available?</span>
                                                </span>
                                                <span className="exp-fms-date d-flex text-dark">
                                                    Due Date : <span>2024-04-16 12:00:00</span>
                                                    <div>
                                                        <OverlayTrigger trigger="focus" placement="auto" overlay={popover}>
                                                            <span>
                                                                <OverlayTrigger
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip >
                                                                            Click to view Task Details
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <button className='link-btn ms-2'>
                                                                        <i className="bi bi-info-circle-fill" />
                                                                    </button>
                                                                </OverlayTrigger>
                                                            </span>
                                                        </OverlayTrigger>
                                                    </div>
                                                </span>
                                                <OverlayTrigger
                                                    placement="auto"
                                                    overlay={
                                                        <Tooltip >
                                                            Edit
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link to="#" className="exp-fms-edit text-dark">
                                                        <i className="bi bi-pencil-fill" />
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                        <div className="rounded-10 fms-items p-3 exp-fms-bg">
                                            <div className="position-relative pe-4 w-100">
                                                <span className="exp-fms-title text-dark">
                                                    Task name : <span>Check Inventory, Is It Available?</span>
                                                </span>
                                                <span className="exp-fms-date d-flex text-dark">
                                                    Due Date : <span>2024-04-16 12:00:00</span>
                                                    <div>
                                                        <OverlayTrigger trigger="focus" placement="auto" overlay={popover}>
                                                            <span>
                                                                <OverlayTrigger
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip >
                                                                            Click to view Task Details
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <button className='link-btn ms-2'>
                                                                        <i className="bi bi-info-circle-fill" />
                                                                    </button>
                                                                </OverlayTrigger>
                                                            </span>
                                                        </OverlayTrigger>
                                                    </div>
                                                </span>
                                                <OverlayTrigger
                                                    placement="auto"
                                                    overlay={
                                                        <Tooltip >
                                                            Edit
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link to="#" className="exp-fms-edit text-dark">
                                                        <i className="bi bi-pencil-fill" />
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                        <div className="rounded-10 fms-items p-3 exp-fms-bg">
                                            <div className="position-relative pe-4 w-100">
                                                <span className="exp-fms-title text-dark">
                                                    Task name : <span>Check Inventory, Is It Available?</span>
                                                </span>
                                                <span className="exp-fms-date d-flex text-dark">
                                                    Due Date : <span>2024-04-16 12:00:00</span>

                                                    <div>
                                                        <OverlayTrigger trigger="focus" placement="auto" overlay={popover}>
                                                            <span>
                                                                <OverlayTrigger
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip >
                                                                            Click to view Task Details
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <button className='link-btn ms-2'>
                                                                        <i className="bi bi-info-circle-fill" />
                                                                    </button>
                                                                </OverlayTrigger>
                                                            </span>
                                                        </OverlayTrigger>
                                                    </div>
                                                </span>
                                                <OverlayTrigger
                                                    placement="auto"
                                                    overlay={
                                                        <Tooltip >
                                                            Edit
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link to="#" className="exp-fms-edit text-dark">
                                                        <i className="bi bi-pencil-fill" />
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end pt-3">
                                        <Link to="#" className="btn btn-sm btn-exp-green">View All</Link>
                                    </div>
                                    {/* No task */}
                                    <div className="row justify-content-center">
                                        <div className='exp-no-data-found text-exp-red'>
                                            <img className="task-img mb-3" src={process.env.PUBLIC_URL + 'assets/images/no-task.webp'} alt="No task" />
                                            <h6 className="center">NO TASK</h6>
                                            <p className="center">There is no task for you right now</p>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="tasktracker" title="Task Tracker">
                                <div className='card-body scroll-card-body'>
                                    <div className="tab-max-height">
                                        <div className="rounded-10 delegation-items p-3 exp-delegation-bg each-items">
                                            <div className="position-relative pe-4 w-100">
                                                <span className="exp-fms-title text-dark">Demo Task Tracker 1</span>
                                                <span className="exp-fms-date d-flex text-dark">
                                                    Due Date : 2024-03-08
                                                </span>
                                                <OverlayTrigger
                                                    placement="auto"
                                                    overlay={
                                                        <Tooltip >
                                                            Edit
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link to="#" className="exp-fms-edit text-dark">
                                                        <i className="bi bi-pencil-fill" />
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                        <div className="rounded-10 delegation-items p-3 exp-delegation-bg each-items">
                                            <div className="position-relative pe-4 w-100">
                                                <span className="exp-fms-title text-dark">Demo Task Tracker 2</span>
                                                <span className="exp-fms-date d-flex text-dark">
                                                    Due Date : 2024-03-08
                                                </span>
                                                <OverlayTrigger
                                                    placement="auto"
                                                    overlay={
                                                        <Tooltip >
                                                            Edit
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link to="#" className="exp-fms-edit text-dark">
                                                        <i className="bi bi-pencil-fill" />
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                        <div className="rounded-10 delegation-items p-3 exp-delegation-bg each-items">
                                            <div className="position-relative pe-4 w-100">
                                                <span className="exp-fms-title text-dark">Demo Task Tracker 3</span>
                                                <span className="exp-fms-date d-flex text-dark">
                                                    Due Date : 2024-03-08
                                                </span>
                                                <OverlayTrigger
                                                    placement="auto"
                                                    overlay={
                                                        <Tooltip >
                                                            Edit
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link to="#" className="exp-fms-edit text-dark">
                                                        <i className="bi bi-pencil-fill" />
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                        <div className="rounded-10 delegation-items p-3 exp-delegation-bg each-items">
                                            <div className="position-relative pe-4 w-100">
                                                <span className="exp-fms-title text-dark">Demo Task Tracker 4</span>
                                                <span className="exp-fms-date d-flex text-dark">
                                                    Due Date : 2024-03-08
                                                </span>
                                                <OverlayTrigger
                                                    placement="auto"
                                                    overlay={
                                                        <Tooltip >
                                                            Edit
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link to="#" className="exp-fms-edit text-dark">
                                                        <i className="bi bi-pencil-fill" />
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end pt-3">
                                        <Link to="#" className="btn btn-sm btn-exp-green">View All</Link>
                                    </div>
                                    {/* No task */}
                                    <div className="row justify-content-center">
                                        <div className='exp-no-data-found text-exp-red'>
                                            <img className="task-img mb-3" src={process.env.PUBLIC_URL + 'assets/images/no-task.webp'} alt="No task" />
                                            <h6 className="center">NO TASK</h6>
                                            <p className="center">There is no task for you right now</p>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="checksheet" title="Checksheet">
                                <div className='card-body scroll-card-body'>
                                    <div className="tab-max-height">
                                        <div className="rounded-10 checklist-items p-3 exp-checklist-bg">
                                            <div className="position-relative pe-4 w-100">
                                                <span className="exp-fms-title text-dark">
                                                    Task name test
                                                </span>
                                                <span className="exp-fms-date d-flex text-dark">
                                                    Due Date : 2024-04-12 11:00:00
                                                </span>
                                                <OverlayTrigger
                                                    placement="auto"
                                                    overlay={
                                                        <Tooltip >
                                                            Edit
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Link to="#" className="exp-fms-edit text-dark">
                                                        <i className="bi bi-pencil-fill" />
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end pt-3">
                                        <Link to="#" className="btn btn-sm btn-exp-green">View All</Link>
                                    </div>
                                    {/* No task */}
                                    <div className="row justify-content-center">
                                        <div className='exp-no-data-found text-exp-red'>
                                            <img className="task-img mb-3" src={process.env.PUBLIC_URL + 'assets/images/no-task.webp'} alt="No task" />
                                            <h6 className="center">NO TASK</h6>
                                            <p className="center">There is no task for you right now</p>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>

                    </div>

                </div>
            </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard