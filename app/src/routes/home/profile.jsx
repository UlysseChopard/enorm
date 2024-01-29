import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useActionData, Form } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Unstable_Grid2";
import { get, update } from "@/api/accounts";

export async function loader() {
  const account = localStorage.getItem("account");
  const res = await get(account);
  if (!res.ok) throw Error("Could not fetch your informations");
  return res.json();
}

export async function action({ request }) {
  const account = localStorage.getItem("account");
  const formData = await request.formData();
  const { type, ...objData } = Object.fromEntries(formData);
  let res;
  switch (type) {
    case "update":
      res = await update(account, objData);
      break;
    default:
      throw new Error("Unknown action type");
  }
  if (!res.ok) return res.status;
  return res.json();
}

const PROFILE = [
  {
    name: "id",
    fields: [
      {
        name: "firstname",
        required: true,
      },
      {
        name: "lastname",
        required: true,
      },
      {
        name: "gender",
        required: true,
        select: true,
        options: ["male", "female"],
      },
    ],
  },
  {
    name: "contact",
    fields: [
      {
        name: "email",
        required: true,
        type: "email",
      },
    ],
  },
];

const PASSWORD = {
  name: "password",
  fields: [
    {
      name: "password",
      required: true,
      type: "password",
    },
  ],
};

const SubForm = ({ name, fields, account, t, xs }) => (
  <Grid xs={xs}>
    <Paper variant="outlined" sx={{ padding: 2, marginY: 2 }}>
      <Typography variant="h5" gutterBottom>
        {t(name)}
      </Typography>
      <Stack spacing={2}>
        {fields.map(
          ({
            name,
            required,
            disabled,
            type,
            autoComplete,
            select,
            options,
          }) => (
            <TextField
              key={name}
              id={name}
              name={name}
              variant="filled"
              defaultValue={account[name]}
              label={t(name)}
              required={required}
              disabled={disabled}
              type={type}
              autoComplete={autoComplete}
              select={select}
            >
              {options &&
                options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {t(option)}
                  </MenuItem>
                ))}
            </TextField>
          ),
        )}
      </Stack>
    </Paper>
  </Grid>
);

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
    <>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Paper variant="outlined" sx={{ padding: 2, marginY: 2 }}>
            <Typography variant="h5" gutterBottom>
              {t("roles")}
            </Typography>
            <List>
              {Object.entries(JSON.parse(localStorage.getItem("roles"))).map(
                ([k, v]) => (v ? <ListItem key={k}>{t(k)}</ListItem> : ""),
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Form method="post">
        <Grid container spacing={2}>
          {PROFILE.map(({ name, fields }) => (
            <SubForm
              key={name}
              name={name}
              fields={fields}
              account={account}
              t={t}
              xs={6}
            />
          ))}
          <SubForm
            name={PASSWORD.name}
            fields={PASSWORD.fields}
            account={account}
            t={t}
            xs={12}
          />
          <input type="hidden" name="type" value="update" />
          <Grid xsOffset="auto">
            <Button variant="contained" endIcon={<SendIcon />} type="submit">
              {t("submit")}
            </Button>
          </Grid>
        </Grid>
      </Form>
      <Snackbar
        open={!!message}
        autoHideDuration={4000}
        message={message}
        onClose={() => setMessage("")}
      />
    </>
  );
}
