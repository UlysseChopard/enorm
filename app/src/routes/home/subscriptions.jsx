import { useRef, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import { search, invite, getNews } from "@/api/subscriptions";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import AddLinkIcon from "@mui/icons-material/AddLink";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import CallReceivedIcon from "@mui/icons-material/CallReceived";

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

const GroupProvider = ({ id, firstname, lastname, email, status, action }) => (
  <ListItem
    key={id}
    secondaryAction={
      <IconButton edge="end" onClick={action}>
        {status === "sended" && <ScheduleIcon />}
        {status === "received" && <CallReceivedIcon />}
        {status === "accepted" && <LinkOffIcon />}
        {!status && <AddLinkIcon />}
      </IconButton>
    }
  >
    <ListItemText secondary={email}>{`${firstname} ${lastname}`}</ListItemText>
  </ListItem>
);

export default function Subscriptions() {
  const action = useActionData();
  const load = useLoaderData();
  // const { t } = useTranslation(null, { keyPrefix: "subscriptions" });
  const submit = useSubmit();
  const timeoutId = useRef(null);
  const [query, setQuery] = useState("");
  const [sended, setSended] = useState([]);
  const [received, setReceived] = useState([]);
  const [possible, setPossible] = useState([]);

  useEffect(() => {
    if (typeof load === "number") return;
    setSended(load.sended);
    setReceived(load.received);
  }, []);

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

  const handleInvite = (recipient) => async () => {
    console.log(recipient);
    const { status } = await invite(recipient.id);
    if (status === 201) {
      setSended([...sended, recipient]);
    }
  };

  return (
    <Stack>
      <TextField
        placeholder="Search group providers"
        id="text"
        name="text"
        onChange={handleSearch}
      />
      <List>
        {!query &&
          sended.map((recipient) => (
            <GroupProvider
              key={recipient.id}
              action={() => console.log("clicked")}
              status="sended"
              {...recipient}
            />
          ))}
        {!query &&
          received.map((recipient) => (
            <GroupProvider
              key={recipient.id}
              action={() => console.log("clicked")}
              status="received"
              {...recipient}
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
