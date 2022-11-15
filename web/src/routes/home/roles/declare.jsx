import { useTranslation } from "react-i18next";
import { Link, redirect, Form } from "react-router-dom";
import StyledInput from "@/components/StyledInput";
import { declareRole } from "@/api/roles";
import debounce from "@/utils/debounce";

export async function action({ request }) {
  const formData = await request.formData();
  const emails = formData.get("emails");
  await declareRole(emails);
  return redirect("/roles");
}

export default function DeclareRole() {
  const { t } = useTranslation(null, { keyPrefix: "roles.declare" });
  const handleChange = debounce((e) => {
    e.persist();
    e.target.value = e.target.value.replace(/[\s;|]+/g, " ");
  });
  return (
    <dialog open className="absolute w-full h-full bg-slate-100 opacity-7">
      <Form method="post">
        <StyledInput label={t("label")} type="textarea" name="emails" onChange={handleChange} />
        <Link to="/roles">{t("cancel")}</Link>
        <button type="submit">{t("submit")}</button>
      </Form>
    </dialog>
  );
}
