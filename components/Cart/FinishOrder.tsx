import React from "react";
import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";

import { GetCartDocument, useDeleteCartMutation } from "types/appTypes";

const FinishOrder = (props: { cartId: string }) => {
  const { cartId } = props;
  const router = useRouter();

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
        setTimeout(() => {
          setFinished(false);
          router.push("/");
        }, 5000);
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

export default FinishOrder;
