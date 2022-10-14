import Input from "components/forms/Input";
import Form from "components/forms/Form";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import { login } from "lib/api/auth";

export const LoginForm = () => {
  const email = useRef();
  const password = useRef();
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        email: email.current,
        password: password.current,
      });
      if (res.ok) {
        const {
          user: { is_manager, is_expert, is_activated },
        } = await res.json();
        if (!is_activated) {
          router.replace("/confirm");
        } else if (is_expert) {
          router.push("/dashboard/expert");
        } else if (is_manager) {
          router.push("/dashboard/manager");
        } else {
          throw new Error("An error occurred, please try again");
        }
      } else {
        setMessage("Incorrect email or password");
      }
    } catch (err) {
      setMessage("An error occured, please retry");
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit} submitLabel="Log In">
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
        autoComplete="current-password"
        onChange={(e) => (password.current = e.target.value)}
      />
      <p>{message}</p>
    </Form>
  );
};
