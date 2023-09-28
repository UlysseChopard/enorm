import { useLoaderData } from "react-router-dom";
// import { useTranslation } from "react-i18next";

import { get, create, remove } from "@/api/admin/superusers";

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
  // const { t } = useTranslation(null, { keyPrefix: "superusers" });
  const { superusers } = useLoaderData();
  return JSON.stringify(superusers);
};

export default Superusers;
