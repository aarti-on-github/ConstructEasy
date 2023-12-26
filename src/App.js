import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScrollTop from './Components/ScrollTop'
import Addworker from './Components/Addworker';
import WorkerDetails from './Components/WorkerDetails';

function App() {
  return (
    <BrowserRouter>
     <Routes>
    
      <Route path='/'element={<ScrollTop/>}/>
      <Route path='/manageworker'element={<Addworker/>}/>
      <Route path='/workerdetails'element={<WorkerDetails/>}/>

     </Routes>
    </BrowserRouter>
  );
}

export default App;
