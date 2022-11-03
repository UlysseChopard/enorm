import { useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation(null, { keyPrefix: "errorPage" });
  const error = useRouteError();
  console.error(error);
  return (
    <div id="error-page">
      <h1>{t("title")}</h1>
      <p>{t("subtitle")}</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
