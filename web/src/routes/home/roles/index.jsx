import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import { getRoles } from "@/api/roles";

export async function loader() {
  return await getRoles();
}

export default function Roles() {
  const { t } = useTranslation(null, { keyPrefix: "roles" });
  const { roles } = useLoaderData();
  return (
    <>
      <h1 className="text-center">{t("title")}</h1>
      <div className="flex items-center justify-end">
        <Link to="declare">{t("connect")}</Link>
      </div>
      <Outlet />
      {roles ? <table>
        <tbody>
          {roles.map((role) => (
            <tr key={role.email}>
              <td>{role.email}</td>
            </tr>
          ))}
        </tbody>
      </table> : <p>No user connected until now</p>}
    </>
  );
}
