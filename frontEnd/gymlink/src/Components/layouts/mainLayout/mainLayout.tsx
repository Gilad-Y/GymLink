import { CssVarsProvider } from "@mui/joy";
import MainRoute from "../../routes/mainRoute/mainRoute";
import Menu from "../menu/menu";
import "./mainLayout.css";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function MainLayout(): JSX.Element {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <div className="mainLayout">
      {/* <header>
        <Header />
      </header> */}
      <menu className="menu">
        <Menu />
      </menu>
      <main>
        <MainRoute />
      </main>
    </div>
  );
}

export default MainLayout;
