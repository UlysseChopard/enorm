import { useLoaderData, useSubmit, Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

import { get, create, remove } from "@/api/admin/superusers";

export const loader = async () => {
  const res = await get();
  return res.json();
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  let res;
  switch (formData.get("type")) {
    case "create":
      res = await create(Object.fromEntries(formData));
      break;
    case "remove":
      res = await remove(formData.get("id"));
      break;
    default:
      throw new Error("Type does not exists");
  }
  return res.json();
};

const Superusers = () => {
  const { t } = useTranslation(null, { keyPrefix: "superusers" });
  const submit = useSubmit();
  const [open, setOpen] = useState(false);
  const { superusers } = useLoaderData();
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t("createTitle")}</DialogTitle>
        <Form method="POST">
          <DialogContent sx={{ paddingTop: 0, width: 500 }}>
            <Stack spacing={2} useFlexGap>
              <input type="hidden" name="type" value="create" />
              <TextField
                sx={{ marginTop: 0 }}
                autoComplete="email"
                name="email"
                type="email"
                label={t("email")}
                required
              />
              <TextField name="firstname" label={t("firstname")} required />
              <TextField
                autoComplete="family-name"
                name="lastname"
                label={t("lastname")}
                required
              />
              <TextField
                name="gender"
                label={t("gender")}
                required
                autoComplete="sex"
                defaultValue="male"
                select
              >
                <MenuItem value="male">{t("male")}</MenuItem>
                <MenuItem value="female">{t("female")}</MenuItem>
              </TextField>
              <TextField
                type="password"
                name="password"
                label={t("password")}
                autoComplete="new-password"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>{t("cancel")}</Button>
            <Button variant="contained" type="submit">
              {t("submit")}
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
      <Button onClick={() => setOpen(true)}>{t("create")}</Button>
      <table>
        <thead>
          <tr>
            <th scope="col">{t("email")}</th>
            <th scope="col">{t("name")}</th>
          </tr>
        </thead>
        <tbody>
          {superusers
            .sort((a, b) => a.id - b.id)
            .map(({ id, email, firstname, lastname }) => {
              const formData = new FormData();
              formData.append("id", id);
              formData.append("type", "remove");
              return (
                <tr key={id}>
                  <th scope="row">{email}</th>
                  <td>{`${firstname} ${lastname}`}</td>
                  <td>
                    <Button
                      type="submit"
                      onClick={() => submit(formData, { method: "POST" })}
                    >
                      {t("remove")}
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Superusers;
