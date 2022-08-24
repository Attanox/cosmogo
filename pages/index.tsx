import React from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Cart from "components/Cart";
import { Customizer } from "components/Customizer";
import LaunchDetail from "components/LaunchDetail";
import type { GetServerSideProps, NextPage } from "next";
import { Dragon, Launch } from "types";

interface LocalProps {
  launches: Launch[];
  dragons: Dragon[];
}

const Heading = ({ children }: React.PropsWithChildren<{}>) => (
  <h1 className="heading text-center text-white text-2xl tracking-wide capitalize">
    {children}
  </h1>
);

const Home: NextPage<LocalProps> = (props) => {
  const { launches, dragons } = props;

  return (
    <div className="grid grid-cols-2 h-screen py-2 gap-4">
      <div className="max-h-full h-fit w-full p-2 ml-2 grid gap-4 scrollbar overflow-y-auto bg-neutral rounded-lg">
        <div className="w-full h-1" />
        <Heading>Pick your launches</Heading>
        <div className="w-full h-1" />
        {launches.map((launch) => (
          <LaunchDetail
            key={`${launch.id}-${launch.mission_name}`}
            launch={launch}
            dragons={dragons}
          />
        ))}
      </div>
      <div className="w-full max-h-screen pr-2 flex flex-col gap-2">
        <div className="bg-neutral rounded-lg py-6 px-2 h-full flex-1">
          <Heading>Pick your suit colors</Heading>
          <Customizer />
        </div>
        <div className="bg-neutral rounded-lg py-6 px-2 h-full flex-1">
          <Heading>Get the experience of a lifetime</Heading>
          <Cart dragons={dragons} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<LocalProps> = async () => {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

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

export default Home;
