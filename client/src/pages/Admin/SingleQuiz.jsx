import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleQuizQuery } from "../../redux/api";
import { Typography } from "@mui/material";

function SingleQuiz() {
  const { slug } = useParams();
  const { data } = useGetSingleQuizQuery();

  return <Typography variant="h3">Quiz {slug}</Typography>;
}

export default SingleQuiz;
