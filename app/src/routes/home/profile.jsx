import { useTranslation } from "react-i18next";
import { useLoaderData, useActionData, Form } from "react-router-dom";
import { get, update } from "@/api/accounts";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import GenderRadioGroup from "@/components/GenderRadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export async function loader() {
  const res = await get();
  if (!res.ok) throw Error("Could not fetch your informations");
  return res.json();
}

export async function action({ request }) {
  const formData = await request.formData();
  const res = update(formData);
  if (!res.ok) return res.status;
  return res.json();
}

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
        name: "cell",
      },
      {
        name: "phone",
      }
    ]
  }
];

export default function Profile() {
  const { account } = useLoaderData();
  // const res = useActionData();
  const { t } = useTranslation(null, { keyPrefix: "profile" });
  console.log(account);
  return (
    <Stack spacing={2}>
      {CATEGORIES.map(({ name, fields }) => (
        <Paper variant="outlined" key={name}>
          <Form method="PUT">
            <Typography>{t(name)}</Typography>
            <Stack spacing={2}>
            {fields.map(({ name, Element = () => <TextField variant="filled" /> }) => (
              <FormControl key={name}>
                <FormLabel>{t(name)}</FormLabel>
              <Element variant="filled" label={t(name)} name={name} defaultValue={account[name]} />
              </FormControl>
             ))}
            </Stack>
          </Form>
        </Paper>
      ))}
    </Stack>
);
}
