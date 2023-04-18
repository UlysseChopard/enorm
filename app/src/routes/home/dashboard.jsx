import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation(null, { keyPrefix: "dashboard" });
  return (
    <>
      <h1>{t("title")}</h1>
      <p>{t("subtitle")}</p>
    </>
  );
};

export default Dashboard;
