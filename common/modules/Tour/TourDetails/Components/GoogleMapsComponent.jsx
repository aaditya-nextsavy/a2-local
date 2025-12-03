import React, { useRef, useEffect } from "react";
import { loadGoogleMaps } from "./RouteMap";

export default function GoogleMapsComponent({ mapCordinates }) {
  const mapRef = useRef(null);

  console.debug(mapCordinates);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: mapCordinates[0],
        zoom: 13,
      });

      mapCordinates.forEach((mapCordinate) => {
        new window.google.maps.Marker({
          position: mapCordinate,
          map: map,
        });
      });

      const polyline = new window.google.maps.Polyline({
        path: mapCordinates,
        strokeColor: "#5C0F87",
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });

      polyline.setMap(map);
    };

    if (mapCordinates.length !== 0) loadGoogleMaps(initMap);
  }, [mapCordinates]);

  return <div ref={mapRef} style={{ height: "500px" }} />;
}
