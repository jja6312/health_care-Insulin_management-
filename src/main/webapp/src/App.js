import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ErrorPage from "./components/ErrorPage";
import "./index.css";
import Main from "./pages/Main";
import useDarkMode from "./utils/darkMode/useDarkMode";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import Admin2 from "./pages/Admin2";

function App() {
  useDarkMode();

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<Main />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin2" element={<Admin2 />} />
    </Routes>
  );
}

export default App;
