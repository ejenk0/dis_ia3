import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import DataTable from "../DataTable";

export default function KoalaDashboard({ hotspots, koalas, userLocation }) {
  const [sightingsLocalityFilter, setSightingsLocalityFilter] =
    React.useState(null);

  const Map = React.useMemo(
    () =>
      dynamic(
        () => import("../Map"), // replace '@components/map' with your component's location
        {
          loading: () => <p>A map is loading</p>,
          ssr: false, // This line is important. It's what prevents server-side render
        }
      ),
    []
  );

  const map = (
    <Map
      markers={koalas.filter(
        (sighting) =>
          sighting.locality === sightingsLocalityFilter ||
          !sightingsLocalityFilter
      )}
    />
  );

  return (
    <div className="w-full my-2">
      <div id="koalainfobox">
        <p className="font-head text-3xl w-full text-center">
          <b>Koalas in Noosa</b>
        </p>
        <div className="overflow-hidden m-2">
          <div className="w-40 h-40 float-left relative mr-2">
            <Image
              src="/images/koala_sm.jpg"
              layout="fill"
              objectFit="contain"
              objectPosition="left"
              alt="Koala in a tree"
              align="left"
            />
          </div>
          <div className="mr-2">
            Noosa is fortunate to be home to Australia&apos;s most beloved
            marsupial thanks to the hard work of conservationists over many
            years. While they can be elusive in the wild, be patient and keep
            your eyes in the trees and you may get to meet one. <br />
            Find the best koala hotspots below!
          </div>
        </div>
      </div>
      <div className="border-t-2 border-neutral-800 mt-3 pt-3 flex flex-col items-center">
        <p className="font-head text-3xl w-full text-center mb-2">
          <b>Top 10 Koala Hotspots</b>
        </p>
        <DataTable
          data={hotspots.slice(0, 10)}
          buttons={[
            {
              col: "locality",
              Element: (row) => (
                <button
                  onClick={(e) => {
                    setSightingsLocalityFilter(row.locality);
                    const markers = koalas.filter(
                      (sighting) =>
                        sighting.locality === sightingsLocalityFilter ||
                        !sightingsLocalityFilter
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              ),
            },
          ]}
        />
      </div>
      <div className="border-t-2 border-neutral-800 mt-3 pt-3 flex flex-col items-center">
        <p className="font-head text-3xl w-full text-center mb-2">
          <b>Koala Sightings</b>
        </p>
        {map}
      </div>
    </div>
  );
}
