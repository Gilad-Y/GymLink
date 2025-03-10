import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { setCoachPass } from "../../../util/api";
import { useNavigate, useParams } from "react-router-dom";

const SetPasswordForCoach: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();
  const param = useParams();
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Call API to set new password for coach
    // Example: await api.setCoachPassword(password);
    setCoachPass(param.id, password)
      .then(() => {
        nav("/"); // Redirect to home page
        console.log("Password set successfully");
      })
      .catch((err) => {
        console.log("Error setting password", err);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", marginBottom: 2 }}>
        <Typography
          variant="h4"
          component="h2"
        >
          Set New Password for Coach
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          fullWidth
          required
          margin="normal"
        />
        {error && (
          <Typography
            color="error"
            variant="body2"
            sx={{ marginTop: 1 }}
          >
            {error}
          </Typography>
        )}
        <Box sx={{ marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Set Password
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default SetPasswordForCoach;
