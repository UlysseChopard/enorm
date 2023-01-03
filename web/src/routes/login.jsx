import { useState, useRef } from "react";
import { redirect, Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login } from "@/api/accounts";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export async function action({ request }) {
  const formData = await request.formData();
  console.log(formData);
  const userInfos = Object.fromEntries(formData);
  const res = await login(userInfos);
  if (res.ok) return redirect("/");
}

const SignupDialog = ({ onSubmit, onClose, open }) => {
  const { t } = useTranslation(null, { keyPrefix: "signup" });
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>{t("title")}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("text")}</DialogContentText>
        <Stack spacing={2}>
          <TextField
            autoFocus
            label={t("firstname")}
            name="firstname"
            fullWidth
          />
          <TextField
            label={t("lastname")}
            name="lastname"
            fullWidth
          />
          <TextField
            label={t("email")}
            name="email"
            type="email"
            fullWidth
          />
          <TextField
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
        <Button onClick={onSubmit}>{t("submit")}</Button>
      </DialogActions>
    </Dialog>
  );
};

const Login = () => {
  const [open, setOpen] = useState(false);
  const formRef = useRef(null);
  const { t } = useTranslation(null, { keyPrefix: "login" });

  const handleSubmit = () => formRef.current.submit();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      minHeight="100vh"
    >
      <Stack spacing={2} alignItems="center">
        <Typography variant="h1">{t("brandname")}</Typography>
        <Typography variant="subtitle1">{t("presentation")}</Typography>
      </Stack>
      <Form
        autoComplete="on"
        method="post"
        ref={formRef} 
      >
        <Stack spacing={2} alignItems="center" width="400px">
          <TextField variant="filled" label={t("email")} autoComplete="email" type="email" fullWidth/>
          <Stack width="400px" alignItems="flex-end">
            <TextField variant="filled" type="password" label={t("password")} autoComplete="current-password" fullWidth/>
            <Link href="/reset-password">{t("resetPassword")}</Link>
          </Stack>
          <Button variant="contained" type="submit" fullWidth>{t("submit")}</Button>
          <Button variant="text" onClick={() => setOpen(true)} fullWidth>{t("signup")}</Button>
        </Stack>
      </Form>
      <SignupDialog open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} />
    </Box>
  );
};

export default Login;
