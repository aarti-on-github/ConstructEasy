import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import BACKEND_URL from '../backend';

// import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/getAllWorkLocation`);
        // Assuming the response.data is an array of coordinates
        setCoordinatesArray(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (coordinatesArray.length === 0) return;

    // Initialize the map
    const map = L.map('map').setView([coordinatesArray[0].latitude, coordinatesArray[0].longitude], 12);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© Abhishek Upadhyay'
    }).addTo(map);

    // Create a LayerGroup for markers
    const markersLayer = L.layerGroup().addTo(map);

    // Loop through the array of coordinates and add markers
    coordinatesArray.forEach(({ latitude, longitude }) => {
      const marker = L.marker([latitude, longitude]).addTo(markersLayer);
      marker.bindPopup(`Location: ${latitude}, ${longitude}`).openPopup();
    });

    // Clean up the map when the component unmounts
    return () => {
      map.remove();
    };
  }, [coordinatesArray]);

  return (
    <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', marginBottom: "1rem" }}>
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div id="map" style={{ height: '400px', width: '100%' }} />
      )}
    </div>
  );
};

export default MapComponent;
