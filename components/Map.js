import { useState } from "react";
import ReactMapGL from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 1.357,
    longitude: 103.8145,
    zoom: 12,
  });

  console.log(process.env.mapbox_key);
  return (
    <ReactMapGL
      mapStyle={"mapbox://styles/mapbox/streets-v11"}
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    />
  );
}

export default Map;
