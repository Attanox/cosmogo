import React from "react";
import Link from "next/link";
import { useCartId } from "hooks/cart.hooks";
import { useGetCartQuery } from "types/appTypes";
import Spinner from "./Spinner";

const GoToCart = () => {
  const { cartId } = useCartId();

  const { data: cartData, loading } = useGetCartQuery({
    variables: { id: cartId || "" },
    skip: !cartId,
  });

  if (!cartId || loading)
    return (
      <div className="text-center text-large">
        <Spinner />
      </div>
    );

  if (!cartData?.cart) return null;

  return (
    <div className="indicator">
      <span className="indicator-item badge badge-primary">
        {cartData?.cart?.totalItems}
      </span>
      <Link href={"/cart"}>
        <a className="btn btn-accent">
          <span className="hidden sm:inline">Complete order</span> 🛒
        </a>
      </Link>
    </div>
  );
};

const useScrolledOnTop = () => {
  const [onTop, setOnTop] = React.useState(true);

  React.useEffect(() => {
    const onScroll = () => {
      const offsetTop = window.scrollY;
      if (offsetTop === 0) {
        setOnTop(true);
      } else {
        setOnTop(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { onTop };
};

const Navbar = () => {
  const { onTop } = useScrolledOnTop();

  return (
    <div
      className={`navbar w-full mx-auto px-5 py-4 rounded-none transition-colors ease-in-out delay-150 rounded-b-md bg-base-100 ${
        onTop ? "" : "shadow-md"
      }`}
    >
      <div className="navbar-center">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">Cosmogo 🌌</a>
        </Link>
      </div>
      <div className="ml-auto navbar-end">
        {/* <Link href="/#launches">
          <a className="btn btn-ghost normal-case text-xl">Launches 🚀</a>
        </Link>
        <div className="w-2" />
        <Link href="/suit">
          <a className="btn btn-ghost normal-case text-xl">Suit 👩‍🚀</a>
        </Link> */}
        <div className="w-2" />
        <GoToCart />
      </div>
    </div>
  );
};

export default Navbar;
