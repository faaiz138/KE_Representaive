import React, { useEffect, useRef, useState } from 'react';
import Header from "../../components/Header";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box } from '@mui/material';
import Truck from '../../components/Img2/tow-truck.png'
function Maps() {
  const [map, setMap] = useState(null);
  const [supervisorData, setSupervisorData] = useState([]);
  const mapContainer = useRef(null);
  useEffect(() => {
    fetch("http://localhost:3080/supervisor/send_supervisor_location", {
      method: "GET",
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setSupervisorData(data))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZmFhaXphc2lmIiwiYSI6ImNsZXU3dHplMjA0aGkzd212YzRraWliNGgifQ.jyvKkbsdtxS_7EC_sxPDVg';
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [67.0822, 24.9056], // Karachi coordinates
        zoom: 10,
      });
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });
      mapInstance.addControl(geolocate);
      setMap(mapInstance); // Update the state with the map instance
    };
    if (mapboxgl.accessToken) {
      initializeMap();
    }
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);
  useEffect(() => {
    if (map && supervisorData.length > 0) {
      supervisorData.forEach((marker) => {
        const { supervisor_id, longitude, latitude, first_name, last_name } = marker;
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.innerHTML = `
        <img src="${Truck}" alt="Truck Icon" style="width: 32px; height: 32px;" />`;
        const popupContent = document.createElement('div');
        popupContent.innerHTML = `
          <div><strong>Supervisor ID:</strong> ${supervisor_id}</div>
          <div><strong>Name:</strong> ${first_name} ${last_name}</div>
        `;

        const popup = new mapboxgl.Popup().setDOMContent(popupContent);

        new mapboxgl.Marker({ element: markerElement })
          .setLngLat([parseFloat(longitude), parseFloat(latitude)])
          .setPopup(popup)
          .addTo(map);
      });
      map.resize();
    }
  }, [map, supervisorData]);
  return (
    <Box sx={{ height: 'calc(100vh - 64px)', width: '100%' }}>
      <Header title="Track Supervisor"/>
      <Box sx={{ height: '90%', width: '100%' }} ref={mapContainer} />
    </Box>
  );
}
export default Maps;