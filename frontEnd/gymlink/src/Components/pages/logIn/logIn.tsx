import "./logIn.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useForm } from "react-hook-form";
import { UserModel } from "../../../models/userModel";
import axios from "axios";
import store from "../../../redux/store";
import { logInUser } from "../../../redux/usersReducer";
import { useNavigate } from "react-router-dom";

function LogIn(): JSX.Element {
  const nav = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<UserModel>();
  const logUser = (data: UserModel) => {
    document.body.style.cursor = "wait";
    console.log(data);
    axios
      .post("http://localhost:4000/api/v1/user/logUser", data)
      .then((res) => {
        console.log(res.data);
        store.dispatch(logInUser(res.data));
        nav("/");
      })
      .catch((err: any) => {
        console.log(err);
        console.log("not correct");
      })
      .finally(() => {
        document.body.style.cursor = "default";
      });
  };
  return (
    <div className="logIn">
      <Container component="main">
        <Box
          sx={{
            marginTop: 8,
          }}
        >
          <Grid container>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage:
                  "url(https://trainstationgym.co.za/wp-content/uploads/2021/06/Banner-pic-2.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h1>התחבר</h1>
                <form onSubmit={handleSubmit(logUser)}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="אימייל"
                    autoComplete="email"
                    autoFocus
                    {...register("email")}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="סיסמא"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("_userPass")}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="זכור אותי"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    התחבר
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        שכחתי סיסמא
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"אין לי משתמש"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default LogIn;
