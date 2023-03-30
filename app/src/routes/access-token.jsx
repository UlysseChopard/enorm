import { redirect } from "react-router-dom";
import { requestAccess } from "@/api/sessions";

export const loader = async ({ params }) => {
  if (!params.first || !params.second || !params.third) return null;
  const token = decodeURIComponent(
    `${params.first}.${params.second}.${params.third}`
  );
  const res = await requestAccess(token);
  if (!res.ok) return redirect("/login");
  return redirect("/");
};

const AccessToken = () => <div>No token received</div>;

export default AccessToken;
