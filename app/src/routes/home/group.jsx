import { useState } from "react";
import { useSubmit, useLoaderData, redirect, Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import EditOffIcon from "@mui/icons-material/EditOff";
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
    case "update":
      console.log(formData);
      return true;
    default:
      throw new Error(`type ${formData.get("type")} does not exist`);
  }
};

const Group = () => {
  const { wg } = useLoaderData();
  const submit = useSubmit();
  const { t } = useTranslation(null, { keyPrefix: "group" });
  const [editing, setEditing] = useState(false);
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
      <div style={{ marginTop: "1rem" }}>
        {!editing ? (
          <Card>
            <CardHeader
              title={wg.title}
              action={
                <IconButton onClick={() => setEditing(true)}>
                  <ModeEditIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Stack spacing={2}>
                <Typography>{`${t("reference")}: ${wg.reference}`}</Typography>
                <Typography>{`${t("organisationName")}: ${
                  wg.organisation_name
                }`}</Typography>
                <Typography>{`${t("createdAt")}: ${new Date(
                  wg.created_at,
                ).toLocaleDateString()}`}</Typography>
              </Stack>
            </CardContent>
            {isAdmin && wg.organisation === organisation && (
              <CardActions>
                <Button variant="contained" onClick={handleClick}>
                  {t("delete")}
                </Button>
              </CardActions>
            )}
          </Card>
        ) : (
          <Form method="PATCH">
            <Card>
              <CardHeader
                title={t("edition")}
                action={
                  <IconButton onClick={() => setEditing(false)}>
                    <EditOffIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    name="title"
                    label={t("title")}
                    defaultValue={wg.title}
                    variant="filled"
                  />
                  <TextField
                    name="reference"
                    label={t("reference")}
                    defaultValue={wg.reference}
                    variant="filled"
                  />
                  <TextField
                    name="description"
                    label={t("description")}
                    multiline
                    rows={5}
                    defaultValue={wg.description ? wg.description : ""}
                    variant="filled"
                  />
                  <input type="hidden" name="type" value="update" />
                </Stack>
              </CardContent>
              <CardActions>
                <Button onClick={() => setEditing(false)}>{t("cancel")}</Button>
                <Button variant="contained" type="submit">
                  {t("modify")}
                </Button>
              </CardActions>
            </Card>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Group;
