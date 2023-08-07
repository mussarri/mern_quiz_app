import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React, { useContext } from "react";
import img from "../components/choose.png";
import { useTheme } from "@emotion/react";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const lg = useMediaQuery("(min-width:1100px)");
  const md = useMediaQuery("(min-width:860px)");
  const sm = useMediaQuery("(min-width:500px)");
  const xs = useMediaQuery("(min-width:350px)");

  const buttonStyle = {
    borderRadius: 40,
    background: theme.palette.primary.main,
    fontWeight: "bolder",
    color: "#fff",
    padding: 10,
    marginLeft: 10,
    width: sm ? 150 : 130,
    fontSize: sm ? 20 : 17,
  };

  const handleStart = () => {
    navigate("/selectquiz");
  };

  const { user } = useContext(UserContext);

  return (
    <Box
      display={md ? "grid" : ""}
      gridTemplateColumns="repeat(2, 1fr)"
      sx={{ background: theme.palette.background.paper, overflowX: "hidden" }}
      borderRadius={4}
      height="100%"
    >
      <Box p={2} display={lg ? "flex" : ""} justifyContent={"center"}>
        <img
          src={img}
          alt=""
          width={lg ? "80%" : xs ? "400px" : "100%"}
          height="auto"
          style={{ margin: "50px auto" }}
        />
      </Box>
      <Box mt={md ? 3 : -1}>
        <Typography py={md ? 2 : 0} px={2} variant={md ? "h1" : "h3"}>
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
              style={buttonStyle}
            >
              Login
            </Button>
            <Button
              endIcon={<SendIcon />}
              onClick={() => navigate("/register")}
              style={buttonStyle}
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
