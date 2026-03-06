import React from 'react';
function Hero() {
    return ( 
       <div className="container mt-5 mb-5 border-bottom ">
        <div className="row text-center p-5 ">
            <h2>Zerodha Products</h2>
            <h4 className='mt-2  text-muted'>Sleek, modern, and intuitive trading platforms</h4>
            <p className='mt-3 mb-5'>Check out our <a href="" style={{textDecoration:"none"}}>investment offerings <i class="fa-solid fa-arrow-right"></i></a> </p>
        </div>
       </div>
     );
}

export default Hero;