import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import img from "../components/choose.png";
import { useTheme } from "@emotion/react";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
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
        <Box display="flex" justifyContent="space-between" mt={1} pr={5}>
          <Box flex={2}>
            <Typography>Username</Typography>
            <Input mb={3} fullWidth />

            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
              >
                <MenuItem value="science">Science</MenuItem>
                <MenuItem value="spor">Spor</MenuItem>
                <MenuItem value="movies">Movies</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ marginTop: 3 }}>
              <FormLabel id="demo-radio-buttons-group-label">Time</FormLabel>
              <RadioGroup
                p
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel value="10m" control={<Radio />} label="10m" />
                <FormControlLabel value="20m" control={<Radio />} label="20m" />
                <FormControlLabel value="30m" control={<Radio />} label="30m" />
                <FormControlLabel value="1h" control={<Radio />} label="1h" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box flex={1} position="relative" px={2}>
            <Button
              endIcon={<SendIcon />}
              onClick={() => navigate("/quiz")}
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
