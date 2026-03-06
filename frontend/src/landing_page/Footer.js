import React from "react";

function Footer() {
  const linkStyle = {
    textDecoration: "none",
    color: "#666",
    fontSize: "0.9rem",
    lineHeight: "1.8",
  };
  const headingStyle = {
    fontSize: "1.1rem",
    fontWeight: "500",
    color: "#424242",
    marginBottom: "1rem",
  };

  return (
    <footer className="border-top bg-light pt-5">
      <div className="container ">
        <div className="row mt-5">
        
          <div className="col-lg-3 col-md-6 mb-4">
            <img
              src="media/image/logo.svg"
              style={{ width: "50%" }}
              alt="logo"
              className="mb-3"
            />
            <p className="text-muted" style={{ fontSize: "0.85rem" }}>
              © 2010 - 2026, Zerodha Broking Ltd. <br /> All rights reserved.
            </p>
            <div className="fs-5 text-muted mt-4 d-flex gap-3">
              <i className="fa-brands fa-x-twitter"></i>
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-linkedin-in"></i>
            </div>
            <hr className="d-lg-none" />
            <div className="fs-5 text-muted mt-3 d-flex gap-3">
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-whatsapp"></i>
              <i className="fa-brands fa-telegram"></i>
            </div>
          </div>

          {/* Account Links */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 style={headingStyle}>Account</h5>
            <div className="d-flex flex-column">
              <a href="/" style={linkStyle}>
                Open demat account
              </a>
              <a href="/" style={linkStyle}>
                Minor demat account
              </a>
              <a href="/" style={linkStyle}>
                NRI demat account
              </a>
              <a href="/" style={linkStyle}>
                Commodity
              </a>
              <a href="/" style={linkStyle}>
                Dematerialisation
              </a>
              <a href="/" style={linkStyle}>
                Fund transfer
              </a>
              <a href="/" style={linkStyle}>
                MTF
              </a>
              <a href="/" style={linkStyle}>
                Referral program
              </a>
            </div>
          </div>

          {/* Support Links */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 style={headingStyle}>Support</h5>
            <div className="d-flex flex-column">
              <a href="/" style={linkStyle}>
                Contact us
              </a>
              <a href="/" style={linkStyle}>
                Support portal
              </a>
              <a href="/" style={linkStyle}>
                Z-Connect blog
              </a>
              <a href="/" style={linkStyle}>
                List of charges
              </a>
              <a href="/" style={linkStyle}>
                Downloads & resources
              </a>
              <a href="/" style={linkStyle}>
                Videos
              </a>
              <a href="/" style={linkStyle}>
                Market overview
              </a>
              <a href="/" style={linkStyle}>
                How to file a complaint?
              </a>
              <a href="/" style={linkStyle}>
                Status of your complaints
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 style={headingStyle}>Company</h5>
            <div className="d-flex flex-column">
              <a href="/" style={linkStyle}>
                About
              </a>
              <a href="/" style={linkStyle}>
                Products
              </a>
              <a href="/" style={linkStyle}>
                Pricing
              </a>
              <a href="/" style={linkStyle}>
                Referral programme
              </a>
              <a href="/" style={linkStyle}>
                Careers
              </a>
              <a href="/" style={linkStyle}>
                Zerodha.tech
              </a>
              <a href="/" style={linkStyle}>
                Press & media
              </a>
              <a href="/" style={linkStyle}>
                Zerodha Cares (CSR)
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Section */}
        <div
          className="mt-5 pb-5 text-muted"
          style={{ fontSize: "0.7rem", lineHeight: "1.6" }}
        >
          <p>
            Zerodha Broking Ltd.: Member of NSE, BSE, MCX & MSEI – SEBI
            Registration no.: INZ000031633 CDSL/NSDL: Depository services
            through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019
            Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross,
            Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase,
            Bengaluru - 560078, Karnataka, India. For any complaints pertaining
            to securities broking please write to complaints@zerodha.com, for DP
            related to dp@zerodha.com. Please ensure you carefully read the Risk
            Disclosure Document as prescribed by SEBI | ICF
          </p>
          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication, Speedy redressal of the grievances
          </p>
          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>
          <p>
            Attention investors: 1) Stock brokers can accept securities as
            margins from clients only by way of pledge in the depository system
            w.e.f September 01, 2020. 2) Update your e-mail and phone number
            with your stock broker / depository participant and receive OTP
            directly from depository on your e-mail and/or mobile number to
            create pledge. 3) Check your securities / MF / bonds in the
            consolidated account statement issued by NSDL/CDSL every month.
          </p>
          <p>
            India's largest broker based on networth as per NSE. NSE broker
            factsheet
          </p>
          <p>
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day. Issued in the interest of
            investors. KYC is one time exercise while dealing in securities
            markets - once KYC is done through a SEBI registered intermediary
            (broker, DP, Mutual Fund etc.), you need not undergo the same
            process again when you approach another intermediary." Dear
            Investor, if you are subscribing to an IPO, there is no need to
            issue a cheque. Please write the Bank account number and sign the
            IPO application form to authorize your bank to make payment in case
            of allotment. In case of non allotment the funds will remain in your
            bank account. As a business we don't give stock tips, and have not
            authorized anyone to trade on behalf of others. If you find anyone
            claiming to be part of Zerodha and offering such services.
          </p>
          <p>
            *Customers availing insurance advisory services offered by Ditto
            (Tacterial Consulting Private Limited | IRDAI Registered Corporate
            Agent (Composite) License No CA0738) will not have access to the
            exchange investor grievance redressal forum, SEBI SCORES/ODR, or
            arbitration mechanism for such products.
          </p>
          <p className="text-center mt-4">
            <a
              href="/"
              className="mx-2 text-decoration-none text-muted "
            >
            Terms & conditions 
            </a>{" "}
            |
            <a
              href="/"
              className="mx-2 text-decoration-none text-muted "
            >
              Policies & procedures
            </a>
             <a
              href="/"
              className="mx-2 text-decoration-none text-muted "
            >
              Privacy Policy
            </a>
             <a
              href="/"
              className="mx-2 text-decoration-none text-muted "
            >
             Investor charter
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
