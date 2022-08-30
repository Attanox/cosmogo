import { Customizer } from "components/Customizer";
import { useCartId } from "hooks/cart.hooks";
import { type GetStaticProps } from "next";
import React from "react";
import { useGetCartQuery } from "types/appTypes";

export type TItems = {
  Suit_Base: string;
  Suit_Details: string;
};

interface LocalProps {}

const SuitPage = (props: LocalProps) => {
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
      <div className="flex h-full w-4/5 mx-auto items-center justify-center">
        <div className="text-center text-large">Loading...</div>;
      </div>
    );

  if (!cartData?.cart || !items) return null;

  return (
    <div className="flex h-full w-4/5 mx-auto items-center justify-center">
      <Customizer cartId={cartId} initItems={items} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<LocalProps> = async () => {
  return {
    props: {},
  };
};

export default SuitPage;
