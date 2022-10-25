import { redirect, Form } from "react-router-dom";
import { login } from "../api/user";

export async function action({ request }) {
  const formData = await request.formData();
  const userInfos = Object.fromEntries(formData);
  await login(userInfos);
  return redirect("/");
}

const StyledInput = ({ type = "text", name, label }) => {
  return (
    <label className="flex flex-col">
      <span>{label}</span>
      <input type={type} name={name} />
    </label>
  );
};

const Login = () => {
  return (
    <div
      id="login"
      className="flex items-center justify-around w-full h-screen bg-slate-50"
    >
      <div id="presentation">E-norm</div>
      <Form
        method="post"
        id="login-form"
        className="flex flex-col rounded-lg bg-white"
      >
        <StyledInput type="email" name="email" label="Email" />
        <StyledInput type="password" name="password" label="Password" />
        <p>
          <button type="submit">Sign up</button>
          <button type="button">Cancel</button>
        </p>
      </Form>
    </div>
  );
};

export default Login;
