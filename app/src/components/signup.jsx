import { redirect, Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export async function action({ request }) {
  const formData = await request.formData();
  const userInfos = Object.fromEntries(formData);
  const res = await signup(userInfos);
  if (res.ok) return redirect("/activate");
}

const Signup = ({ onClose, open = true }) => {
  const { t } = useTranslation(null, { keyPrefix: "signup" });
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form method="post" autoComplete="on">
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("text")}</DialogContentText>
          <Stack spacing={2}>
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
              autoComplete="email"
              label={t("email")}
              name="email"
              id="email"
              type="email"
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t("cancel")}</Button>
          <Button type="submit">{t("submit")}</Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default Signup;
