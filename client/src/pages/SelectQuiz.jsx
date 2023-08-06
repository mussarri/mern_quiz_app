import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { useGetAllQuizQuery } from "../redux/api";
import { titleize } from "../utils/title";

function SelectQuiz() {
  const theme = useTheme();
  const [category, setCategory] = useState();
  const { data, isLoading } = useGetAllQuizQuery();
  const allQuiz =
    category && category !== "all"
      ? data?.allQuiz.filter((quiz) => quiz.category === category)
      : data?.allQuiz;

  const lineClamp = {
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  };

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
        <FormControl sx={{ width: 200, marginBottom: 2 }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem selected={category === "movies"} value="all">
              All
            </MenuItem>
            <MenuItem selected={category === "movies"} value="movies">
              Movies
            </MenuItem>
            <MenuItem selected={category === "religions"} value="religions">
              Religions
            </MenuItem>

            <MenuItem selected={category === "sicence"} value="science">
              Science
            </MenuItem>
            <MenuItem selected={category === "spor"} value="spor">
              Spor
            </MenuItem>
            <MenuItem selected={category === "technology"} value="technology">
              Technology
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={3}>
        {isLoading && "Loading"}
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
                style={{ aspectRatio: 1.5, objectFit: "contain" }}
                src={"http://localhost:4000/uploads/" + item.image}
                alt=""
              />
              <Typography
                style={lineClamp}
                fontWeight="bold"
                textAlign="right"
                mt={1}
              >
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
