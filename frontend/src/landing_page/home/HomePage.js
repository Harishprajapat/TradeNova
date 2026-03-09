import React from 'react';
import Hero from "./Hero"
import Award from "./Award"
import Stats from "./Stats"
import PricingHome from "./PricingHome"
import Education from "./Education"

import Navbar from "../Navbar"
import OpenAccount from "../OponAccount"
import Footer from "../Footer";

function HomePage() {
    return ( 
       <>
      
  
        <Hero/>
        <Award/>
         <Stats/>
          <PricingHome/>
          <Education/>
          <OpenAccount/>
      
       </>
     );
}

export default HomePage;