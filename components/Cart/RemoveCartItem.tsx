import { GetCartDocument, useRemoveFromCartMutation } from "types/appTypes";

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

export default RemoveCartItem;
