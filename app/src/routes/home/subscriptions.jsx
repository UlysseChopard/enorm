import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import { search, invite, getNews, accept, deny } from "@/api/subscriptions";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import AddLinkIcon from "@mui/icons-material/AddLink";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import LinkIcon from "@mui/icons-material/Link";
import DoneIcon from "@mui/icons-material/Done";

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
          {new Set(["received", "sended", "connected"]).has(status) && (
            <LinkOffIcon />
          )}
          {!status && <AddLinkIcon />}
        </IconButton>
        {status === "received" && (
          <IconButton edge="end" onClick={accept}>
            <DoneIcon />
          </IconButton>
        )}
      </>
    }
  >
    {status && (
      <ListItemIcon>
        {(status === "received" || status === "sended") && <ScheduleIcon />}
        {status === "connected" && <LinkIcon />}
      </ListItemIcon>
    )}
    <ListItemText secondary={email}>{`${firstname} ${lastname}`}</ListItemText>
  </ListItem>
);

export default function Subscriptions() {
  const action = useActionData();
  const load = useLoaderData();
  const { t } = useTranslation(null, { keyPrefix: "subscriptions" });
  const submit = useSubmit();
  const timeoutId = useRef(null);
  const [query, setQuery] = useState("");
  const [sended, setSended] = useState([]);
  const [received, setReceived] = useState([]);
  const [possible, setPossible] = useState([]);
  const [connected, setConnected] = useState([]);

  useEffect(() => {
    if (typeof load === "number") return;
    setSended(load.sended);
    setReceived(load.received);
    setConnected(load.accepted);
  }, [load]);

  useEffect(() => {
    if (action?.results) setPossible(action.results);
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
      setConnected([...connected, recipient]);
      setReceived(received.filter(({ id }) => id !== recipient.id));
    }
  };

  const handleDeny = (recipient) => async () => {
    const { status } = await deny(recipient.id);
    if (status === 204) {
      setSended(sended.filter(({ id }) => id !== recipient.id));
      setReceived(received.filter(({ id }) => id !== recipient.id));
      setConnected(connected.filter(({ id }) => id !== recipient.id));
    }
  };

  const handleInvite = (recipient) => async () => {
    if (sended.map(({ id }) => id).includes(recipient.id)) return;
    const { status } = await invite(recipient.id);
    if (status === 201) {
      setSended([...sended, recipient]);
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
      <List>
        {!query &&
          sended.map((subscription) => (
            <GroupProvider
              key={subscription.id}
              action={handleDeny(subscription)}
              status="sended"
              {...subscription}
            />
          ))}
        {!query &&
          received.map((subscription) => (
            <GroupProvider
              key={subscription.id}
              accept={handleAccept(subscription)}
              action={handleDeny(subscription)}
              status="received"
              {...subscription}
            />
          ))}
        {!query &&
          connected.map((subscription) => (
            <GroupProvider
              key={subscription.id}
              action={handleDeny(subscription)}
              status="connected"
              {...subscription}
            />
          ))}
        {query &&
          possible.map((recipient) => (
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
    </Stack>
  );
}
