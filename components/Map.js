import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geoLib/es/getCenter";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

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

  // 👨🏻‍🚀  🪠  👨‍🦯 📌
  return (
    <ReactMapGL
      mapStyle={"mapbox://styles/mapbox/streets-v11"}
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>

          {/* The popup is only visible when a marker is clicked */}
          {selectedLocation.long === result.long && (
            <Popup
              className="rounded-lg bg-red-400"
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              <p className="text-blue-400 rounded-lg">{result.title}</p>
            </Popup>
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
