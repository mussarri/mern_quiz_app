import React, { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { instance } from "./Layout";

function Register() {
  const [errors, setErrors] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function loginHandler(e) {
    e.preventDefault();
    if (!username || !password) {
      alert("please fill the form");
      return false;
    }
    instance
      .post("/auth/login", {
        username,
        password,
      })
      .then((res) => {
        alert(`User logined succesfully`);
        dispatch(
          setUser({
            username: res.data.isUser.username,
            role: res.data.isUser.role,
          })
        );
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) setErrors("Invalid credentials");
          else setErrors(err.response.data);
        }
      });
  }

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Avatar sx={{ width: 100, height: 100 }}>
          <PeopleAltIcon sx={{ width: 70, height: 70 }} />
        </Avatar>

        {errors && (
          <Alert
            severity="error"
            variant="outlined"
            sx={{ marginTop: 2, width: "100%" }}
          >
            {errors}
          </Alert>
        )}

        <form style={{ width: "100%" }} onSubmit={false}>
          <FormControl required fullWidth margin="normal">
            <InputLabel>Username</InputLabel>
            <Input
              name="username"
              // placeholder="username *"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl required fullWidth margin="normal">
            <InputLabel>Password</InputLabel>
            <Input
              name="password"
              // placeholder="password *"
              // type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            fullWidth
            variant="outlined"
            type="submit"
            sx={{ marginTop: 5 }}
            onClick={loginHandler}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Register;
