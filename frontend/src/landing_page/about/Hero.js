import React from "react";

function Hero() {
  const paragraphStyle = {
    lineHeight: "1.8",
    fontSize: "1.05rem",
    color: "#424242",
  };

  return (
    <div className="container">
   
      <div className="row py-5 mt-md-5 mb-md-5">
        <h1 className="text-center fs-2 px-3" style={{ color: "#424242", fontWeight: "500", lineHeight: "1.5" }}>
          We pioneered the discount broking model in India. <br className="d-none d-md-block" />
          Now, we are breaking ground with our technology.
        </h1>
      </div>

  
      <div className="row border-top pt-5 mt-md-5" style={{ color: "#424242" }}>
       
        <div className="col-lg-6 col-md-12 px-4 px-md-5 py-3">
          <p style={paragraphStyle}>
            We kick-started operations on the 15th of August, 2010 with the goal
            of breaking all barriers that traders and investors face in India in
            terms of cost, support, and technology. We named the company
            Zerodha, a combination of Zero and "Rodha", the Sanskrit word for
            barrier.
          </p>
          <p style={paragraphStyle}>
            Today, our disruptive pricing models and in-house technology have
            made us the biggest stock broker in India.
          </p>
          <p style={paragraphStyle}>
            Over 1.6+ crore clients place billions of orders every year through
            our powerful ecosystem of investment platforms, contributing over
            15% of all Indian retail trading volumes.
          </p>
        </div>

      
        <div className="col-lg-6 col-md-12 px-4 px-md-5 py-3">
          <p style={paragraphStyle}>
            In addition, we run a number of popular open online educational and
            community initiatives to empower retail traders and investors.
          </p>
          <p style={paragraphStyle}>
            <a href="/" style={{ textDecoration: "none" }}>Rainmatter</a>, 
            our fintech fund and incubator, has invested in several fintech 
            startups with the goal of growing the Indian capital markets.
          </p>
          <p style={paragraphStyle}>
            And yet, we are always up to something new every day. Catch up on the
            latest updates on our <a href="/" style={{ textDecoration: "none" }}>blog</a> or 
            see what the media is <a href="/" style={{ textDecoration: "none" }}>saying about us</a> or
            learn more about our business and product <a href="/" style={{ textDecoration: "none" }}>philosophies</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
