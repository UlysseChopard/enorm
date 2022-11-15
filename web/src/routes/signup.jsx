import { Form, Link, redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StyledInput from "@/components/StyledInput";
import { signup } from "@/api/accounts";

export async function action({ request }) {
  const formData = await request.formData();
  const userInfos = Object.fromEntries(formData);
  const res = await signup(userInfos);
  if (res.ok) return redirect("/activate");
}

const SignupForm = () => {
  const { t } = useTranslation(null, { keyPrefix: "signup" });
  return (
    <Form autoComplete="on" method="post" id="signup-form">
      <StyledInput
        label={t("firstname")}
        name="firstname"
        autoComplete="given-name"
      />
      <StyledInput
        label={t("lastname")}
        name="lastname"
        autoComplete="family-name"
      />
      <StyledInput
        label={t("email")}
        type="email"
        name="email"
        autoComplete="email"
      />
      <StyledInput
        label={t("password")}
        name="password"
        type="password"
        autoComplete="new-password"
      />
      <button type="submit">{t("submit")}</button>
    </Form>
  );
};

const Signup = () => {
  const { t } = useTranslation(null, { keyPrefix: "signup" });
  return (
    <div
      id="signup"
      className="flex flex-col h-screen justify-around items-center bg-slate-50"
    >
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <SignupForm />
      <Link to="/login">{t("login")}</Link>
    </div>
  );
};

export default Signup;
