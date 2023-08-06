import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetSingleUserQuery, useGetUserResultsQuery } from "../../redux/api";
import { Typography } from "@mui/material";

function SingleQuiz() {
  const { username } = useParams();
  const location = useLocation();
  const { data: user } = useGetSingleUserQuery({ username: username });
  const { data: results } = useGetUserResultsQuery({ username: username });

  return <Typography variant="h4">SingleUser-{username}</Typography>;
}

export default SingleQuiz;
