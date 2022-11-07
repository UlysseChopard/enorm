import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import { getExperts } from "../../../api/experts";
import { Link, Outlet } from "react-router-dom";

export async function loader() {
  return await getExperts();
}

export default function Experts() {
  const { t } = useTranslation(null, { keyPrefix: "experts" });
  const { experts } = useLoaderData();
  return (
    <>
      <h1 className="text-center">{t("title")}</h1>
      <div className="flex items-center justify-end">
        <Link to="declare">Declare an expert</Link>
        <Link to="upload">Upload a csv file of experts</Link>
      </div>
      <Outlet />
      <table>
        <tbody>
          {experts.map((expert) => (
            <tr key={expert.email}>
              <td>{expert.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
