import React from 'react'
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { convertLength } from '@mui/material/styles/cssUtils';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import BACKEND_URL from '../backend';

function WorkerDetails() {
  const [workers, setWorkers] = useState([]);
  useEffect(()=>{
    const getWorkers = async () => {
      try{
        const res = await axios.get(`${BACKEND_URL}/api/getAllWorker`);
        if(res.status === 200){
          setWorkers(res.data);
        }
      }catch(err){
        console.log(err);
      }
    }
    getWorkers();
  }, [])

  console.log(workers);

  return (
    <div className='wd'>
      <Navbar/>
      <h2>Worker Details</h2>
      {workers.length === 0 ? <h1>Loading...</h1> :
      workers.map((worker) => (
        <div className='workerdetails' style={{marginBottom: "150px"}}>
          <div class="profile-card">
            <div class="profile-picture">
              <img src={`${BACKEND_URL}/${worker.profile_pic}`} alt="Profile Picture"/>
            </div>
            <div class="name">{worker.name}</div>
            <div class="info">Age:{worker.age}</div>
            <div class="info">Salary: ${worker.salary}</div>
            <div class="info">Phone: {worker.contact}</div>
            <div class="info">Address: {worker.address}</div>
            <div className='profile-buttons'>
              <Link to='/updateWorker'>
              <button onClick={()=> window.location.href=`/updateWorker/${worker._id}`}>Update</button>
              </Link>
            </div>
          </div>
        </div>
      ))
      }
    </div>
  )
}

export default WorkerDetails
