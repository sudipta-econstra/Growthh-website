import React from 'react'
import "./module.min.css"
import LnModule from './LnModule'

function ModuleWrapper() {
  return (
    <section className="module-sec position-relative">
      <div className="container">
        <div className="module-wrapper">
          <h1 className="module-core-title text-center">
            The BMS that's simple to set up and easy to use
          </h1>
          <div className="module-paragraph-wrapper text-center">
            <h2>
              Growthh BMS is a fully customizable, management platform. No code needed.
              <span>What would you like to manage with your BMS?</span>
            </h2>
          </div>
          <LnModule/>
          <div className="text-center mt-30">
            <a href="/cart" className="gth-btn-outline me-4">Skip</a><a className="get-started-btn d-inline-flex align-items-center" href="/cart">Get Started <span className="btn-arrow"><i className="fi fi-rr-arrow-small-right"></i></span></a>
            <div className="mt-10 gth-markup-txt">Get full access <i className="fi fi-ss-star-christmas"></i> No credit card needed</div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default ModuleWrapper