import { useTranslation } from "react-i18next";
import Drawer from "@mui/material/Drawer";
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const WIDTH = 240;

const MENU = ["profile", "registrations", "community", "parameters"];

const LeftNavbar = () => {
  const { t } = useTranslation(null, { keyPrefix: "navbar" });
  return (
    <Drawer
      sx={{
        width: WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        USER XXX
      </Toolbar>
      <Divider />
      <List>
        {MENU.map(text => (
            <ListItem key={text} disablePadding>
              <ListItemButton href={text}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary={t(text)} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Drawer>);
};


export default LeftNavbar;
