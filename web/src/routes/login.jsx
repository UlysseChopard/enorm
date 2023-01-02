import { redirect, Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login } from "@/api/accounts";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

export async function action({ request }) {
  const formData = await request.formData();
  const userInfos = Object.fromEntries(formData);
  const res = await login(userInfos);
  if (res.ok) return redirect("/");
}

const Login = () => {
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
        <Typography variant="subtitle1">Blablabla</Typography>
      </Stack>
      <Form
        autoComplete="on"
        method="post"
      >
        <Stack spacing={2} alignItems="center" minWidth="50vw">
          <TextField variant="filled" label={t("email")} autoComplete="email" fullWidth/>
          <TextField variant="filled" label={t("password")} autoComplete="current-password" fullWidth/>
          <Button variant="contained" type="submit" fullWidth>{t("submit")}</Button>
          <Button variant="text"  href="/signup" fullWidth>{t("signup")}</Button>
          <Link href="/reset-password" fullWidth>{t("resetPassword")}</Link>
        </Stack>
      </Form>
    </Box>
  );
};

export default Login;
