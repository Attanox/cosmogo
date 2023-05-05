import React from "react";
import { gql } from "@apollo/client";
import { type GetStaticProps, type NextPage } from "next";

import { getClient } from "lib/apollo.client";
import Cart from "components/Cart";
import Error from "components/Error";
import Suit from "components/Suit";
import type { Dragon } from "types/spaceXTypes";
import { useGetDragonsQuery } from "types/appTypes";
import Spinner from "components/Spinner";

const CartPage = () => {
  const dragons = useGetDragonsQuery();
  if (dragons.error) {
    return <Error />;
  }
  if (dragons.loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="h-20" />
      <Suit />
      <div className="h-8 sm:h-4" />
      <div className="flex h-full w-full items-center justify-center">
        {dragons.data ? <Cart dragons={dragons.data?.dragons} /> : null}
      </div>
    </>
  );
};

export default CartPage;
