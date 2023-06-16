import { useState, useEffect } from "react";
import {
  useSubmit,
  useLoaderData,
  useActionData,
  redirect,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getById, deleteById } from "@/api/working-groups";
import { request as requestRegistration } from "@/api/registrations";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import SelectProvider from "@/components/SelectProvider";

export const loader = async ({ params }) => {
  const res = await getById(params.id);
  return res.ok ? res.json() : false;
};

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  let res;
  switch (formData.get("type")) {
    case "register":
      res = await requestRegistration({ wgPath: formData.get("wgPath") });
      return res.ok ? res.json() : false;
    case "delete":
      res = await deleteById(params.id);
      return res.ok ? redirect("/groups") : false;
  }
};

const Group = () => {
  const { wgPaths } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  const { t } = useTranslation();
  const [wgPath, setWgPath] = useState("");
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
  useEffect(() => {
    if (wgPaths.length == 1) {
      setWgPath(wgPaths[0].id);
    }
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Button variant="outlined" to="/groups">
          {t("back")}
        </Button>
      </Grid>
      <Grid item>
        <div>{JSON.stringify(wgPaths, null, 4)}</div>
      </Grid>
      <Grid item xs={10}>
        <SelectProvider
          wgPaths={wgPaths}
          onChange={(e) => setWgPath(e.target.value)}
          value={wgPath}
        />
      </Grid>
      <Grid item xs={10}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            disabled={!wgPath}
            onClick={handleSubmitRegister}
            size="large"
          >
            {t("join")}
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={10}>
        <Button variant="contained" onClick={handleSubmitDelete} size="large">
          {t("delete")}
        </Button>
      </Grid>
      <Grid item>
        <div>{JSON.stringify(actionData, null, 4)}</div>
      </Grid>
    </Grid>
  );
};

export default Group;
