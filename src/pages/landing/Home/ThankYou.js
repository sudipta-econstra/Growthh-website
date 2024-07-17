import React from 'react'

function ThankYou() {
  return (
    <React.Fragment>
        <div className="container">
            <div className="content">
                <div className="wrapper-1">
                    <div className="wrapper-2">
                        <h1 className="text-exp-green">Thank You!</h1>
                        <p>Thank you for booking a demo.</p>
                        <p>One of our representatives will get in touch with you.</p>
                        <div className="text-center my-5">
                            <img src={process.env.PUBLIC_URL + 'assets/images/thankyou-tick.png'} alt="tick" className="img-fluid"/>
                        </div>
                        
                        <a className="go-home" href="/">
                            go home
                        </a>
                    </div>
                    {/* <div className="footer-like">
                        <p>Email not received?
                            &nbsp;<a href="#">Click here to send again</a>
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default ThankYou