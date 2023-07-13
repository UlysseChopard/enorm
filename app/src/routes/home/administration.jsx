import { useState } from "react";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { uploadUsers, get, updateOrganisation } from "@/api/administration";

export async function loader() {
  const res = await get();
  return res.ok ? res.json() : res.status;
}

export async function action({ request }) {
  const formData = await request.formData();
  for (const data of formData) {
    console.log(data);
  }
  console.log(formData);
  let res;
  switch (formData.get("type")) {
    case "organisation":
      res = await updateOrganisation(formData.get("id"), formData.get("name"));
      break;
    case "uploadUsers":
      res = await uploadUsers(formData, {
        emailColumn: formData.get("email-column"),
        separator: formData.get("separator"),
      });
      break;
    default:
      return null;
  }
  return res.ok ? res.json() : res.status;
}

export default function Administration() {
  const { t } = useTranslation(null, { keyPrefix: "administration" });
  const submit = useSubmit();
  const { organisation, users } = useLoaderData();
  const [separator, setSeparator] = useState(",");
  const [emailColumn, setEmailColumn] = useState("email");
  const [nameHovered, setNameHovered] = useState(false);
  const [nameEdited, setNameEdited] = useState(false);
  const [name, setName] = useState(organisation?.name ?? "");
  return (
    <>
      <div>
        {nameEdited ? (
          <TextField
            value={name}
            onKeyUp={(e) => {
              if (e.key !== "Enter") return;
              const formData = new FormData();
              formData.append("name", e.target.value);
              formData.append("id", organisation.id);
              formData.append("type", "organisation");
              submit(formData, { method: "PUT" });
              setNameEdited(false);
            }}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <Typography
            variant="h3"
            onMouseEnter={() => setNameHovered(true)}
            onMouseLeave={() => setTimeout(() => setNameHovered(false), 150)}
          >
            {organisation.name}
            {nameHovered && (
              <EditIcon
                onClick={() => setNameEdited(true)}
                sx={{ cursor: "pointer" }}
              />
            )}
          </Typography>
        )}
        <Form method="POST" encType="multipart/form-data">
          <Stack spacing={2} width={300}>
            <input
              type="file"
              name="users"
              accept=".csv, .txt, text/csv, text/tab-separated-value"
            />
            <label htmlFor="separator">{t("separator")}</label>
            <input
              type="text"
              maxLength="1"
              name="separator"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
            />
            <label htmlFor="email-column">{t("emailColumn")}</label>
            <input
              type="text"
              name="email-column"
              value={emailColumn}
              onChange={(e) => setEmailColumn(e.target.value)}
            />
            <input type="hidden" name="type" value="uploadUsers" />
            <button type="submit">{t("submit")}</button>
          </Stack>
        </Form>
      </div>
      <table>
        <thead>
          <tr>
            <th>{t("email")}</th>
            <th>{t("firstname")}</th>
            <th>{t("lastname")}</th>
            <th>{t("establishment")}</th>
            <th>{t("role")}</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>empty for now</td>
              <td>empty for now</td>
              <td>
                <FormControl fullWidth>
                  <InputLabel id="establishment-label">
                    {t("establishment")}
                  </InputLabel>
                  <Select labelId="establishment-label" label="test" value={0}>
                    <MenuItem value={0}>Establishment 0</MenuItem>
                  </Select>
                </FormControl>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
