import React from 'react'

function WhatsappCta() {
    return (
        <React.Fragment>
            <div className="whatsapp-cta">
                <a href="https://api.whatsapp.com/send?phone=7042266037&text=I%20need%20some%20help" target="_blank">
                    <i className="fab fa-whatsapp"></i>
                </a>
            </div>
        </React.Fragment>
    )
}

export default WhatsappCta