import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScrollTop from './Components/ScrollTop'
import Addworker from './Components/Addworker';

function App() {
  return (
    <BrowserRouter>
     <Routes>
    
      <Route path='/'element={<ScrollTop/>}/>
      <Route path='/manageworker'element={<Addworker/>}/>

     </Routes>
    </BrowserRouter>
  );
}

export default App;
