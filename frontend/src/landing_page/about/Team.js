import React from "react";

function Team() {
  const paragraphStyle = { 
    lineHeight: "1.8", 
    fontSize: "1.05rem", 
    color: "#424242" 
  };

  return (
    <div className="container">
   
      <div className="row mt-5 mb-5 border-top pt-5">
        <h1 className="text-center fs-2" style={{ color: "#424242", fontWeight: "500" }}>
          People
        </h1>
      </div>

      <div className="row align-items-center">
      
        <div className="col-lg-5 col-md-12 text-center p-lg-5 mb-4">
          <img
            src="media/image/nithinKamath.jpg"
            style={{ borderRadius: "100%", width: "60%", maxWidth: "300px" }}
            alt="Nithin Kamath"
            className="img-fluid"
          />
          <h4 className="mt-4 fs-4" style={{ color: "#424242", fontWeight: "500" }}>
            Nithin Kamath
          </h4>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            Founder, CEO
          </p>
        </div>

      
        <div className="col-lg-7 col-md-12 p-lg-5">
          <p style={paragraphStyle}>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p style={paragraphStyle}>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p style={paragraphStyle}>
            Playing basketball is his zen.
          </p>
          <p style={paragraphStyle}>
            Connect on{" "}
            <a href="/" style={{ textDecoration: "none" }}>Homepage</a> /{" "}
            <a href="/" style={{ textDecoration: "none" }}>TradingQnA</a> /{" "}
            <a href="/" style={{ textDecoration: "none" }}>Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;