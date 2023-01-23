import { Form, redirect, useActionData } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import SignupDialog from "@/components/SignupDialog";
import Snackbar from "@/components/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { create } from "@/api/accounts";
import { login } from "@/api/sessions";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export async function action({ request }) {
  const formData = await request.formData();
  const userInfos = Object.fromEntries(formData);
  if (userInfos.lastname) await create(userInfos);
  const res = await login(userInfos);
  if (!res.ok) return res.status;
  return redirect("/");
}


const Login = () => {
  const status = useActionData();
  const [open, setOpen] = useState(false);
  const [failure, setFailure] = useState(false);
  const { t } = useTranslation(null, { keyPrefix: "login" });
  if (status === 401) {
    setFailure(true);
    setTimeout(() => setFailure(false), 2000);
  }
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
      >
        <Stack spacing={2} alignItems="center" width="400px">
          <TextField name="email" variant="filled" label={t("email")} autoComplete="email" type="email" fullWidth required/>
          <TextField name="password" variant="filled" type="password" label={t("password")} autoComplete="current-password" fullWidth required helperText={<Link href="/reset-password">{t("resetPassword")}</Link>}/>
          <Button variant="contained" type="submit" fullWidth>{t("submit")}</Button>
          <Button variant="text" onClick={() => setOpen(true)} fullWidth>{t("signup")}</Button>
        </Stack>
      </Form>
      <SignupDialog open={open} onClose={() => setOpen(false)} />
      <Snackbar severity="warning" msg="Could not log in" open={failure} />
    </Box>
  );
};

export default Login;
