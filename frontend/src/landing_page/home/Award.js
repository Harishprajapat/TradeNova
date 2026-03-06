import React from "react";
function Award() {
  return (
    <div className="container mt-5">
      <div className="row   ">
        <div className="col-lg-6 col-md-12 p-5">
          <img src="media\image\largestBroker.svg" alt="LargetBroker" />
        </div>
        <div className="col-lg-6 col-md-12 p-5 mt-3">
          <h1>Trade smarter. Invest stronger. Grow faster.</h1>
          <p className="mb-5">
            TradeNova empowers modern investors to trade stocks, derivatives,
            ETFs, and more with speed, simplicity, and transparency — all in one
            powerful platform.
          </p>
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <ul>
                <li><p>Stocks & IPOs</p></li>
                  <li><p>Futures & Options</p></li>
                    <li><p>Commodity Trading</p></li>
              </ul>
            </div>
            <div className="col-lg-6 col-md-12">
              <ul>
              <li><p>Currency Derivatives</p></li>
                  <li><p>Direct Mutual Funds</p></li>
                    <li><p>Bonds & Government Securities</p></li>
              </ul>
            </div>
          </div>
          <img src="media\image\pressLogos.png" style={{width:"95%"}} alt="presslogo png" />
        </div>
      </div>
    </div>
  );
}

export default Award;
