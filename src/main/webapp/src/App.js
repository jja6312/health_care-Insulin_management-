import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ErrorPage from "./components/ErrorPage";
import "./index.css";
import Main from "./pages/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
