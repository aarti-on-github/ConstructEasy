import React from 'react'
import Webcam from 'react-webcam';
import { useRef,useState } from 'react';
import {TextField} from '@mui/material'
import Navbar from './Navbar';
function Camera() {
    const webcamRef = useRef(null);
    const [capturedData, setCapturedData] = useState(null);
  
    const capture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      const captureDate = new Date().toLocaleDateString();
      const captureTime = new Date().toLocaleTimeString();
  
      setCapturedData({
        imageSrc,
        date: captureDate,
        time: captureTime,
      });
    };


  return (
    <div>
       <Navbar/>
      <h1>Photos for Attendance</h1>
      <div className='text'>
      <TextField id="outlined-basic"label="Worker Id" variant="outlined"  />
      </div>
      <div className="WebcamContainer">
        <Webcam
          audio={false}
          height={250}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={250}
        />
      </div>

      <button className="camera-btn" onClick={capture}>
        Capture Image
      </button>

      {capturedData && (
        <div className="CapturedImage">
          <h2 style={{marginBottom:'2rem'}}>Captured Image:</h2>
          <img src={capturedData.imageSrc} alt="Captured" style={{ maxWidth: '100%' }} />
          <p>Date: {capturedData.date}</p>
          <p>Time: {capturedData.time}</p>
        </div>
      )}
    </div>
  )
}

export default Camera
