import { useTranslation } from "react-i18next";
import {
  useActionData,
  useNavigate,
  Form,
  useLoaderData,
} from "react-router-dom";
import { getUser, update, updatePassword } from "@/api/accounts";
import StyledInput from "@/components/StyledInput";

export async function loader() {
  const res = await getUser();
  if (!res.ok) throw new Error("Cannot access to user infos");
  const user = await res.json();
  return { user };
}

export async function action({ request }) {
  const data = await request.formData();
  const { email, firstname, lastname, oldpass, newpass } =
    Object.fromEntries(data);
  if (oldpass && newpass) {
    const resPass = await updatePassword(oldpass, newpass);
    if (!resPass.ok) throw new Error("Could not update profile");
  }
  const res = await update({ email, firstname, lastname });
  if (!res.ok)
    throw new Error(
      "Password has been correctly updated but the rest of the infos could not"
    );
  return true;
}

export default function Account() {
  const { t } = useTranslation(null, { keyPrefix: "account" });
  const updated = useActionData();
  const navigate = useNavigate();
  const { user } = useLoaderData();
  return (
    <Form autoComplete="on" method="post">
      <StyledInput
        name="firstname"
        label={t("firstname")}
        autoComplete="given-name"
        defaultValue={user.firstname}
      />
      <StyledInput
        name="lastname"
        label={t("lastname")}
        autoComplete="family-name"
        defaultValue={user.lastname}
      />
      <StyledInput
        name="email"
        label={t("email")}
        autoComplete="email"
        defaultValue={user.email}
        type="email"
      />
      <StyledInput
        name="oldpass"
        label={t("currentPassword")}
        autoComplete="current-password"
        type="password"
      />
      <StyledInput
        name="newpass"
        label={t("newPassword")}
        autoComplete="new-password"
        type="password"
      />
      <div>
        <button type="button" onClick={() => navigate(-1)}>
          {t("cancel")}
        </button>
        <button type="submit">{t("submit")}</button>
      </div>
      {updated && <p>{t("successNotif")}</p>}
    </Form>
  );
}
