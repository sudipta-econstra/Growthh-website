import React, { useEffect, useState } from 'react'
import '../../landingAssets/css/bootstrap.min.css';
import '../../landingAssets/css/custom-animated.css';
import '../../landingAssets/css/default.css';
import '../../landingAssets/css/font-awesome.min.css';
import '../../landingAssets/css/magnific-popup.css';
import '../../landingAssets/css/magnific.dark.css';
import '../../landingAssets/css/magnific.rtl.css';
import '../../landingAssets/css/main.css';
import '../../landingAssets/css/style.css';
import Loader from '../landing/loder/Loader.jsx';
import Drawer from '../landing/Mobile/Drawer.jsx';
import useToggle from '../landing/Hooks/useToggle.js';
import HomeOneHeader from '../landing/Home/HomeOneHeader.jsx';
import FaqHomeOne from '../landing/Home/FaqHomeOne.jsx';
import ProjectHomeOne from '../landing/Home/ProjectHomeOne.jsx';
import FooterHomeOne from '../landing/Home/FooterHomeOne.jsx';
import BackToTop from '../landing/BackToTop.jsx';
import LnPrivacyPolicy from './LnPrivacyPolicy.js';
import WhatsappCta from '../landing/Home/WhatsappCta.js';

import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../auth/Enviroment.js';
import { toast } from 'react-toastify';

function LandingPrivacyPolicyIndex() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  const [drawer, drawerAction] = useToggle(false);

  const [data, setData] = useState({
    "name": "",
    "email": "",
    "phone": "",
    "requirement": ""
  })
  // const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
  };
  const handleData = (e) => {
    var name = e.target.name;
    setData({ ...data, [name]: e.target.value })
  }
  const FormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post("mail", data)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message)
        navigate("/thank-you")
      }).catch((res) => {
        setLoading(false);
        toast.error(res.response);
      })
  }


  return (
    <>
      {loading && (
        <div className={`appie-loader ${loading ? 'active' : ''}`}>
          <Loader />
        </div>
      )}
      <div className={`appie-visible ${loading === false ? 'active' : ''}`}>

        <Drawer drawer={drawer} action={drawerAction.toggle} />
        <HomeOneHeader action={drawerAction.toggle}  modalShow={handleShow}/>
        <LnPrivacyPolicy/>
        <FaqHomeOne />
        <ProjectHomeOne />
        <FooterHomeOne />
        <BackToTop />
        <WhatsappCta/>

        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
          <Modal.Header closeButton className="bg-exp-blue">
            <Modal.Title>
              <h4 className='text-white'>Sign Up For A Demo</h4>
            </Modal.Title>
          </Modal.Header>
          <form action='' onSubmit={FormSubmit} method='post'>
            <Modal.Body>
              <div className="demo-modal">
                <h5 className="text-center mb-4 text-exp-blue">Please fill the below fields to personalise your
                  <br /> Product Demo Experience</h5>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" placeholder="Enter Name" name='name' className="form-control" onChange={handleData} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Company Email</label>
                  <input type="email" placeholder="Enter Company Email" name='email' className="form-control" onChange={handleData} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Work Phone</label>
                  <input type="tel" placeholder="Enter Work Phone" name='phone' className="form-control" onChange={handleData} required />
                </div>
                <div className="form-group mb-0">
                  <label className="form-label">Requirement</label>
                  <textarea name="requirement" id="" rows={4} placeholder="Kindly briefly describe your requirement for your business" required className="form-control resize-none" onChange={handleData}></textarea>
                </div>
                <p className="pt-3 text-center f-s-13"><em>You agree to the Terms of Service</em></p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/* <a className="main-btn text-white" type='submit'>
                            Get a product demo
                        </a> */}
              <button type="submit" disabled={loading} className="main-btn text-white">{loading ? "Loading..." : "Get a product demo"}</button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>

    </>
  )
}

export default LandingPrivacyPolicyIndex