import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useState } from "react";
import store from "../../redux/store";
import { logInUser } from "../../redux/usersReducer";
import { useNavigate } from "react-router-dom";

const OAuth: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const nav = useNavigate();
  // Google Login Success Handler
  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    const { credential } = credentialResponse;

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/google-login", // Ensure this matches your backend
        { token: credential },
        { withCredentials: true } // Important for session cookies
      );

      setUser(response.data.user); // Assuming backend sends user data
      console.log("User logged in:", response.data);
      localStorage.setItem("token", response.data.token);

      store.dispatch(logInUser(response.data.user));
      nav("/");
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login failed:", error);
    }
  };

  // Google Login Failure Handler
  const handleGoogleLoginFailure = () => {
    setError("Google Login failed");
    console.error("Google Login failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLoginSuccess}
      onError={handleGoogleLoginFailure}
    />
  );
};

export default OAuth;
