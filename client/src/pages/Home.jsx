import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import img from "../components/choose.png";
import { useTheme } from "@emotion/react";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/selectquiz");
  };

  const { user } = useContext(UserContext);

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
        {user.username ? (
          <Box display="flex" justifyContent="center" mt={3} pr={5}>
            <Box px={2}>
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
                }}
              >
                Start
              </Button>
            </Box>
          </Box>
        ) : (
          <Box p={2} mt={3}>
            <Button
              endIcon={<SendIcon />}
              onClick={() => navigate("/login")}
              style={{
                borderRadius: 40,
                background: theme.palette.primary.main,
                width: 150,
                fontWeight: "bolder",
                fontSize: 20,
                color: "#fff",
                padding: 10,
              }}
            >
              Login
            </Button>
            <Button
              endIcon={<SendIcon />}
              onClick={() => navigate("/register")}
              style={{
                borderRadius: 40,
                background: theme.palette.primary.main,
                width: 200,
                fontWeight: "bolder",
                fontSize: 20,
                color: "#fff",
                padding: 10,
                marginLeft: 10,
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Home;
