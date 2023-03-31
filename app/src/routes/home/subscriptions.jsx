import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import { search, invite, getNews, accept, deny } from "@/api/subscriptions";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import AddLinkIcon from "@mui/icons-material/AddLink";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import DoneIcon from "@mui/icons-material/Done";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export async function action({ request }) {
  const formData = await request.formData();
  const objData = Object.fromEntries(formData);
  const res = await search(objData);
  if (!res.ok) return res.status;
  return res.json();
}

export async function loader() {
  const res = await getNews();
  if (!res.ok) return res.status;
  return res.json();
}

const GroupProvider = ({
  id,
  firstname,
  lastname,
  email,
  status,
  action,
  accept,
}) => (
  <ListItem
    key={id}
    secondaryAction={
      <>
        <IconButton edge="end" onClick={action}>
          {status ? <LinkOffIcon /> : <AddLinkIcon />}
        </IconButton>
        {status === "received" && (
          <IconButton edge="end" onClick={accept}>
            <DoneIcon />
          </IconButton>
        )}
      </>
    }
  >
    <ListItemText secondary={email}>{`${firstname} ${lastname}`}</ListItemText>
  </ListItem>
);

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tab-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export default function Subscriptions() {
  const action = useActionData();
  const load = useLoaderData();
  const { t } = useTranslation(null, { keyPrefix: "subscriptions" });
  const submit = useSubmit();
  const timeoutId = useRef(null);
  const [query, setQuery] = useState("");
  const [sended, setSended] = useState([]);
  const [received, setReceived] = useState([]);
  const [search, setSearch] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setSended(load.sended);
    setReceived(load.received);
    setSubscribers(load.subscribers);
    setProviders(load.providers);
  }, [load]);

  useEffect(() => {
    if (action?.results) setSearch(action.results);
  }, [action]);

  useEffect(() => {
    clearTimeout(timeoutId.current);
    if (query) {
      timeoutId.current = setTimeout(
        () => submit({ query }, { method: "post" }),
        400
      );
    } else {
      submit();
    }
  }, [query, timeoutId, submit]);

  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleAccept = (recipient) => async () => {
    const { status } = await accept(recipient.id);
    if (status === 201) {
      setSubscribers([...subscribers, recipient]);
      setReceived(received.filter(({ id }) => id !== recipient.id));
    }
  };

  const handleDeny = (recipient) => async () => {
    const { status } = await deny(recipient.id);
    if (status === 204) {
      setSended(sended.filter(({ id }) => id !== recipient.id));
      setReceived(received.filter(({ id }) => id !== recipient.id));
      setSubscribers(subscribers.filter(({ id }) => id !== recipient.id));
      setProviders(providers.filter(({ id }) => id !== recipient.id));
    }
  };

  const handleInvite = (recipient) => async () => {
    const { status } = await invite(recipient.id);
    if (status === 201) {
      setSended([...sended, recipient]);
      setSearch(search.filter(({ id }) => id !== recipient.id));
    }
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
          {search.map((recipient) => (
            <GroupProvider
              key={recipient.id}
              action={handleInvite(recipient)}
              status={
                sended.map(({ id }) => id).includes(recipient.id)
                  ? "sended"
                  : null
              }
              {...recipient}
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
              <Tab
                icon={<ScheduleIcon />}
                iconPosition="start"
                label={t("pending")}
                id="pendings"
                aria-controls="tab-0"
              />
              <Tab label={t("providers")} id="tab-1" aria-controls="tab-1" />
              <Tab label={t("subscribers")} id="tab-2" aria-controls="tab-2" />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0}>
            <List>
              {sended.map((subscription) => (
                <GroupProvider
                  key={subscription.id}
                  action={handleDeny(subscription)}
                  status="sended"
                  {...subscription}
                />
              ))}
              {received.map((subscription) => (
                <GroupProvider
                  key={subscription.id}
                  accept={handleAccept(subscription)}
                  action={handleDeny(subscription)}
                  status="received"
                  {...subscription}
                />
              ))}
            </List>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <List>
              {providers.map((provider) => (
                <GroupProvider
                  key={provider.id}
                  action={handleDeny(provider)}
                  status="provided"
                  {...provider}
                />
              ))}
            </List>
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <List>
              {subscribers.map((subscriber) => (
                <GroupProvider
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
