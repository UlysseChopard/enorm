import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createTheme } from "@mui/material/styles";

const LinkBehaviour = forwardRef((props, ref) => {
  const { href, ...other } = props;
  return href ? (
    <RouterLink ref={ref} to={href} style={{ color: "initial" }} {...other} />
  ) : (
    <a ref={ref} style={{ color: "initial" }} {...other} />
  );
});

LinkBehaviour.displayName = "LinkBehaviour";

export default createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour,
      },
    },
    MuiListItemButton: {
      defaultProps: {
        component: LinkBehaviour,
      },
    },
    MuiListItem: {
      defaultProps: {
        component: LinkBehaviour,
      },
    },
  },
});
