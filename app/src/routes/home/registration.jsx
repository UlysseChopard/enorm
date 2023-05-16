import { useLoaderData, useActionData } from "react-router-dom";
import { find, accept, deny } from "@/api/registrations";

export const loader = async ({ params }) => {
  const res = await find(params.id);
  return res.ok ? res.json() : res.status;
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  let res;
  switch (formData.get("type")) {
    case "deny":
      res = await deny(params.id);
      break;
    case "accept":
      res = await accept(params.id, request.get("wgPath"));
      break;
  }
  return res.ok ? res.json() : res.status;
};

const Registration = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  return (
    <>
      <p>{JSON.stringify(loaderData)}</p>
      <p>{JSON.stringify(actionData)}</p>
    </>
  );
};

export default Registration;
