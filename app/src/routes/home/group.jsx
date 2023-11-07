import { useState, useEffect } from "react";
import {
  useSubmit,
  useLoaderData,
  useActionData,
  redirect,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SelectProvider from "@/components/SelectProvider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { request as requestRegistration } from "@/api/organisations/registrations";
import { find, remove } from "@/api/organisations/working-groups";

export const loader = async ({ params }) => {
  const res = await find(params.id);
  return res.json();
};

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  let res;
  switch (formData.get("type")) {
    case "register":
      res = await requestRegistration({ wgPath: formData.get("wgPath") });
      return res.json();
    case "delete":
      res = await remove(params.id);
      return res.ok ? redirect("/groups") : res.json();
  }
};

const Group = () => {
  const { wg } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  const { t } = useTranslation(null, { keyPrefix: "group" });
  const [wgPath, setWgPath] = useState("");
  const { isAdmin, isManager } = JSON.parse(localStorage.getItem("roles"));
  useEffect(() => {
    if (wg.wgPaths.length == 1) {
      setWgPath(wg.wgPaths[0].id);
    }
  }, [wg]);
  const handleSubmitRegister = () => {
    const formData = new FormData();
    formData.append("type", "register");
    formData.append("wgPath", wgPath);
    submit(formData, { method: "post" });
  };
  const handleSubmitDelete = () => {
    const formData = new FormData();
    formData.append("type", "delete");
    submit(formData, { method: "delete" });
  };
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Button variant="outlined" to="/groups">
          {t("back")}
        </Button>
      </Grid>
      <Grid item>
        <div>{JSON.stringify(actionData, null, 4)}</div>
      </Grid>
      <Grid item>
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
          <CardActions>
            {wg.wgPaths.length !== 0 && (
              <>
                <SelectProvider
                  wgPaths={wg.wgPaths}
                  onChange={(e) => setWgPath(e.target.value)}
                  value={wgPath}
                />
                <Button
                  variant="contained"
                  disabled={!wgPath}
                  onClick={handleSubmitRegister}
                >
                  {t("join")}
                </Button>
              </>
            )}
            {(isAdmin || isManager) && (
              <Button variant="contained" onClick={handleSubmitDelete}>
                {t("delete")}
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Group;
