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
import {
  get,
  create,
  replace,
  close,
} from "@/api/organisations/establishments";

export async function loader() {
  const res = await get();
  return res.json();
}

export async function action({ request }) {
  const formData = await request.formData();
  let res;
  switch (formData.get("type")) {
    case "create":
      res = await create(Object.fromEntries(formData));
      break;
    case "close":
      res = await close(formData.get("id"));
      break;
    case "replace":
      res = await replace(formData.get("id"), Object.fromEntries(formData));
      break;
    default:
      throw new Error("unmatched action type");
  }
  return res.json();
}

const EstablishmentDialog = ({ type, onClose, open, establishment }) => {
  const { t } = useTranslation(null, { keyPrefix: "establishments" });
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form method="POST" autoComplete="on">
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("text")}</DialogContentText>
          <Stack spacing={2}>
            <TextField
              required
              type="text"
              name="name"
              label={t("name")}
              defaultValue={establishment?.name || ""}
            />
            <TextField
              required
              type="text"
              name="address"
              label={t("address")}
              defaultValue={establishment?.address ?? ""}
            />
            <TextField
              type="text"
              name="email"
              label={t("email")}
              defaultValue={establishment?.email ?? ""}
            />
            <TextField
              type="text"
              name="phone"
              label={t("phone")}
              defaultValue={establishment?.phone ?? ""}
            />
            <input type="hidden" name="type" value={type} />
            {establishment && (
              <input type="hidden" name="id" value={establishment.id} />
            )}
          </Stack>
          <DialogActions>
            <Button onClick={onClose}>{t("cancel")}</Button>
            <Button variant="contained" type="submit" onClick={onClose}>
              {t("submit")}
            </Button>
          </DialogActions>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

export default function Establishments() {
  const { establishments } = useLoaderData();
  const { t } = useTranslation(null, { keyPrefix: "establishments" });
  const [modal, setModal] = useState(false);
  const [replacement, setReplacement] = useState("");

  return (
    <>
      <Button onClick={() => setModal("create")}>{t("create")}</Button>
      <EstablishmentDialog
        type="create"
        onClose={() => setModal("")}
        open={modal === "create"}
      />
      <EstablishmentDialog
        type="replace"
        onClose={() => setModal("")}
        open={modal === "replace"}
        establishment={replacement}
      />
      <table>
        <thead>
          <tr>
            <th>{t("name")}</th>
            <th>{t("address")}</th>
            <th>{t("email")}</th>
            <th>{t("phone")}</th>
            <th>{t("created_at")}</th>
            <th colSpan="2">{t("actions")}</th>
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
                <td>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setReplacement({ id, name, address, email, phone });
                      setModal("replace");
                    }}
                  >
                    {t("replace")}
                  </Button>
                </td>
                <td>
                  <Form method="DELETE">
                    <input type="hidden" name="type" value="close" />
                    <input type="hidden" name="id" value={id} />
                    <Button type="submit" variant="contained">
                      {t("close")}
                    </Button>
                  </Form>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}
