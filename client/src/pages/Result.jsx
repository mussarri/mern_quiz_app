import React from "react";
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
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";

function Result() {


  return (
    <>
      <Typography mb={2}>Username </Typography>
      <Typography mb={2}>Category </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right"> No</TableCell>
              <TableCell align="right">True Answer</TableCell>
              <TableCell align="right">Your Answer</TableCell>
              <TableCell align="right">Point</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: 15,
                  fontWeight: "bolder",
                }}
              >
                Total Point:
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 15,
                  fontWeight: "bolder",
                }}
                align="right"
              >
          
          
              </TableCell>
            </TableRow>
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
