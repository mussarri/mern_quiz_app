import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Result() {
  const result = useSelector((state) => state.questions.result);
  if (!result.length) return <Navigate to={"/"} />;
  else return <div>Result</div>;
}

export default Result;
