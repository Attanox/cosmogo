import React from "react";
import {
  Dragon,
  Launch,
  GetCartDocument,
  useAddToCartMutation,
  useGetCartQuery,
} from "types/appTypes";

const AddToCart = (props: {
  cartId: string;
  launch: Launch;
  dragons: Dragon[];
}) => {
  const { cartId, dragons, launch } = props;

  const { data: cartData, loading } = useGetCartQuery({
    variables: { id: cartId || "" },
    skip: !cartId,
  });

  const [addToCart, { loading: addingItem, error }] = useAddToCartMutation({
    refetchQueries: [GetCartDocument],
  });

  const itemInCart = cartData?.cart?.items.some(
    (i) => i.name === launch.mission_name
  );

  const [added, setAdded] = React.useState(false);

  if ((added || itemInCart) && !addingItem && !loading) {
    return <span className="badge badge-accent">In cart</span>;
  }

  return (
    <button
      className={`btn btn-sm btn-accent gap-2 ${
        addingItem || loading ? "loading" : ""
      }`}
      disabled={addingItem || loading}
      onClick={() => {
        try {
          addToCart({
            variables: {
              input: {
                cartId,
                id: launch.id as string,
                name: launch.mission_name as string,
                details: "",
                capsule: {
                  crew_capacity: dragons[0].crew_capacity as number,
                  description: dragons[0].description as string,
                  id: dragons[0].id as string,
                  name: dragons[0].name as string,
                },
              },
            },
          });
          setAdded(true);
        } catch (e) {
          console.error(e);
        }
      }}
    >
      Add
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </button>
  );
};

export default AddToCart;
