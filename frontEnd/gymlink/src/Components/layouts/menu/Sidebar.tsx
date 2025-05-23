import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar } from "./utils";
import store from "../../../redux/store";
import { logOutUser } from "../../../redux/usersReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { UserModel } from "../../../models/userModel";
import axios from "axios";
import ExtensionIcon from "@mui/icons-material/Extension";
import Badge from "@mui/material/Badge";
function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);

  return (
    <>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </>
  );
}

const logOut = async () => {
  try {
    await axios.get("http://localhost:4000/auth/logout", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the token here
      },
    });

    // Clear the token from the frontend (localStorage)
    localStorage.removeItem("token");
    store.dispatch(logOutUser());

    console.log("User logged out successfully");
  } catch (err) {
    console.error("Error during logout:", err);
  }
};

export default function Sidebar() {
  const nav = useNavigate();
  const location = useLocation();
  const [user, setUser] = React.useState<UserModel | null>(
    store.getState().users.user
  );
  const [currentLocation, setCurrentLocation] = React.useState<string>(
    location.pathname.split("/")[1]
  );

  React.useEffect(() => {
    setCurrentLocation(location.pathname.split("/")[1]);
    setUser(store.getState().users.user); // Update user on route change
  }, [location]);

  const routes = {
    payments: "/update/payments",
    mission: "/update/missions",
    weights: "/update/weight",
    program: "/update/program",
    trainee: "/update/newTrainee",
  } as const; // using `as const` to ensure the keys are treated as literal types.

  const navToPage = (item: string) => {
    // Assert the string is one of the valid keys
    const route = routes[item as keyof typeof routes];
    nav(route);
  };

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100vh",
        width: "var(--Sidebar-width)",
        top: 0,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
        paddingBottom: 0,
        padding: "10px",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Typography level="title-lg">
          {user ? `${user.brand.name}` : ""}
        </Typography>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>

      <>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Search"
        />
        <Box
          sx={{
            minHeight: 0,
            overflow: "hidden auto",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            [`& .${listItemButtonClasses.root}`]: {
              gap: 1.5,
            },
          }}
        >
          <List
            size="sm"
            sx={{
              gap: 1,
              "--List-nestedInsetStart": "30px",
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
            }}
          >
            <ListItem>
              <ListItemButton
                selected={currentLocation === ""}
                onClick={() => nav("/")}
              >
                <DashboardRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Dashboard</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                selected={currentLocation === "calendar"}
                onClick={() => nav("/calendar")}
              >
                <CalendarMonthIcon />
                <ListItemContent>
                  <Typography level="title-sm">calendar</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                selected={currentLocation === "orders"}
                onClick={() => nav("/extensions")}
              >
                {/* need to put badge */}
                <ExtensionIcon />
                <ListItemContent>
                  <Typography level="title-sm">extensions</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            {user?.role === "admin" && (
              <ListItem nested>
                <Toggler
                  renderToggle={({ open, setOpen }) => (
                    <ListItemButton onClick={() => setOpen(!open)}>
                      <GroupRoundedIcon />
                      <ListItemContent>
                        <Typography level="title-sm">admin menu</Typography>
                      </ListItemContent>
                      <KeyboardArrowDownIcon
                        sx={{ transform: open ? "rotate(180deg)" : "none" }}
                      />
                    </ListItemButton>
                  )}
                >
                  <List sx={{ gap: 0.5 }}>
                    <ListItem>
                      <ListItemButton onClick={() => nav("/coaches")}>
                        נהל מאמנים
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Toggler>
              </ListItem>
            )}
          </List>

          <List
            size="sm"
            sx={{
              mt: "auto",
              flexGrow: 0,
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
              "--List-gap": "8px",
              mb: 2,
            }}
          >
            <ListItem>
              <ListItemButton onClick={() => nav("/support")}>
                <SupportRoundedIcon />
                תמיכה
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => nav("/settings")}>
                <SettingsRoundedIcon />
                הגדרות
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />
          <br />
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Avatar
              color="primary"
              variant="soft"
            >
              {user ? `${user.firstName[0]}${user.lastName[0]}` : ""}
            </Avatar>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography level="title-sm">
                {user ? `${user.firstName} ${user.lastName}` : ""}
              </Typography>
            </Box>
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              onClick={logOut}
            >
              <LogoutRoundedIcon />
            </IconButton>
          </Box>
          <br />
        </Box>
      </>
    </Sheet>
  );
}
