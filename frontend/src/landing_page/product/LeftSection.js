import React from 'react';
function LeftSection({
     imageURL, productName, productDescription, tryDemo, learnMore, googlePlay, appStore,
}) {
 return ( 
        <div className="container">
            <div className="row mt-5 ">
                 <div className="col-lg-6 col-md-12 text-center">
          <img src={imageURL} alt="" style={{ width: "100%", maxWidth: "600px" }} />
        </div>

                <div className="col-lg-6 col-md-12 p-5 mt-5">
                    <h1>{productName}</h1>
                    <p className='mt-4'>{productDescription}</p>
                    <div>
                        <a href={tryDemo} style={{textDecoration:"none"}}>Try Demo<i class="fa-solid fa-arrow-right"></i></a> 
                        <a href={learnMore} style={{textDecoration:"none", marginLeft: "50px"}}>Learn More <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                    <div className='mt-4 '>
                         <img src={googlePlay} alt="" />
                           <img src={appStore} style={{marginLeft:"15px"}} alt="" />
                    </div>
                </div>

            </div>
        </div>
     );
}
   


export default LeftSection;