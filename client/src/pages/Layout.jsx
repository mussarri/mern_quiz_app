import * as React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import axios from "axios";
import { UserContext } from "../App";
import { useRefreshUserQuery } from "../redux/api";

export const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

function Layout() {
  const { setUser } = React.useContext(UserContext);

  const { data } = useRefreshUserQuery();
  console.log(data);

  const refreshUser = () =>
    setUser({
      username: data?.decoded.username,
      role: data?.decoded.role,
    });

  React.useEffect(() => {
    data && refreshUser();
  }, [data]);

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
