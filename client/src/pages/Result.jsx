import React, { useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useGetSingleQuizAnswersQuery } from "../redux/api";
import { instance } from "./Layout";

function Result() {
  const result = useSelector((state) => state.result);
  const { data } = useGetSingleQuizAnswersQuery({ slug: result.quizName });
  const questions = data?.quiz?.questions;

  useEffect(() => {
    instance
      .post("quiz/result", result)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [result]);

  const { correctAnswer, totalPoint } = useMemo(() => {
    let correctAnswer = 0;
    let totalPoint = 0;
    questions?.forEach((current, i) => {
      if (current.true === +result.answers[i]) {
        totalPoint += (100/questions.length);
        correctAnswer++;
      }
    });
    return { correctAnswer, totalPoint };
  }, [questions, result.answers]);


  if (!result.quizName) return <Navigate to={"/"} />;

  return (
    <>
      <Box display="flex" flexWrap="wrap" gap={3}>
        <Typography mb={2}>
          Username:<b> {result.username}</b>{" "}
        </Typography>
        <Typography mb={2}>
          Quiz Name: <b>{result.quizName}</b>{" "}
        </Typography>
        <Typography mb={2}>
          Correct Count: <b> {correctAnswer}</b>{" "}
        </Typography>
        <Typography mb={2}>
          Question Count: <b> {questions?.length}</b>
        </Typography>
        <Typography mb={2}>
          Total Point: <b> {totalPoint}</b>
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Question</TableCell>
              <TableCell align="right">Correct Answer</TableCell>
              <TableCell align="right">User Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions?.map((question, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="right">{question.desc || "-"}</TableCell>
                <TableCell align="right">{question.main}</TableCell>
                <TableCell align="right">
                  {question.options[question.true]}
                </TableCell>
                <TableCell
                  style={{
                    color:
                      question.true !== +result.answers[i] ? "#ff3636" : "",
                  }}
                  align="right"
                >
                  {question.options[result.answers[0]]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Link to={"/"} style={{ float: "right", marginTop: 10 }}>
        <Button color="primary" variant="outlined">
          RESTART
        </Button>
      </Link>
    </>
  );
}

export default Result;
