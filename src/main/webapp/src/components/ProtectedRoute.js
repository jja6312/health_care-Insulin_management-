import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import checkSession from "../api/checkSession";

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const validateSession = async () => {
      const isValid = await checkSession(); // http://.../api/check-session 발사!

      setIsAuthenticated(isValid);
    };

    validateSession();
  }, []);

  if (isAuthenticated === null) {
    return <div className="min-h-screen dark:bg-dark">화면 이동중...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
