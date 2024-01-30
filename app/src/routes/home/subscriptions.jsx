import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import AddLinkIcon from "@mui/icons-material/AddLink";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import DoneIcon from "@mui/icons-material/Done";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@/components/TabPanel";
import {
  invite,
  get,
  establish,
  close,
} from "@/api/organisations/subscriptions";

export async function action({ request }) {
  const formData = await request.formData();
  const { type, recipient, query } = Object.fromEntries(formData);
  switch (type) {
    case "invite":
      return await invite(recipient).then((res) =>
        res.ok ? res.json() : res.status,
      );
    case "accept":
      return await establish(recipient).then((res) => res.status);
    case "close":
      return await close(recipient).then((res) => res.status);
    default:
      return await get(query).then((res) => (res.ok ? res.json() : res.status));
  }
}

export async function loader() {
  const res = await get();
  if (!res.ok) return res.status;
  return res.json();
}

const Organisation = ({ id, name, status, action, accept }) => (
  <ListItem key={id} href={`/subscriptions/${id}`}>
    <ListItemText>{name}</ListItemText>
    <ListItemSecondaryAction>
      <>
        {action && (
          <IconButton edge="end" onClick={action}>
            {status ? <LinkOffIcon /> : <AddLinkIcon />}
          </IconButton>
        )}
        {status === "received" && accept && (
          <IconButton edge="end" onClick={accept}>
            <DoneIcon />
          </IconButton>
        )}
      </>
    </ListItemSecondaryAction>
  </ListItem>
);

export default function Subscriptions() {
  const action = useActionData();
  const load = useLoaderData();
  const { t } = useTranslation(null, { keyPrefix: "subscriptions" });
  const submit = useSubmit();
  const timeoutId = useRef(null);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);
  const [tab, setTab] = useState(0);
  const [arePending, setArePending] = useState(false);
  const { isAdmin } = JSON.parse(localStorage.getItem("roles"));

  useEffect(() => {
    setArePending(load.sent.length || load.received.length);
  }, [load]);

  useEffect(() => {
    if (action?.subscriptions) setSearch(action.subscriptions);
  }, [action]);

  useEffect(() => {
    clearTimeout(timeoutId.current);
    if (query) {
      timeoutId.current = setTimeout(() => {
        const formData = new FormData();
        formData.append("query", query);
        submit(formData, { method: "POST" });
      }, 400);
    } else {
      submit();
    }
  }, [query, timeoutId, submit]);

  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleAccept = ({ id }) => {
    if (!isAdmin) return null;
    return () => {
      const formData = new FormData();
      formData.append("type", "accept");
      formData.append("recipient", id);
      submit(formData, { method: "POST" });
    };
  };

  const handleDeny = ({ id }) => {
    if (!isAdmin) return null;
    return () => {
      const formData = new FormData();
      formData.append("type", "close");
      formData.append("recipient", id);
      submit(formData, { method: "POST" });
    };
  };

  const handleInvite = ({ id }) => {
    if (!isAdmin) return null;
    return () => {
      const formData = new FormData();
      formData.append("type", "invite");
      formData.append("recipient", id);
      submit(formData, { method: "POST" });
      setSearch(search.filter((result) => result.id !== id));
    };
  };

  return (
    <Stack>
      <TextField
        placeholder={t("search")}
        id="text"
        name="text"
        type="search"
        onChange={handleSearch}
      />
      {query ? (
        <List>
          {search.map((organisation) => (
            <Organisation
              key={organisation.id}
              action={handleInvite(organisation)}
              status={
                load.sent.map(({ id }) => id).includes(organisation.id)
                  ? "sent"
                  : null
              }
              {...organisation}
            />
          ))}
        </List>
      ) : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tab}
              onChange={(_e, newValue) => setTab(newValue)}
              aria-label="tab-0"
              centered
            >
              {arePending && (
                <Tab
                  icon={<ScheduleIcon />}
                  iconPosition="start"
                  label={t("pending")}
                  id="pendings"
                  aria-controls="tab-0"
                />
              )}
              <Tab label={t("providers")} id="tab-1" aria-controls="tab-1" />
              <Tab label={t("subscribers")} id="tab-2" aria-controls="tab-2" />
            </Tabs>
          </Box>
          {arePending ? (
            <TabPanel value={tab} index={0}>
              <List>
                {load.sent.map((subscription) => (
                  <Organisation
                    key={subscription.id}
                    action={handleDeny(subscription)}
                    status="sent"
                    {...subscription}
                  />
                ))}
                {load.received.map((subscription) => (
                  <Organisation
                    key={subscription.id}
                    accept={handleAccept(subscription)}
                    action={handleDeny(subscription)}
                    status="received"
                    {...subscription}
                  />
                ))}
              </List>
            </TabPanel>
          ) : (
            ""
          )}
          <TabPanel value={tab} index={arePending ? 1 : 0}>
            <List>
              {load.providers.map((provider) => (
                <Organisation
                  key={provider.id}
                  action={handleDeny(provider)}
                  status="provided"
                  {...provider}
                />
              ))}
            </List>
          </TabPanel>
          <TabPanel value={tab} index={arePending ? 2 : 1}>
            <List>
              {load.subscribers.map((subscriber) => (
                <Organisation
                  key={subscriber.id}
                  action={handleDeny(subscriber)}
                  status="subscribed"
                  {...subscriber}
                />
              ))}
            </List>
          </TabPanel>
        </>
      )}
    </Stack>
  );
}
