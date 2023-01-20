import { useTranslation } from "react-i18next";
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

const WIDTH = 240;

const MENU = [
  {
    icon: <AppRegistrationIcon sx={{ color: "white" }} />,
    text: "registrations",
    target: ""
  },
  {
    icon: <HubIcon sx={{ color: "white" }} />,
    text: "community",
    target: "community"
  },
];

const LeftNavbar = ({ user }) => {
  const { t } = useTranslation(null, { keyPrefix: "navbar" });
  return (
    <Drawer
      sx={{
        width: WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          justifyContent: "space-between",
          width: WIDTH,
          boxSizing: "border-box",
          backgroundColor: "#282525",
          color: "white"
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {MENU.map(({ text, icon, target }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton href={target}>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={t(text)} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <List>
        <Divider sx={{ backgroundColor: "white" }} />
        <ListItem key="user" disablePadding>
          <ProfileMenu avatar={`${user.firstname.charAt(0)}${user.lastname.charAt(0)}`} name={`${user.firstname ?? ""} ${user.lastname ?? ""}`} />
        </ListItem>
      </List>
    </Drawer>);
};


export default LeftNavbar;
