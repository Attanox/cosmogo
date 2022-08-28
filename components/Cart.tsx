import React from "react";
import {
  GetCartDocument,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
} from "types/appTypes";
import { useCartId } from "hooks/cart.hooks";
import { debounce } from "ts-debounce";
import { removeCookies } from "cookies-next";
import Link from "next/link";
import { Dragon } from "types/spaceXTypes";

const RemoveCartItem = (props: { cartId: string; itemId: string }) => {
  const { cartId, itemId } = props;

  const [removeFromCart, { loading: removingFromCart }] =
    useRemoveFromCartMutation({
      refetchQueries: [GetCartDocument],
    });

  return (
    <div className="flex items-center justify-end">
      <button
        onClick={() =>
          removeFromCart({
            variables: { input: { id: itemId, cartId } },
          })
        }
        disabled={removingFromCart}
        className="btn btn-sm btn-outline btn-circle btn-error"
      >
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
  );
};

const SeatsCounter = (props: {
  dragons: Dragon[];
  cartId: string;
  itemId: string;
}) => {
  const { dragons, cartId, itemId } = props;

  const [selectedDragonId, setSelectedDragonId] = React.useState<string>(
    dragons[0].id as string
  );
  const [seats, setSeats] = React.useState<number>(1);

  const [updateCartItem, { loading: updatingCart }] = useUpdateCartMutation({
    refetchQueries: [GetCartDocument],
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSeatsChange = React.useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const seats = e.target.valueAsNumber;
      updateCartItem({
        variables: {
          input: {
            cartId,
            id: itemId,
            quantity: seats,
          },
        },
      });
    }, 500),
    []
  );

  const onCapsuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dragonId = e.target.value;
    setSelectedDragonId(dragonId);
    updateCartItem({
      variables: {
        input: {
          cartId,
          id: itemId,
          quantity: 1,
        },
      },
    });
    setSeats(1);
  };

  const selectedDragonCapacity =
    dragons.find((d) => d.id === selectedDragonId)?.crew_capacity || 0;

  return (
    <>
      <td>
        <select
          onChange={onCapsuleChange}
          className="select select-bordered w-full"
        >
          {dragons.map((dragon) => {
            return (
              <option key={dragon.id} value={dragon.id as string}>
                {dragon.name}
              </option>
            );
          })}
        </select>
      </td>
      <td>
        <input
          type="range"
          min={1}
          max={selectedDragonCapacity}
          value={seats}
          className="range range-xs range-accent"
          step={1}
          onChange={(e) => {
            onSeatsChange(e);
            setSeats(e.target.valueAsNumber);
          }}
          disabled={updatingCart}
        />
        <div className="w-full flex justify-between text-xs px-2">
          {[...Array(selectedDragonCapacity)].map((_, idx) => {
            return <span key={idx}>{idx + 1}</span>;
          })}
        </div>
      </td>
    </>
  );
};

const FinishOrder = (props: { cartId: string }) => {
  const { cartId } = props;

  const [finished, setFinished] = React.useState(false);

  const [deleteCart, { loading: deletingCart }] = useDeleteCartMutation({
    refetchQueries: [GetCartDocument],
  });

  if (finished)
    return <span className="badge badge-accent">Order done 🚀</span>;

  return (
    <button
      disabled={deletingCart}
      onClick={() => {
        deleteCart({
          variables: {
            input: {
              id: cartId,
            },
          },
        });
        removeCookies("cartId");
        setFinished(true);
        setTimeout(() => setFinished(false), 5000);
      }}
      className="btn btn-accent"
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
    </button>
  );
};

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
      <h2 className="text-white text-2xl text-center">
        Cart is empty. Go shop{" "}
        <Link href="/">
          <a className="link link-accent">launches</a>
        </Link>
      </h2>
    );
  }

  return (
    <div className="w-4/5 mx-auto bg-neutral flex flex-col p-2 gap-2 rounded-md">
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
            style={{ backgroundColor: cartData.cart.suit.baseColor }}
            className="w-6 h-6 rounded-md"
          />
        </div>
        <div className="w-5" />
        <div className="flex">
          <span>Details Color is </span>
          <div className="w-2" />
          <div
            style={{ backgroundColor: cartData.cart.suit.detailsColor }}
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
          <Link href="/suit">
            <a className="link">Don&apos;t forget to customize your suit!</a>
          </Link>
          <div className="w-2" />
          <FinishOrder cartId={cartId} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
