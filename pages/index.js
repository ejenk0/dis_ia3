import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import KoalaDashboard from "../components/dashboards/KoalaDashboard";
import TreeDashboard from "../components/dashboards/TreeDashboard";
import Layout from "../components/Layout";

export default function Home({ hotspots, koalas }) {
  const userLocation = useState(null);
  const page = useState("koalas");
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     userLocation[1]([position.coords.latitude, position.coords.longitude]);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <div>
      <Layout page={page}>
        {page[0] === "koalas" ? (
          <KoalaDashboard
            hotspots={hotspots}
            koalas={koalas}
            userLocation={userLocation}
          />
        ) : page[0] === "trees" ? (
          <TreeDashboard userLocation={userLocation} />
        ) : (
          <></>
        )}
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const hotspots_res = await fetch(`http://127.0.0.1:8000/api/top_koala_spots`);
  const hotspots = await hotspots_res.json();

  const koalas_res = await fetch(`http://127.0.0.1:8000/api/koala_sightings`);
  const koalas = await koalas_res.json();

  return {
    props: { hotspots, koalas },
  };
}
