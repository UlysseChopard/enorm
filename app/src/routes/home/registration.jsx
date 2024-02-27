import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useLoaderData,
  useActionData,
  useSubmit,
  useNavigate,
} from "react-router-dom";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { find, accept, deny, forward } from "@/api/organisations/registrations";

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
    case "forward":
      res = await forward(params.id, {
        wgPath: formData.get("wgPath"),
        tint: formData.get("tint"),
      });
      break;
    case "accept":
      res = await accept(params.id);
      break;
  }
  return res.ok ? res.json() : res.status;
};

const SelectProvider = ({ wgPaths, onChange, value }) => {
  const { t } = useTranslation(null, { keyPrefix: "selectProvider" });
  return (
    <FormControl required fullWidth>
      <InputLabel id="wg-path-label">{t("provider")}</InputLabel>
      <Select
        displayEmpty
        id="wg-path"
        labelId="wg-path-label"
        label={t("options")}
        value={value}
        onChange={onChange}
        disabled={wgPaths.length <= 1}
      >
        {wgPaths.map(({ id, organisation_name }) => (
          <MenuItem key={id} value={id}>
            {organisation_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const Registration = () => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { registration } = useLoaderData();
  const actionData = useActionData();
  const { t } = useTranslation(null, { keyPrefix: "registration" });
  const [wgPath, setWgPath] = useState(registration.wgPaths?.[0].id);
  const [tint, setTint] = useState(registration.tint);
  if (actionData?.deleted) {
    navigate("/registrations");
  }
  const handleClick = (type) => () => {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("wgPath", wgPath);
    formData.append("tint", tint);
    submit(formData, { method: "POST" });
  };
  return (
    <>
      <Button variant="outlined" to="/registrations">
        {t("back")}
      </Button>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {`${registration.firstname} ${registration.lastname}`} &rarr;{" "}
            {` ${registration.title}`}
          </Typography>
          {t("status")}:{" "}
          {(registration.denied_at && t("denied")) ||
            (registration.accepted_at && t("accepted")) ||
            (registration.forwarded && t("forwarded")) ||
            t("pending")}
        </CardContent>
        <CardActions
          sx={{ display: "block", maxWidth: "45%", ml: 1, mr: "auto" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "max",
            }}
          >
            {registration.requireAction && (
              <SelectProvider
                wgPaths={registration.wgPaths}
                onChange={(e) => setWgPath(e.target.value)}
                value={wgPath}
              />
            )}
            {registration.requireAction && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={tint === localStorage.getItem("organisation")}
                    onChange={() =>
                      tint === registration.tint
                        ? setTint(localStorage.getItem("organisation"))
                        : setTint(registration.tint)
                    }
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label={t("tint")}
              />
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
              }}
            >
              {!registration.denied_at && (
                <Button
                  sx={{ my: 2, mr: 2 }}
                  variant="contained"
                  onClick={handleClick("deny")}
                >
                  {registration.accepted_at ? t("revoke") : t("deny")}
                </Button>
              )}
              {registration.requireAction && (
                <Button
                  sx={{ m: 2 }}
                  variant="contained"
                  onClick={
                    registration.lastStep
                      ? handleClick("accept")
                      : handleClick("forward")
                  }
                >
                  {registration.lastStep ? t("accept") : t("forward")}
                </Button>
              )}
            </div>
          </div>
        </CardActions>
      </Card>
    </>
  );
};

export default Registration;
