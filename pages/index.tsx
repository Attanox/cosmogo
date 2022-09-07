import React from "react";
import { gql } from "@apollo/client";
import type { GetStaticProps, NextPage } from "next";

import LaunchList, { INITIAL_FILTERS } from "components/LaunchList";
import { getSpacexClient } from "lib/apollo.client";
import Error from "components/Error";
import type { Dragon, Launch } from "types/spaceXTypes";
import { dragonData, launchData, PAGINATE_BY } from "graphql/spaceX";

interface LocalProps {
  launches: Launch[];
  dragons: Dragon[];
  error: boolean;
}

const BG_IMG =
  "https://images.unsplash.com/photo-1581293963396-4d8804f556c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

const HomePage: NextPage<LocalProps> = (props) => {
  const { launches, dragons, error } = props;

  return (
    <>
      <header
        className="hero w-full mt-20 mx-auto relative rounded-md"
        style={{ backgroundImage: `url(${BG_IMG})`, minHeight: "50vh" }}
      >
        <div className="hero-overlay bg-opacity-50 rounded-md bg-neutral"></div>
        <div className="relative sm:absolute sm:left-1/2 sm:-translate-x-full hero-content text-center text-neutral-content">
          <div className="max-w-full">
            <h2 className="heading w-full text-white text-left tracking-wide text-base md:text-xl lg:text-2xl">
              Reach for the stars
            </h2>
            {/* <div className="h-8" /> */}
            <h1 className="heading w-full text-white text-left tracking-wide text-4xl md:text-5xl lg:text-7xl">
              Travel with
              <br />
              <span className="text-accent uppercase">Cosmogo</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="w-full">
        {error ? (
          <Error />
        ) : (
          <LaunchList dragons={dragons} initialLaunches={launches} />
        )}
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<LocalProps> = async () => {
  const client = getSpacexClient();

  try {
    const { data } = await client.query<{
      launches: Launch[];
      dragons: Dragon[];
    }>({
      query: gql`
        query GetLaunches {
          launches(limit: ${PAGINATE_BY}, offset: 0, order: "${INITIAL_FILTERS.order}", sort: "${INITIAL_FILTERS.sort}") {
            ${launchData}
          }
          dragons {
            ${dragonData}
          }
        }
      `,
    });

    return {
      props: {
        launches: data.launches,
        dragons: data.dragons.map((d) => {
          if (!d.crew_capacity) {
            return { ...d, crew_capacity: 3 };
          }

          return d;
        }),
        error: false,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        dragons: [],
        launches: [],
        error: true,
      },
    };
  }
};

export default HomePage;
