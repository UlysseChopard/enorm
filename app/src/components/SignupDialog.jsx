import { Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const SignupDialog = ({ onClose, open = true }) => {
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
            <FormControl>
             <FormLabel id="gender">{t("gender")}</FormLabel> 
              <RadioGroup
                aria-labelledby="gender"
                defaultValue="male"
                name="gender"
              >
                <FormControlLabel value="male" control={<Radio />} label={t("male")} />
                <FormControlLabel value="female" control={<Radio />} label={t("female")} />
              </RadioGroup>
            </FormControl>
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

export default SignupDialog;
