import React from "react";

function Univers() {
  const cardParaStyle = { fontSize: "12px", color: "#9b9b9b", lineHeight: "1.6" };

  return (
    <div className="container mt-5">
      <div className="row text-center p-5">
        <h1 className="mt-5 mb-3" style={{ color: "#424242", fontWeight: "500" }}>The Zerodha Universe</h1>
        <p style={{ color: "#424242" }}>
          Extend your trading and investment experience even further with our partner platforms
        </p>

     
        <div className="col-lg-4 col-md-6 col-sm-12 p-3 mt-5">
          <img src="media/image/zerodhaFundhouse.png" style={{ width: "60%" }} alt="Fund House" />
          <p className="mt-4 px-4" style={cardParaStyle}>
            Our asset management venture that is creating simple and transparent index funds to help you save for your goals.
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 p-3 mt-5">
          <img src="media/image/sensibullLogo.svg" style={{ width: "65%" }} alt="Sensibull" />
          <p className="mt-4 px-4" style={cardParaStyle}>
            Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 p-3 mt-5">
          <img src="media/image/TijoriLogo.svg" style={{ width: "55%" }} alt="Tijori" />
          <p className="mt-4 px-4" style={cardParaStyle}>
            Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.
          </p>
        </div>

       
        <div className="col-lg-4 col-md-6 col-sm-12 p-3 mt-5">
          <img src="media/image/streakLogo.png" style={{ width: "55%" }} alt="Streak" />
          <p className="mt-4 px-4" style={cardParaStyle}>
            Systematic trading platform that allows you to create and backtest strategies without coding.
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 p-3 mt-5">
          <img src="media/image/smallcaseLogo.png" style={{ width: "65%" }} alt="smallcase" />
          <p className="mt-4 px-4" style={cardParaStyle}>
            Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 p-3 mt-5">
          <img src="media/image/dittoLogo.png" style={{ width: "45%" }} alt="Ditto" />
          <p className="mt-4 px-4" style={cardParaStyle}>
            Personalized advice on life and health insurance. No spam and no mis-selling.
          </p>
        </div>

     
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

export default Univers;