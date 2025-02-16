import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import store from "../../../redux/store";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = !!store.getState().users.user;
  const location = useLocation();

  // Allow access to the register page without authentication
  if (location.pathname === "/register") {
    return <>{children}</>;
  }

  // Allow access to the login page without authentication
  if (location.pathname === "/login") {
    return <>{children}</>;
  }

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
