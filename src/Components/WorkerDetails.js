import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { convertLength } from '@mui/material/styles/cssUtils';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function WorkerDetails() {
  return (
    <div className='wd'>
      <Navbar/>
      <h2>Worker Details</h2>
    <div className='workerdetails'>
      <div class="profile-card">
    <div class="profile-picture">
      <img src="/AartiImage.jpg" alt="Profile Picture"/>
    </div>
    <div class="name">Aarti Mishra</div>
    <div class="info">Age:21</div>
    <div class="info">Salary: $50,000</div>
    <div class="info">Phone:+91 8104025348</div>
    <div class="info">Address:C,404 Sai Garden </div>
    <div className='profile-buttons'>
      <Link to='/updateWorker'>
      <button>Update</button>
      </Link>
    </div>
  </div>
    </div>
    <div className='workerdetails'>
      <div class="profile-card">
    <div class="profile-picture">
      <img src="/AartiImage.jpg" alt="Profile Picture"/>
    </div>
    <div class="name">Aarti Mishra</div>
    <div class="info">Age: 21</div>
    <div class="info">Salary: $50,000</div>
    <div class="info">Phone : +91 8104025348</div>
    <div class="info">Address: C,404 Sai Garden </div>
    <div className='profile-buttons'>
      <button>Update</button>
    </div>
  </div>
    </div>
    <div className='add'>
    <button>Add New Worker</button>
  </div>
  </div>
  )
}

export default WorkerDetails
