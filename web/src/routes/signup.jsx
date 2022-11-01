import { Form, Link, redirect } from "react-router-dom";
import StyledInput from "../components/StyledInput";
import { signup } from "../api/accounts";

export async function action({ request }) {
  const formData = await request.formData();
  const userInfos = Object.fromEntries(formData);
  const res = await signup(userInfos);
  if (res.ok) return redirect("/activate");
}

const SignupForm = () => {
  return (
    <Form autoComplete="on" method="post" id="signup-form">
      <StyledInput
        label="First name"
        name="firstname"
        autoComplete="given-name"
      />
      <StyledInput
        label="Last name"
        name="lastname"
        autoComplete="family-name"
      />
      <StyledInput
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
      />
      <StyledInput
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
      />
      <button type="submit">Sign up</button>
    </Form>
  );
};

const Signup = () => {
  return (
    <div id="signup">
      <h1>Signup</h1>
      <SignupForm />
      <Link to="/login">Already have an account ? Please click here</Link>
    </div>
  );
};

export default Signup;
