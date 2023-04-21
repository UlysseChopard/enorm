import { useLoaderData, useSubmit } from "react-router-dom";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { getById } from "@/api/working-groups";
import { ask } from "@/api/registrations";

export const loader = async ({ params }) => {
  const res = await getById(params.id);
  return res.ok ? res.json() : res.status;
};

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const res = await ask({
    group: params.id,
    decisionMaker: formData.get("decisionMaker"),
  });
  return res.ok ? res.json() : res.status;
};

const Groups = () => {
  const { decisionMaker } = useLoaderData();
  const { t } = useTranslation(null, { keyPrefix: "group" });
  const submit = useSubmit();
  const handleClick = () => {
    const registrationSubmission = new FormData();
    registrationSubmission.append("decisionMaker", decisionMaker);
    submit(registrationSubmission, { method: "POST" });
  };
  return (
    <Button type="submit" onClick={handleClick}>
      {t("join")}
    </Button>
  );
};

export default Groups;
