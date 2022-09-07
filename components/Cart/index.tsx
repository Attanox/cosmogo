import React from "react";
import Link from "next/link";
import { useGetCartQuery } from "types/appTypes";
import type { Dragon } from "types/spaceXTypes";
import { useCartId } from "hooks/cart.hooks";
import SeatsCounter from "./SeatsCounter";
import RemoveCartItem from "./RemoveCartItem";
import FinishOrder from "./FinishOrder";
import Spinner from "components/Spinner";

const Cart = (props: { dragons: Dragon[] }) => {
  const { cartId } = useCartId();

  const { data: cartData, loading } = useGetCartQuery({
    variables: { id: cartId || "" },
    skip: !cartId,
  });

  if (!cartId || loading)
    return (
      <div className="text-center text-large">
        <Spinner />
      </div>
    );

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
    <div className="w-full mx-auto bg-base-100 shadow-md flex flex-col py-0 sm:py-2 gap-2 mb-2 rounded-md">
      <div className="overflow-x-auto max-h-96 flex-grow scrollbar">
        <table className="w-full flex sm:table flex-row flex-no-wrap sm:bg-white">
          <thead className="hidden sm:table-header-group">
            <tr className="flex flex-col flex-no wrap sm:table-row">
              <th
                style={{ background: "#181A2A" }}
                className="text-white rounded-tl-sm"
              ></th>
              <th style={{ background: "#181A2A" }} className="text-white">
                Name
              </th>
              <th
                style={{ background: "#181A2A" }}
                className="text-white text-center"
              >
                Capsule
              </th>
              <th
                style={{ background: "#181A2A" }}
                className="text-white text-center"
              >
                Seats
              </th>
              <th
                style={{ background: "#181A2A" }}
                className="text-white rounded-tr-sm"
              ></th>
            </tr>
          </thead>
          <thead className="sm:hidden bg-neutral rounded-tl-sm text-white">
            {cartData.cart.items.map((item) => {
              return (
                <tr
                  className="flex flex-col flex-no wrap sm:table-row"
                  key={`heading-${item.id}`}
                >
                  <th className="h-14 px-4 text-center flex items-center">
                    Name
                  </th>
                  <th className="h-14 px-4 text-center flex items-center">
                    Capsule
                  </th>
                  <th className="h-14 px-4 text-center flex items-center">
                    Seats
                  </th>
                  <th className="h-14 px-4 "></th>
                </tr>
              );
            })}
          </thead>
          <tbody className="flex-1 sm:flex-none">
            {cartData.cart.items.map((item, idx) => {
              return (
                <tr
                  className="flex flex-col px-2 sm:px-0 flex-no wrap sm:table-row"
                  key={item.id}
                >
                  <th className="h-14 sm:h-full hidden sm:table-cell">{idx}</th>
                  <td className="h-14 sm:h-full flex sm:table-cell items-center">
                    {item.name}
                  </td>

                  <SeatsCounter
                    dragons={props.dragons}
                    itemId={item.id}
                    cartId={cartId}
                  />

                  <td className="h-14 sm:h-full flex sm:table-cell items-center justify-end">
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
            className="w-6 h-6 rounded-sm border-neutral border"
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
            className="w-6 h-6 rounded-sm border-neutral border"
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
