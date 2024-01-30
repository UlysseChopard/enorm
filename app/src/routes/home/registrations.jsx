import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, Form, useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import TabPanel from "@/components/TabPanel";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { get, create, accept, deny } from "@/api/organisations/registrations";
import { get as getGroups } from "@/api/organisations/working-groups";
import { get as getMembers } from "@/api/organisations/members";

export const loader = async () => {
  if (!JSON.parse(localStorage.getItem("roles")).isManager) {
    return await get().then((r) => (r.ok ? r.json() : r.status));
  }
  const responses = await Promise.all([get(), getGroups(), getMembers()]);
  for (const response of responses) {
    if (!response.ok) {
      throw new Error(response.status);
    }
  }
  const [{ registrations }, { groups }, { members }] = await Promise.all(
    responses.map((r) => r.json()),
  );
  return { registrations, groups, members };
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  switch (formData.get("type")) {
    case "create":
      return create(Object.fromEntries(formData)).then((r) =>
        r.ok ? r.json() : r.status,
      );
    case "accept":
      return accept(formData.get("registration"), formData.get("wgPath")).then(
        (r) => (r.ok ? r.json() : r.status),
      );
    case "deny":
      return deny(formData.get("registration")).then((r) =>
        r.ok ? r.json() : r.status,
      );
    default:
      throw new Error("Unknown type for action");
  }
};

const RequestModal = ({ open, onClose, members, groups }) => {
  const { t } = useTranslation(null, { keyPrefix: "registrations" });
  const ownedGroups = useMemo(
    () =>
      Object.hasOwn(groups, "owned")
        ? Object.values(groups?.owned).map(({ id, title }) => (
            <MenuItem key={id} value={id}>
              {title}
            </MenuItem>
          ))
        : [],
    [groups],
  );
  const receivedGroups = useMemo(
    () =>
      Object.hasOwn(groups, "received")
        ? Object.values(groups.received).map(({ title, wg_paths }) =>
            wg_paths.map((wgPath) => (
              <MenuItem key={wgPath} value={wgPath}>
                {title}
              </MenuItem>
            )),
          )
        : [],
    [groups],
  );
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form method="POST" onSubmit={onClose}>
        <input type="hidden" name="type" value="create" />
        <DialogTitle>{t("requestTitle")}</DialogTitle>
        <DialogContent>
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel id="member">{t("member")}</InputLabel>
            <Select
              labelId="member"
              label={t("member")}
              defaultValue=""
              name="account"
              required
            >
              {members.map(({ account, firstname, lastname, email }) => (
                <MenuItem
                  key={account}
                  value={account}
                >{`${firstname} ${lastname} (${email})`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {Object.hasOwn(groups, "received") && (
            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel id="group">{t("group")}</InputLabel>
              <Select labelId="group" label={t("group")} name="wgPath">
                {receivedGroups}
              </Select>
            </FormControl>
          )}
          {Object.hasOwn(groups, "owned") && (
            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel id="group">{t("ownGroup")}</InputLabel>
              <Select labelId="group" label={t("ownGroup")} name="ownWG">
                {ownedGroups}
              </Select>
            </FormControl>
          )}
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

const RegistrationsTable = ({ registrations }) => {
  const { t } = useTranslation(null, { keyPrefix: "registrations" });
  const navigate = useNavigate();
  return (
    <table style={{ marginTop: 20 }}>
      <thead>
        <tr>
          <th>{t("group")}</th>
          <th>{t("member")}</th>
          <th>{t("createdAt")}</th>
          <th>{t("acceptedAt")}</th>
          <th>{t("deniedAt")}</th>
          <th>{t("status")}</th>
        </tr>
      </thead>
      <tbody>
        {registrations.map(
          ({
            id,
            reference,
            title,
            firstname,
            lastname,
            created_at,
            accepted_at,
            denied_at,
          }) => (
            <tr
              style={{ cursor: "default" }}
              onClick={() => navigate(`/registrations/${id}`)}
              key={id}
            >
              <td>{`${reference} ${title}`}</td>
              <td>{`${firstname} ${lastname}`}</td>
              <td>{new Date(created_at).toLocaleString()}</td>
              <td>
                {accepted_at ? new Date(accepted_at).toLocaleString() : ""}
              </td>
              <td>{denied_at ? new Date(denied_at).toLocaleString() : ""}</td>
              <td>
                {(denied_at && <CancelIcon />) ||
                  (accepted_at && <CheckCircleIcon />) || <PendingIcon />}
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};
const Registrations = () => {
  const { registrations, groups, members } = useLoaderData();
  const { t } = useTranslation(null, { keyPrefix: "registrations" });
  const [tab, setTab] = useState(0);
  const [modal, setModal] = useState(false);
  const groupsExist =
    groups &&
    (Object.hasOwn(groups, "owned") || Object.hasOwn(groups, "received"));
  return (
    <>
      {groupsExist && (
        <div style={{ margin: "0 1rem 1rem" }}>
          <Button variant="contained" onClick={() => setModal(true)}>
            {t("request")}
          </Button>
        </div>
      )}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={(_, val) => setTab(val)}
          aria-controls="tab-0"
          centered
        >
          <Tab label={t("sent")} id="tab-0" aria-controls="tab-0" />
          <Tab label={t("received")} id="tab-1" aria-controls="tab-1" />
        </Tabs>
      </Box>
      {!!registrations.sent.length && (
        <TabPanel value={tab} index={0}>
          <RegistrationsTable registrations={registrations.sent} />
        </TabPanel>
      )}
      {!!registrations.received && (
        <TabPanel value={tab} index={1}>
          <RegistrationsTable registrations={registrations.received} />
        </TabPanel>
      )}
      {groupsExist && (
        <RequestModal
          open={modal}
          onClose={() => setModal(false)}
          members={members}
          groups={groups}
        />
      )}
    </>
  );
};

export default Registrations;
