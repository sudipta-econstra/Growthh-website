import React, { useState } from 'react'
import { Axios } from '../auth/Enviroment';
import { useNavigate } from 'react-router-dom';

function InnerPageBookDemoForm({ setLoading }) {

    const [value, setValue] = useState({
        "name": "",
        "email": "",
        "phone": "",
        "revenue": "",
        "requirement": ""
    })
    const navigate = useNavigate();
    const submitForm = (e) => {
        e.preventDefault();
        setLoading(true)
        Axios.post("demo-mail", value)
            .then((res) => {
                setLoading(false)
                navigate("/thank-you")
            }).catch((err) => {
                setLoading(false)
                console.log(err);

            })

    }

    return (
        <>
            <form onSubmit={submitForm}>
                <div className='row'>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label className='form-label'>Full Name</label>
                            <input type="text" required className='form-control' placeholder='Enter Your Full Name' onChange={(e) => setValue({ ...value, name: e.target.value })} />
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label className='form-label'>Phone Number</label>
                            <input type="tel" required className='form-control' placeholder='Enter Your Phone Number' onChange={(e) => setValue({ ...value, phone: e.target.value })} />
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label className='form-label'>Work Email</label>
                            <input type="email" required className='form-control' placeholder='Enter Your Work Email' onChange={(e) => setValue({ ...value, email: e.target.value })} />
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label className='form-label'>Annual Revenue/Sales</label>
                            <input type="text" required className='form-control' placeholder='Enter Your Annual Revenue/Sales' onChange={(e) => setValue({ ...value, revenue: e.target.value })} />
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label className='form-label'>Any Specific Requirement:</label>
                            <textarea required className='form-control' placeholder='Kindly write your business requirement here.' rows="3" onChange={(e) => setValue({ ...value, requirement: e.target.value })}></textarea>
                        </div>
                    </div>
                    <div className='col-12'>
                        <button type='submit' className='main-btn'>Book A Demo</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default InnerPageBookDemoForm