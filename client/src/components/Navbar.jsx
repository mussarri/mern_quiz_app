import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import QuizIcon from "@mui/icons-material/Quiz";
import { useTheme } from "@emotion/react";
import { DarkModeOutlined } from "@mui/icons-material";
import { Avatar, Menu, MenuItem, Tooltip, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setMode } from "../redux/modeSlice";
import { instance } from "../pages/Layout";
import { UserContext } from "../App";

function Navbar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleLogout = async () => {
    console.log("click");
    instance
      .get("/auth/logout")
      .then((res) => {
        console.log(res);
        // dispatch(setUser({}));
      })
      .catch((err) => console.log(err));
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const sm = useMediaQuery("(min-width:500px)");

  return (
    <AppBar position="static" sx={{ boxShadow: theme.shadows[6] }}>
      <Container style={{ maxWidth: 1150, padding: sm ? "0 30px" : "0 10px" }}>
        <Toolbar
          disableGutters
          display="flex"
          alignItems="center"
          gap={1}
          style={{ justifyContent: "space-between" }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <QuizIcon sx={{ mr: 1 }} />
            <Link to={"/"}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
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

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              sx={{ marginRight: 2 }}
              onClick={() => dispatch(setMode())}
            >
              <DarkModeOutlined />
            </IconButton>

            <>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src=""
                    sx={{ background: theme.palette.primary.main }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Link
                    style={{ width: "100%" }}
                    to={"/admin"}
                    textAlign="center"
                  >
                    Admin
                  </Link>
                </MenuItem>

                <MenuItem>
                  <Link
                    style={{ width: "100%" }}
                    to={"/profile"}
                    textAlign="center"
                  >
                    Profile
                  </Link>
                </MenuItem>

                <MenuItem onClick={() => handleLogout()}>
                  <Link textAlign="center">Logout</Link>
                </MenuItem>
              </Menu>
            </>

            <>
              <Link style={{ marginRight: 10 }} to={"/login"}>
                Login
              </Link>
              <Link to={"/register"}>Register</Link>
            </>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
