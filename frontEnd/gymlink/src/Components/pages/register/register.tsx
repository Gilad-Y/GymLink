import "./register.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Alert, Container, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { UserModel } from "../../../models/userModel";
import store from "../../../redux/store";
import { addUser } from "../../../redux/usersReducer";
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
      store.dispatch(addUser(res));
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
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "80vh",
            width: "150vh",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          {/* Left Side (Image) */}
          <Box
            sx={{
              backgroundImage: `url(${registerPic})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              flex: 1,
              borderRadius: "8px",
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
              flex: 1,
              height: "100%",
              borderRadius: "8px",
            }}
          >
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>הרשמה</h1>
            {/* <Stack
              sx={{ width: "100%" }}
              spacing={2}
            >
              <Alert severity="success">This is a success Alert.</Alert>
              <Alert severity="info">This is an info Alert.</Alert>
            </Stack> */}
            <form
              onSubmit={handleSubmit(registerNewUser)}
              style={{ width: "100%" }}
            >
              <FormControl
                sx={{
                  m: 1,
                  width: "100%",
                }}
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
                sx={{
                  m: 1,
                  width: "100%",
                }}
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
                sx={{
                  m: 1,
                  width: "100%",
                }}
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
                sx={{
                  m: 1,
                  width: "100%",
                }}
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
                sx={{
                  m: 1,
                  width: "100%",
                }}
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
                sx={{
                  m: 1,
                  width: "100%",
                }}
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
                sx={{ alignSelf: "flex-start", marginLeft: "10px" }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
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
              >
                <Link
                  href="#"
                  variant="body2"
                >
                  יש לי כבר משתמש
                </Link>
                <Link
                  href="#"
                  variant="body2"
                >
                  {"שכחתי סיסמא"}
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
