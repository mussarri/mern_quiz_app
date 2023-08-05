import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { light, dark } from "./theme.js";
import { createTheme } from "@mui/material";
import { useEffect } from "react";
import Quiz from "./pages/Quiz";
import Error from "./pages/404.jsx";
import Result from "./pages/Result";
import CreateQuiz from "./pages/CreateQuiz";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SelectQuiz from "./pages/SelectQuiz";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const mode = useSelector((state) => state.mode.value);

  const user = useSelector((state) => state.user.user);
  console.log(user);

  const theme = createTheme(mode === "light" ? light : dark);

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
    document.body.style.color = theme.palette.text.primary;
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="admin"
              element={
                <ProtectedRoute
                  redirectPath="/"
                  isAllowed={true}
                >
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="/quiz/:slug" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/createquiz" element={<CreateQuiz />} />

            <Route path="/selectquiz" element={<SelectQuiz />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
