import { Box } from "@mui/material";
import React from "react";
import { UserContext } from "../App";
import { useGetSingleUserQuery } from "../redux/api";

function Profile() {
  const { user } = React.useContext(UserContext);
  const { data } = useGetSingleUserQuery({ username: user.username });

  return <Box>Profile</Box>;
}

export default Profile;
