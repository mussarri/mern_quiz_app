import { createContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { ThemeProvider } from "@emotion/react";
import { light, dark } from "./theme.js";
import { createTheme } from "@mui/material";

import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz";
import Error from "./pages/404.jsx";
import Result from "./pages/Result";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SelectQuiz from "./pages/SelectQuiz";
import Profile from "./pages/Profile";

import AdminRoute from "./components/AdminRoute";
import AdminHome from "./pages/Admin/AdminPage";
import CreateQuiz from "./pages/Admin/CreateQuiz";
import Users from "./pages/Admin/Users";
import Quizzes from "./pages/Admin/Quizzes";
import SingleQuiz from "./pages/Admin/SingleQuiz";
import SingleUser from "./pages/Admin/SingleUser";

export const UserContext = createContext();

function App() {
  const mode = useSelector((state) => state.mode.value);
  const theme = createTheme(mode === "light" ? light : dark);

  const [user, setUser] = useState({ username: "", role: "" });

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
    document.body.style.color = theme.palette.text.primary;
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser }} setUser={setUser}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/admin/"
              element={<AdminRoute isAdmin={user.role === "admin"} />}
            >
              <Route index element={<AdminHome />} />
              <Route path="users" element={<Users />} />
              <Route path="user/:username" element={<SingleUser />} />
              <Route path="quizzes" element={<Quizzes />} />
              <Route path="quizzes/:slug" element={<SingleQuiz />} />
              <Route path="quizzes/:slug/edit" element={<SingleQuiz />} />
              <Route path="createquiz" element={<CreateQuiz />} />
            </Route>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="result" element={<Result />} />
              <Route path="quiz/:slug" element={<Quiz />} />
              <Route path="selectquiz" element={<SelectQuiz />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter> 
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
