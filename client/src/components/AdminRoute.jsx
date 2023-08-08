import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const AdminRoute = ({ isAdmin }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const lg = useMediaQuery("(min-width:1100px)");

  const [isOpen, setIsopen] = useState(lg ? true : false);

  const box = {
    borderRight: "1px solid grey",
    height: "100vh",
    overflowY: "scroll",
  };

  const handleClick = (link) => {
    navigate(link);
  };
  const handleOpen = () => {
    setIsopen(!isOpen);
  };

  if (!isAdmin) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <Box display={lg && "flex"} overflow="hidden">
      <Box
        sx={{ ...box, background: theme.palette.background.paper }}
        flex={lg && "0.16"}
        zIndex={2}
        display={!isOpen && "none"}
        position={lg ? "relative" : "absolute"}
      >
        {isOpen && (
          <Box sx={{ textAlign: "right" }}>
            <IconButton onClick={handleOpen}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick("/admin")}>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick("/admin/users")}>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick("/admin/quizzes")}>
              <ListItemText primary="Quizzes" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick("/")}>
              <ListItemText primary="Go home" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box flex={1} p={3} pt={5} sx={box} position="relative">
        {!isOpen && (
          <Box sx={{ position: "absolute", left: 0, top: 0 }}>
            <IconButton onClick={handleOpen}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminRoute;
