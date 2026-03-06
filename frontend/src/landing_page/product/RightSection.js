import React from "react";
function RightSection({
  imageURL,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-12 p-5" >
          <h1 className="fs-2 mb-4" style={{ color: "#424242", fontWeight: "500" }}>{productName}</h1>
          <p className="mb-4"style={{ lineHeight: "1.8", color: "#444" }}>{productDescription}</p>
          <a href={learnMore} style={{ textDecoration: "none", fontWeight: "500" }}>
            {" "}
            Learn More <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
        <div className="col-lg-6 col-md-12 text-center">
          <img src={imageURL} alt="" style={{ width: "100%", maxWidth: "600px" }} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
