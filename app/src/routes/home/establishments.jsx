import { useLoaderData, Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { get, create } from "@/api/establishments";

export async function loader() {
  const res = await get();
  return res.ok ? res.json() : false;
}
export async function action({ request }) {
  const formData = await request.formData();
  const establishment = Object.fromEntries(formData);
  const res = await create(establishment);
  return res.ok ? res.json() : false;
}

export default function Establishments() {
  const { establishments } = useLoaderData();
  const { t } = useTranslation(null, { keyPrefix: "establishments" });

  return (
    <>
      <Form method="POST">
        <input type="text" name="name" label={t("name")} />
        <input type="text" name="address" label={t("address")} />
        <input type="text" name="email" label={t("email")} />
        <input type="text" name="phone" label={t("phone")} />
        <button type="submit">{t("submit")}</button>
      </Form>
      <h2>{t("title")}</h2>
      <ul>
        {establishments.map((e) => (
          <li key={e.id}>{JSON.stringify(e)}</li>
        ))}
      </ul>
    </>
  );
}
