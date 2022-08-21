import React from "react";
import useSWR from "swr";

export const useCartId = () => {
  const { data: cartId } = useSWR<string>("/api/cart", async () => {
    const response = await fetch("/api/cart");
    const result = await response.json();
    return result.cartId;
  });

  return { cartId: cartId || "" };
};
