import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="flex flex-col  items-center w-full min-h-screen">
      <div className="w-full px-2 sm:px-0 sm:w-11/12 fixed z-10 top-0">
        <Navbar />
      </div>

      <div className="w-full px-2 sm:px-0 sm:w-11/12 relative z-0 flex-grow flex flex-col justify-center items-center">
        {children}
      </div>

      <footer className="w-full static py-1 bottom-0 bg-base-content text-white text-center">
        <span>Made with ❤</span>
      </footer>
    </div>
  );
};

export default Layout;
