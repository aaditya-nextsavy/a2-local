import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/usa.json";

const markers = [
  {
    markerOffset: -30,
    name: "Marker 1",
    coordinates: [45.5231, -122.6765]
  },
  { markerOffset: 15, name: "Marker 2", coordinates: [44.0521, -123.0867] },
  { markerOffset: 15, name: "Marker 3", coordinates: [43.6531, -123.4365] },
  { markerOffset: 15, name: "Marker 4", coordinates: [45.2521, -121.7867] },
  { markerOffset: 15, name: "Marker 5", coordinates: [46.0531, -122.2365] }
];

const PathMap = () => {
  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [55, 25, 0],
        scale: 550
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            if (geo.properties.NAME !== "Saudi Arabia") {
              return null;
            }
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            );
          })
        }
      </Geographies>
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
          <g
            fill="none"
            stroke="#FF5533"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -24)"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default PathMap;
