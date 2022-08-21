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

const Home: NextPage<LocalProps> = (props) => {
  const { launches, dragons } = props;

  return (
    <div className="grid grid-cols-2 h-screen py-2 gap-4">
      <div className="max-h-full h-fit w-full p-2 ml-2 grid gap-4 scrollbar overflow-y-auto bg-neutral rounded-lg">
        {launches.map((l) => (
          <LaunchDetail
            key={`${l.id}-${l.mission_name}`}
            l={l}
            dragons={dragons}
          />
        ))}
      </div>
      <div className="w-full max-h-screen pr-2 flex flex-col gap-2">
        <div className="bg-neutral rounded-lg py-6 px-2 h-full flex-1">
          <Cart />
        </div>
        <div className="bg-neutral rounded-lg py-6 px-2 h-full flex-1">
          <Customizer
            onChange={(current, color) => console.log({ current, color })}
            initialColors={{
              Suit_Base: "#ffffff",
              Suit_Details: "#ffffff",
            }}
          />
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
      dragons: data.dragons.filter((d) => !!d.crew_capacity),
    },
  };
};

export default Home;
