import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function TreeDashboard(props) {
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
            console.log("Loadings");
            props.userLocation[1]("Loading...");
            navigator.geolocation.getCurrentPosition(
              function (position) {
                props.userLocation[1]([
                  position.coords.latitude,
                  position.coords.longitude,
                ]);
                console.log(props.userLocation[0]);
                console.log([
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
        {props.userLocation[0]}
      </div>
    </div>
  );
}
