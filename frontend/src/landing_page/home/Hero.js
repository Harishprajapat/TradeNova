import React from 'react';
function Hero() {
    return ( 
      <div className='container col-lg-12 col-md-12 '>
        <div className='row text-center'>
          <img src="media/image/homeHero.png" alt="homeHero.png" className='mb-5' />
          <h1 className='mt-5'>Invest in everything</h1>
          <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
           <button 
          className='btn btn-primary fs-5 mt-5' 
          style={{ width: "200px", margin: "0 auto", backgroundColor: "#387ed1", border: "none", padding: "10px" }}
        >
          Sign up for free
        </button>
        </div>
      </div>
       
     );
}

export default Hero;