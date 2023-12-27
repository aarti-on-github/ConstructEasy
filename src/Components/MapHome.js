import React, { useEffect } from 'react';
import L from 'leaflet';

// import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  useEffect(() => {
    // Sample array of coordinates
    const coordinatesArray = [
      { latitude: 37.7749, longitude: -122.4194 }, // San Francisco
      { latitude: 40.7128, longitude: -74.0060 },  // New York
      { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
      // Add more coordinates as needed
    ];

    // Initialize the map
    const map = L.map('map').setView([0, 0], 2);

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
  }, []); // Empty dependency array to run the effect only once

  return <div id="map" style={{ height: '400px', width: '100%' }} />;
};

export default MapComponent;
