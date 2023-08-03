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
import { useNavigate } from "react-router-dom";

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [category, setCategory] = useState();


  const handleStart = () => {
    if (!username || !category) {
      alert("please fill the form");
      return false;
    }
   
    navigate("/quiz");
  };
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(2, 1fr)"
      sx={{ background: theme.palette.background.paper }}
      borderRadius={4}
      height="100%"
    >
      <Box p={2} display="flex" justifyContent={"center"}>
        <img
          src={img}
          alt=""
          width="80%"
          height="auto"
          style={{ margin: "50px auto" }}
        />
      </Box>
      <Box mt={3}>
        <Typography p={2} variant="h1">
          Welcome to our quiz app !
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={3} pr={5}>
          <Box flex={2}>
            <Typography>Username</Typography>
            <Input
              mb={3}
              fullWidth
              onChange={(e) => setUsername(e.target.value)}
            />

            <FormControl fullWidth sx={{ marginTop: 3 }}>
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

            {/* <FormControl sx={{ marginTop: 3 }}>
              <FormLabel id="demo-radio-buttons-group-label">Time</FormLabel>
              <RadioGroup
                p
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={(e) => setTime(e.target.value)}
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  selected={time === 10}
                  value={10}
                  control={<Radio />}
                  label="10m"
                />
                <FormControlLabel
                  selected={time === 20}
                  value={20}
                  control={<Radio />}
                  label="20m"
                />
                <FormControlLabel
                  selected={time === 30}
                  value={30}
                  control={<Radio />}
                  label="30m"
                />
                <FormControlLabel
                  selected={time === 60}
                  value={60}
                  control={<Radio />}
                  label="1h"
                />
              </RadioGroup>
            </FormControl> */}
          </Box>
          <Box flex={1} position="relative" px={2}>
            <Button
              endIcon={<SendIcon />}
              onClick={handleStart}
              style={{
                borderRadius: 100,
                background: theme.palette.primary.main,
                width: 130,
                height: 130,
                fontWeight: "bolder",
                fontSize: 20,
                color: "#fff",
                position: "absolute",
                top: "50%",
                right: "50%",
                transform: "translate(60%, -50%)",
              }}
            >
              Start
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
