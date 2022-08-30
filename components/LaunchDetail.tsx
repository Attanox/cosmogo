import React from "react";
import Image from "next/image";

import { useCartId } from "hooks/cart.hooks";
import AddToCart from "./AddToCart";
import type { Dragon, Launch } from "types/spaceXTypes";

const getSrc = (id: string) => {
  const IMGS = [
    "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=879&q=80",
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
    "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1375&q=80",
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=911&q=80",
    "https://images.unsplash.com/photo-1462332420958-a05d1e002413?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2107&q=80",
  ];

  const index = (id?.charCodeAt(id.length - 1) || 0) % IMGS.length;
  return IMGS[index];
};

const LaunchDetail = (props: {
  launch: Launch;
  dragons: Dragon[];
  display: "grid" | "list";
}) => {
  const { launch, dragons, display } = props;

  const { cartId } = useCartId();

  return (
    <div className="card w-full bg-primary shadow-xl image-full h-full">
      <figure>
        <Image
          src={getSrc(launch.mission_name as string)}
          alt="Space"
          layout="fill"
        />
      </figure>
      <div className="card-body text-white">
        <div className="card-actions justify-between">
          <h2 className="card-title min-h-[56px] items-start">
            {launch.mission_name}
          </h2>
          {display === "list" ? (
            <AddToCart cartId={cartId} launch={launch} dragons={dragons} />
          ) : null}
        </div>
        <p className="block mt-auto">
          Launching with rocket of type{" "}
          <span className="font-bold text-lg">
            {launch.rocket?.rocket_type}
          </span>
        </p>
        <div>
          Launching from{" "}
          <span className="font-bold text-lg">
            {launch?.launch_site?.site_name_long}
          </span>
        </div>
        <p>
          Additional info can be found{" "}
          <a className="link" href={String(launch.links?.article_link || "")}>
            here
          </a>
        </p>
        <div className="card-actions justify-end">
          {display === "grid" ? (
            <AddToCart cartId={cartId} launch={launch} dragons={dragons} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LaunchDetail;
