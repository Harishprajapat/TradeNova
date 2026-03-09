import React from "react";

function CreateTicket() {
  const sectionTitleStyle = {
    color: "#424242",
    fontSize: "1.2rem",
    fontWeight: "500",
    marginBottom: "1.5rem",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#387ed1",
    fontSize: "0.95rem",
    lineHeight: "2.5",
    display: "block",
  };

  return (
    <div className="container mt-5 mb-5 p-5">
      <div className="row">
        <h2 className="fs-4 mb-5" style={{ color: "#424242", fontWeight: "400" }}>
          To create a ticket, select a relevant topic
        </h2>

      
        <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
          <h3 style={sectionTitleStyle}>
            <i className="fa-solid fa-circle-plus me-2"></i> Account Opening
          </h3>
          <a href="/" style={linkStyle}>Getting Started</a>
          <a href="/" style={linkStyle}>Online Account Opening</a>
          <a href="/" style={linkStyle}>Offline Account Opening</a>
          <a href="/" style={linkStyle}>Company, Partnership and HUF Account Opening</a>
          <a href="/" style={linkStyle}>NRI Account Opening</a>
          <a href="/" style={linkStyle}>Charges at Zerodha</a>
          <a href="/" style={linkStyle}>Zerodha IDFC FIRST Bank 3-in-1 Account</a>
        </div>

   
        <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
          <h3 style={sectionTitleStyle}>
            <i className="fa-regular fa-user me-2"></i> Your Zerodha Account
          </h3>
          <a href="/" style={linkStyle}>Login Credentials</a>
          <a href="/" style={linkStyle}>Your Profile</a>
          <a href="/" style={linkStyle}>Account Modification and Segment Addition</a>
          <a href="/" style={linkStyle}>DP ID and bank details</a>
          <a href="/" style={linkStyle}>Transfer and conversion of shares</a>
        </div>

      
        <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
          <h3 style={sectionTitleStyle}>
            <i className="fa-solid fa-chart-line me-2"></i> Trading and Platforms
          </h3>
          <a href="/" style={linkStyle}>Kite</a>
          <a href="/" style={linkStyle}>Margins</a>
          <a href="/" style={linkStyle}>Product and Order types</a>
          <a href="/" style={linkStyle}>Corporate actions</a>
          <a href="/" style={linkStyle}>Kite Features</a>
        </div>

       
        <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
          <h3 style={sectionTitleStyle}>
            <i className="fa-solid fa-wallet me-2"></i> Funds
          </h3>
          <a href="/" style={linkStyle}>Fund Withdrawal</a>
          <a href="/" style={linkStyle}>Adding Funds</a>
          <a href="/" style={linkStyle}>Adding Bank Accounts</a>
          <a href="/" style={linkStyle}>eMandates</a>
        </div>

     
        <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
          <h3 style={sectionTitleStyle}>
            <i className="fa-solid fa-circle-dot me-2"></i> Console
          </h3>
          <a href="/" style={linkStyle}>IPO</a>
          <a href="/" style={linkStyle}>Portfolio</a>
          <a href="/" style={linkStyle}>Funds Statement</a>
          <a href="/" style={linkStyle}>Profile</a>
          <a href="/" style={linkStyle}>Reports</a>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
          <h3 style={sectionTitleStyle}>
            <i className="fa-solid fa-coins me-2"></i> Coin
          </h3>
          <a href="/" style={linkStyle}>Understanding Mutual Funds</a>
          <a href="/" style={linkStyle}>About Coin</a>
          <a href="/" style={linkStyle}>Buying and Selling through Coin</a>
          <a href="/" style={linkStyle}>Starting an SIP</a>
          <a href="/" style={linkStyle}>Managing your Portfolio</a>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;