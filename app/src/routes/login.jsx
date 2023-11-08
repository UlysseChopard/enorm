import { useEffect, useState } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SignupDialog from "@/components/SignupDialog";
import Snackbar from "@/components/Snackbar";
import { loginToken } from "@/api/sessions";
import { update } from "@/api/accounts";
import { login } from "@/api/sessions";

let authError = 0;

export async function action({ request }) {
  const formData = await request.formData();
  const userInfos = Object.fromEntries(formData);
  delete userInfos.type;
  if (formData.get("type") === "login") {
    const res = await login(userInfos);
    if (!res.ok) {
      authError += 1;
      return authError;
    }
    const { session } = await res.json();
    localStorage.setItem("account", session.account);
    return redirect("/");
  } else if (formData.get("type") === "loginToken") {
    const res = await loginToken(formData.get("token"), userInfos);
    if (!res.ok) {
      authError += 1;
      return authError;
    }
    return res.json();
  } else if (formData.get("type") === "update") {
    const res = await update(formData.get("account"), userInfos);
    if (!res.ok) {
      authError += 1;
      return authError;
    }
    const { account } = await res.json();
    localStorage.setItem("account", account.id);
    return redirect("/");
  }
}

const Login = () => {
  const res = useActionData();
  const [open, setOpen] = useState(false);
  const [failure, setFailure] = useState(false);
  const { t } = useTranslation(null, { keyPrefix: "login" });

  useEffect(() => {
    if (typeof res === "number") {
      setFailure(true);
      const timer = setTimeout(() => setFailure(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [res]);

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
      <Form autoComplete="on" method="post">
        <Stack spacing={2} alignItems="center" width="400px">
          <TextField
            name="email"
            variant="filled"
            label={t("email")}
            autoComplete="email"
            type="email"
            fullWidth
            required
          />
          <TextField
            name="password"
            variant="filled"
            type="password"
            label={t("password")}
            autoComplete="current-password"
            fullWidth
            required
            helperText={
              <Link href="/reset-password">{t("resetPassword")}</Link>
            }
          />
          <input type="hidden" name="type" value="login" />
          <Button variant="contained" type="submit" fullWidth>
            {t("submit")}
          </Button>
          <Button variant="text" onClick={() => setOpen(true)} fullWidth>
            {t("signup")}
          </Button>
        </Stack>
      </Form>
      <SignupDialog
        open={open}
        onClose={() => setOpen(false)}
        account={res?.session?.account}
      />
      <Snackbar severity="warning" msg="Could not log in" open={failure} />
    </Box>
  );
};

export default Login;
