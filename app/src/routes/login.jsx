import { useEffect } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import SignupDialog from "@/components/SignupDialog";
import Snackbar from "@/components/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { create, checkToken } from "@/api/accounts";
import { login } from "@/api/sessions";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export async function action({ request }) {
  const formData = await request.formData();
  const userInfos = Object.fromEntries(formData);
  delete userInfos.type;
  let res;
  switch (formData.get("type")) {
    case "login":
      res = await login(userInfos);
      break;
    case "signup":
      res = await create(userInfos);
      if (!res.ok) return res.json();
      res = await login(userInfos);
      break;
    case "checkToken":
      res = await checkToken(formData.get("token"));
      return res.json();
    default:
      throw new Error("unknown form type");
  }
  if (!res.ok) return res.json();
  const { session } = await res.json();
  localStorage.setItem("account", session.account);
  return redirect("/");
}

const Login = () => {
  const member = useActionData();
  const [open, setOpen] = useState(false);
  const [failure, setFailure] = useState(false);
  const { t } = useTranslation(null, { keyPrefix: "login" });

  useEffect(() => {
    if (!member) {
      setFailure(true);
      setTimeout(() => setFailure(false), 2000);
    }
  }, [member]);

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
        member={member}
      />
      <Snackbar severity="warning" msg="Could not log in" open={failure} />
    </Box>
  );
};

export default Login;
