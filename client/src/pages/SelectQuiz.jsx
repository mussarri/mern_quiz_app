import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import img from "../components/choose.png";
import { useTheme } from "@emotion/react";
import SendIcon from "@mui/icons-material/Send";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllQuizQuery } from "../redux/api";
import { titleize } from "../utils/title";

function SelectQuiz() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const { data } = useGetAllQuizQuery();
  const allQuiz = data?.allQuiz;

  const user = useSelector((state) => state.user.user);

  return (
    <Box
      sx={{ background: theme.palette.background.paper }}
      borderRadius={4}
      position="relative"
      height="75vh"
      overflow="scroll"
      paddingX={3}
    >
      <Box mt={3} display="flex" justifyContent="space-between">
        <Typography variant="h4">Select Quiz</Typography>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem selected={category === "sicence"} value="science">
              Science
            </MenuItem>
            <MenuItem selected={category === "spor"} value="spor">
              Spor
            </MenuItem>
            <MenuItem selected={category === "movies"} value="movies">
              Movies
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gridAutoRows={200}
        gap={2}
      >
        {allQuiz?.map((item, i) => (
          <Link to={"/quiz/" + item.name}>
            <Box
              sx={{
                background: theme.palette.background.default,
                borderRadius: 3,
                p: 2,
              }}
            >
              <img
                width="100%"
                style={{ aspectRatio: 4 / 3 }}
                src={"http://localhost:4000/uploads/" + item.image}
                alt=""
              />
              <Typography fontWeight="bold" textAlign="right" mt={1}>
                {titleize(item.name)}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
}

export default SelectQuiz;
