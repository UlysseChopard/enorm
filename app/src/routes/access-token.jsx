import { redirect } from "react-router-dom";

export const loader = ({ params }) => {
  if (!params.first || !params.second || !params.third) return null;
  localStorage.setItem(
    "token",
    decodeURIComponent(`${params.first}.${params.second}.${params.third}`)
  );
  return redirect("/");
};

const AccessToken = () => <div>No token received</div>;

export default AccessToken;
