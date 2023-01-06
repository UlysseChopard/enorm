import { redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout } from "@/api/sessions";

export async function loader() {
  try {
    const res = await logout();
    if (!res.ok) console.error(res);
    else {
      return redirect("/login");
    }
  } catch (err) {
    return err;
  }
}

export default function Logout() {
  const { t } = useTranslation(null, { keyPrefix: "logout" });
  return <p>{t("msg")}</p>;
}
