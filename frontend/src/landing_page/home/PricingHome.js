import React from 'react';

function PricingHome() {
    return ( 
       <div className="container mb-5 p-5">
        <div className="row">
          
            <div className="col-lg-4 col-md-12 p-5">
                <h1 className='fs-2 mb-4'>Unbeatable pricing</h1>
                <p className='text-muted'>
                    We pioneered the concept of discount broking and price transparency in India. 
                    Flat fees and no hidden charges.
                </p>
                <a href="/" style={{textDecoration: "none"}}>
                    See pricing <i className="fa-solid fa-arrow-right"></i>
                </a>
            </div>
            
            <div className="col-lg-1"></div> {/* Spacer */}

          
            <div className="col-lg-7 col-md-12">
                <div className="row text-center">
                    <div className="col border p-3">
                        <img src="media/image/pricingnew.svg" style={{width: "70%"}} alt="Free account" />
                        <p style={{fontSize: "12px"}} className="text-muted mt-2">Free account opening</p>
                    </div>
                    <div className="col border p-3">
                        <img src="media/image/pricingnew.svg" style={{width: "70%"}} alt="Free equity" />
                        <p style={{fontSize: "12px"}} className="text-muted mt-2">Free equity delivery and direct mutual funds</p>
                    </div>
                    <div className="col border p-3">
                        <img src="media/image/pricing20.svg" style={{width: "70%"}} alt="Intraday" />
                        <p style={{fontSize: "12px"}} className="text-muted mt-2">Intraday and F&O</p>
                    </div>
                </div>
            </div>
        </div>
       </div>
    );
}

export default PricingHome;