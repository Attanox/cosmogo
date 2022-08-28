import React from "react";
import { gql } from "@apollo/client";
import type { GetStaticProps, NextPage } from "next";

import LaunchList from "components/LaunchList";
import { getSpacexClient } from "lib/apollo.client";
import Error from "components/Error";
import { Dragon, Launch } from "types/spaceXTypes";

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
        className="hero min-h-screen relative"
        style={{ backgroundImage: `url(${BG_IMG})`, minHeight: "100vh" }}
      >
        <div className="hero-overlay bg-opacity-20 bg-primary"></div>
        <div className="absolute left-1/2 -translate-x-full hero-content text-center text-neutral-content">
          <div className="max-w-full">
            <h2 className="heading w-full text-white text-left tracking-wide text-base md:text-3xl">
              Reach for the stars
            </h2>
            <div className="h-8" />
            <h1 className="heading w-full text-white text-left tracking-wide text-4xl md:text-9xl">
              Travel with
              <br />
              <span className="text-accent uppercase">Cosmogo</span>
            </h1>
          </div>
        </div>
        <div className="mt-auto pb-2 text-accent w-full flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="animate-bounce w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
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
        error: false,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        dragons: [
          {
            crew_capacity: 7,
            description: "allssfsafsaf",
            id: "132213333",
            name: "Dracarys",
          },
        ],
        launches: [
          {
            details:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at cursus ligula. Suspendisse convallis placerat libero et tincidunt. Nulla vel ex eros. Donec efficitur molestie magna, eu rhoncus urna aliquet ac. Maecenas iaculis vel erat vitae aliquet. Etiam pulvinar mollis massa sed faucibus.",
            id: "1223333444",
            launch_site: {
              site_name_long: "NY",
            },
            links: {
              article_link: "/rea/",
              mission_patch: "ddd",
            },
            mission_name: "Solaris",
          },
          {
            details:
              "Morbi pellentesque ultricies elit, ut volutpat turpis. Phasellus et condimentum sapien. Maecenas tempus sodales felis. Phasellus sagittis libero finibus mauris sagittis placerat. Mauris id elit dui. Praesent pretium bibendum accumsan.",
            id: "1223333445",
            launch_site: {
              site_name_long: "LA",
            },
            links: {
              article_link: "/rea/",
              mission_patch: "ddd",
            },
            mission_name: "Andromeda",
          },
          {
            details:
              "Nam cursus felis a velit congue euismod. Ut a sagittis velit, vel rutrum diam. Sed pellentesque sollicitudin vehicula. Sed mollis sapien sed dapibus fringilla.",
            id: "1223333446",
            launch_site: {
              site_name_long: "TX",
            },
            links: {
              article_link: "/rea/",
              mission_patch: "ddd",
            },
            mission_name: "Artemis",
          },
        ],
        error: false,
      },
    };
  }
};

export default HomePage;
