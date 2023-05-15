import { useSubmit, useLoaderData, useActionData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getById } from "@/api/working-groups";
import { request } from "@/api/registrations";
import Button from "@mui/material/Button";

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
      <Button to="/groups">{t("back")}</Button>
      <div>{JSON.stringify(wg, null, 4)}</div>
      <Button variant="contained" onClick={submit}>
        {t("join")}
      </Button>
      <div>{JSON.stringify(actionData, null, 4)}</div>
    </>
  );
};

export default Group;
