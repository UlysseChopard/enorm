import { useState, useEffect } from "react";
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
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

const SignupDialog = ({ onClose, open = true, account }) => {
  const { t } = useTranslation(null, { keyPrefix: "signup" });
  const [activeStep, setActiveStep] = useState(0);
  const steps = [t("token"), t("informations")];
  useEffect(() => {
    if (account) {
      setActiveStep(1);
    }
  }, [account]);
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>{t("title")}</DialogTitle>
      <Stepper activeStep={activeStep}>
        {steps.map((label, idx) => (
          <Step key={label} completed={activeStep > idx}>
            <StepButton>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
      <Form autoComplete="on" method="POST">
        <DialogContent>
          <Stack spacing={2}>
            {activeStep === 0 && (
              <>
                <TextField
                  required
                  label={t("accessToken")}
                  name="token"
                  type="text"
                  fullWidth
                />
                <FormHelperText>{t("useMailToken")}</FormHelperText>
                <TextField
                  required
                  label={t("email")}
                  name="email"
                  type="email"
                  fullwWidth
                />
                <input type="hidden" name="type" value="loginToken" />
              </>
            )}
            {activeStep === 1 && (
              <>
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
                <input type="hidden" name="type" value="update" />
                <input type="hidden" name="account" value={account} />
              </>
            )}
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
