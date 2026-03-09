import React from "react";

function Hero() {
  const headingStyle = { color: "#424242", fontWeight: "500" };
  const subHeadingStyle = { color: "#424242", fontWeight: "500", fontSize: "1.5rem" };
  const textStyle = { color: "#444", lineHeight: "1.6", fontSize: "0.95rem" };

  return (
    <div className="container mt-5">
   
      <div className="row text-center p-5 mt-5">
        <h1 style={{ ...headingStyle, fontSize: "2.8rem" }}>Charges</h1>
        <p className="text-muted fs-5 mt-2">List of all charges and taxes</p>
      </div>


      <div className="row text-center p-2 mb-5">

        <div className="col-lg-4 col-md-12 p-4 mt-2">
          <img src="media/image/pricing0.svg" style={{ width: "70%" }} alt="Free equity" />
          <h2 className="mt-4" style={subHeadingStyle}>Free equity delivery</h2>
          <p className="mt-3 px-3" style={textStyle}>
            All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.
          </p>
        </div>

    
        <div className="col-lg-4 col-md-12 p-4 mt-2">
          <img src="media/image/pricing20.svg" style={{ width: "70%" }} alt="Intraday trades" />
          <h2 className="mt-4" style={subHeadingStyle}>Intraday and F&O trades</h2>
          <p className="mt-3 px-3" style={textStyle}>
            Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.
          </p>
        </div>

      
        <div className="col-lg-4 col-md-12 p-4 mt-2">
          <img src="media/image/pricing0.svg" style={{ width: "70%" }} alt="Free direct MF" />
          <h2 className="mt-4" style={subHeadingStyle}>Free direct MF</h2>
          <p className="mt-3 px-3" style={textStyle}>
            All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;