import { redirect, Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StyledInput from "../../components/StyledInput";
import { resetPassword } from "../../api/accounts";

export async function action({ params, request }) {
  const formData = await request.formData();
  const password = formData.get("password");
  const res = await resetPassword({ password, uuid: params.uuid });
  if (res.ok) return redirect("/login");
}

export default function ResetPassword() {
  return (
    <Form method="post" autoComplete="on">
      <StyledInput
        name="password"
        label="New password"
        type="password"
        autoComplete="new-password"
      />
      <button type="submit">Reset password</button>
    </Form>
  );
}
