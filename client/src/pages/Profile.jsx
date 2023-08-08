import React from "react";
import { UserContext } from "../App";
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
import { useGetSingleUserQuery, useGetUserResultsQuery } from "../redux/api";
import { titleize } from "../utils/title";

function Profile() {
  const { user } = React.useContext(UserContext);

  const { data: userData } = useGetSingleUserQuery({ username: user.username });
  const { data: results } = useGetUserResultsQuery({ username: user.username });

  return (
    <Box>
      <Typography variant="h4">User-{user.username}</Typography>
      <Typography>Email: {userData?.user[0].email}</Typography>
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

export default Profile;
