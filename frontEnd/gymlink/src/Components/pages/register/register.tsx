import "./register.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { useForm } from "react-hook-form";
import { UserModel } from "../../../models/userModel";
import store from "../../../redux/store";

import { useNavigate } from "react-router-dom";
import registerPic from "../../media/teamSukar.jpeg";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";
import bcrypt from "bcryptjs"; // Import bcryptjs
import { registerUser } from "../../../util/api"; // Import the registerUser function
import { logInUser } from "../../../redux/usersReducer";

function Register(): React.JSX.Element {
  const nav = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserModel>();

  const registerNewUser = async (data: UserModel) => {
    data.role = "admin";
    console.log(data);
    document.body.style.cursor = "wait";
    try {
      // Hash the password before sending it to the backend
      const hashedPassword = await bcrypt.hash(data._password, 10);
      data._password = hashedPassword;

      const res = await registerUser(data); // Use the registerUser function
      store.dispatch(logInUser(res));
      nav("/");
    } catch (err) {
      console.log(err);
      console.log("Registration failed");
    } finally {
      document.body.style.cursor = "default";
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="register">
      <Container
        component="main"
        sx={{
          height: "100vh", // Ensure full viewport height for the container
          overflowY: "hidden", // Enable vertical scrolling for the entire container
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Column for small screens, row for larger screens
            width: "100%",
            maxWidth: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Left Side (Image) */}
          <Box
            sx={{
              backgroundImage: `url(${registerPic})`,
              backgroundSize: "cover", // Ensures the image covers the container
              backgroundPosition: "center", // Ensures the image stays centered
              height: { xs: "200px", sm: "750px" }, // 200px height for xs screens, auto for larger screens
              // width: "70%", // Full width on all screen sizes
              // minWidth: "500px",
              width: { xs: "509px", sm: "70%" },
              borderRadius: "8px",
              minHeight: "200px", // Prevents the image from becoming too small
            }}
          />

          {/* Right Side (Form) */}
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: { xs: "100%", sm: "80%", md: "50%" },
              borderRadius: "8px",
              minWidth: "320px", // Ensures usability on small screens
              height: "auto", // Let the height adjust dynamically based on content
              maxHeight: "90vh", // Ensure that Paper height is limited and doesn't go beyond viewport
              overflowY: "auto", // Enable vertical scrolling for Paper content if needed
            }}
          >
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>הרשמה</h1>
            <form
              onSubmit={handleSubmit(registerNewUser)}
              style={{
                width: "100%",
                maxWidth: "600px", // Ensure form is not too wide
                minWidth: "320px", // Ensures usability on small screens
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "16px",
                boxSizing: "border-box",
                height: "auto", // Let the form height adjust dynamically
              }}
            >
              <FormControl
                sx={{ width: "100%" }}
                variant="outlined"
              >
                <InputLabel htmlFor="firstName">*שם פרטי</InputLabel>
                <OutlinedInput
                  label="שם פרטי"
                  required
                  fullWidth
                  id="firstName"
                  autoComplete="firstName"
                  autoFocus
                  {...register("firstName")}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                />
              </FormControl>

              <FormControl
                sx={{ width: "100%" }}
                variant="outlined"
              >
                <InputLabel htmlFor="lastName">*שם משפחה</InputLabel>
                <OutlinedInput
                  label="שם משפחה"
                  required
                  fullWidth
                  id="lastName"
                  autoComplete="lastName"
                  {...register("lastName")}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                />
              </FormControl>

              <FormControl
                sx={{ width: "100%" }}
                variant="outlined"
              >
                <InputLabel htmlFor="email">*אימייל</InputLabel>
                <OutlinedInput
                  label="אימייל"
                  required
                  fullWidth
                  id="email"
                  autoComplete="email"
                  {...register("email")}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                />
              </FormControl>

              <FormControl
                sx={{ width: "100%" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  *סיסמא
                </InputLabel>
                <OutlinedInput
                  {...register("_password")}
                  required
                  fullWidth
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                />
              </FormControl>

              <FormControl
                sx={{ width: "100%" }}
                variant="outlined"
              >
                <InputLabel htmlFor="brandName">*שם מותג</InputLabel>
                <OutlinedInput
                  label="שם מותג"
                  required
                  fullWidth
                  id="brandName"
                  autoComplete="brandName"
                  {...register("brand.name")}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                />
              </FormControl>

              <FormControl
                sx={{ width: "100%" }}
                variant="outlined"
              >
                <InputLabel htmlFor="brandImage">*תמונת מותג</InputLabel>
                <OutlinedInput
                  label="תמונת מותג"
                  fullWidth
                  id="brandImage"
                  autoComplete="brandImage"
                  {...register("brand.image")}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                />
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                  />
                }
                label="אני מסכים לתנאים"
                sx={{ alignSelf: "flex-start" }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#00796b",
                  "&:hover": {
                    backgroundColor: "#004d40",
                  },
                }}
              >
                הירשם
              </Button>

              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
              >
                <Link
                  href="/"
                  variant="body2"
                >
                  יש לי כבר משתמש
                </Link>
                <Link
                  href="#"
                  variant="body2"
                >
                  שכחתי סיסמא
                </Link>
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default Register;
