import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import BACKEND_URL from '../backend';

const MapComponent = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const map = L.map('map').setView([0, 0], 2);
    const markersLayer = L.layerGroup().addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          map.setView([latitude, longitude], 14);

          const marker = L.marker([latitude, longitude]).addTo(markersLayer);
          marker.bindPopup('Your current location').openPopup();
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );

      map.on('click', function (e) {
        const latitude = e.latlng.lat.toFixed(6);
        const longitude = e.latlng.lng.toFixed(6);

        markersLayer.clearLayers();

        const link = document.createElement('a');
        link.href = 'https://www.google.com/maps?q=' + latitude + ',' + longitude;
        link.target = '_blank';
        link.textContent = 'Click here for coordinates';

        setLatitude(latitude);
        setLongitude(longitude);

        const clickMarker = L.marker([latitude, longitude]).addTo(markersLayer);
        clickMarker.bindPopup(`Clicked location: ${latitude}, ${longitude}`).openPopup();
      });
    } catch (err) {
      console.log(err);
    }

    return () => {
      map.remove();
    };
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/api/addWorkLocation`, {
        name,
        address,
        longitude,
        latitude,
      });
      console.log(res);
      if (res.status === 200) {
        alert('Work Location Added Successfully');
      }
    } catch (err) {
      setError('Error Adding Work Location');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: "20px" }}>
      <Typography variant="h2" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
        Add Work Location
      </Typography>
      <TextField id="outlined-basic" label="Location Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
      <TextField id="outlined-basic" label="Location Address" variant="outlined" onChange={(e) => setAddress(e.target.value)} />
      <TextField id="outlined-basic" label="Longitude" variant="outlined" InputProps={{ readOnly: true }} value={longitude} />
      <TextField id="outlined-basic" label="Latitude" variant="outlined" InputProps={{ readOnly: true }} value={latitude} />
      <Button variant="contained" onClick={handleSubmit}>
        {loading ? <CircularProgress size={24} /> : 'Add Work Location'}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      <div id="map" style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

export default MapComponent;
