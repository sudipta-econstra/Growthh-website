import React, { useEffect, useState } from 'react';
import useToggle from '../Hooks/useToggle.js';
import BackToTop from '../BackToTop.jsx';
import Drawer from '../Mobile/Drawer.jsx';
import BlogHomeOne from './BlogHomeOne.jsx';
import FaqHomeOne from './FaqHomeOne.jsx';
import FeaturesHomeOne from './FeaturesHomeOne.jsx';
import FooterHomeOne from './FooterHomeOne.jsx';
import HeroHomeOne from './HeroHomeOne.jsx';
import HomeOneHeader from './HomeOneHeader.jsx';
import PricingHomeOne from './PricingHomeOne.jsx';
import NewsletterHome from './ProjectHomeOne.jsx';
import ServicesHomeOne from './ServicesHomeOne.jsx';
import TeamHomeOne from './TeamHomeOne.jsx';
import TestimonialHomeOne from './TestimonialHomeOne.jsx';
import TrafficHomeOne from './TrafficHomeOne.jsx';
import AboutUs from './AboutUs.jsx';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import WhatsappCta from './WhatsappCta.js';
import { Axios } from '../../auth/Enviroment.js';
import { toast } from 'react-toastify';





function Index() {
    const [drawer, drawerAction] = useToggle(false);
    const [data, setData] = useState({
        "name": "",
        "email": "",
        "phone": "",
        "requirement": ""
    })
    const [loading, setLoading] = useState(false)
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
            <Drawer drawer={drawer} action={drawerAction.toggle} />
            <HomeOneHeader action={drawerAction.toggle} modalShow={handleShow} />
            <HeroHomeOne modalShow={handleShow} />
            <AboutUs modalShow={handleShow} />
            <ServicesHomeOne modalShow={handleShow} />
            <FeaturesHomeOne modalShow={handleShow} />
            <TrafficHomeOne modalShow={handleShow} />
            <TestimonialHomeOne />
            {/* <TeamHomeOne /> */}
            <PricingHomeOne modalShow={handleShow} />
            <FaqHomeOne />            
            <NewsletterHome />
            <BlogHomeOne />
            <FooterHomeOne modalShow={handleShow} />
            <BackToTop />
            <WhatsappCta />

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
                        <button type="submit" disabled={loading} className="main-btn text-white">{loading?"Loading...":"Get a product demo"}</button>
                    </Modal.Footer>
                </form>
            </Modal>

        </>
    );
}

export default Index;
