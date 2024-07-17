import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Sidebar() {
  const location = useLocation();
  const { admin, token, loading, error } = useSelector((state) => state.adminAuth);
  console.log({ admin, token, loading, error });
  return (
    <>


      {admin ? (<>
        <aside className="main-sidebar sidebar-dark-primary elevation-1 exp-main-nav header-3">
          <a href className="brand-link d-flex justify-content-center">
            <img src={process.env.PUBLIC_URL + 'assets/images/logo-icon.webp'} alt="Logo" className="brand-image img-fluid" />
            <span className="brand-text"><img src={process.env.PUBLIC_URL + 'assets/images/logo-navy.png'} alt="Logo" className="img-fluid brand-name" /></span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
          <div className="sidebar-item">
                 <Link to="/admin/dashboard/company" className={`sidebar-nav-link ${location.pathname === "/dashboard" || location.pathname === "/dashboard-task" || location.pathname === "/dashboard-flow" || location.pathname === "/dashboard-calendar" ? 'active' : ''} `}>
                    <i className="sidebar-nav-icon bi bi-speedometer2" />
                    <p>Company</p>
                  </Link>
                </div>
                <div className="sidebar-item">
                  <Link to="/admin/dashboard/plan" className={`sidebar-nav-link ${location.pathname === "/dashboard" || location.pathname === "/dashboard-task" || location.pathname === "/dashboard-flow" || location.pathname === "/dashboard-calendar" ? 'active' : ''} `}>
                    <i className="sidebar-nav-icon bi bi-speedometer2" />
                    <p>Plan</p>
                  </Link>
                </div>
                <div className="sidebar-item">
                  <Link to="/admin/dashboard/module" className={`sidebar-nav-link ${location.pathname === "/admin/dashboard/module" || location.pathname === "/admin/dashboard/module" || location.pathname === "/admin/dashboard/module" || location.pathname === "/dashboard-calendar" ? 'active' : ''} `}>
                    <i className="sidebar-nav-icon bi bi-speedometer2" />
                    <p>Module</p>
                  </Link>
                </div>
                <div className="sidebar-item">
                  <Link to="/admin/dashboard/company" className={`sidebar-nav-link ${location.pathname === "/dashboard" || location.pathname === "/dashboard-task" || location.pathname === "/dashboard-flow" || location.pathname === "/dashboard-calendar" ? 'active' : ''} `}>
                    <i className="sidebar-nav-icon bi bi-speedometer2" />
                    <p>Report</p>
                  </Link>
                </div>
          </div>
          </aside>

      </>) : (<>
        <aside className="main-sidebar sidebar-dark-primary elevation-1 exp-main-nav header-3">
          <a href className="brand-link d-flex justify-content-center">
            <img src={process.env.PUBLIC_URL + 'assets/images/logo-icon.webp'} alt="Logo" className="brand-image img-fluid" />
            <span className="brand-text"><img src={process.env.PUBLIC_URL + 'assets/images/logo-navy.png'} alt="Logo" className="img-fluid brand-name" /></span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar Menu */}
            {/* <nav className="mt-0">
          <ul className="nav nav-pills nav-sidebar flex-column nav-flat option-3" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item ">
              <Link to="/dashboard" className="nav-link">
                <i className="nav-icon bi bi-speedometer2" />
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="nav-icon bi bi-clipboard-data" />
                <p>Management Dashboard <i className="right fas fa-angle-left" /></p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/employees-kpi" className="nav-link">
                    <i className="nav-icon bi bi-graph-up" />
                    <p>Employee's KPI</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link">
                    <i className="nav-icon bi bi-graph-up" />
                    <p>Bottle-Neck Report</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item menu-is-opening menu-open">
              <Link to="#" className="nav-link active">
                <i className="nav-icon bi bi-clipboard-data" />
                <p>My Tasks <i className="right fas fa-angle-left" /></p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="#" className="nav-link active">
                    <i className="nav-icon bi bi-vector-pen" />
                    <p>Work Flow</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link">
                    <i className="nav-icon bi bi-clipboard2-check" />
                    <p>Checksheet</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link">
                    <i className="nav-icon bi bi-card-checklist" />
                    <p>Task Tracker</p>
                  </Link>
                </li>
              </ul>
            </li>

          </ul>
        </nav> */}

            <nav className='nav-customSidebar'>
              <div className="accordion menu-accordian" id="menuAccordian">
                <div className="sidebar-item">
                  <Link to="/dashboard-task" className={`sidebar-nav-link ${location.pathname === "/dashboard" || location.pathname === "/dashboard-task" || location.pathname === "/dashboard-flow" || location.pathname === "/dashboard-calendar" ? 'active' : ''} `}>
                    <i className="sidebar-nav-icon bi bi-speedometer2" />
                    <p>Dashboard</p>
                  </Link>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header sidebar-item">
                    <button className={`accordion-button ${location.pathname === "/employees-kpi" || location.pathname === "/bottle-neck-report" ? '' : 'collapsed'} sidebar-nav-link`} type="button" data-bs-toggle="collapse" data-bs-target="#menu1" aria-expanded={false} aria-controls="menu1">
                      <i className="sidebar-nav-icon bi bi-house-door" />
                      <p>Management Dashboard</p>
                    </button>
                  </div>
                  <div id="menu1" className={`accordion-collapse collapse ${location.pathname === "/employees-kpi" || location.pathname === "/bottle-neck-report" ? 'show' : ''} `} data-bs-parent="#menuAccordian">
                    <div className="accordion-body p-0">
                      <ul className="sidebar-submenu">
                        <li className="sidebar-item">
                          <Link to="/employees-kpi" className={`sidebar-nav-link ${location.pathname === "/employees-kpi" ? 'active' : ''}`}>
                            <i className="sidebar-nav-icon bi bi-graph-up" />
                            <p>Employee's KPI</p>
                          </Link>
                        </li>
                        <li className="sidebar-item">
                          <Link to="/bottle-neck-report" className={`sidebar-nav-link ${location.pathname === "/bottle-neck-report" ? 'active' : ''}`}>
                            <i className="sidebar-nav-icon bi bi-graph-up" />
                            <p>Bottle-Neck Report</p>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header sidebar-item">
                    <button className={`accordion-button ${location.pathname === "/my-workflow-task" || location.pathname === "/my-workflow-task-details" || location.pathname === "/my-checklist-task" || location.pathname === "/my-task-tracker" ? '' : 'collapsed'} sidebar-nav-link`} type="button" data-bs-toggle="collapse" data-bs-target="#menu2" aria-expanded="false" aria-controls="menu2">
                      <i className="sidebar-nav-icon bi bi-clipboard-data" />
                      <p>My Tasks</p>
                    </button>
                  </div>
                  <div id="menu2" className={`accordion-collapse collapse ${location.pathname === "/my-workflow-task" || location.pathname === "/my-workflow-task-details" || location.pathname === "/my-checklist-task" || location.pathname === "/my-task-tracker" ? 'show' : ''} `} data-bs-parent="#menuAccordian">
                    <div className="accordion-body p-0">
                      <ul className="sidebar-submenu">
                        <li className="sidebar-item">
                          <Link to="/my-workflow-task" className={`sidebar-nav-link ${location.pathname === "/my-workflow-task" || location.pathname === "/my-workflow-task-details" ? 'active' : ''}`}>
                            <i className="sidebar-nav-icon bi bi-vector-pen" />
                            <p>Work Flow</p>
                          </Link>
                        </li>
                        <li className="sidebar-item">
                          <Link to="/my-checklist-task" className={`sidebar-nav-link ${location.pathname === "/my-checklist-task" ? 'active' : ''}`}>
                            <i className="sidebar-nav-icon bi bi-clipboard2-check" />
                            <p>Checksheet</p>
                          </Link>
                        </li>
                        <li className="sidebar-item">
                          <Link to="/my-task-tracker" className={`sidebar-nav-link ${location.pathname === "/my-task-tracker" ? 'active' : ''}`}>
                            <i className="sidebar-nav-icon bi bi-card-checklist" />
                            <p>Task Tracker</p>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header sidebar-item">
                    <button className={`accordion-button ${location.pathname === "/workflow" || location.pathname === "/new-workflow-template" || location.pathname === "/create-new-workflow-task" || location.pathname === "/edit-workflow-task" || location.pathname === "/checksheet" || location.pathname === "/add-new-checksheet" ? '' : 'collapsed'} sidebar-nav-link`} type="button" data-bs-toggle="collapse" data-bs-target="#menu3" aria-expanded="false" aria-controls="menu3">
                      <i className="sidebar-nav-icon bi bi-list-task" />
                      <p>Task Manager</p>
                    </button>
                  </div>
                  <div id="menu3" className={`accordion-collapse collapse ${location.pathname === "/workflow" || location.pathname === "/new-workflow-template" || location.pathname === "/create-new-workflow-task" || location.pathname === "/edit-workflow-task" || location.pathname === "/checksheet" || location.pathname === "/add-new-checksheet" ? 'show' : ''} `} data-bs-parent="#menuAccordian">
                    <div className="accordion-body p-0">
                      <ul className="sidebar-submenu">
                        <li className="sidebar-item">
                          <Link to="/workflow" className={`sidebar-nav-link ${location.pathname === "/workflow" || location.pathname === "/new-workflow-template" || location.pathname === "/create-new-workflow-task" || location.pathname === "/edit-workflow-task" ? 'active' : ''}`}>
                            <i className="sidebar-nav-icon bi bi-vector-pen" />
                            <p>Work Flow</p>
                          </Link>
                        </li>
                        <li className="sidebar-item">
                          <Link to="/checksheet" className={`sidebar-nav-link ${location.pathname === "/checksheet" || location.pathname === "/add-new-checksheet" ? 'active' : ''}`}>
                            <i className="sidebar-nav-icon bi bi-clipboard2-check" />
                            <p>Checksheet</p>
                          </Link>
                        </li>
                        <li className="sidebar-item">
                          <Link to="/" className={`sidebar-nav-link ${location.pathname === "/my-task-tracker" ? 'active' : ''}`}>
                            <i className="sidebar-nav-icon bi bi-card-checklist" />
                            <p>Task Tracker</p>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>


            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </>)}
    </>

  )
}

export default Sidebar