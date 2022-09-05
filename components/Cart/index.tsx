import React from "react";
import Link from "next/link";
import { useGetCartQuery } from "types/appTypes";
import type { Dragon } from "types/spaceXTypes";
import { useCartId } from "hooks/cart.hooks";
import SeatsCounter from "./SeatsCounter";
import RemoveCartItem from "./RemoveCartItem";
import FinishOrder from "./FinishOrder";

const Cart = (props: { dragons: Dragon[] }) => {
  const { cartId } = useCartId();

  const { data: cartData, loading } = useGetCartQuery({
    variables: { id: cartId || "" },
    skip: !cartId,
  });

  if (!cartId || loading)
    return <div className="text-center text-large">Loading...</div>;

  if (!cartData?.cart) return null;

  if (!cartData.cart.totalItems) {
    return (
      <h2 className="text-2xl text-center">
        Cart is empty. Go shop{" "}
        <Link href="/">
          <a className="link link-accent">launches</a>
        </Link>
      </h2>
    );
  }

  return (
    <div className="w-full mx-auto bg-base-100 shadow-md flex flex-col p-2 gap-2 rounded-md">
      <div className="overflow-x-auto max-h-96 flex-grow scrollbar">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th className="text-center">Capsule</th>
              <th className="text-center">Seats</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartData.cart.items.map((item, idx) => {
              return (
                <tr key={item.id}>
                  <th>{idx}</th>
                  <td>{item.name}</td>

                  <SeatsCounter
                    dragons={props.dragons}
                    itemId={item.id}
                    cartId={cartId}
                  />

                  <td>
                    <RemoveCartItem itemId={item.id} cartId={cartId} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-auto p-2 w-full flex items-center justify-center">
        <div className="flex items-center">
          <span>Base Color is </span>
          <div className="w-2" />
          <div
            style={{
              backgroundColor: cartData.cart.suit?.baseColor || "transparent",
            }}
            className="w-6 h-6 rounded-md"
          />
        </div>
        <div className="w-5" />
        <div className="flex">
          <span>Details Color is </span>
          <div className="w-2" />
          <div
            style={{
              backgroundColor:
                cartData.cart.suit?.detailsColor || "transparent",
            }}
            className="w-6 h-6 rounded-md"
          />
        </div>
      </div>
      <div className="p-2 w-full flex items-center">
        <span>
          Total:{" "}
          <span className="font-bold text-lg">
            {cartData.cart.subTotal.formatted}
          </span>{" "}
          ({cartData.cart.totalItems} items)
        </span>

        <div className="ml-auto flex items-center">
          <FinishOrder cartId={cartId} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
