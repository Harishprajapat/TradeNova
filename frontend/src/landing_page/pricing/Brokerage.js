import React from "react";

function Brokerage() {
  const linkStyle = {
    textDecoration: "none",
    color: "#387ed1",
    fontSize: "1.25rem",
    fontWeight: "500",
  };

  const listStyle = {
    fontSize: "0.8rem",
    lineHeight: "2.5",
    color: "#666",
    textAlign: "left",
  };

  return (
    <div className="container border-top mt-5 pt-5 mb-5">
      <div className="row text-center">
      
        <div className="col-lg-8 col-md-12 p-4">
          <a href="/" style={linkStyle} className="mb-4 d-block">
            Brokerage calculator
          </a>
          <ul style={listStyle} className="mt-4">
            <li>Call & Trade and RMS auto-squareoff: Additional charges of ₹50 + GST per order.</li>
            <li>Digital contract notes will be sent via e-mail.</li>
            <li>Physical copies of contract notes, if required, shall be charged ₹20 per contract note. Courier charges apply.</li>
            <li>For NRI account (non-PIS), 0.5% or ₹100 per executed order for equity (whichever is lower).</li>
            <li>For NRI account (PIS), 0.5% or ₹200 per executed order for equity (whichever is lower).</li>
            <li>If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order.</li>
          </ul>
        </div>

       
        <div className="col-lg-4 col-md-12 p-4">
          <a href="/" style={linkStyle}>
            List of charges
          </a>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;