import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import { getExperts } from "../../api/experts";

export async function loader() {
  return await getExperts();
}

export async function action() {}

export default function Experts() {
  const { t } = useTranslation(null, { keyPrefix: "experts" });
  const { experts } = useLoaderData();
  return (
    <>
      <h1 className="w-full h-screen text-center">{t("title")}</h1>
      <table>
        <tbody>
          {experts.map((expert) => (
            <tr key={expert.email}>
              <td>expert.email</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
