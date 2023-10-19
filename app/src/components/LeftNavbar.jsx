import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useResolvedPath } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Menu from "@mui/material/Menu";
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
import MenuBookIcon from "@mui/icons-material/MenuBook";

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
  {
    icon: <MenuBookIcon />,
    text: "administration",
    target: "organisation",
    menu: ["organisation", "members", "establishments"],
  },
];

const NavBarItem = ({ text, icon, target, pathname, menu }) => {
  const { t } = useTranslation(null, { keyPrefix: "navbar" });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const selected = target
    ? new RegExp(target).test(pathname)
    : pathname === "/";
  const listItemProps = menu
    ? {
        onClick: (e) => setAnchorEl(e.currentTarget),
        id: `${target}-btn`,
        "aria-controls": open ? `${target}-menu` : null,
        "aria-haspopup": true,
        "aria-expanded": open ?? null,
        href: pathname,
      }
    : { href: target };

  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{
          "&.Mui-selected, &.Mui-selected:hover": {
            backgroundColor: "#0a4987",
          },
          "&:hover": {
            backgroundColor: "#a2a9b0",
          },
        }}
        selected={selected}
        {...listItemProps}
      >
        <ListItemIcon
          sx={{
            color: selected ? "#e7f1fc" : "#108bdc",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={t(text)}
          sx={{
            color: selected ? "#e7f1fc" : "inherit",
          }}
        />
      </ListItemButton>
      {menu && (
        <Menu
          id={`${target}-menu`}
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          MenuListProps={{ "arial-labelledby": `${target}-btn` }}
        >
          {menu.map((name) => {
            const selected = new RegExp(`${target}/${name}`).test(pathname);
            return (
              <ListItem key={name} selected={selected} disablePadding>
                <ListItemButton href={`${target}/${name}`}>
                  {t(name)}
                </ListItemButton>
              </ListItem>
            );
          })}
        </Menu>
      )}
    </ListItem>
  );
};

const LeftNavbar = ({ user }) => {
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
        {MENU.map(({ text, icon, target, menu }) => {
          return (
            <NavBarItem
              key={target}
              text={text}
              icon={icon}
              target={target}
              pathname={pathname}
              menu={menu}
            />
          );
        })}
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
