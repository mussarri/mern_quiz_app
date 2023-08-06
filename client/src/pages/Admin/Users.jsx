import React from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetAllUsersQuery } from "../../redux/api";
import { Link } from "react-router-dom";
import { instance } from "../Layout";

function Users() {
  const { data, error } = useGetAllUsersQuery();
  console.log(error);
  const handleDelete = (name) => {
    instance
      .delete("admin/quizzes/" + name)
      .then((res) => {
        alert("Quiz deleted");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Typography mb={3} variant="h3">
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">User Results</TableCell>

              <TableCell width={120} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.allUsers.map((item, i) => (
              <TableRow>
                <TableCell>{i + 1}</TableCell>
                <TableCell align="right">{item.username}</TableCell>
                <TableCell align="right">{item.email}</TableCell>
                <TableCell align="right">{item.role}</TableCell>

                <TableCell align="right">
                  <Link to={"/admin/user/" + item.username}>Results</Link>
                </TableCell>

                <TableCell style={{ display: "flex" }} align="right">
                  <IconButton onClick={() => handleDelete(item.username)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Users;
