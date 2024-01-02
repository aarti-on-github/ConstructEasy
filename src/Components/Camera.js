import React from 'react'
import Webcam from 'react-webcam';
import { useRef,useState } from 'react';
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
      <h1>Photos for Attendance</h1>
      
      <div className="WebcamContainer">
        <Webcam
          audio={false}
          height={480}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
        />
      </div>

      <button className="camera-btn" onClick={capture}>
        Capture Image
      </button>

      {capturedData && (
        <div className="CapturedImage">
          <h2>Captured Image:</h2>
          <img src={capturedData.imageSrc} alt="Captured" style={{ maxWidth: '100%' }} />
          <p>Date: {capturedData.date}</p>
          <p>Time: {capturedData.time}</p>
        </div>
      )}
    </div>
  )
}

export default Camera
