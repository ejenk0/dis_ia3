import React, { useState } from "react";
import DataTable from "./DataTable";
import Filters from "./_Filters";
import dynamic from "next/dynamic";

export default function Dashboard(props) {
  const koaladata = props.data;

  const filters = {
    location: useState(""),
  };

  const Map = React.useMemo(
    () =>
      dynamic(
        () => import("./Map"), // replace '@components/map' with your component's location
        {
          loading: () => <p>A map is loading</p>,
          ssr: false, // This line is important. It's what prevents server-side render
        }
      ),
    []
  );

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col mt-5 items-center">
        <div className="flex flex-col">
          <Filters filters={filters} />
        </div>
        <div className="flex flex-col border-2 rounded-xl items-center p-3 w-2/3">
          <h1 className="text-2xl font-semibold mb-1">Koala Sightings</h1>
          {props.userLocation[0] ? (
            <Map
              center={props.userLocation[0]}
              zoom={13}
              scrollZoom={true}
              markers={[
                {
                  lat: 51.505,
                  lng: -0.09,
                  desc: "Test",
                },
              ]}
            />
          ) : (
            <div>Location Loading...</div>
          )}
          {/* <DataTable
            data={koaladata}
            omit={["sighting_id", "sci_name", "com_name"]}
            filters={filters}
          /> */}
        </div>
      </div>
    </div>
  );
}
