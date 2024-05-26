import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ErrorPage from "./components/ErrorPage";
import "./index.css";
import Main from "./pages/Main";
import useDarkMode from "./utils/darkMode/useDarkMode";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  useDarkMode();

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<Main />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
