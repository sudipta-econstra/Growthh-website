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


function DashboardCalendar() {
    // for assign to me start 
    const [selectedValue, setSelectedValue] = useState('Assign to Me');

    const handleSelect = (eventKey) => {
        setSelectedValue(eventKey);
    };
    const events = [
        {
            title: 'Workflow',
            start: '2024-06-17',
            backgroundColor: 'rgb(255, 252, 218)',
            borderColor: 'rgb(255, 193, 7)',
        },
        {
            title: 'Task Tracker',
            start: '2024-06-18',
            backgroundColor: 'rgb(243, 229, 251)',
            borderColor: 'rgb(131, 42, 204)'
        },
        {
            title: 'Checksheet',
            start: '2024-06-19',
            end: '2024-06-20',
            backgroundColor: 'rgb(227, 255, 254)',
            borderColor: 'rgb(0, 133, 126)'
        }
        //{ title: 'Meeting' }
    ]
    const handleDateClick = (arg) => {
        alert(arg.dateStr)
    }
    const [taskDoneShow, setTaskDoneShow] = useState(false);
    const taskDoneModalClose = () => setTaskDoneShow(false);
    const taskDoneModalShow = () => setTaskDoneShow(true);
    return (
        <React.Fragment>
            <div className="gthh-controller-bar">
                <ul className="gth-controller-view-block">
                    <li>
                        <Link to="/dashboard-task" className="gth-controller-view-item"><i class="fi fi-rr-to-do"></i>Task</Link>
                    </li>
                    <li>
                        <Link to="/dashboard-flow" className="gth-controller-view-item"><i class="fi fi-rr-workflow"></i>Flow</Link>
                    </li>
                    <li>
                        <Link to="/dashboard-calendar" className="gth-controller-view-item active"><i class="fi fi-rr-calendar"></i>Calendar</Link>
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
                                Assign to Me
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Assign by Me" href="#">
                                Assign by Me
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Assign to All" href="#">
                                Assign to All
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="gth-dashboard-v2-process-wrap  pt-4">
                <div className='card'>
                    <div className='card-body calender-wrap'>
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            events={events}
                            selectable
                            style={{ height: "100vh" }}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                            }}
                            //eventClick={taskDoneModalShow}
                        //eventContent={renderEventContent}
                        />
                    </div>
                </div>

            </div>
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
                        <div className='col-12'>
                            <div className="form-group">
                                <label className="form-label">Assigned By : </label>
                                <p className='mb-0'>Undefined</p>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="form-group">
                                <label className="form-label">Mode : </label>
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
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-exp-green'>
                        Confirm
                    </button>
                </Modal.Footer>
            </Modal>
            {/* Task Done modal end */}
        </React.Fragment>
    )
}

export default DashboardCalendar