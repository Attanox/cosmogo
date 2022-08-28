import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="fixed z-10 w-full top-0">
        <Navbar />
      </div>

      <div className="relative z-0 flex-grow flex flex-col justify-center items-center">
        {children}
      </div>

      <footer className="w-full static py-1 bottom-0 bg-neutral text-white text-center">
        <span>Made with ❤</span>
      </footer>
    </div>
  );
};

export default Layout;
