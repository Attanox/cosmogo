import { useCartId } from "hooks/cart.hooks";
import Image from "next/image";
import React from "react";
import { Dragon, GetCartDocument, Launch, useAddToCartMutation } from "types";

const getSrc = (id: string) => {
  const IMGS = [
    "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=879&q=80",
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
    "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1375&q=80",
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=911&q=80",
    "https://images.unsplash.com/photo-1462332420958-a05d1e002413?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2107&q=80",
  ];

  const index = (id?.charCodeAt(0) || 0) % IMGS.length;
  return IMGS[index];
};

const LaunchDetail = (props: { l: Launch; dragons: Dragon[] }) => {
  const { l, dragons } = props;

  const { cartId } = useCartId();

  const [addToCart, { loading }] = useAddToCartMutation({
    refetchQueries: [GetCartDocument],
  });

  const launchDate = new Date(Date.now() + Math.random() * 500);
  const launchDay = `${
    launchDate.getMonth() + 1
  }/${launchDate.getDate()}/${launchDate.getFullYear()}`;

  return (
    <div className="card w-full bg-primary shadow-xl image-full h-fit">
      <figure>
        <Image src={getSrc(l.mission_name)} alt="Space" layout="fill" />
      </figure>
      <div className="card-body text-white">
        <div className="card-actions justify-between">
          <h2 className="card-title">{l.mission_name}</h2>
          <button
            className={`btn btn-sm btn-primary gap-2 ${
              loading ? "loading" : ""
            }`}
            onClick={() => {
              try {
                addToCart({
                  variables: {
                    input: {
                      cartId,
                      id: l.id,
                      name: l.mission_name,
                      details: l.details,
                      capsule: {
                        crew_capacity: dragons[0].crew_capacity,
                        description: dragons[0].description,
                        id: dragons[0].id,
                        name: dragons[0].name,
                      },
                    },
                  },
                });
              } catch (e) {
                console.log(e);
              }
            }}
          >
            Add
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>
        <p>{l.details}</p>
        <div>
          Launching on: <b>{launchDay}</b> in{" "}
          <b>{l.launch_site.site_name_long}</b>
        </div>
      </div>
    </div>
  );
};

export default LaunchDetail;
