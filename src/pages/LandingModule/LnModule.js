import React from 'react'
import "./module.min.css"
function LnModule() {
  return (
    <React.Fragment>
        <div className="module-list-wrap">
          <label className="custom-checkbox module-checkbox-list-item">
              <input type="checkbox" checked />
              <span className="checkmark"></span>
              <span className="module-icon"><i className="fi fi-ss-department"></i></span>
              <span className="module-name">BMS</span>
            </label>
            <label className="custom-checkbox module-checkbox-list-item">
              <input type="checkbox" />
              <span className="checkmark"></span>
              <span className="module-icon"><i className="fi fi-sr-crm-computer"></i></span>
              <span className="module-name">CRM</span>
            </label>
            <label className="custom-checkbox module-checkbox-list-item">
              <input type="checkbox" />
              <span className="checkmark"></span>
              <span className="module-icon"><i className="fi fi-sr-module"></i></span>
              <span className="module-name">Inventory Management</span>
            </label>
            <label className="custom-checkbox module-checkbox-list-item">
              <input type="checkbox" />
              <span className="checkmark"></span>
              <span className="module-icon"><i className="fi fi-br-gears"></i></span>
              <span className="module-name">Production Management</span>
            </label>
            <label className="custom-checkbox module-checkbox-list-item">
              <input type="checkbox" />
              <span className="checkmark"></span>
              <span className="module-icon"><i className="fi fi-sr-diagram-project"></i></span>
              <span className="module-name">Project Management</span>
            </label>
            <label className="custom-checkbox module-checkbox-list-item">
              <input type="checkbox" />
              <span className="checkmark"></span>
              <span className="module-icon"><i className="fi fi-sr-hr"></i></span>
              <span className="module-name">HR</span>
            </label>
            <label className="custom-checkbox module-checkbox-list-item">
              <input type="checkbox" />
              <span className="checkmark"></span>
              <span className="module-icon"><i className="fi fi-sr-brand"></i></span>
              <span className="module-name">Purchase Management</span>
            </label>
          </div>
    </React.Fragment>
  )
}

export default LnModule