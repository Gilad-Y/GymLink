import { createTheme, Theme } from "@mui/material/styles";

const theme: Theme = createTheme({
  palette: {
    mode: "light", // Default to light mode
    primary: {
      main: "#1976d2", // Set the color for primary
    },
    secondary: {
      main: "#90caf9", // Set the color for secondary
    },
  },
});

export default theme;
