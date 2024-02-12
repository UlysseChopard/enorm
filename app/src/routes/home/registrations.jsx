import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useSubmit, useNavigate } from "react-router-dom";
import ForwardIcon from "@mui/icons-material/Forward";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import { get, create } from "@/api/organisations/registrations";
import { get as getGroups } from "@/api/organisations/working-groups";
import { get as getMembers } from "@/api/organisations/members";
import "./registrations.module.css";

export const loader = async () => {
  const requests = [get(), getGroups()];
  if (!JSON.parse(localStorage.getItem("roles")).isExpert) {
    requests.push(getMembers());
  }
  const responses = await Promise.all(requests);
  for (const response of responses) {
    if (!response.ok) {
      throw new Error(response.status);
    }
  }
  const [{ registrations }, { groups }, { members } = { members: null }] =
    await Promise.all(responses.map((r) => r.json()));
  return { registrations, groups, members };
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  switch (formData.get("type")) {
    case "create":
      return create(Object.fromEntries(formData)).then((r) =>
        r.ok ? r.json() : r.status,
      );
    default:
      throw new Error("Unknown type for action");
  }
};

const RequestModal = ({ open, onClose, members, groups }) => {
  const { t } = useTranslation(null, { keyPrefix: "registrations" });
  const [member, setMember] = useState(null);
  const [group, setGroup] = useState(null);
  const [wgPath, setWgPath] = useState(null);
  const [wgPaths, setWgPaths] = useState(null);
  const submit = useSubmit();

  const onClick = () => {
    const formData = new FormData();
    formData.set("type", "create");
    if (!group) return;
    formData.set("wg", group);
    if (!members) {
      formData.set("beneficiary", localStorage.getItem("account"));
    } else if (member) {
      formData.set("beneficiary", member);
    } else {
      return;
    }
    if (wgPath) {
      formData.set("wgPath", wgPath);
    }
    submit(formData, { method: "POST" });
    onClose();
  };
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>{t("requestTitle")}</DialogTitle>
      <DialogContent>
        {!!members && (
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel id="member">{t("member")}</InputLabel>
            <Select
              labelId="member"
              label={t("member")}
              value={member}
              onChange={(e) => setMember(e.target.value)}
              required
            >
              {members.map(({ account, firstname, lastname, email }) => (
                <MenuItem
                  key={account}
                  value={account}
                >{`${firstname ? firstname : ""} ${lastname ? lastname : ""} (${email})`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <FormControl sx={{ mt: 2 }} fullWidth>
          <InputLabel id="group">{t("group")}</InputLabel>
          <Select
            labelId="group"
            label={t("group")}
            value={group}
            onChange={(e) => {
              setGroup(e.target.value);
              const newWgPaths = groups.find(
                ({ id }) => parseInt(id) === parseInt(e.target.value),
              )?.wg_paths;
              setWgPaths(newWgPaths);
              if (newWgPaths) {
                setWgPath(newWgPaths[0].id);
              }
            }}
            required
          >
            {groups.map(({ title, id }) => (
              <MenuItem key={id} value={id}>
                {title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {!!wgPaths?.length && (
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel id="wgPath">{t("wgPath")}</InputLabel>
            <Select
              labelId="wgPath"
              label={t("wgPath")}
              value={wgPath}
              onChange={(e) => setWgPath(e.target.value)}
              disabled={wgPath.length === 1}
              required
            >
              {wgPaths.map(({ id, organisation }) => (
                <MenuItem key={id} value={id}>
                  {organisation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("cancel")}</Button>
        <Button variant="contained" onClick={onClick}>
          {t("submit")}
        </Button>
      </DialogActions>
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
          <th>{t("memberOrganisation")}</th>
          <th>{t("createdAt")}</th>
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
            forwarded,
            accepted_at,
            denied_at,
            organisation_name,
          }) => (
            <tr
              style={{ cursor: "default" }}
              onClick={() => navigate(`/registrations/${id}`)}
              key={id}
            >
              <td>{`${reference} ${title}`}</td>
              <td>{`${firstname} ${lastname}`}</td>
              <td>{organisation_name}</td>
              <td>{new Date(created_at).toLocaleString()}</td>
              <td style={{ textAlign: "center" }}>
                <Tooltip
                  title={
                    (denied_at &&
                      `${t("deniedAt")} ${new Date(denied_at).toLocaleString()}`) ||
                    (accepted_at &&
                      `${t("acceptedAt")} ${new Date(accepted_at).toLocaleString()}`) ||
                    (forwarded && t("forwarded")) ||
                    t("inProgress")
                  }
                >
                  {(denied_at && <CancelIcon />) ||
                    (accepted_at && <CheckCircleIcon />) ||
                    (forwarded && <ForwardIcon />) || <PendingIcon />}
                </Tooltip>
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
  const [modal, setModal] = useState(false);
  return (
    <>
      {!!groups && (
        <div style={{ margin: "0 1rem 1rem" }}>
          <Button variant="contained" onClick={() => setModal(true)}>
            {t("request")}
          </Button>
        </div>
      )}
      <RegistrationsTable registrations={registrations} />
      {!!groups && (
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
