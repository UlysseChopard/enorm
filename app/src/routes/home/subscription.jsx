import { useLoaderData } from "react-router-dom";
import Button from "@mui/material/Button";
import { find } from "@/api/organisations/subscriptions";

export async function loader({ params }) {
  const res = await find(params.id);
  if (!res.ok) return res.status;
  return res.json();
}

export async function action() {
  return null;
}

export default function Subscription() {
  const res = useLoaderData();
  return (
    <div>
      <Button type="button" href="/subscriptions">
        Back
      </Button>
      <p>{JSON.stringify(res?.subscription)}</p>
    </div>
  );
}
