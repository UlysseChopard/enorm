import { useSubmit, useLoaderData, redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { find, remove } from "@/api/organisations/working-groups";

export const loader = async ({ params }) => {
  const res = await find(params.id);
  return res.json();
};

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  let res;
  switch (formData.get("type")) {
    case "delete":
      res = await remove(params.id);
      return res.ok ? redirect("/groups") : res.json();
  }
};

const Group = () => {
  const { wg } = useLoaderData();
  const submit = useSubmit();
  const { t } = useTranslation(null, { keyPrefix: "group" });
  const { isAdmin } = JSON.parse(localStorage.getItem("roles"));
  const organisation = parseInt(localStorage.getItem("organisation"));
  const handleClick = () => {
    const formData = new FormData();
    formData.append("type", "delete");
    submit(formData, { method: "DELETE" });
  };
  return (
    <div>
      <div>
        <Button variant="outlined" to="/groups">
          {t("back")}
        </Button>
      </div>
      <div>
        <Card>
          <CardContent>
            <Typography variant="h2" gutterBottom>
              {wg.title}
            </Typography>
            <Typography>{`${t("reference")}: ${wg.reference}`}</Typography>
            <Typography>{`${t("organisationName")}: ${
              wg.organisation_name
            }`}</Typography>
            <Typography>{`${t("createdAt")}: ${new Date(
              wg.created_at
            ).toLocaleDateString()}`}</Typography>
          </CardContent>
          {isAdmin && wg.organisation === organisation && (
            <CardActions>
              <Button onClick={handleClick}>{t("delete")}</Button>
            </CardActions>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Group;
