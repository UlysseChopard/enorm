import { useLoaderData, Form } from "react-router-dom";
import Button from "@mui/material/button";
import { useTranslation } from "react-i18next";
import { getById, join } from "@/api/groups";

export const loader = async ({ params }) => {
  const res = await getById(params.id);
  return res.ok ? res.json() : res.status;
};

export const action = async ({ params }) => {
  const res = await join(params.id);
  return res.ok ? res.json() : res.status;
};

const Groups = () => {
  // const group = useLoaderData();
  const { t } = useTranslation(null, { keyPrefix: "group" });
  return (
    <Form method="POST">
      <Button type="submit">{t("join")}</Button>
    </Form>
  );
};

export default Groups;
