import { useSubmit, useLoaderData, useActionData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getById } from "@/api/working-groups";
import { request } from "@/api/registrations";

export const loader = async ({ params }) => {
  const res = await getById(params.id);
  return res.ok ? res.json() : false;
};

export const action = async ({ params }) => {
  const res = await request(params.id);
  return res.ok ? res.json() : false;
};

const Group = () => {
  const wg = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  const { t } = useTranslation();
  return (
    <>
      <div>{JSON.stringify(wg, null, 4)}</div>
      <button onClick={submit}>{t("join")}</button>
      <div>{JSON.stringify(actionData, null, 4)}</div>
    </>
  );
};

export default Group;
