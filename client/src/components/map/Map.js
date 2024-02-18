import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const USmap = ({ geojsonData }) => {
  const mapStyle = {
    height: '400px',
    width: '100%'
  };

  return (
    <MapContainer center={[39.50, -98.35]} zoom={4} style={mapStyle}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© OpenStreetMap contributors'
      />
      <GeoJSON data={geojsonData} />
    </MapContainer>
  );
};

export default USmap;
