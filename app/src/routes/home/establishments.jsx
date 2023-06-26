import { useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { get } from "@/api/establishments";

export async function loader() {
  const res = await get();
  return res.ok ? res.json() : false;
}
export async function action() {
  return null;
}

export default function Establishments() {
  const { establishments } = useLoaderData();
  const { t } = useTranslation(null, { keyPrefix: "establishments" });

  return (
    <>
      <h2>{t("title")}</h2>
      <ul>
        {establishments.map((e) => (
          <li key={e.id}>{JSON.stringify(e)}</li>
        ))}
      </ul>
    </>
  );
}
