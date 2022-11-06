import { useTranslation } from "react-i18next";
export async function loader() {}

export async function action() {}

export default function Experts() {
  const { t } = useTranslation(null, { keyPrefix: "experts" });
  return <p className="w-full h-screen text-center">{t("title")}</p>;
}
