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

import { useNavigate } from "react-router-dom";
import { instance } from "./Layout";

function Register() {
  const [errors, setErrors] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  async function createPostHandler(e) {
    e.preventDefault();
    if (!username || !password || !email) {
      alert("please fill the form");
      return false;
    }
    instance
      .post("/auth/register", {
        username,
        email,
        password,
      })
      .then((res) => {
        setErrors();
        alert(`${res.data.username} registered succesfully`);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response);
        setErrors("Something went wrong.");
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
            sx={{ marginTop: 2, marginBottom: 2, width: "100%" }}
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
            <InputLabel>Email</InputLabel>
            <Input
              name="email"
              // placeholder="email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // type="email"
            />
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <InputLabel>Password</InputLabel>
            <Input
              name="password"
              // placeholder="password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            fullWidth
            variant="outlined"
            type="submit"
            sx={{ marginTop: 5 }}
            onClick={createPostHandler}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Register;
