import React, { useEffect } from 'react';
import L from 'leaflet';

// import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([0, 0], 2);

    // Create a LayerGroup for markers
    const markersLayer = L.layerGroup().addTo(map);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Get user's current location and set the map view
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 14);

        // Add a marker for the current location
        const marker = L.marker([latitude, longitude]).addTo(markersLayer);
        marker.bindPopup('Your current location').openPopup();
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );

    // Add a marker on click
    map.on('click', function (e) {
      const latitude = e.latlng.lat.toFixed(6);
      const longitude = e.latlng.lng.toFixed(6);

      // Remove previous markers
      markersLayer.clearLayers();

      // Create a link with the coordinates
      const link = document.createElement('a');
      link.href = 'https://www.google.com/maps?q=' + latitude + ',' + longitude;
      link.target = '_blank';
      link.textContent = 'Click here for coordinates';

      // Append the link to the body
      // document.body.appendChild(link);

      // Add a marker for the clicked position
      const clickMarker = L.marker([latitude, longitude]).addTo(markersLayer);
      clickMarker.bindPopup(`Clicked location: ${latitude}, ${longitude}`).openPopup();
    });

    // Clean up the map when the component unmounts
    return () => {
      map.remove();
    };
  }, []); // Empty dependency array to run the effect only once

  return <div id="map" style={{ height: '400px', width: '100%' }} />;
};

export default MapComponent;
