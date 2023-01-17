import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useActionData, Form, useSubmit } from "react-router-dom";
import { get, update } from "@/api/accounts";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import GenderRadioGroup from "@/components/GenderRadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";

export async function loader() {
  const res = await get();
  if (!res.ok) throw Error("Could not fetch your informations");
  return res.json();
}

export async function action({ request }) {
  const formData = await request.formData();
  console.log(formData);
  const res = await update(formData);
  if (!res.ok) return res.status;
  return res.json();
}

const DefaultInput = ({ label, name, defaultValue, form }) => (
  <>
    <FormLabel htmlFor={name} >{label}</FormLabel>
    <TextField id={name} name={name} variant="filled" defaultValue={defaultValue} form={form} />
  </>
);

const CATEGORIES = [
  {
    name: "id",
    fields: [
      {
        name: "firstname",
      },
      {
        name: "lastname",
      },
      {
        name: "gender",
        Element: () => <GenderRadioGroup />
      }
    ]
  },
  {
    name: "company",
    fields: [
      {
        name: "name"
      },
      {
        name: "address"
      },
      {
        name: "sponsor"
      }
    ]
  },
  {
    name: "contact",
    fields: [
      {
        name: "email"
      },
      {
        name: "cellphone",
      },
      {
        name: "phone",
      }
    ]
  }
];

export default function Profile() {
  const { account } = useLoaderData();
  const res = useActionData();
  const { t } = useTranslation(null, { keyPrefix: "profile" });
  const [message, setMessage] = useState("");
  const submitRef = useRef();
  const submit = useSubmit();

  useEffect(() => {
    if (!res) return;
    if (!res.account) setMessage(t("error"));
    else setMessage(t("success"));
    setTimeout(() => setMessage(""), 3000);
  }, [res, t]);

  return (
    <Stack spacing={2}>
      <Form method="post" id="profile-form" >
        {CATEGORIES.map(({ name, fields }) => (
          <Paper variant="outlined" key={name} sx={{ padding: 2, marginY: 2 }} >
            <Typography>{t(name)}</Typography>
            <Stack spacing={2}>
            {fields.map(({ name, Element }) => (
              <FormControl key={name}>
                {Element ? <Element name={name} defaultValue={account[name]} /> : <DefaultInput label={t(name)} name={name} defaultValue={account[name]} />}
              </FormControl>
             ))}
            </Stack>
          </Paper>
        ))}
        <Button variant="contained" endIcon={<SendIcon />} type="submit">{t("submit")}</Button>
      </Form>
      <Snackbar open={!!message} autoHideDuration={800} message={message} onClose={() => setMessage("")} action={<Button onClick={() => submit(submitRef.current)}>{t("retry")}</Button>} />
    </Stack>
  );
}
