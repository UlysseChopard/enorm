import { Form, Link } from "react-router-dom";
import StyledInput from "../components/StyledInput";

export function action() {
  return;
}

const SignupForm = () => {
  return (
    <Form method="post" id="signup-form">
      <StyledInput label="First name" name="first" />
      <StyledInput label="Last name" name="last" />
      <StyledInput label="Email" type="email" name="email" />
      <StyledInput label="Password" name="password" type="password" />
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
