import React from 'react'

function InnerPageBookDemoForm() {
    return (
        <>
            <form>
                <div className='row'>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label className='form-label'>Full Name</label>
                            <input type="text" className='form-control' placeholder='Enter Your Full Name' />
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label className='form-label'>Phone Number</label>
                            <input type="tel" className='form-control' placeholder='Enter Your Phone Number' />
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label className='form-label'>Work Email</label>
                            <input type="email" className='form-control' placeholder='Enter Your Work Email' />
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label className='form-label'>Annual Revenue/Sales</label>
                            <input type="text" className='form-control' placeholder='Enter Your Annual Revenue/Sales' />
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label className='form-label'>Any Specific Requirement:</label>
                            <textarea className='form-control' placeholder='What are you say ?' rows="3"></textarea>
                        </div>
                    </div>
                    <div className='col-12'>
                        <button className='main-btn'>Book A Demo</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default InnerPageBookDemoForm