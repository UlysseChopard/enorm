import { useTranslation } from "react-i18next";
import { redirect, Form, Link } from "react-router-dom";
import { uploadManagers } from "../../../api/managers";
import StyledInput from "../../../components/StyledInput";

export async function action({ request }) {
  const file = await request.formData();
  await uploadManagers(file);
  return redirect("/managers");
}

export default function UploadManagers() {
  const { t } = useTranslation(null, { keyPrefix: "managers.upload" });
  return (
    <dialog open>
      <Form method="POST" encType="multipart/form-data">
        <StyledInput type="file" label={t("label")} name="file" />
        <Link to="/managers">{t("cancel")}</Link>
        <button type="submit">{t("submit")}</button>
      </Form>
    </dialog>
  );
}
