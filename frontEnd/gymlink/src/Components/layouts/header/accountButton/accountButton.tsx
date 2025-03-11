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
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const [avatarText, setAvatarText] = React.useState<string | null>(null);
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

      if (user) {
        if (user.profile) {
          setAvatarUrl(
            `http://localhost:4000/upload/${user._id}/profile/${user.profile}`
          );
          setAvatarText(null); // Reset initials if image exists
        } else if (user.firstName && user.lastName) {
          setAvatarUrl(null);
          setAvatarText(user.firstName[0] + user.lastName[0]);
        } else {
          setAvatarUrl(null);
          setAvatarText(null);
        }
      } else {
        setAvatarUrl(null);
        setAvatarText(null);
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
            <Avatar src={avatarUrl || undefined}>
              {!avatarUrl && avatarText}
            </Avatar>
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
          <Avatar src={avatarUrl || undefined}>
            {!avatarUrl && avatarText}
          </Avatar>
          פרופיל
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar src={avatarUrl || undefined}>
            {!avatarUrl && avatarText}
          </Avatar>
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
