import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useLoaderData,
  useActionData,
  Form,
  useSubmit,
} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Unstable_Grid2";
import { get, update } from "@/api/accounts";
import { join, unlink } from "@/api/organisations/members";

const account = localStorage.getItem("account");

export async function loader() {
  const res = await get(account);
  if (!res.ok) throw Error("Could not fetch your informations");
  return res.json();
}

export async function action({ request }) {
  const formData = await request.formData();
  if (formData.has("newPassword") && !formData.has("oldPassword"))
    return { message: "Missing old password" };
  const { type, ...objData } = Object.fromEntries(formData);
  let res;
  switch (type) {
    case "update":
      res = await update(account, objData);
      break;
    case "join":
      res = await join(objData.organisation);
      break;
    case "leave":
      res = await unlink(objData.organisation);
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
          )
        )}
      </Stack>
    </Paper>
  </Grid>
);

export default function Profile() {
  const { account, users } = useLoaderData();
  const res = useActionData();
  const submit = useSubmit();
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
      <Grid container spacing={2}></Grid>
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
          <Grid xsOffset="auto">
            <Button variant="contained" endIcon={<SendIcon />} type="submit">
              {t("submit")}
            </Button>
          </Grid>
        </Grid>
      </Form>
      <Form method="post">
        <Grid container spacing={2}>
          <SubForm
            name={PASSWORD.name}
            fields={PASSWORD.fields}
            account={account}
            t={t}
            xs={12}
          />
          <Grid xsOffset="auto">
            <Button variant="contained" endIcon={<SendIcon />} type="submit">
              {t("submit")}
            </Button>
          </Grid>
        </Grid>
      </Form>
      {users.map(({ id, name, account, organisation_id }) => (
        <div key={id} style={{ display: "flex" }}>
          <p>{name}</p>
          {account === null ? (
            <button
              onClick={() => {
                const formData = new FormData();
                formData.append("type", "join");
                formData.append("organisation", organisation_id);
                submit(formData, { method: "PUT" });
              }}
            >
              {t("join")}
            </button>
          ) : (
            <button
              onClick={() => {
                const formData = new FormData();
                formData.append("type", "leave");
                formData.append("organisation", organisation_id);
                submit(formData, { method: "DELETE" });
              }}
            >
              {t("leave")}
            </button>
          )}
        </div>
      ))}
      <Snackbar
        open={!!message}
        autoHideDuration={4000}
        message={message}
        onClose={() => setMessage("")}
      />
    </>
  );
}
