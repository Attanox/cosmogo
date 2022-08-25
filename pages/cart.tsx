import { gql } from "@apollo/client";
import Cart from "components/Cart";
import { getSpacexClient } from "lib/apollo.client";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { Dragon } from "types";

interface LocalProps {
  dragons: Dragon[];
}

const CartPage: NextPage<LocalProps> = ({ dragons }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Cart dragons={dragons} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<LocalProps> = async () => {
  const client = getSpacexClient();

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
    },
  };
};

export default CartPage;
