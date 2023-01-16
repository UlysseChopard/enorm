import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ open, severity = "info", msg }) {
  return (
      <Snackbar open={open} autoHideDuration={6000} >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
  );
}
