import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
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
import { get } from "@/api/registrations";

export const loader = async () => {
  const res = await get();
  return res.ok ? res.json() : res.status;
};

const RegistrationItem = (r) => (
  <ListItem component={Link} key={r.id} to={`/registrations/${r.id}`}>
    <ListItemText>{`${r.organisation} ${r.reference} ${r.title} -- ${r.firstname} ${r.lastname}`}</ListItemText>
    <ListItemIcon>
      {(r.denied_at && <CancelIcon />) ||
        (r.accepted_at && <CheckCircleIcon />) || <PendingIcon />}
    </ListItemIcon>
  </ListItem>
);

const Registrations = () => {
  const { sended, received } = useLoaderData();
  const { t } = useTranslation(null, { keyPrefix: "registrations" });
  const [tab, setTab] = useState(0);
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={(_, val) => setTab(val)}
          aria-controls="tab-0"
          centered
        >
          <Tab label={t("sended")} id="tab-0" aria-controls="tab-0" />
          <Tab label={t("received")} id="tab-1" aria-controls="tab-1" />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <List>{sended.map(RegistrationItem)}</List>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <List>{received.map(RegistrationItem)}</List>
      </TabPanel>
    </>
  );
};

export default Registrations;
