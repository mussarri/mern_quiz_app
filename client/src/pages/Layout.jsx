import * as React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { UserContext } from "../App";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:4000",
});
function Layout() {

  const { setUser } = React.useContext(UserContext);
  
  React.useEffect(() => {
    async function refresh() {
      instance
        .get("/auth/refresh")
        .then(function (res) {
          // handle success
          setUser({
            username: res.data.decoded.username,
            role: res.data.decoded.role || "user",
          });
        })
        .catch(function (err) {
          // handle error
          // console.log(err);
        });
    }
    refresh();
  }, [setUser]);
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
          overflow: "scroll",
        }}
      >
        <Outlet />
      </main>
    </>
  );
}
export default Layout;
