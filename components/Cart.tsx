import React from "react";
import { useGetCartQuery } from "types";
import { useCartId } from "hooks/cart.hooks";

const Cart = () => {
  const { cartId } = useCartId();

  const { data: cartData, loading } = useGetCartQuery({
    variables: { id: cartId || "" },
    skip: !cartId,
  });

  if (!cartId || loading) return <div>Loading...</div>;

  if (!cartData?.cart) return null;

  return (
    <div className="grid">
      <div className="px-2 pb-2 w-full flex items-center">
        <span>
          Total: {cartData.cart.subTotal.formatted} ({cartData.cart.totalItems}{" "}
          items)
        </span>

        <div className="ml-auto">
          <div
            style={{ width: "fit-content" }}
            className="rounded-lg py-2 px-4 bg-primary text-white"
          >
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
        </div>
      </div>
      <div className="overflow-x-auto h-96 scrollbar">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Seats</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartData.cart.items.map((item, idx) => {
              return (
                <tr key={item.id}>
                  <th>{idx}</th>
                  <td>{item.name}</td>
                  <td>1</td>
                  <td>
                    <div className="flex items-center justify-end">
                      <button className="btn btn-sm btn-outline btn-circle btn-error">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
