import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createTheme } from "@mui/material/styles";

const LinkBehaviour = forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});

LinkBehaviour.displayName = "LinkBehaviour";

export default createTheme({
  components: {
    MuiMenuItem: {
      defaultProps: {
        component: LinkBehaviour,
      },
    },
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
  },
});
