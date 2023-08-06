import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import {  Outlet, useNavigate } from "react-router-dom";

const AdminRoute = ({ isAdmin }) => {
  const navigate = useNavigate();

  const box = {
    borderRight: "1px solid grey",
    height: "100vh",
    overflowY: "scroll",
  };

  const handleClick = (link) => {
    navigate(link);
  };

  return (
    <Box display="grid" gridTemplateColumns="1fr 5fr" overflow="hidden">
      <Box sx={box}>
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
      <Box p={3} sx={box}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminRoute;
