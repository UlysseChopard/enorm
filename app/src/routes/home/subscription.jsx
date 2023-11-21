import { useLoaderData } from "react-router-dom";
import Button from "@mui/material/Button";
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
  return (
    <div>
      <Button type="button" href="/subscriptions">
        Back
      </Button>
      <p>{JSON.stringify(subscription)}</p>
      <p>{JSON.stringify(members)}</p>
    </div>
  );
}
