import React from "react";
import { gql } from "@apollo/client";
import type { GetServerSideProps, NextPage } from "next";
import type { Dragon, Launch } from "types";

import LaunchList from "components/LaunchList";
import { getSpacexClient } from "lib/apollo.client";

interface LocalProps {
  launches: Launch[];
  dragons: Dragon[];
}

const BG_IMG =
  "https://images.unsplash.com/photo-1494022299300-899b96e49893?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

const HomePage: NextPage<LocalProps> = (props) => {
  const { launches, dragons } = props;

  return (
    <>
      <header
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${BG_IMG})`, minHeight: "90vh" }}
      >
        <div className="hero-overlay bg-opacity-90"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-full">
            <h2 className="heading w-full text-white text-left tracking-wide text-2xl">
              Reach for the stars
            </h2>
            <div className="h-8" />
            <h1 className="heading w-full text-white text-left tracking-wide text-8xl">
              Travel with <span className="text-accent uppercase">Cosmogo</span>
            </h1>
          </div>
        </div>
      </header>

      <main>
        <LaunchList dragons={dragons} launches={launches} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<LocalProps> = async () => {
  const client = getSpacexClient();

  const { data } = await client.query<{
    launches: Launch[];
    dragons: Dragon[];
  }>({
    query: gql`
      query GetLaunches {
        launches(limit: 10) {
          details
          id
          mission_name
          launch_site {
            site_name_long
          }
          links {
            article_link
            mission_patch
          }
        }
        dragons {
          crew_capacity
          description
          name
          id
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
    },
  };
};

export default HomePage;
