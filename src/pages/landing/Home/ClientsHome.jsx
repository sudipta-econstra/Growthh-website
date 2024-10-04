import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import star from '../../../landingAssets/images/star.png';
import client1 from '../../../landingAssets/images/clients/DS-Construction.jpg';
import client2 from '../../../landingAssets/images/clients/Jagannath-Polymers-Pvt-Ltd.jpg';
import client3 from '../../../landingAssets/images/clients/Shitla-papers.jpg';
import client4 from '../../../landingAssets/images/clients/RAS-Builders.jpg';
import client5 from '../../../landingAssets/images/clients/JENSONS-INTERNATIONAL.jpg';
import client6 from '../../../landingAssets/images/clients/Sharen-Plywood.jpg';
import client7 from '../../../landingAssets/images/clients/Supreme-steels-forgings.jpg';
import client8 from '../../../landingAssets/images/clients/samvruddi.webp';
import client9 from '../../../landingAssets/images/clients/krishnam.webp';
import client10 from '../../../landingAssets/images/clients/bharat-enivlo.webp';
import client11 from '../../../landingAssets/images/clients/sheetal-batra.webp';
import client12 from '../../../landingAssets/images/clients/importikaah.webp';
import client13 from '../../../landingAssets/images/clients/threadbucketstudio.webp';

function ClientsHome({ className }) {
    const sliderRef = useRef();

    const sliderNext = () => {
        sliderRef.current.slickNext();
    };

    const sliderPrev = () => {
        sliderRef.current.slickPrev();
    };

    const sliderSettings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Default number of slides
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1200, // For screens smaller than 1200px
                settings: {
                    slidesToShow: 4, // Show 2 items
                },
            },
            {
                breakpoint: 1024, // For screens smaller than 1200px
                settings: {
                    slidesToShow: 3, // Show 2 items
                },
            },
            {
                breakpoint: 767, // For screens smaller than 767px
                settings: {
                    slidesToShow: 2, // Show 2 items
                },
            },
            {
                breakpoint: 575, // For screens smaller than 575px
                settings: {
                    slidesToShow: 2, // Show 1 item
                },
            },
            {
                breakpoint: 479, // For screens smaller than 575px
                settings: {
                    slidesToShow: 2, // Show 1 item
                },
            },
        ],
    };

    return (
        <section
            className={`clients-area pt-60 pb-60 ${className || ''}`}
            id="clients"
        >
            <div className="star-img">
                <img src={star} alt="shape" className='img-fluid' />
            </div>
            <div className="container">
                <h2 className="title text-center text-white mb-4">Trusted By 370+ Companies</h2>
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="appie-testimonial-slider" style={{ position: 'relative' }}>
                            <span
                                className="prev slick-arrow"
                                style={{ display: 'block' }}
                                onClick={sliderPrev}
                                role="button"
                                tabIndex="0"
                            >
                                <i className="fal fa-arrow-left" />
                            </span>
                            <Slider ref={sliderRef} {...sliderSettings}>
                                <div className="client-item-wrap text-center">
                                    <img src={client13} alt="Clients" className='client-logo' />
                                </div>
                                <div className="client-item-wrap text-center">
                                    <img src={client12} alt="Clients" className='client-logo' />
                                </div>
                                <div className="client-item-wrap text-center">
                                    <img src={client11} alt="Clients" className='client-logo' />
                                </div>
                                <div className="client-item-wrap text-center">
                                    <img src={client10} alt="Clients" className='client-logo' />
                                </div>
                                <div className="client-item-wrap text-center">
                                    <img src={client9} alt="Clients" className='client-logo' />
                                </div>
                                <div className="client-item-wrap text-center">
                                    <img src={client8} alt="Clients" className='client-logo' />
                                </div>
                                <div className="client-item-wrap text-center">
                                    <img src={client7} alt="Clients" className='client-logo' />
                                </div>
                                <div className="client-item-wrap text-center">
                                    <img src={client6} alt="Clients" className='client-logo' />
                                </div>
                                <div className="client-item-wrap text-center">
                                    <img src={client5} alt="Clients" className='client-logo' />
                                </div>
                                <div className="client-item-wrap text-center">
                                    <img src={client4} alt="Clients" className='client-logo' />
                                </div>
                                <div className="client-item-wrap text-center">
                                    <img src={client3} alt="Clients" className='client-logo' />
                                </div>
                                <div className="client-item-wrap text-center">
                                    <img src={client2} alt="Clients" className='client-logo' />
                                </div>
                                <div className="client-item-wrap text-center">
                                    <img src={client1} alt="Clients" className='client-logo' />
                                </div>
                            </Slider>
                            <span
                                className="next slick-arrow"
                                style={{ display: 'block' }}
                                onClick={sliderNext}
                                role="button"
                                tabIndex="-1"
                            >
                                <i className="fal fa-arrow-right" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ClientsHome;
