import React, { useEffect, useState } from "react";
import { useMediaQuery, createTheme, ThemeProvider } from "@mui/material";
import MainRoute from "../../routes/mainRoute/mainRoute";
import Menu from "../menu/menu";
import "./mainLayout.css";
import store from "../../../redux/store";

function MainLayout(): React.JSX.Element {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  // const theme = createTheme({
  //   palette: { mode: prefersDarkMode ? "dark" : "light" },
  //   shape: { borderRadius: 8 },
  // });

  const [userId, setId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setId(store.getState().users.user?._id || null);
    });
    return () => unsubscribe();
  }, []);

  return (
    // <ThemeProvider theme={theme}>
    <div className={`mainLayout ${userId ? "" : "centered"}`}>
      {userId && (
        <div className="menu">
          <Menu />
        </div>
      )}
      <main>
        <MainRoute />
      </main>
    </div>
    // </ThemeProvider>
  );
}

export default MainLayout;
