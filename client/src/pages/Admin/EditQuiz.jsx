import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleQuizQuery } from "../../redux/api";
import { instance } from "../Layout";

function SingleQuiz() {
  const { slug } = useParams();
  const { data } = useGetSingleQuizQuery();
  const handleUpdata = () => {
    instance
      .patch("admin/quizzes/" + slug + "/edit")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return <div>SingleQuiz</div>;
}

export default SingleQuiz;
