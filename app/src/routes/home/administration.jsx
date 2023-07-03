import { useTranslation } from "react-i18next";
import Stack from "@mui/material/Stack";
import { apiUrl } from "@/api";

export function loader() {
  return true;
}

export async function action() {
  return true;
}

export default function Administration() {
  const { t } = useTranslation(null, { keyPrefix: "administration" });
  return (
    <>
      <div>
        <h2>Organisation name</h2>
        <form
          action={`${apiUrl}api/administration/users`}
          method="POST"
          encType="multipart/form-data"
        >
          <Stack spacing={2} width={300}>
            <input
              type="file"
              name="users"
              accept=".csv, .txt, text/csv, text/tab-separated-value"
            />
            <button type="submit">{t("submit")}</button>
          </Stack>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th colSpan="3">{t("account")}</th>
            <th colSpan="6">{t("rights")}</th>
          </tr>
          <tr>
            <th>{t("email")}</th>
            <th>{t("firstname")}</th>
            <th>{t("lastname")}</th>
            <th>{t("subscriptions")}</th>
            <th>{t("wg")}</th>
            <th>{t("registrations")}</th>
            <th>{t("establishments")}</th>
            <th>{t("admin")}</th>
            <th>{t("subscriptable")}</th>
          </tr>
        </thead>
        <tbody />
      </table>
    </>
  );
}
