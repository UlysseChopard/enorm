import { useLoaderData } from "react-router-dom";
// import { useTranslation } from "react-i18next";

import { get, create, remove } from "@/api/admin/organisations";

export const loader = async () => {
  const res = await get();
  return res.json();
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  let res;
  switch (formData.get("type")) {
    case "create":
      res = await create(Object.fromEntries(formData));
      break;
    case "remove":
      res = await remove(formData.get("id"));
      break;
    default:
      throw new Error("Type does not exists");
  }
  return res.json();
};

const Superusers = () => {
  // const { t } = useTranslation(null, { keyPrefix: "organisations" });
  const { organisations } = useLoaderData();
  return JSON.stringify(organisations);
};

export default Superusers;
