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
import { useNavigate } from "react-router-dom";
import { useGetAllQuizQuery } from "../../redux/api";
import { titleize } from "../../utils/title";
import { instance } from "../Layout";

function Quizzes() {
  const navigate = useNavigate();
  const { data } = useGetAllQuizQuery();

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
    <Box>
      <Typography variant="h3">Quizzes</Typography>
      <Button
        onClick={() => navigate("/admin/createquiz")}
        color="primary"
        variant="filled"
        sx={{ mt: 2, mb: 2 }}
      >
        Create New Quiz
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Question Count</TableCell>
              <TableCell width={120} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.allQuiz.map((quiz, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="right">
                  <img
                    width={50}
                    src={"http://localhost:4000/uploads/" + quiz.image}
                    alt=""
                  />
                </TableCell>
                <TableCell align="right">{titleize(quiz.name)}</TableCell>
                <TableCell align="right">{titleize(quiz.category)}</TableCell>
                <TableCell align="right">{quiz.questions.length}</TableCell>
                <TableCell style={{ display: "flex" }} align="right">
                  <IconButton onClick={() => handleDelete(quiz.name)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Quizzes;
