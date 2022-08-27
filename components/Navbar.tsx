import React from "react";
import Link from "next/link";
import { useCartId } from "hooks/cart.hooks";
import { useGetCartQuery } from "types";

const GoToCart = () => {
  const { cartId } = useCartId();

  const { data: cartData, loading } = useGetCartQuery({
    variables: { id: cartId || "" },
    skip: !cartId,
  });

  if (!cartId || loading)
    return <div className="text-center text-large">Loading...</div>;

  if (!cartData?.cart) return null;

  return (
    <div className="indicator">
      <span className="indicator-item badge badge-primary">
        {cartData?.cart?.totalItems}
      </span>
      <Link href={"/cart"}>
        <a className="btn btn-accent">Cart 🛒</a>
      </Link>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="navbar w-full mx-auto px-5 rounded-md">
      <div className="navbar-center">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl text-white">
            Cosmogo 🌌
          </a>
        </Link>
      </div>
      <div className="ml-auto navbar-end">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl text-white">
            Launches 🚀
          </a>
        </Link>
        <div className="w-2" />
        <Link href="/suit">
          <a className="btn btn-ghost normal-case text-xl text-white">
            Suit 👩‍🚀
          </a>
        </Link>
        <div className="w-2" />
        <GoToCart />
      </div>
    </div>
  );
};

export default Navbar;
