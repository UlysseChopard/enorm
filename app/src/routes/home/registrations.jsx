import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useSubmit } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import TabPanel from "@/components/TabPanel";
import { get, accept, deny } from "@/api/registrations";

export const loader = async () => {
  const res = await get();
  return res.ok ? res.json() : res.status;
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
  const { sended, received } = useLoaderData();
  const { t } = useTranslation(null, { keyPrefix: "registrations" });
  const [tab, setTab] = useState(0);
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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={(_, val) => setTab(val)}
          ariaControls="tab-0"
          centered
        >
          <Tab label={t("sended")} id="tab-0" ariaControls="tab-0" />
          <Tab label={t("received")} id="tab-1" ariaControls="tab-1" />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <List>
          {sended.map((r) => (
            <ListItem key={r.id}>
              <ListItemText>{`${r.organisation} ${r.reference} ${r.title}`}</ListItemText>
              <ListItemIcon>
                {(r.denied_at && <CancelIcon />) ||
                  (r.accepted_at && <CheckCircleIcon />) || <PendingIcon />}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </TabPanel>
      <TabPanel value={tab} index={1}>
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
      </TabPanel>
    </>
  );
};

export default Registrations;
