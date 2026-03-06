import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import HomePage from './landing_page/home/HomePage';
import Signup from "./landing_page/signUp/SignUp"
import About from "./landing_page/about/AboutPage"
import Product from "./landing_page/product/ProducPage"
import Support from "./landing_page/support/SupportPage"
import Navbar from './landing_page/Navbar';

import Footer from './landing_page/Footer';
import PageNotFound from "./landing_page/PageNotFound"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
 <Navbar/>
   <Routes>
    <Route path='/' element={<HomePage/>}/>
     <Route path='/signup' element={<Signup/>}/>
      <Route path='/about' element={<About/>}/>
       <Route path='/product' element={<Product/>}/>
        <Route path='/support' element={<Support/>}/>
          <Route path='/*' element={<PageNotFound/>}/>

   </Routes>
   <Footer/>
 </BrowserRouter>
  
 
);


