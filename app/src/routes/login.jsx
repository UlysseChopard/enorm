import { Form, redirect } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import SignupDialog from "@/components/signup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { create } from "@/api/accounts";
import { login } from "@/api/sessions";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export async function action({ request }) {
  try {
  const formData = await request.formData();
  console.log(formData);
  const userInfos = Object.fromEntries(formData);
  if (userInfos.lastname) await create(userInfos);
  const res = await login(userInfos);
  if (res.ok) return redirect("/");
  } catch (err) {
    return null
  }
}


const Login = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(null, { keyPrefix: "login" });

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
    </Box>
  );
};

export default Login;
