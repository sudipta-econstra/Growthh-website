import React from 'react'
function LnContactUs() {
  return (
    <React.Fragment>
      <div className="common-top-gap pb-60">
        <div className="container">
          <div className="common-terms-page">
            <h1 class="appie-title mb-15">We’re here for you</h1>
            <div className="row">
              <div className="col-md-6">
                <p>Transforming businesses with streamlined processes and strategic growth solutions.</p>
                <div className="footer-widget-info mt-2">
                  <ul>
                    <li>
                      <a href="mailto:support@growthh.in">
                        <i className="bi bi-envelope" /> support@growthh.in
                      </a>
                    </li>
                    <li>
                      <a href="tel:9667503347">
                        <i className="bi bi-telephone" /> +91 96675 03347
                      </a>
                    </li>
                  </ul>
                </div>
                <img src={process.env.PUBLIC_URL + 'assets/images/contact-us.webp'} alt="Contact Us" className="img-fluid"/>
              </div>
              <div className="col-md-6">
                <div className="card rounded-4 ghostwhite">
                  <div className="card-body">
                    <h4 className="mb-10">Quick Connect</h4>
                    <form action="">
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Company Email</label>
                        <input type="email" placeholder="Enter Company Email" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Work Phone</label>
                        <input type="tel" placeholder="Enter Work Phone" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Requirement</label>
                        <textarea name="" id="" rows={4} placeholder="Kindly briefly describe your requirement for your business" className="form-control resize-none"></textarea>
                      </div>
                      <div className="form-group mb-0">
                        <button className="main-btn" href="/thank-you">
                          SUBMIT
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LnContactUs