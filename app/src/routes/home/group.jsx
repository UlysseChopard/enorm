import { useState } from "react";
import { useSubmit, useLoaderData, useActionData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getById } from "@/api/working-groups";
import { request as requestRegistration } from "@/api/registrations";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import SelectProvider from "@/components/SelectProvider";

export const loader = async ({ params }) => {
  const res = await getById(params.id);
  return res.ok ? res.json() : false;
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const res = await requestRegistration({ wgPath: formData.get("wgPath") });
  return res.ok ? res.json() : false;
};

const Group = () => {
  const { wgPaths } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  const { t } = useTranslation();
  const [wgPath, setWgPath] = useState("");
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("wgPath", wgPath);
    submit(formData, { method: "post" });
  };
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
            onClick={handleSubmit}
            size="large"
          >
            {t("join")}
          </Button>
        </Stack>
      </Grid>
      <Grid item>
        <div>{JSON.stringify(actionData, null, 4)}</div>
      </Grid>
    </Grid>
  );
};

export default Group;
