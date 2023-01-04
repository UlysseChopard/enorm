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
    <>
      <div className="absolute w-screen h-screen inset-0 opacity-5 bg-slate-50" />
      <dialog open className="bg-slate-50 rounded-lg flex items-center justify-center">
        <Form method="post" className="w-72 ">
          <StyledInput label={t("label")} type="textarea" name="emails" onChange={handleChange} />
          <div className="flex justify-around">
            <Link to="/roles" className="rounded-lg bg-white p-2 border-transparent border-2 hover:border-solid hover:border-sky-800">{t("cancel")}</Link>
            <button type="submit" className="p-2 rounded-lg bg-green-400 text-white border-2 border-transparent hover:border-green-800">{t("submit")}</button>
          </div>
        </Form>
      </dialog>
    </>
  );
}
