import React from "react";

function Hero() {
  const quickLinkStyle = {
    color: "white",
    textDecoration: "underline",
    marginRight: "20px",
    fontSize: "0.95rem",
    lineHeight: "2.5",
  };

  const featuredLinkStyle = {
    color: "white",
    textDecoration: "underline",
    display: "block",
    marginBottom: "15px",
    fontSize: "1.1rem",
  };

  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-5 mt-5 mb-5" id="supportWrapper">
        <h4 className="fs-4 fw-medium">Support Portal</h4>
        <a href="">Track Ticekt</a>
      </div>
      <div className="row p-4">
        <div className="col-lg-6 col-md-12">
          <h2 className="fs-3 mb-5 fw-normal" style={{ lineHeight: "1.5" }}>
            Search for an answer or browse help topics to create a ticket
          </h2>
          <div className="position-relative">
            <input
              type="text"
              placeholder="Eg: how do i activate F&O, why is my order getting rejected.."
              id="searchInputStyle"
            />
          </div>
          <div className="d-flex flex-wrap mt-2">
            <a href="/" style={quickLinkStyle}>
              Track account opening
            </a>
            <a href="/" style={quickLinkStyle}>
              Track segment activation
            </a>
            <a href="/" style={quickLinkStyle}>
              Intraday margins
            </a>
            <a href="/" style={quickLinkStyle}>
              Kite user manual
            </a>
          </div>
        </div>
        <div className="col-lg-5 col-md-12 ps-lg-5">
          <h3 className="fs-4 mb-4 fw-medium">Featured</h3>
          <ol className="ps-3">
            <li className="mb-3">
              <a href="/" style={featuredLinkStyle}>
                Current Takeovers and Delisting - January 2024
              </a>
            </li>
            <li>
              <a href="/" style={featuredLinkStyle}>
                Latest Intraday leverages - MIS & CO
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
