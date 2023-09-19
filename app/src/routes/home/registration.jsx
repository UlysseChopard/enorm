import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useLoaderData,
  useActionData,
  useSubmit,
  useNavigate,
} from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SelectProvider from "@/components/SelectProvider";
import { find, accept, deny } from "@/api/organisations/registrations";

export const loader = async ({ params }) => {
  const res = await find(params.id);
  return res.ok ? res.json() : res.status;
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  let res;
  switch (formData.get("type")) {
    case "deny":
      res = await deny(params.id);
      break;
    case "accept":
      res = await accept(params.id, { wgPath: formData.get("wgPath") });
      break;
  }
  return res.ok ? res.json() : res.status;
};

const Registration = () => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { wgPaths, registration, requireAction } = useLoaderData();
  const actionData = useActionData();
  const { t } = useTranslation(null, { keyPrefix: "registration" });
  const [wgPath, setWgPath] = useState("");
  if (actionData?.deleted) {
    navigate("/registrations");
  }
  const handleClick = (type) => () => {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("wgPath", wgPath);
    submit(formData, { method: "POST" });
  };
  return (
    <>
      <Button variant="outlined" to="/registrations">
        {t("back")}
      </Button>
      <p>{JSON.stringify(registration)}</p>
      <p>{JSON.stringify(actionData)}</p>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" onClick={handleClick("deny")}>
            {t("deny")}
          </Button>
        </Grid>
        {requireAction && (
          <Grid item>
            {wgPaths.length && (
              <SelectProvider
                wgPaths={wgPaths}
                onChange={(e) => setWgPath(e.target.value)}
                value={wgPath}
              />
            )}
            <Button variant="contained" onClick={handleClick("accept")}>
              {wgPaths.length ? t("forward") : t("accept")}
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Registration;
