import React from "react";
import { useGetCartQuery } from "types";
import useSWR from "swr";

const Cart = () => {
  const { data: cartId } = useSWR<string>("/api/cart", async () => {
    const response = await fetch("/api/cart");
    const result = await response.json();
    return result.cartId;
  });

  const { data: cartData, loading } = useGetCartQuery({
    variables: { id: cartId || "" },
    skip: !cartId,
  });

  if (!cartId || loading) return <div>Loading...</div>;

  if (!cartData?.cart) return null;

  return (
    <div
      style={{ width: "fit-content" }}
      className="relative rounded-lg py-2 px-4 bg-primary text-white"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2">
        {cartData.cart.totalItems}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-9"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    </div>
  );
};

export default Cart;
