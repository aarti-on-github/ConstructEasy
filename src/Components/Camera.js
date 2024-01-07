import React from 'react'
import Webcam from 'react-webcam';
import { useRef,useState } from 'react';
import {TextField} from '@mui/material'
import Navbar from './Navbar';
import axios from 'axios';
import { useEffect } from 'react';
import BACKEND_URL from '../backend';

function Camera() {
    const webcamRef = useRef(null);
    const [capturedData, setCapturedData] = useState(null);
    const [workerId,setWorkerId] = useState(null);
    // console.log(capturedData)
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

    useEffect(() => {
      if (capturedData !== null) {
        // Assuming you have the webcamRef and the imageSrc obtained from it
        const imageSrc = webcamRef.current.getScreenshot();

        // Convert base64 to binary
        const binaryImage = atob(imageSrc.split(',')[1]);

        // Create a Uint8Array to hold the binary data
        const uint8Array = new Uint8Array(binaryImage.length);

        // Fill the Uint8Array with the binary data
        for (let i = 0; i < binaryImage.length; i++) {
            uint8Array[i] = binaryImage.charCodeAt(i);
        }

        // Create a Blob from the Uint8Array
        const blob = new Blob([uint8Array], { type: 'image/png' }); // Adjust the type accordingly

        const data = new FormData();
        data.append("worker", workerId);
        data.append("img", blob, "image.png");
        data.append("date", new Date());

        const sendData = async () => {
          try {
            const res = await axios.post(`${BACKEND_URL}/api/addAttendance`, data);
            console.log(res.data);
          } catch (err) {
            console.log(err);
          }
        }
        sendData();
      } else {
        console.log("No image captured");
      }
    }
    , [capturedData]);

  return (
    <div>
       <Navbar/>
      <h1>Photos for Attendance</h1>
      <div className='text'>
      <TextField id="outlined-basic"label="Worker Id" variant="outlined" onChange={(e)=>setWorkerId(e.target.value)} />
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
