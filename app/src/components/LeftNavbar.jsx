import { useTranslation } from "react-i18next";
import Drawer from "@mui/material/Drawer";
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import PersonIcon from "@mui/icons-material/Person2";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import HubIcon from '@mui/icons-material/Hub';
import SettingsIcon from '@mui/icons-material/Settings';

const WIDTH = 240;

const MENU = [
  {
    icon: <PersonIcon  sx={{ color: "white" }} />,
    text: "profile",
  },
  {
    icon: <AppRegistrationIcon sx={{ color: "white" }} />,
    text: "registrations",
  },
  {
    icon: <HubIcon sx={{ color: "white" }} />,
    text: "community",
  },
  {
    icon: <SettingsIcon sx={{ color: "white" }} />,
    text: "settings",
  }
];

const LeftNavbar = ({ user }) => {
  const { t } = useTranslation(null, { keyPrefix: "navbar" });
  return (
    <Drawer
      sx={{
        width: WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: WIDTH,
          boxSizing: "border-box",
          backgroundColor: "#282525",
          color: "white"
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Stack direction="row" spacing={2}>
          <AccountCircleIcon />
          <Typography>
            {user ? `${user?.firstname} ${user?.lastname}` : "USER XXX"}
          </Typography>
        </Stack>
      </Toolbar>
      <Divider sx={{ backgroundColor: "white" }} />
      <List>
        {MENU.map(({ text, icon }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton href={text}>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={t(text)} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Drawer>);
};


export default LeftNavbar;
