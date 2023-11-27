import { useTranslation } from "react-i18next";
import { useLoaderData, useSubmit } from "react-router-dom";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { add } from "@/api/organisations/subscriptions/managers";
import { find } from "@/api/organisations/subscriptions";
import { get } from "@/api/organisations/members";

export async function loader({ params }) {
  const res = await find(params.id);
  if (!res.ok) throw new Error(res.status);
  const resOm = await get({ isManager: true });
  if (!resOm.ok) throw new Error(res.status);
  const { subscription } = await res.json();
  const { members } = await resOm.json();
  return { subscription, members };
}

export async function action({ params, request }) {
  const formData = await request.formData();
  switch (formData.get("type")) {
    case "addManager":
      return await add(params.id, formData.get("member")).then((r) =>
        r.ok ? r.json() : r.status
      );
  }
  return null;
}

export default function Subscription() {
  const { subscription, members } = useLoaderData();
  const submit = useSubmit();
  const { t } = useTranslation(null, { keyPrefix: "subscription" });
  return (
    <Container>
      <Button
        type="button"
        href="/subscriptions"
        sx={{ position: "relative", top: 50 }}
      >
        Back
      </Button>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        {localStorage.getItem("organisation") == subscription.sender
          ? subscription.recipient_name
          : subscription.sender_name}
      </Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          <ListItem>{`${t("sentAt")}: ${new Date(
            subscription.sent_at
          ).toLocaleString()}`}</ListItem>
          <ListItem>{`${t("receivedAt")}: ${new Date(
            subscription.received_at
          ).toLocaleString()}`}</ListItem>
          <ListItem>{`${t("acceptedAt")}: ${new Date(
            subscription.accepted_at
          ).toLocaleString()}`}</ListItem>
        </List>
        <FormControl sx={{ ml: 2, width: "35%" }}>
          <InputLabel id="select-label">{t("newManager")}</InputLabel>
          <Select
            label={t("newManager")}
            value=""
            labelId="select-label"
            onChange={(e) => {
              const formData = new FormData();
              formData.append("type", "addManager");
              formData.append("member", e.target.value);
              submit(formData, { method: "POST" });
            }}
          >
            {members
              .filter(
                ({ id }) =>
                  !subscription.managers
                    .map(({ manager }) => manager)
                    .includes(id)
              )
              .map(({ id, firstname, lastname }) => (
                <MenuItem
                  key={id}
                  value={id}
                >{`${firstname} ${lastname}`}</MenuItem>
              ))}
          </Select>
        </FormControl>
        {!!subscription.managers.length && (
          <>
            <Divider sx={{ mt: 4 }} />
            <Typography sx={{ ml: 2, mt: 2 }} variant="h5">
              {t("managers")}
            </Typography>
          </>
        )}
        <List>
          {subscription.managers.map(({ firstname, lastname, id }) => (
            <ListItem key={id}>{`${firstname} ${lastname}`}</ListItem>
          ))}
        </List>
      </Paper>
      <p>{JSON.stringify(subscription)}</p>
      <p>{JSON.stringify(members)}</p>
    </Container>
  );
}
