import { Link, redirect, Form } from "react-router-dom";
import { login } from "../api/accounts";
import StyledInput from "../components/StyledInput";

export async function action({ request }) {
  const formData = await request.formData();
  const userInfos = Object.fromEntries(formData);
  const res = await login(userInfos);
  if (res.ok) return redirect("/");
}

const Login = () => {
  return (
    <div
      id="login"
      className="flex items-center justify-around w-full h-screen bg-slate-50"
    >
      <div id="presentation">E-norm</div>
      <div id="login-form">
        <Form
          autoComplete="on"
          method="post"
          className="flex flex-col rounded-lg bg-white"
        >
          <StyledInput
            type="email"
            name="email"
            label="Email"
            autoComplete="email"
          />
          <StyledInput
            type="password"
            name="password"
            label="Password"
            autoComplete="current-password"
          />
          <p>
            <button type="submit">Sign up</button>
            <button type="button">Cancel</button>
          </p>
        </Form>
        <Link to="/signup">No account yet ? Click here</Link>
      </div>
    </div>
  );
};

export default Login;
