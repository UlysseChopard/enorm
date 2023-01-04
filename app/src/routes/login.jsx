import { useState } from "react";
import { redirect, Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login, signup } from "@/api/accounts";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import SignupDialog from "@/components/signup";

export async function action({ request }) {
  const formData = await request.formData();
  console.log(formData);
  const userInfos = Object.fromEntries(formData);
  const res = userInfos?.firstname ? await signup(userInfos) : await login(userInfos);
  if (res.ok) return redirect("/");
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
          <TextField variant="filled" label={t("email")} autoComplete="email" type="email" fullWidth required/>
          <TextField variant="filled" type="password" label={t("password")} autoComplete="current-password" fullWidth required helperText={<Link href="/reset-password">{t("resetPassword")}</Link>}/>
          <Button variant="contained" type="submit" fullWidth>{t("submit")}</Button>
          <Button variant="text" onClick={() => setOpen(true)} fullWidth>{t("signup")}</Button>
        </Stack>
      </Form>
      <SignupDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default Login;
