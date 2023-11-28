import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, Form } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
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
import { get as getWGs } from "@/api/organisations/working-groups";
import { get as getOm } from "@/api/organisations/members";

export const loader = async () => {
  const res = await get();
  if (!res.ok) return res.status;
  const { sent, received } = await res.json();
  const wgRes = await getWGs();
  if (!wgRes.ok) return wgRes.status;
  const { groups } = await wgRes.json();
  const omRes = await getOm();
  if (!omRes.ok) return omRes.status;
  const { members } = await omRes.json();
  return { sent, received, groups, members };
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  switch (formData.get("type")) {
    case "create":
      return create(Object.fromEntries(formData)).then((r) =>
        r.ok ? r.json() : r.status
      );
    case "accept":
      return accept(formData.get("registration"), formData.get("wgPath")).then(
        (r) => (r.ok ? r.json() : r.status)
      );
    case "deny":
      return deny(formData.get("registration")).then((r) =>
        r.ok ? r.json() : r.status
      );
    default:
      throw new Error("Unknown type for action");
  }
};

const RequestModal = ({ open, onClose, members, workingGroups }) => {
  const { t } = useTranslation(null, { keyPrefix: "registrations" });
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form method="POST" onSubmit={onClose}>
        <input type="hidden" name="type" value="create" />
        <DialogTitle>{t("requestTitle")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("text")}</DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="member">{t("member")}</InputLabel>
            <Select labelId="member" label={t("member")} name="account">
              {members.map(({ account, firstname, lastname }) => (
                <MenuItem
                  key={account}
                  value={account}
                >{`${firstname} ${lastname}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="workingGroup">{t("workingGroup")}</InputLabel>
            <Select
              labelId="workingGroup"
              label={t("workingGroup")}
              name="workingGroup"
            >
              {workingGroups.map(({ id, title }) => (
                <MenuItem key={id} value={id}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

const RegistrationItem = (r) => (
  <ListItem component={Link} key={r.id} to={`/registrations/${r.id}`}>
    <ListItemText>
      {`${r.organisation} ${r.reference} ${r.title}`} &mdash;
      {` ${r.firstname} ${r.lastname}`}
    </ListItemText>
    <ListItemIcon>
      {(r.denied_at && <CancelIcon />) ||
        (r.accepted_at && <CheckCircleIcon />) || <PendingIcon />}
    </ListItemIcon>
  </ListItem>
);

const Registrations = () => {
  const { sent, received, groups: workingGroups, members } = useLoaderData();
  const { t } = useTranslation(null, { keyPrefix: "registrations" });
  const [tab, setTab] = useState(0);
  const [modal, setModal] = useState(false);
  return (
    <>
      <div style={{ margin: "0 1rem 1rem" }}>
        <Button variant="contained" onClick={() => setModal(true)}>
          {t("request")}
        </Button>
      </div>
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
      <TabPanel value={tab} index={0}>
        <List>{sent.map(RegistrationItem)}</List>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <List>{received.map(RegistrationItem)}</List>
      </TabPanel>
      <RequestModal
        open={modal}
        onClose={() => setModal(false)}
        members={members}
        workingGroups={workingGroups}
      />
    </>
  );
};

export default Registrations;
