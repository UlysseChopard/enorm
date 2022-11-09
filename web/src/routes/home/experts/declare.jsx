import { useTranslation } from "react-i18next";
import { Link, redirect, Form } from "react-router-dom";
import StyledInput from "../../../components/StyledInput";
import { declareExpert } from "../../../api/experts";

export async function action({ request }) {
  const formData = await request.formData();
  const emails = formData.get("emails");
  const formatedEmails = emails.replaceAll(/[\s:,;/]+/g, "\n");
  const emailsArr = formatedEmails.split("\n");
  await declareExpert(emailsArr);
  return redirect("/experts");
}

export default function DeclareExpert() {
  const { t } = useTranslation(null, { keyPrefix: "experts.declare" });
  return (
    <dialog open className="absolute w-full h-full bg-slate-100 opacity-7">
      <Form method="post">
        <StyledInput label={t("label")} type="textarea" name="emails" />
        <Link to="/experts">{t("cancel")}</Link>
        <button type="submit">{t("submit")}</button>
      </Form>
    </dialog>
  );
}
