import { useCallback, useRef, useState } from "react";
import Input from "components/forms/Input";
import Form from "components/forms/Form";
import { activateAccount } from "lib/api/experts";

const ManagerSignupForm = ({ id, onSuccess, onCancel }) => {
  const firstName = useRef();
  const lastName = useRef();
  const phoneNumber = useRef();
  const password = useRef();

  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const res = await activateAccount(id, {
          firstName: firstName.current,
          lastName: lastName.current,
          password: password.current,
          phoneNumber: phoneNumber.current,
          civility: "H",
        });
        if (res.ok) {
          setMessage("Account activated");
          setTimeout(onSuccess, 800);
        } else {
          setMessage("Something went wrong");
        }
      } catch (err) {
        console.error(err);
        setMessage("An error occurred, please retry");
      }
    },
    [id]
  );

  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel} submitLabel="Sign up">
      <Input
        name="first-name"
        label="First name"
        autoComplete="given-name"
        onChange={(e) => (firstName.current = e.target.value)}
      />
      <Input
        name="last-name"
        label="Last name"
        autoComplete="family-name"
        onChange={(e) => (lastName.current = e.target.value)}
      />
      <Input
        name="phone-number"
        label="Phone number"
        autoComplete="phone"
        onChange={(e) => (phoneNumber.current = e.target.value)}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        onChange={(e) => (password.current = e.target.value)}
      />
      <p>{message}</p>
    </Form>
  );
};

export default ManagerSignupForm;
