import { useTranslation } from "react-i18next";
import { useLoaderData, useActionData, useSubmit } from "react-router-dom";
import Button from "@mui/material/Button";
import { find, accept, deny } from "@/api/registrations";

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
      res = await accept(params.id, formData.get("wgPath"));
      break;
  }
  return res.ok ? res.json() : res.status;
};

const Registration = () => {
  const submit = useSubmit();
  const { registration, requireAction } = useLoaderData();
  const actionData = useActionData();
  const { t } = useTranslation(null, { keyPrefix: "registration" });
  const handleClick = (type) => () => {
    const formData = new FormData();
    formData.append("type", type);
    submit(formData, { method: "POST" });
  };
  return (
    <>
      <Button variant="outlined" to="/registrations">
        {t("back")}
      </Button>
      <p>{JSON.stringify(registration)}</p>
      <p>{JSON.stringify(actionData)}</p>
      {requireAction && (
        <>
          <Button variant="contained" onClick={handleClick("deny")}>
            {t("deny")}
          </Button>
          <Button variant="contained" onClick={handleClick("accept")}>
            {t("accept")}
          </Button>
        </>
      )}
    </>
  );
};

export default Registration;
