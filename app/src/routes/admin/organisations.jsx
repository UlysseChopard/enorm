import {
  // useActionData,
  useLoaderData,
  useSubmit,
  Form,
} from "react-router-dom";
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

import { get, create, remove } from "@/api/admin/organisations";
import { create as createAccount } from "@/api/accounts";

export const loader = async () => {
  const res = await get();
  return res.json();
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  if (formData.get("type") === "create") {
    const { account } = await createAccount(Object.fromEntries(formData)).then(
      (res) => res.json()
    );
    const { organisation } = await create({ account: account.id }).then((res) =>
      res.json()
    );
    return { account, organisation };
  } else if (formData.get("type") === "remove") {
    const res = await remove(formData.get("id"));
    return res.json();
  }
};
const Organisations = () => {
  const { t } = useTranslation(null, { keyPrefix: "organisations" });
  const submit = useSubmit();
  const [open, setOpen] = useState(false);
  const { organisations } = useLoaderData();
  // const { organisation, account } = useActionData();

  return (
    <>
      <Button onClick={() => setOpen(true)}>{t("create")}</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t("createTitle")}</DialogTitle>
        <Form method="POST">
          <DialogContent>
            <Stack>
              <input type="hidden" name="type" value="create" />
              <TextField
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
      <table>
        <thead>
          <tr>
            <th scope="col">{t("email")}</th>
            <th scope="col">{t("name")}</th>
          </tr>
        </thead>
        <tbody>
          {organisations.map(({ id, email, firstname, lastname }) => {
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

export default Organisations;
