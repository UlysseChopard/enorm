import { Form, redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { sendResetPasswordLink } from "@/api/accounts";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const res = await sendResetPasswordLink(email);
  if (res.ok) return redirect("/login");
  return false;
}

export default function ForgotPassword() {
  const { t } = useTranslation(null, { keyPrefix: "resetPassword.form" });
  return (
    <Form
      autoComplete="on"
      method="post"
      className="flex flex-col items-center justify-center h-screen"
    >
      <div className="my-2">
        <h1 className="text-4xl font-bold mb-2">{t("title")}</h1>
        <p>{t("description")}</p>
      </div>
      <label className="flex flex-col">
        <span>Email</span>
        <input
          type="email"
          autoComplete="email"
          name="email"
          className="rounded-lg"
        />
      </label>
      <button type="submit">{t("submit")}</button>
    </Form>
  );
}
