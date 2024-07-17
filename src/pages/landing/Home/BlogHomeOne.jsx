import React from 'react';
import blogOne from '../../../landingAssets/images/blog-1.jpg';
import blogTwo from '../../../landingAssets/images/blog-2.jpg';
import blogThree from '../../../landingAssets/images/blog-3.jpg';



function BlogHomeOne({ className }) {
    return (
        <>
            <section className={`appie-blog-area pt-0 pb-60 ${className || ''}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="appie-section-title text-center pb-0">
                                <h3 className="appie-title">Latest Blog Posts</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6">
                            <div
                                className="appie-blog-item mt-30"
                            >
                                <div className="thumb">
                                    <img src={blogOne} alt="" />
                                </div>
                                <div className="content">
                                    <div className="blog-meta">
                                        <ul>
                                            <li>March 10, 2022</li>
                                            <li>
                                                <a href="#">Saas & App</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <h3 className="title">
                                        <a href="#">
                                            Introducing New Apps Design for our iOS App
                                        </a>
                                    </h3>
                                    <a href="#">
                                        Learn More <i className="fal fa-arrow-right" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div
                                className="appie-blog-item mt-30"
                            >
                                <div className="thumb">
                                    <img src={blogTwo} alt="" />
                                </div>
                                <div className="content">
                                    <div className="blog-meta">
                                        <ul>
                                            <li>March 10, 2022</li>
                                            <li>
                                                <a href="#">Saas & App</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <h3 className="title">
                                        <a href="#">
                                            How to bring Dolce to your company
                                        </a>
                                    </h3>
                                    <a href="#">
                                        Learn More <i className="fal fa-arrow-right" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div
                                className="appie-blog-item mt-30"
                            >
                                <div className="thumb">
                                    <img src={blogThree} alt="" />
                                </div>
                                <div className="content">
                                    <div className="blog-meta">
                                        <ul>
                                            <li>March 10, 2022</li>
                                            <li>
                                                <a href="#">Saas & App</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <h3 className="title">
                                        <a href="#">
                                            17 Effective Ways to Monetize Mobile Apps
                                        </a>
                                    </h3>
                                    <a href="#">
                                        Learn More <i className="fal fa-arrow-right" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BlogHomeOne;
