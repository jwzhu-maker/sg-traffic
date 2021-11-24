import { useState } from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import getCenter from "geoLib/es/getCenter";

function Map({ searchResults }) {
  // Transform the search results into a list of coordinates
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  // Decide the center of the map based on the coordinates
  const center = getCenter(coordinates);

  // latitude: 1.357,
  // longitude: 103.8145,

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 12,
  });

  // 👨🏻‍🚀  🪠  👨‍🦯
  return (
    <ReactMapGL
      mapStyle={"mapbox://styles/mapbox/streets-v11"}
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker></Marker>
          </div>
          ))}

      </ReactMapGL>
  );
}

export default Map;
