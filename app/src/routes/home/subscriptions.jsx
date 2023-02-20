import { useRef, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import { useActionData, useSubmit } from "react-router-dom";
import { search, invite } from "@/api/subscriptions";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import AddLinkIcon from "@mui/icons-material/AddLink";

export async function action({ request }) {
  const formData = await request.formData();
  const objData = Object.fromEntries(formData);
  const res = await search(objData);
  if (!res.ok) return res.status;
  return res.json();
}

export default function Subscriptions() {
  const res = useActionData();
  // const { t } = useTranslation(null, { keyPrefix: "subscriptions" });
  const submit = useSubmit();
  const timeoutId = useRef(null);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    clearTimeout(timeoutId.current);
    if (query) {
      timeoutId.current = setTimeout(
        () => submit({ query }, { method: "post" }),
        400
      );
    }
  }, [query, timeoutId, submit]);

  return (
    <Stack>
      <TextField
        placeholder="Search group providers"
        id="text"
        name="text"
        onChange={handleSearch}
      />
      <List>
        {query &&
          res?.accounts &&
          res.accounts.map(({ id, firstname, lastname, email }) => (
            <ListItem
              key={id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="connect"
                  onClick={() => invite(id)}
                >
                  <AddLinkIcon />
                </IconButton>
              }
            >
              <ListItemText
                secondary={email}
              >{`${firstname} ${lastname}`}</ListItemText>
            </ListItem>
          ))}
      </List>
    </Stack>
  );
}
