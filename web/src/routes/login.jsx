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
    <div
      id="login"
      className="flex items-center justify-around w-full h-screen bg-slate-50"
    >
      <div id="presentation">
        <h1 className="text-4xl font-bold">{t("brandname")}</h1>
      </div>
      <Form
        autoComplete="on"
        method="post"
        className="flex flex-col justify-around rounded-lg bg-white p-2 shadow-lg w-1/3 h-3/5"
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
          className="bg-green-400 text-white rounded-full m-2 h-14"
        >
          {t("submit")}
        </button>
        <Link to="/reset-password">
          <p className="text-center">{t("resetPassword")}</p>
        </Link>
        <div className="w-4/5 h-px border self-center" />
        <Link to="/signup" className="m-2 hover:text-sky-800">
          <p className="text-center">{t("signup")}</p>
        </Link>
      </Form>
    </div>
  );
};

export default Login;
