import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar w-4/5 mx-auto bg-neutral">
      <div className="navbar-center">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl text-white">
            Cosmogo 🚀
          </a>
        </Link>
      </div>
      <div className="ml-auto navbar-end">
        <Link href="/suit">
          <a className="btn btn-ghost normal-case text-xl text-white">
            Suit 👩‍🚀
          </a>
        </Link>
        <div className="w-2" />
        <Link href={"/cart"}>
          <a className="btn btn-accent">Cart 🛒</a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
