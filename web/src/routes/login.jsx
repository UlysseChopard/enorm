import { Link, redirect, Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login } from "@/api/accounts";
import StyledInput from "@/components/StyledInput";

export async function action({ request }) {
  const formData = await request.formData();
  const userInfos = Object.fromEntries(formData);
  const res = await login(userInfos);
  if (res.ok) return redirect("/");
}

const Login = () => {
  const { t } = useTranslation(null, { keyPrefix: "login" });
  return (
    <div id="login">
      <div id="presentation">
        <h1>{t("brandname")}</h1>
      </div>
      <Form
        autoComplete="on"
        method="post"
      >
        <StyledInput
          type="email"
          name="email"
          label={t("email")}
          autoComplete="email"
        />
        <StyledInput
          type="password"
          name="password"
          label={t("password")}
          autoComplete="current-password"
        />
        <button
          type="submit"
        >
          {t("submit")}
        </button>
        <Link to="/reset-password">
          <p>{t("resetPassword")}</p>
        </Link>
        <div/>
        <Link to="/signup">
          <p>{t("signup")}</p>
        </Link>
      </Form>
    </div>
  );
};

export default Login;
