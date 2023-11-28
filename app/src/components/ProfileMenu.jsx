import * as React from "react";
import { useTranslation } from "react-i18next";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";

export default function ProfileMenu({ pathname, name, avatar }) {
  const { t } = useTranslation(null, { keyPrefix: "profileMenu" });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="Account settings">
        <Button
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              color: "#e7f1fc",
              backgroundColor: "#a2a9b0",
            }}
          >
            {avatar}
          </Avatar>
          <Typography sx={{ color: "#041b32" }}>{name}</Typography>
        </Button>
      </Tooltip>
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
            "&:before": {
              content: "\"\"",
              display: "block",
              position: "absolute",
              left: 0,
              bottom: "15%",
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateX(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <ListItem selected={pathname === "/profile"} disablePadding>
          <ListItemButton to="profile">
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            <ListItemText primary={t("profile")} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem selected={pathname === "/"} disablePadding>
          <ListItemButton to="">
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("settings")} />
          </ListItemButton>
        </ListItem>
        <ListItem selected={pathname === "/logout"} disablePadding>
          <ListItemButton to="logout">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t("logout")} />
          </ListItemButton>
        </ListItem>
      </Menu>
    </>
  );
}
