import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import { StyledEngineProvider } from "@mui/joy";
import MainLayout from "./Components/layouts/mainLayout/mainLayout";
import "./index.css";
import { useMediaQuery } from "@mui/material";
import theme from "./theme/theme"; // Import your custom MUI Joy theme

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // const currentTheme = React.useMemo(() => {
  //   return {
  //     ...theme,
  //     colorSchemes: {
  //       ...theme.colorSchemes,
  //       light: {
  //         ...theme.colorSchemes.light,
  //         palette: {
  //           ...theme.colorSchemes.light.palette,
  //           mode: prefersDarkMode ? "dark" : "light",
  //         },
  //       },
  //     },
  //   };
  // }, [prefersDarkMode]);

  return (
    // <CssVarsProvider
    //   // theme={currentTheme}
    //   defaultMode="system"
    // >
    //   <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
    //   {/* </StyledEngineProvider>
    // </CssVarsProvider> */}
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
