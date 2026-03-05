import React from 'react';

function Education() {
    return ( 
       <div className="container mb-5 p-5">
        <div className="row align-items-center"> 
            
       
            <div className="col-lg-6 col-md-12 text-center">
                <img 
                    src="media/image/education.svg" 
                    style={{ width: "85%" }} 
                    alt="Varsity Education" 
                />
            </div>

          
            <div className="col-lg-6 col-md-12 p-5">
                <h2 className='fs-2 mb-4' style={{ fontWeight: "500", color: "#424242" }}>
                    Free and open market education
                </h2>
                
                <p className='mt-4' style={{ lineHeight: "1.8", color: "#424242" }}>
                    Varsity, the largest online stock market education book in the world 
                    covering everything from the basics to advanced trading.
                </p>
                <a href="/" className='d-inline-block mb-5' style={{ textDecoration: "none", fontWeight: "500" }}>
                    Varsity &nbsp; <i className="fa-solid fa-arrow-right"></i>
                </a>

                <p style={{ lineHeight: "1.8", color: "#424242" }}>
                    TradingQ&A, the most active trading and investment community in 
                    India for all your market related queries.
                </p>
                <a href="/" className='d-inline-block' style={{ textDecoration: "none", fontWeight: "500" }}>
                    TradingQ&A &nbsp; <i className="fa-solid fa-arrow-right"></i>
                </a>
            </div>
            
        </div>
       </div>
    );
}

export default Education;