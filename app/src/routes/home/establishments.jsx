import { useState } from "react";
import { useLoaderData, Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import { get, create } from "@/api/establishments";

export async function loader() {
  const res = await get();
  return res.ok ? res.json() : false;
}
export async function action({ request }) {
  const formData = await request.formData();
  const establishment = Object.fromEntries(formData);
  const res = await create(establishment);
  return res.ok ? res.json() : false;
}

export default function Establishments() {
  const { establishments } = useLoaderData();
  const { t } = useTranslation(null, { keyPrefix: "establishments" });
  const [modal, setModal] = useState(false);

  return (
    <>
      <Button onClick={() => setModal(!modal)}>{t("create")}</Button>
      <Dialog
        onClose={() => setModal(false)}
        open={modal}
        fullWidth
        maxWidth="sm"
      >
        <Form method="POST" autoComplete="on">
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogContentText>{t("text")}</DialogContentText>
          <DialogContent>
            <Stack spacing={2}>
              <TextField required type="text" name="name" label={t("name")} />
              <TextField
                required
                type="text"
                name="address"
                label={t("address")}
              />
              <TextField required type="text" name="email" label={t("email")} />
              <TextField required type="text" name="phone" label={t("phone")} />
            </Stack>
            <DialogActions>
              <Button onClick={() => setModal(false)}>{t("cancel")}</Button>
              <Button
                variant="contained"
                type="submit"
                onClick={() => setModal(false)}
              >
                {t("submit")}
              </Button>
            </DialogActions>
          </DialogContent>
        </Form>
      </Dialog>
      <table>
        <thead>
          <tr>
            <th>{t("name")}</th>
            <th>{t("address")}</th>
            <th>{t("email")}</th>
            <th>{t("phone")}</th>
            <th>{t("created_at")}</th>
          </tr>
        </thead>
        <tbody>
          {establishments.map(
            ({ id, name, address, email, phone, created_at }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{address}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{new Date(created_at).toLocaleString()}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}
