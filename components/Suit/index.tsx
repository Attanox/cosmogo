import React from "react";

import { useCartId } from "hooks/cart.hooks";
import { useGetCartQuery } from "types/appTypes";
import { Customizer } from "./Customizer";
import Spinner from "components/Spinner";

export type TItems = {
  Suit_Base: string;
  Suit_Details: string;
};

const Suit = () => {
  const { cartId } = useCartId();

  const [items, setItems] = React.useState<TItems>();

  const { data: cartData, loading } = useGetCartQuery({
    variables: { id: cartId || "" },
    skip: !cartId,
    onCompleted(data) {
      const initItems = {
        Suit_Base: data?.cart?.suit?.baseColor as string,
        Suit_Details: data?.cart?.suit?.detailsColor as string,
      };
      setItems(initItems);
    },
  });

  if (!cartId || loading)
    return (
      <div className="flex h-full w-full mx-auto items-center justify-center">
        <div className="text-center text-large">
          <Spinner />
        </div>
      </div>
    );

  if (!cartData?.cart || !items) return null;

  return (
    <div className="flex h-full w-full mx-auto items-center justify-center">
      <Customizer cartId={cartId} initItems={items} />
    </div>
  );
};

export default Suit;
