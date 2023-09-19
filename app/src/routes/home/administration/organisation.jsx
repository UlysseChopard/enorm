import { Form, useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { get, replace } from "@/api/organisations";

export async function loader() {
  const res = await get();
  return res.ok ? res.json() : res.status;
}

export async function action({ request }) {
  const formData = await request.formData();
  const res = await replace(formData.get("name"));
  return res.ok ? res.json() : res.status;
}

export default function Organisation() {
  const { t } = useTranslation(null, { keyPrefix: "organisation" });
  const { organisation } = useLoaderData();
  return (
    <Form method="POST">
      <TextField name="name" defaultValue={organisation.name} />
      <Button type="submit">{t("submit")}</Button>
    </Form>
  );
}
