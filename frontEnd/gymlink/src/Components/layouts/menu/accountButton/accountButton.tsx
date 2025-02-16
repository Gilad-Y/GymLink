import "./accountButton.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/joy/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import store from "../../../../redux/store";
import { logOutUser } from "../../../../redux/usersReducer";

function AccountButton(): React.JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userName, setUser] = React.useState("");
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const user = state.users?.user;

      if (user && user.firstName && user.lastName) {
        setUser(user.firstName[0] + user.lastName[0]);
      } else {
        setUser(""); // Reset if user data is unavailable
      }
    });

    return () => unsubscribe();
  }, []);

  const logOut = () => {
    store.dispatch(logOutUser());
    handleClose();
  };

  return (
    <div className="accountButton">
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {userName ? (
              <Avatar
                color="primary"
                variant="soft"
              >
                {userName}
              </Avatar>
            ) : (
              <Avatar />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          {userName ? (
            <Avatar
              color="primary"
              variant="soft"
            >
              {userName}
            </Avatar>
          ) : (
            <Avatar />
          )}
          פרופיל
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {userName ? (
            <Avatar
              color="primary"
              variant="soft"
            >
              {userName}
            </Avatar>
          ) : (
            <Avatar />
          )}
          המשתמש שלי
        </MenuItem>
        <Divider />
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          התנתק
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AccountButton;
