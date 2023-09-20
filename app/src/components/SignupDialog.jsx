import { useState } from "react";
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

const SignupDialog = ({ onClose, open = true, member }) => {
  const { t } = useTranslation(null, { keyPrefix: "signup" });
  const steps = [t("token"), t("informations")];
  const [activeStep, setActiveStep] = useState(0);
  if (member) {
    setActiveStep(1);
  }
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form method="POST" autoComplete="on">
        <DialogTitle>{t("title")}</DialogTitle>
        <Stepper activeStep={activeStep}>
          {steps.map((label, idx) => (
            <Step key={label} completed={activeStep > idx}>
              <StepButton>{label}</StepButton>
            </Step>
          ))}
        </Stepper>
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
                <input type="hidden" name="type" value="checkToken" />
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
                <input type="hidden" name="type" value="signup" />
                <input
                  type="hidden"
                  name="organisation"
                  value={member.organisation}
                />
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
