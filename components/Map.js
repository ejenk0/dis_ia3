import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";

export function ChangeView({ bounds }) {
  const map = useMap();
  map.flyToBounds(bounds);
  return null;
}

const Map = (props) => {
  const icon = L.icon({
    iconUrl: "/images/marker-icon.png",
    shadowUrl: "/images/marker-shadow.png",
    iconAnchor: [12, 41],
  });

  var markers = [];

  for (let i = 0; i < props.markers.length; i++) {
    const marker = props.markers[i];
    markers.push(
      <Marker key={i} position={[marker.lat, marker.lon]} icon={icon}>
        <Popup>
          {marker.locality ? (
            <>
              {marker.locality} <br />
            </>
          ) : (
            <></>
          )}
          {marker.date_seen ? (
            <>
              {marker.date_seen} <br />
            </>
          ) : (
            <></>
          )}
        </Popup>
      </Marker>
    );
  }

  return (
    <MapContainer
      bounds={props.markers.reduce(
        (prev, curr) => {
          var new_bounds = prev;
          prev[0][0] < curr.lat && prev[0][0]
            ? null
            : (new_bounds[0][0] = curr.lat);
          prev[1][0] > curr.lat && prev[1][0]
            ? null
            : (new_bounds[1][0] = curr.lat);
          prev[0][1] < curr.lon && prev[0][1]
            ? null
            : (new_bounds[0][1] = curr.lon);
          prev[1][1] > curr.lon && prev[1][1]
            ? null
            : (new_bounds[1][1] = curr.lon);
          return new_bounds;
        },
        [
          [0, 0],
          [0, 0],
        ]
      )}
      scrollWheelZoom={props.scrollZoom}
      style={{ height: props.height ? props.height : 400, width: "100%" }}
    >
      <ChangeView
        bounds={props.markers.reduce(
          (prev, curr) => {
            var new_bounds = prev;
            prev[0][0] < curr.lat && prev[0][0]
              ? null
              : (new_bounds[0][0] = curr.lat);
            prev[1][0] > curr.lat && prev[1][0]
              ? null
              : (new_bounds[1][0] = curr.lat);
            prev[0][1] < curr.lon && prev[0][1]
              ? null
              : (new_bounds[0][1] = curr.lon);
            prev[1][1] > curr.lon && prev[1][1]
              ? null
              : (new_bounds[1][1] = curr.lon);
            return new_bounds;
          },
          [
            [0, 0],
            [0, 0],
          ]
        )}
      />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
};

export default Map;
