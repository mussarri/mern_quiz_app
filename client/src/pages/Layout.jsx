import * as React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <main
        style={{
          padding: 10,
          maxWidth: 1100,
          margin: "40px auto",
          width: "100%",
          height: "100%",
          overflow: "scroll"
        }}
      >
        <Outlet />
      </main>
    </>
  );
}
export default Layout;
