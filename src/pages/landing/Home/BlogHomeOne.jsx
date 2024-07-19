import React, { useEffect, useState } from 'react';
import blogOne from '../../../landingAssets/images/blog-1.jpg';
import blogTwo from '../../../landingAssets/images/blog-2.jpg';
import blogThree from '../../../landingAssets/images/blog-3.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';



function BlogHomeOne({ className }) {
    const [data, setData] = useState([])
    const fetchData = async () => {
        try {
            const response = await axios.get("https://growthh.in/blog/wp-json/wp/v2/posts?orderby=date&order=desc&_embed=author,categories", {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setData(response.data);
            console.log('Response data:', response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

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
                        {
                            data.map((item) => (
                                <div className="col-lg-4 col-md-6" key={item.id}>
                                    <div
                                        className="appie-blog-item mt-30"
                                    >
                                        <div className="thumb">
                                            <img src={item.jetpack_featured_media_url} alt="" />
                                        </div>
                                        <div className="content">
                                            <div className="blog-meta">
                                                <ul>
                                                    <li>{item.date && format(item.date, "d MMMM, yyyy")}</li>
                                                    <li>
                                                        <Link to={item.link}><i className='fal fa-user me-1'></i>{item._embedded.author[0].name}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <h3 className="title">
                                                <Link to={item.link}>
                                                    {item.title.rendered}
                                                </Link>
                                            </h3>
                                            <Link to={item.link}>
                                                Learn More <i className="fal fa-arrow-right" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>))
                        }

                    </div>
                    <div className="text-center mt-4">
                        <a className="main-btn" href="https://growthh.in/blog/">View More</a>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BlogHomeOne;
