import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import { getManagers } from "../../../api/managers";
import { Link, Outlet } from "react-router-dom";

export async function loader() {
  return await getManagers();
}

export default function Managers() {
  const { t } = useTranslation(null, { keyPrefix: "managers" });
  const { managers } = useLoaderData();
  return (
    <>
      <h1 className="text-center">{t("title")}</h1>
      <div className="flex items-center justify-end">
        <Link to="declare">{t("declare")}</Link>
        <Link to="upload">{t("upload")}</Link>
      </div>
      <Outlet />
      <table>
        <tbody>
          {managers.map((manager) => (
            <tr key={manager.email}>
              <td>{manager.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
