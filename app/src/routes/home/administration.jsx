import { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Stack from "@mui/material/Stack";
import { uploadUsers, get, updateOrganisation } from "@/api/administration";

export async function loader() {
  const res = await get();
  return res.ok ? res.json() : res.status;
}

export async function action({ request }) {
  const formData = await request.formData();
  for (const data of formData) {
    console.log(data);
  }
  console.log(formData);
  let res;
  switch (formData.get("type")) {
    case "updateOrganisation":
      res = await updateOrganisation(
        formData.get("organisationId"),
        formData.get("name")
      );
      break;
    case "uploadUsers":
      res = await uploadUsers(formData, {
        emailColumn: formData.get("email-column"),
        separator: formData.get("separator"),
      });
      break;
    default:
      return null;
  }
  return res.ok ? res.json() : res.status;
}

export default function Administration() {
  const { t } = useTranslation(null, { keyPrefix: "administration" });
  const { organisation, users } = useLoaderData();
  const [separator, setSeparator] = useState(",");
  const [emailColumn, setEmailColumn] = useState("email");
  return (
    <>
      <div>
        <h2>{organisation?.name ?? t("emptyName")}</h2>
        <Form method="PUT" autoComplete="on">
          <label htmlFor="name">{t("name")}</label>
          <input
            type="text"
            name="name"
            defaultValue={organisation?.name ?? t("fillName")}
          />
          <input type="hidden" name="type" value="updateOrganisation" />
          <input type="hidden" name="organisationId" value={organisation.id} />
          <button type="submit">{t("submit")}</button>
        </Form>
        <Form method="POST" encType="multipart/form-data">
          <Stack spacing={2} width={300}>
            <input
              type="file"
              name="users"
              accept=".csv, .txt, text/csv, text/tab-separated-value"
            />
            <label htmlFor="separator">{t("separator")}</label>
            <input
              type="text"
              maxLength="1"
              name="separator"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
            />
            <label htmlFor="email-column">{t("emailColumn")}</label>
            <input
              type="text"
              name="email-column"
              value={emailColumn}
              onChange={(e) => setEmailColumn(e.target.value)}
            />
            <input type="hidden" name="type" value="uploadUsers" />
            <button type="submit">{t("submit")}</button>
          </Stack>
        </Form>
        {/*<form
          action={`${apiUrl}api/administration/users?separator=${encodeURIComponent(
            separator
          )}&email-column=${encodeURIComponent(emailColumn)}`}
          method="POST"
          encType="multipart/form-data"
        >
          <Stack spacing={2} width={300}>
            <input
              type="file"
              name="users"
              accept=".csv, .txt, text/csv, text/tab-separated-value"
            />
            <label htmlFor="separator">{t("separator")}</label>
            <input
              type="text"
              maxLength="1"
              name="separator"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
            />
            <label htmlFor="email-col">{t("emailColumn")}</label>
            <input
              type="text"
              name="email-col"
              value={emailColumn}
              onChange={(e) => setEmailColumn(e.target.value)}
            />
            <button type="submit">{t("submit")}</button>
          </Stack>
        </form>*/}
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
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
