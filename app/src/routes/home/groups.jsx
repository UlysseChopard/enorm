import { useState, useEffect } from "react";
import { Form, useLoaderData, useActionData, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { get, create } from "@/api/organisations/working-groups";

export async function loader() {
  const res = await get();
  return res.json();
}

export async function action({ request }) {
  const formData = await request.formData();
  const group = Object.fromEntries(formData);
  const res = await create(group);
  return res.json();
}

const CreateModal = ({ open, onClose }) => {
  const { t } = useTranslation(null, { keyPrefix: "groups" });
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form method="post" autoComplete="on" onSubmit={onClose}>
        <DialogTitle>{t("groupCreation")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("text")}</DialogContentText>
          <Stack spacing={2}>
            <TextField
              required
              label={t("reference")}
              name="reference"
              fullWidth
            />
            <TextField required label={t("title")} name="title" fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t("cancel")}</Button>
          <Button variant="contained" type="submit">
            {t("submit")}
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default function Groups() {
  const { groups } = useLoaderData();
  const actionData = useActionData();
  const [createModal, setCreateModal] = useState(false);
  const { t } = useTranslation(null, { keyPrefix: "groups" });

  useEffect(() => {
    if (actionData?.group) setCreateModal(false);
  }, [actionData]);

  const { isManager } = JSON.parse(localStorage.getItem("roles"));

  return (
    <>
      {isManager && (
        <div style={{ margin: "0 1rem 1rem" }}>
          <Button variant="contained" onClick={() => setCreateModal(true)}>
            {t("create")}
          </Button>
        </div>
      )}
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>{t("title")}</th>
            <th>{t("organisation")}</th>
            <th>{t("reference")}</th>
            <th>{t("creation")}</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(
            ({ id, title, organisation_name, reference, created_at }) => (
              <tr key={id}>
                <td>
                  <Link to={`/groups/${id}`}>{title}</Link>
                </td>
                <td>{organisation_name}</td>
                <td>{reference}</td>
                <td>{new Date(created_at).toLocaleString()}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <CreateModal open={createModal} onClose={() => setCreateModal(false)} />
    </>
  );
}
