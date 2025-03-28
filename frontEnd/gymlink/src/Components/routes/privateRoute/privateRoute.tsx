import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import store from "../../../redux/store";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = !!store.getState().users.user;
  const location = useLocation();

  // Allow access to public routes like register and login
  if (location.pathname === "/register" || location.pathname === "/login") {
    return <>{children}</>;
  }

  // Allow access to /setPassword route without authentication
  if (location.pathname.startsWith("/setPassword/")) {
    return <>{children}</>;
  }

  // Redirect unauthorized users to login
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
