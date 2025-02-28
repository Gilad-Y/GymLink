import "./logIn.css";
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
import { logInUser as logInUserAction } from "../../../redux/usersReducer";
import { useNavigate } from "react-router-dom";
import logIngPic from "../../media/teamSukar.jpeg";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { logInUser } from "../../../util/api"; // Import the logInUser function from api.ts
import OAuth from "../../oAuth/oauth";

function LogIn(): React.JSX.Element {
  const [statusCode, setStatus] = useState<number | undefined>(undefined);
  const nav = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserModel>();

  const logUser = (data: UserModel) => {
    console.log(data);
    document.body.style.cursor = "wait";
    logInUser(data.email, data._password)
      .then((res) => {
        store.dispatch(logInUserAction(res));
        nav("/");
      })
      .catch((err: any) => {
        console.log(err.status);
        setStatus(err.status);
        setTimeout(() => {
          setStatus(undefined);
        }, 5000);
      })
      .finally(() => {
        document.body.style.cursor = "default";
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="logIn">
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
              backgroundImage: `url(${logIngPic})`,
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
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>התחבר</h1>
            {/* <Stack
              sx={{ width: "100%" }}
              spacing={2}
            >
              {statusCode == 401 && (
                <Alert
                  variant="filled"
                  severity="warning"
                >
                  Email or password is incorrect
                </Alert>
              )}
              {statusCode !== 401 && !!statusCode && (
                <Alert
                  variant="filled"
                  severity="error"
                >
                  This is an info Alert.
                </Alert>
              )}
            </Stack> */}
            <form
              onSubmit={handleSubmit(logUser)}
              style={{ width: "100%" }}
            >
              <Stack
                sx={{ width: "100%" }}
                spacing={2}
              >
                {statusCode == 401 && (
                  <Alert
                    variant="filled"
                    severity="warning"
                  >
                    Email or password is incorrect
                  </Alert>
                )}
                {statusCode !== 401 && !!statusCode && (
                  <Alert
                    variant="filled"
                    severity="error"
                  >
                    This is an info Alert.
                  </Alert>
                )}
              </Stack>
              <FormControl
                sx={{
                  m: 1,
                  width: "100%",
                }}
                variant="outlined"
              >
                <InputLabel
                  htmlFor="email"
                  sx={{ color: "black" }}
                >
                  *אימייל
                </InputLabel>
                <OutlinedInput
                  label="אימייל"
                  required
                  fullWidth
                  id="email"
                  autoComplete="email"
                  autoFocus
                  {...register("email")}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    color: "black",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
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
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  sx={{ color: "black" }}
                >
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
                        sx={{ color: "black" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    color: "black",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
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
                label="זכור אותי"
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
                התחבר
              </Button>
              <OAuth />
              <Box
                display="flex"
                justifyContent="space-between"
              >
                <Link
                  href="#"
                  variant="body2"
                >
                  שכחתי סיסמא
                </Link>
                <Link
                  href="/register"
                  variant="body2"
                >
                  {"אין לי משתמש"}
                </Link>
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default LogIn;
