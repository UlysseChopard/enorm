import { useTranslation } from "react-i18next";
import { useLoaderData, redirect } from "react-router-dom";
import { sendActivation, activate } from "../api/accounts";

export async function loader({ params }) {
  const { uuid } = params;
  if (uuid) {
    const res = await activate(params.uuid);
    if (res.ok) return redirect("/");
  } else {
    const res = await sendActivation();
    return res.ok;
  }
}
export default function Activate() {
  const mailSent = useLoaderData();
  const { t } = useTranslation(null, { keyPrefix: "activate" });
  return (
    <>
      <h1>{t("title")}</h1>
      {mailSent && <p>{t("instructions")}</p>}
    </>
  );
}
