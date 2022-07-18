import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import DataTable from "../DataTable";

// Distance in meters
function measure(lat1, lon1, lat2, lon2) {
  var R = 6378.137; // Radius of earth in KM
  var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return (d * 1000).toFixed(2); // meters
}

export default function TreeDashboard(props) {
  if (props.userLocation[0]) {
    var treesdata = props.treesdata.map((t) => {
      return {
        road: t.properties.road_name,
        species: t.properties.tree_speci,
        distance: measure(
          t.properties.latitudey,
          t.properties.longitudex,
          props.userLocation[0][0],
          props.userLocation[0][1]
        ),
      };
    });

    treesdata = treesdata.sort((a, b) => a.distance - b.distance);
  } else {
    var treesdata = [
      { "No Location Found": "Press the button above to find your location" },
    ];
  }
  return (
    <div className="w-full my-2">
      <div id="treeinfobox">
        <p className="font-head text-3xl w-full text-center">
          <b>Trees in Noosa</b>
        </p>
        <div className="overflow-hidden m-2">
          <div className="w-32 h-44 float-left relative mr-2">
            <Image
              src="/images/tree.jpg"
              layout="fill"
              objectFit="contain"
              objectPosition="left"
              alt="Palm tree on main beach"
              align="left"
            />
          </div>
          <div className="mr-2">
            Noosa boasts an incredible range of beautiful subtropic trees.
            You&apos;ll find large, leaning palm trees, ancient eucalpytus
            trunks and many more scatterd throughout our gorgeous landscape.{" "}
            <br /> Use the tool below to find out what you are looking at!
          </div>
        </div>
      </div>
      <div className="border-t-2 border-neutral-800 mt-3 pt-3 flex flex-col items-center">
        <p className="font-head text-3xl w-full text-center mb-3">
          <b>What Tree is This?</b>
        </p>
        <button
          className="p-2 bg-neutral-200 border border-council_secondary rounded-xl text-council_secondary"
          onClick={() => {
            // props.userLocation[1]("Loading...");
            navigator.geolocation.getCurrentPosition(
              function (position) {
                props.userLocation[1]([
                  position.coords.latitude,
                  position.coords.longitude,
                ]);
              },
              (e) => {
                props.userLocation[1](e.message);
              },
              { enableHighAccuracy: true, maximumAge: 10000 }
            );
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlassLocation} fontSize={40} />
        </button>
        {props.userLocation[0] ? (
          <div>
            Your location: (Lat: {props.userLocation[0][0]}, Lng:{" "}
            {props.userLocation[0][1]})
          </div>
        ) : (
          <div>No location found</div>
        )}
        <DataTable data={treesdata} />
      </div>
    </div>
  );
}
