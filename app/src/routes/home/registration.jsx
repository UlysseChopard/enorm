import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useLoaderData,
  useActionData,
  useSubmit,
  useNavigate,
} from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
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
  const { registration } = useLoaderData();
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
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {`${registration.firstname} ${registration.lastname}`} &rarr;{" "}
            {` ${registration.title}`}
          </Typography>
          {t("status")}:{" "}
          {(registration.denied_at && t("denied")) ||
            (registration.accepted_at && t("accepted")) ||
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
            {registration.requireAction && registration.wgPaths.length && (
              <SelectProvider
                wgPaths={registration.wgPaths}
                onChange={(e) => setWgPath(e.target.value)}
                value={wgPath}
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
                  {t("deny")}
                </Button>
              )}
              {registration.requireAction && (
                <Button
                  sx={{ m: 2 }}
                  variant="contained"
                  onClick={handleClick("accept")}
                >
                  {registration.wgPaths.length ? t("forward") : t("accept")}
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
