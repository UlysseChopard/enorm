import { useState } from "react";
import { useSubmit, useLoaderData, useActionData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getById } from "@/api/working-groups";
import { request as requestRegistration } from "@/api/registrations";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

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
  const { paths } = useLoaderData();
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
        <div>{JSON.stringify(paths, null, 4)}</div>
      </Grid>
      <Grid item xs={10}>
        <FormControl required fullWidth>
          <InputLabel id="wg-path-label">{t("provider")}</InputLabel>
          <Select
            id="wg-path"
            labelId="wg-path-label"
            label={t("options")}
            value={wgPath}
            onChange={(e) => setWgPath(e.target.value)}
          >
            {paths.map((path) => (
              <MenuItem
                key={path.wg_path}
                value={path.wg_path}
              >{`${path.firstname} ${path.lastname}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
