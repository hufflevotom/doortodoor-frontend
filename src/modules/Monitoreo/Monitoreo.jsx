import { useEffect, useState } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "./Pin";
import { Card } from "antd";

const Monitoreo = () => {
  const [folios, setFolios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [viewport, setViewport] = useState({
    longitude: -76.983,
    latitude: -12.085,
    zoom: 11,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 11,
      });
    });
  }, []);

  return (
    <>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        initialViewState={viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ height: "500px", width: "100%", margin: 0 }}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        {folios.map((f) => (
          <Pin longitude={f.longitud} latitude={f.latitud} />
        ))}
        {vehiculos.map((v) => (
          <Pin longitude={v.longitud} latitude={v.latitud} />
        ))}
      </Map>
      <Card style={{ marginTop: "-30px", zIndex: "100" }}>abc</Card>
    </>
  );
};

export default Monitoreo;
