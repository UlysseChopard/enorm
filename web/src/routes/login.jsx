import { Link, redirect, Form } from "react-router-dom";
import { login } from "../api/user";
import StyledInput from "../components/StyledInput.jsx";

export async function action({ request }) {
  const formData = await request.formData();
  const userInfos = Object.fromEntries(formData);
  await login(userInfos);
  return redirect("/");
}

const Login = () => {
  return (
    <div
      id="login"
      className="flex items-center justify-around w-full h-screen bg-slate-50"
    >
      <div id="presentation">E-norm</div>
      <div id="login-form">
        <Form method="post" className="flex flex-col rounded-lg bg-white">
          <StyledInput type="email" name="email" label="Email" />
          <StyledInput type="password" name="password" label="Password" />
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
