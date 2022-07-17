import { useState } from "react";
import KoalaDashboard from "../components/dashboards/KoalaDashboard";
import TreeDashboard from "../components/dashboards/TreeDashboard";
import Layout from "../components/Layout";
// import db from "../db/db";
import { dummykoalas, dummyhotspots } from "../db/DummyData";

export default function Home({ hotspots, koalas, treesdata }) {
  const userLocation = useState(null);
  const page = useState("koalas");
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
          <TreeDashboard treesdata={treesdata} userLocation={userLocation} />
        ) : (
          <></>
        )}
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  // try {
  //   const treesdata = (
  //     await (
  //       await fetch(
  //         "https://data.gov.au/geoserver/tree-register/wfs?request=GetFeature&typeName=ckan_13079796_1b3a_448d_8a09_d7fda5611c5f&outputFormat=json"
  //       )
  //     ).json()
  //   ).features;
  //   const hotspots = await (
  //     await db
  //   ).all(`
  //   SELECT
  //     COUNT(number_seen) AS number_seen,
  //     locality
  //   FROM
  //     koalas
  //   GROUP BY
  //     locality
  //   ORDER BY
  //     number_seen DESC;`);

  //   const koalas = await (await db).all("SELECT * FROM koalas");
  //   return {
  //     props: { hotspots, koalas, treesdata },
  //   };
  // } catch (error) {
  const treesdata = (
    await (
      await fetch(
        "https://data.gov.au/geoserver/tree-register/wfs?request=GetFeature&typeName=ckan_13079796_1b3a_448d_8a09_d7fda5611c5f&outputFormat=json"
      )
    ).json()
  ).features;
  return {
    props: { hotspots: dummyhotspots, koalas: dummykoalas, treesdata },
  };
  // }
}
