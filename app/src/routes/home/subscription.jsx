import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
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

export async function action({ request }) {
  const formData = await request.FormData();
  return null;
}

export default function Subscription() {
  const { subscription, members } = useLoaderData();
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
      <Paper>
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
      </Paper>
      <p>{JSON.stringify(subscription)}</p>
      <p>{JSON.stringify(members)}</p>
    </Container>
  );
}
