import React from "react";
import { gql } from "@apollo/client";
import { type GetStaticProps, type NextPage } from "next";

import { getSpacexClient } from "lib/apollo.client";
import Cart from "components/Cart";
import Error from "components/Error";
import Suit from "components/Suit";
import type { Dragon } from "types/spaceXTypes";

interface LocalProps {
  dragons: Dragon[];
  error: boolean;
}

const CartPage: NextPage<LocalProps> = ({ dragons, error }) => {
  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className="h-20" />
      <Suit />
      <div className="h-8 sm:h-4" />
      <div className="flex h-full w-full items-center justify-center">
        <Cart dragons={dragons} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<LocalProps> = async () => {
  const client = getSpacexClient();

  try {
    const { data } = await client.query<LocalProps>({
      query: gql`
        query GetLaunches {
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
        error: true,
      },
    };
  }
};

export default CartPage;
