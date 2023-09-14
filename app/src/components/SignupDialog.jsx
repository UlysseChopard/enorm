import { Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

const SignupDialog = ({ onClose, open = true }) => {
  const { t } = useTranslation(null, { keyPrefix: "signup" });
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form method="POST" autoComplete="on">
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              required
              label={t("accessToken")}
              name="accessToken"
              type="text"
              fullWidth
            />
            <FormHelperText>{t("useMailToken")}</FormHelperText>
            <TextField
              required
              label={t("firstname")}
              name="firstname"
              fullWidth
            />
            <TextField
              required
              autoComplete="family-name"
              label={t("lastname")}
              name="lastname"
              fullWidth
            />
            <TextField
              required
              label={t("password")}
              name="password"
              type="password"
              autoComplete="new-password"
              fullWidth
            />
            <TextField
              required
              label={t("gender")}
              name="gender"
              autoComplete="sex"
              defaultValue="male"
              select
              fullWidth
            >
              <MenuItem value="male">{t("male")}</MenuItem>
              <MenuItem value="female">{t("female")}</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t("cancel")}</Button>
          <Button variant="contained" type="submit">
            {t("submit")}
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default SignupDialog;
