import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useCart } from "lib/cart.client";
import type { GetStaticProps, NextPage } from "next";

type Launch = {
  details: string;
  id: string;
  mission_name: string;
  rocket: {
    rocket_name: string;
    rocket_type: string;
  };
  launch_date_local: string;
  launch_site: {
    site_name_long: string;
  };
  links: {
    article_link: string;
    video_link: string;
    mission_patch: string;
  };
};

interface LocalProps {
  launches: Launch[];
}

const Home: NextPage<LocalProps> = (props) => {
  const { launches } = props;
  const cart = useCart();

  return (
    <div className="w-1/2 mx-auto py-8 flex flex-col gap-4">
      {launches.map((l) => {
        const launchDate = new Date(l.launch_date_local);
        const launchDay = `${launchDate.getMonth()}/${launchDate.getDay()}/${launchDate.getFullYear()}`;

        return (
          <div key={l.id} className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{l.mission_name}</h2>
              <p>{l.details}</p>
              <div>
                Launching on: <b>{launchDay}</b> in{" "}
                <b>{l.launch_site.site_name_long}</b>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps: GetStaticProps<LocalProps> = async () => {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        launchNext {
          details
          id
          mission_name
          rocket {
            rocket_name
            rocket_type
          }
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            article_link
            mission_patch
          }
        }
      }
    `,
  });

  return {
    props: {
      launches: [data.launchNext],
    },
  };
};

export default Home;
