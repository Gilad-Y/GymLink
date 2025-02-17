import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./page404.css";

function Page404(): React.JSX.Element {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container
      component="main"
      className="page404"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
        >
          404
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
        >
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
        >
          It looks like the page you are trying to access is not available.
          Please check the URL or go back to the homepage.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          sx={{ mt: 3 }}
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
}

export default Page404;
