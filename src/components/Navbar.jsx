import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import QuizIcon from "@mui/icons-material/Quiz";
import { useTheme } from "@emotion/react";
import { DarkModeOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "../redux/modeSlice";
import { Link } from "react-router-dom";

function Navbar() {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <AppBar position="static" sx={{ boxShadow: theme.shadows[6], px: 10 }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          display="flex"
          alignItems="center"
          gap={1}
          style={{ justifyContent: "space-between" }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <QuizIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Link to={"/"}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Quiz App
              </Typography>
            </Link>
          </Box>

          <IconButton onClick={() => dispatch(setMode())}>
            <DarkModeOutlined />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
