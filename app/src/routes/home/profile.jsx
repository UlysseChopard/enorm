import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useActionData, Form } from "react-router-dom";
import { get, update, updatePassword } from "@/api/accounts";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Unstable_Grid2";

export async function loader() {
  const res = await get();
  if (!res.ok) throw Error("Could not fetch your informations");
  return res.json();
}

export async function action({ request }) {
  const formData = await request.formData();
  if (formData.has("newPassword")) {
    if (!formData.has("oldPassword")) return { message: "Missing previous password" };
    const res = await updatePassword({ oldPassword: formData.get("oldPassword"), newPassword: formData.get("newPassword") });
    if (!res.ok) return res.status;
    return res.json();
  }
  const objData = Object.fromEntries(formData);
  const res = await update(objData);
  if (!res.ok) return res.status;
  return res.json();
}

const CATEGORIES = [
  {
    name: "id",
    fields: [
      {
        name: "firstname",
        required: true
      },
      {
        name: "lastname",
        required: true
      },
      {
        name: "gender",
        select: true,
        options: ["male", "female"]
      },
    ]
  },
  {
    name: "company",
    fields: [
      {
        name: "name",
        required: true,
        disabled: true
      },
      {
        name: "address",
        disabled: true
      },
      {
        name: "sponsor",
        disabled: true
      }
    ]
  },
  {
    name: "contact",
    fields: [
      {
        name: "email",
        required: true,
        type: "email"
      },
      {
        name: "cellphone",
      },
      {
        name: "phone",
      }
    ]
  },
  {
    name: "password",
    fields: [
      {
        name: "oldPassword",
        type: "password"
      },
      {
        name: "newPassword",
        type: "password"
      }
    ]
  }
];

export default function Profile() {
  const { account } = useLoaderData();
  const res = useActionData();
  const { t } = useTranslation(null, { keyPrefix: "profile" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!res) return;
    if (!res.account) setMessage(t("error"));
    else setMessage(t("success"));
    setTimeout(() => setMessage(""), 3000);
  }, [res, t]);

  return (
    <Form method="post" autoComplete>
      <Grid container spacing={2}>
        {CATEGORIES.map(({ name, fields }) => (
          <Grid xs={6} key={name}>
            <Paper variant="outlined" sx={{ padding: 2, marginY: 2 }} >
              <Typography variant="h5" gutterBottom>{t(name)}</Typography>
              <Stack spacing={2}>
              {fields.map(({ name, required, disabled, type, autoComplete, select, options }) => 
                  <TextField key={name} id={name} name={name} variant="filled" defaultValue={account[name]} label={t(name)} required={required} disabled={disabled} type={type} autoComplete={autoComplete} select={select}>{options && options.map(option => (
                    <MenuItem key={option} value={option}>
                      {t(option)}
                    </MenuItem>
                  ))}</TextField>
               )}
              </Stack>
            </Paper>
          </Grid>
        ))}
        <Grid xsOffset="auto">
          <Button variant="contained" endIcon={<SendIcon />} type="submit">{t("submit")}</Button>
        </Grid>
      </Grid>
      <Snackbar open={!!message} autoHideDuration={4000} message={message} onClose={() => setMessage("")} />
    </Form>
  );
}
