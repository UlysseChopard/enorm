import { useTranslation } from "react-i18next";
import { useResolvedPath } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HubIcon from "@mui/icons-material/Hub";
import ProfileMenu from "@/components/ProfileMenu";
import GroupsIcon from "@mui/icons-material/Groups";
import GridViewIcon from "@mui/icons-material/GridView";

const WIDTH = 240;

const MENU = [
  {
    icon: <GridViewIcon />,
    text: "dashboard",
    target: "",
  },
  {
    icon: <HubIcon />,
    text: "community",
    target: "subscriptions",
  },
  {
    icon: <GroupsIcon />,
    text: "groups",
    target: "groups",
  },
  {
    icon: <AppRegistrationIcon />,
    text: "registrations",
    target: "registrations",
  },
];

const LeftNavbar = ({ user }) => {
  const { t } = useTranslation(null, { keyPrefix: "navbar" });
  const { pathname } = useResolvedPath();
  return (
    <Drawer
      sx={{
        width: WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          justifyContent: "space-between",
          width: WIDTH,
          boxSizing: "border-box",
          backgroundColor: "#e7f1fc",
          color: "#041b32",
        },
      }}
      variant="permanent"
      elevation={24}
    >
      <List disablePadding>
        {MENU.map(({ text, icon, target }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{
                "&.Mui-selected, &.Mui-selected:hover": {
                  backgroundColor: "#0a4987",
                },
                "&:hover": {
                  backgroundColor: "#a2a9b0",
                },
              }}
              href={target}
              selected={pathname === `/${target}`}
            >
              <ListItemIcon
                sx={{
                  color: pathname === `/${target}` ? "#e7f1fc" : "#108bdc",
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={t(text)}
                sx={{
                  color: pathname === `/${target}` ? "#e7f1fc" : "inherit",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <Divider sx={{ borderColor: "#e7f1fc" }} />
        <ListItem key="user" disablePadding>
          <ProfileMenu
            pathname={pathname}
            avatar={`${user.firstname.charAt(0)}${user.lastname.charAt(0)}`}
            name={`${user.firstname ?? ""} ${user.lastname ?? ""}`}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default LeftNavbar;
