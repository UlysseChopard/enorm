import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import Input from "components/forms/Input";
import Form from "components/forms/Form";
import { signup } from "lib/api/managers";

const ExpertSignupForm = () => {
  const router = useRouter();
  const firstName = useRef();
  const lastName = useRef();
  const phoneNumber = useRef();
  const email = useRef();
  const password = useRef();

  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const res = await signup({
        firstName: firstName.current,
        lastName: lastName.current,
        email: email.current,
        password: password.current,
        phoneNumber: phoneNumber.current,
        civility: "H",
      });
      if (res.ok) {
        router.push("/dashboard/manager");
      } else {
        setMessage("Something went wrong");
      }
    } catch (err) {
      setMessage("An error occurred, please retry");
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit} submitLabel="Sign up">
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
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        onChange={(e) => (email.current = e.target.value)}
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

export default ExpertSignupForm;
