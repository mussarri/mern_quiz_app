import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleUserQuery, useGetUserResultsQuery } from "../../redux/api";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { titleize } from "../../utils/title";

function SingleQuiz() {
  const { username } = useParams();
  const { data: user } = useGetSingleUserQuery({ username: username });
  const { data: results } = useGetUserResultsQuery({ username: username });
  console.log(!!user);
  console.log(results?.userResults);

  return (
    <Box>
      <Typography variant="h4">User-{username}</Typography>
      <Typography>Email: {user?.user[0].email}</Typography>
      <TableContainer sx={{ marginTop: 3 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Quiz Name</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Correct Count</TableCell>

              <TableCell align="right">Point </TableCell>

              <TableCell width={120} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results?.userResults.map((item, i) => (
              <TableRow>
                <TableCell>{i + 1}</TableCell>
                <TableCell align="right">
                  {titleize(item.quiz[0].name)}
                </TableCell>
                <TableCell align="right">
                  {titleize(item.quiz[0].category)}
                </TableCell>
                <TableCell align="right">{item.correctAnswer}</TableCell>

                <TableCell align="right">{item.totalPoint}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default SingleQuiz;
