import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { getCartId } from "lib/cart.client";
import type { GetServerSideProps, NextPage } from "next";
import { useGetCartQuery } from "types";

interface LocalProps {
  launches: string[];
  cartId: string;
}

const Home: NextPage<LocalProps> = (props) => {
  const { launches, cartId } = props;
  const { data } = useGetCartQuery({ variables: { id: cartId } });

  return (
    <h1 className="text-3xl font-bold underline">
      <pre>{JSON.stringify(launches)}</pre>
    </h1>
  );
};

export const getServerSideProps: GetServerSideProps<LocalProps> = async ({
  req,
  res,
}) => {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        launchesPast(limit: 10) {
          id
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            article_link
            video_link
            mission_patch
          }
          rocket {
            rocket_name
          }
        }
      }
    `,
  });

  return {
    props: {
      launches: data.launchesPast,
      cartId: getCartId({ req, res }),
    },
  };
};

export default Home;
