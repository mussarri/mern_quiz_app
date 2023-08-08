import React, { useContext, useState } from "react";
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

import { UserContext } from "../App";
import { useLoginUserMutation } from "../redux/api";

function Register() {
  const [errors, setErrors] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { setUser } = useContext(UserContext);
  const [loginUser, result] = useLoginUserMutation();

  async function loginHandler(e) {
    if (!username || !password) {
      alert("please fill the form");
      return false;
    }
    const res = await loginUser({
      username,
      password,
    });
    if (res.data) {
      alert(`User logined succesfully`);
      setUser({
        username: res.data.isUser.username,
        role: res.data.isUser.role,
      });
    } else if (res.error) {
      setErrors(`${res.error.data}`);
    } else {
      alert("Something went wrong");
    }
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

        {result.isLoading ? (
          <Box height={200}>
            <p>Loading</p>
          </Box>
        ) : (
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
                type="password"
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
        )}
      </Paper>
    </Box>
  );
}

export default Register;
