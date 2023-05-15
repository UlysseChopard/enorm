import { useState } from "react";
import { useLoaderData, useSubmit, Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/base/Select";
import Option from "@mui/base/Option";
import { get as getRegistrations, accept, deny } from "@/api/registrations";
import { get as getWGs } from "@/api/working-groups";

export const loader = async () => {
  const registrations = await getRegistrations();
  if (!registrations.ok) {
    return registrations.status;
  }
  const wgs = await getWGs();
  if (!wgs.ok) {
    return wgs.status;
  }
  const { sended, received } = await registrations.json();
  const { groups } = await wgs.json();
  return { sended, received, groups };
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData.get("group"));
  let res;
  switch (formData.get("type")) {
    case "accept":
      res = await accept(JSON.parse(formData.get("group")));
      return res.ok;
    case "deny":
      res = await deny(formData.get("id"));
      return res.ok;
  }
};

const Registrations = () => {
  const submit = useSubmit();
  const { sended, received, groups } = useLoaderData();
  const { t } = useTranslation(null, { keyPrefix: "registrations" });
  const [dialog, setDialog] = useState("");
  const [wg, setWG] = useState(null);
  const accept = (group) => {
    const formData = new FormData();
    formData.append("group", JSON.stringify(group));
    formData.append("type", "accept");
    submit(formData, { method: "POST" });
  };
  const deny = (id) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("type", "deny");
    submit(formData, { method: "POST" });
  };
  return (
    <>
      <h1>Received</h1>
      <ButtonGroup>
        <Button variant="contained" onClick={() => setDialog("selfRegister")}>
          {t("selfRegister")}
        </Button>
        <Button variant="contained" onClick={() => setDialog("register")}>
          {t("register")}
        </Button>
      </ButtonGroup>
      <table>
        <thead>
          <tr>
            <th>Beneficiary</th>
            <th>Group</th>
            <th>Sended at</th>
            <th>Accepted at</th>
            <th>Closed at</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {received.map((r) => (
            <tr key={r.id}>
              <td>{`${r.firstname} ${r.lastname}`}</td>
              <td>{`${r.organisation} ${r.reference}`}</td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
              <td>
                {r.accepted_at && new Date(r.accepted_at).toLocaleString()}
              </td>
              <td>{r.denied_at && new Date(r.denied_at).toLocaleString()}</td>
              <td>
                <button type="submit" onClick={() => accept(r)}>
                  Accept
                </button>
                <button type="submit" onClick={() => deny(r.id)}>
                  Deny
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog
        onClose={() => setDialog("")}
        open={dialog}
        fullWidth
        maxWidth="sm"
      >
        <Form method="post" autoComplete="on">
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogContent>
            <DialogContentText>{t("text")}</DialogContentText>
            <Select value={wg} onChange={(_, wg) => setWG(wg)}>
              {groups.map(({ id, reference, organisation }) => (
                <Option
                  id={id}
                  key={id}
                  value={id}
                >{`${organisation} ${reference}`}</Option>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialog("")}>{t("cancel")}</Button>
            <Button variant="contained" type="submit">
              {t("submit")}
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </>
  );
};

export default Registrations;
